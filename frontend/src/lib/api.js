const rawApiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE = rawApiBase.replace(/\/+$/, '').endsWith('/api')
  ? rawApiBase.replace(/\/+$/, '')
  : `${rawApiBase.replace(/\/+$/, '')}/api`;

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}

export function getStoredUser() {
  if (typeof window !== 'undefined') {
    const u = localStorage.getItem('admin_user');
    return u ? JSON.parse(u) : null;
  }
  return null;
}

export function setStoredUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_user', JSON.stringify(user));
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    ...options.headers
  };

  // If not sending FormData, set JSON content-type
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || 'API request failed');
    error.status = res.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
}

// Media upload helper
export async function uploadMedia(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Upload failed');
  }
  return data.data; // { url, filename, relativeUrl }
}
