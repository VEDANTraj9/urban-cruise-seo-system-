import { apiRequest } from './api.service';
import { setToken, setStoredUser, removeToken, getStoredUser, getToken } from '@/utils/storage';

export const AuthService = {
  async login(email, password) {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (res.data?.token) {
      setToken(res.data.token);
      setStoredUser(res.data.user);
    }
    return res.data;
  },

  logout() {
    removeToken();
  },

  getCurrentUser() {
    return getStoredUser();
  },

  isAuthenticated() {
    return Boolean(getToken());
  }
};
