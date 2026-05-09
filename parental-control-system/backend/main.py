from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import json
import os
from typing import Any, Callable, Dict, List

app = Flask(__name__)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]
CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILES = {
    "calls": os.path.join(BASE_DIR, "vault_calls.json"),
    "messages": os.path.join(BASE_DIR, "vault_messages.json"),
    "locations": os.path.join(BASE_DIR, "vault_locations.json"),
    "notifications": os.path.join(BASE_DIR, "vault_notifications.json"),
}

API_TOKEN = os.getenv("DASHBOARD_API_TOKEN", "")


def require_api_token(handler: Callable[..., Any]) -> Callable[..., Any]:
    @wraps(handler)
    def wrapper(*args: Any, **kwargs: Any):
        if not API_TOKEN:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "DASHBOARD_API_TOKEN is not configured.",
                    }
                ),
                503,
            )

        auth_header = request.headers.get("Authorization", "")
        token = auth_header.removeprefix("Bearer ").strip()
        if token != API_TOKEN:
            return jsonify({"status": "error", "message": "Unauthorized."}), 401

        return handler(*args, **kwargs)

    return wrapper


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
    temp_path = f"{path}.tmp"
    with open(temp_path, "w", encoding="utf-8") as file:
        json.dump(items, file, indent=2, ensure_ascii=False)
    os.replace(temp_path, path)


def save_data(category: str, payload: Dict[str, Any]) -> None:
    path = FILES[category]
    current = read_items(path)

    record = dict(payload)
    record["timestamp"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    current.append(record)

    write_items(path, current)


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


@app.route("/api/v1/sync", methods=["POST"])
@require_api_token
def sync_data():
    payload = request.get_json(silent=True)
    if not payload:
        return jsonify({"status": "error", "message": "JSON body is required."}), 400

    category = payload.get("type")
    if category not in FILES:
        return jsonify({"status": "error", "message": "Invalid data type."}), 400

    save_data(category, payload)
    return jsonify({"status": "success"}), 201


@app.route("/api/v1/data/<category>", methods=["GET"])
@require_api_token
def get_data(category: str):
    if category not in FILES:
        return jsonify({"status": "error", "message": "Invalid category."}), 400

    return jsonify(read_items(FILES[category]))


ensure_storage_files()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
