const API_URL = "http://localhost:5001/api";

export const apiRequest = async (endpoint, method = "GET", body) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(user?.token && {
        Authorization: `Bearer ${user.token}`,
      }),
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};
