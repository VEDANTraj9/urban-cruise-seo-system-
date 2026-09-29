import { API_BASE } from '@/utils/constants';

export const PublicService = {
  async getSeo() {
    try {
      const res = await fetch(`${API_BASE}/public/seo`, {
        next: { revalidate: 30 },
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn('PublicService.getSeo fetch failed, using fallback:', err.message);
      return null;
    }
  },

  async getHomepageContent() {
    try {
      const res = await fetch(`${API_BASE}/public/homepage`, {
        next: { revalidate: 30 },
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn('PublicService.getHomepageContent fetch failed, using fallback:', err.message);
      return null;
    }
  }
};
