const API_BASE_URL = "http://localhost:5000/api/v1";

export async function fetchCategory(category) {
  const response = await fetch(`${API_BASE_URL}/data/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  return response.json();
}
