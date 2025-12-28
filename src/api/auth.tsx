
export async function login(
  username: string,
  password: string
): Promise<void> {
  const res = await fetch("http://localhost:5160/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const text = await res.text();
  const data = JSON.parse(text);

  localStorage.setItem("access_token", data.access_token);
}
