import { API_BASE } from '@/utils/constants';

export const PublicService = {
  async getSeo() {
    try {
      const res = await fetch(`${API_BASE}/public/seo`, { cache: 'no-store' });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  async getHomepageContent() {
    try {
      const res = await fetch(`${API_BASE}/public/homepage`, { cache: 'no-store' });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  }
};
