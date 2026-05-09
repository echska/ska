from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import json
import os
import fcntl
from typing import Any, Dict, List
from contextlib import contextmanager

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MAX_ITEMS_PER_CATEGORY = 5000
FILES = {
    "calls": os.path.join(BASE_DIR, "vault_calls.json"),
    "messages": os.path.join(BASE_DIR, "vault_messages.json"),
    "locations": os.path.join(BASE_DIR, "vault_locations.json"),
    "notifications": os.path.join(BASE_DIR, "vault_notifications.json"),
}


def ensure_storage_files() -> None:
    for path in FILES.values():
        if not os.path.exists(path):
            with open(path, "w", encoding="utf-8") as file:
                json.dump([], file)


def read_items(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as file:
        try:
            data = json.load(file)
            return data if isinstance(data, list) else []
        except json.JSONDecodeError:
            return []


def write_items(path: str, items: List[Dict[str, Any]]) -> None:
    with open(path, "w", encoding="utf-8") as file:
        json.dump(items, file, indent=2, ensure_ascii=False)

@contextmanager
def with_file_lock(path: str):
    lock_path = f"{path}.lock"
    lock_file = open(lock_path, "w", encoding="utf-8")
    try:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX)
        yield
    finally:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_UN)
        lock_file.close()


def validate_payload(category: str, payload: Dict[str, Any]) -> str | None:
    required = {
        "calls": ["number"],
        "messages": ["content"],
        "locations": ["lat", "lng"],
        "notifications": ["message"],
    }
    missing = [field for field in required[category] if field not in payload]
    if missing:
        return f"Missing required fields: {', '.join(missing)}"
    return None


def save_data(category: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    path = FILES[category]

    record = dict(payload)
    record["timestamp"] = datetime.datetime.now(datetime.timezone.utc).isoformat()

    with with_file_lock(path):
        current = read_items(path)
        current.append(record)

        if len(current) > MAX_ITEMS_PER_CATEGORY:
            current = current[-MAX_ITEMS_PER_CATEGORY:]

        write_items(path, current)

    return record


ensure_storage_files()


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "parental-control-backend"})


@app.route("/api/v1/sync", methods=["POST"])
def sync_data():
    payload = request.get_json(silent=True)
    if not payload:
        return jsonify({"status": "error", "message": "JSON body is required."}), 400

    category = payload.get("type")
    if category not in FILES:
        return jsonify({"status": "error", "message": "Invalid data type."}), 400

    validation_error = validate_payload(category, payload)
    if validation_error:
        return jsonify({"status": "error", "message": validation_error}), 400

    record = save_data(category, payload)
    return jsonify({"status": "success", "record": record}), 201


@app.route("/api/v1/data/<category>", methods=["GET"])
def get_data(category: str):
    if category not in FILES:
        return jsonify({"status": "error", "message": "Invalid category."}), 400

    return jsonify(read_items(FILES[category]))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
