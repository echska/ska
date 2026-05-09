const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://parental-control-backend-wib3.onrender.com/api/v1";

export async function fetchCategory(category) {
  const response = await fetch(`${API_BASE_URL}/data/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  return response.json();
}

export async function syncCategory(payload) {
  const response = await fetch(`${API_BASE_URL}/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to sync payload`);
  }

  return response.json();
}
