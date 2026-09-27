import { API_BASE } from '@/utils/constants';
import { getToken } from '@/utils/storage';

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };

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

export async function uploadMedia(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await apiRequest('/upload', {
    method: 'POST',
    body: formData
  });

  return res.data;
}
