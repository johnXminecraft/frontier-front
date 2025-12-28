
const API_BASE_URL = "http://localhost:5160";

export async function api<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {

  const access_token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      ...(access_token && { Authorization: `Bearer ${access_token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Api error ${error}, code ${response.status}`);
  }

  return response.json();
}
