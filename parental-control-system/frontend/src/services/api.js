const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://parental-control-backend.onrender.com/api/v1"
    : "http://localhost:5000/api/v1");

const TOKEN_KEY = "dashboardApiToken";

export function getSavedToken() {
  return window.sessionStorage.getItem(TOKEN_KEY) || "";
}

export function saveToken(token) {
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.sessionStorage.removeItem(TOKEN_KEY);
}

export async function fetchCategory(category, token) {
  const response = await fetch(`${API_BASE_URL}/data/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 503) {
    const error = new Error(response.status === 401 ? "Unauthorized" : "API token is not configured");
    error.status = response.status;
    throw error;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  return response.json();
}
