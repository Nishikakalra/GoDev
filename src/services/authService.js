const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const signup = (name, email, password) =>
  request('/api/auth/signup', { name, email, password });

export const login = (email, password) =>
  request('/api/auth/login', { email, password });
