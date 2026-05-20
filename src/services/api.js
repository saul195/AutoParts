const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(url, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Error ${res.status}`);
  }
  return res.json();
}

export const auth = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/auth/me'),
};

export const products = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/products${q ? `?${q}` : ''}`);
  },
  get: (id) => request(`/products/${id}`),
  create: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateStock: (id, cantidad) =>
    request(`/products/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ cantidad }) }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

export const categories = {
  list: () => request('/categories'),
  create: (nombre) => request('/categories', { method: 'POST', body: JSON.stringify({ nombre }) }),
};

export const suppliers = {
  list: () => request('/suppliers'),
  create: (data) => request('/suppliers', { method: 'POST', body: JSON.stringify(data) }),
};

export const users = {
  list: (params = '') => request(`/users${params ? `?${params}` : ''}`),
  update: (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};

export const orders = {
  list: () => request('/orders'),
  get: (id) => request(`/orders/${id}`),
  create: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
};

export const dashboard = {
  stats: () => request('/dashboard/stats'),
};
