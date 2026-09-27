"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';

export default function SeoTab({ seo, setSeo, showToast }) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await DashboardService.updateSeo(seo);
      setSeo(res.data);
      showToast('SEO settings updated successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to update SEO', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      setSeo(prev => ({ ...prev, [field]: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Search Engine Optimization (SEO)</h2>
          <p>Configure search engine meta tags, OpenGraph sharing cards, and crawler indexing rules.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="card">
          <h3>Core Meta Tags</h3>
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Meta Title (SEO Title)</label>
            <input
              type="text"
              className="form-input"
              value={seo.meta_title || ''}
              onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
              placeholder="e.g. Urban Cruise | Luxury Fleet Rentals Delhi"
              required
            />
            <span className="char-count">{(seo.meta_title || '').length} / 60 recommended characters</span>
          </div>

          <div className="form-group">
            <label className="form-label">Meta Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={seo.meta_description || ''}
              onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
              placeholder="Brief description for Google search results snippet..."
              required
            />
            <span className="char-count">{(seo.meta_description || '').length} / 160 recommended characters</span>
          </div>

          <div className="form-group">
            <label className="form-label">Focus Keywords (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={seo.focus_keywords || ''}
              onChange={(e) => setSeo({ ...seo, focus_keywords: e.target.value })}
              placeholder="tempo traveller delhi, urban cruise, force urbania hire"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Canonical URL</label>
            <input
              type="url"
              className="form-input"
              value={seo.canonical_url || ''}
              onChange={(e) => setSeo({ ...seo, canonical_url: e.target.value })}
              placeholder="https://urbancruise.in"
            />
          </div>

          <div className="checkbox-group" style={{ marginTop: 12 }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={Boolean(seo.robots_index)}
                onChange={(e) => setSeo({ ...seo, robots_index: e.target.checked })}
              />
              Allow Search Engines to Index this Page (robots: index)
            </label>
            <label className="checkbox-label" style={{ marginTop: 8 }}>
              <input
                type="checkbox"
                checked={Boolean(seo.robots_follow)}
                onChange={(e) => setSeo({ ...seo, robots_follow: e.target.checked })}
              />
              Allow Crawlers to Follow Links (robots: follow)
            </label>
          </div>
        </div>

        <div className="card">
          <h3>OpenGraph & Social Sharing</h3>
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">OG Title (Facebook, LinkedIn, WhatsApp)</label>
            <input
              type="text"
              className="form-input"
              value={seo.og_title || ''}
              onChange={(e) => setSeo({ ...seo, og_title: e.target.value })}
              placeholder="Leave blank to use Meta Title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">OG Description</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={seo.og_description || ''}
              onChange={(e) => setSeo({ ...seo, og_description: e.target.value })}
              placeholder="Leave blank to use Meta Description"
            />
          </div>

          <div className="form-group">
            <label className="form-label">OG Image URL</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                className="form-input"
                value={seo.og_image || ''}
                onChange={(e) => setSeo({ ...seo, og_image: e.target.value })}
                placeholder="https://... or upload image"
              />
              <label className="btn-upload">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'og_image')}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          <h3 style={{ marginTop: 24 }}>Twitter Card Settings</h3>
          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="form-label">Twitter Title</label>
            <input
              type="text"
              className="form-input"
              value={seo.twitter_title || ''}
              onChange={(e) => setSeo({ ...seo, twitter_title: e.target.value })}
              placeholder="Twitter card title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Twitter Image URL</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                className="form-input"
                value={seo.twitter_image || ''}
                onChange={(e) => setSeo({ ...seo, twitter_image: e.target.value })}
                placeholder="Twitter preview image"
              />
              <label className="btn-upload">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'twitter_image')}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Saving...' : 'Save SEO Configuration 💾'}
          </button>
        </div>
      </form>
    </div>
  );
}
