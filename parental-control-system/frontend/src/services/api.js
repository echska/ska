const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://parental-control-backend.onrender.com/api/v1"
    : "http://localhost:5000/api/v1");

export async function fetchCategory(category) {
  const response = await fetch(`${API_BASE_URL}/data/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  return response.json();
}
