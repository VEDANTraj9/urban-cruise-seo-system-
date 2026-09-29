"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';
import { getImageUrl } from '@/utils/constants';

export default function HomepageTab({ hero, setHero, about, setAbout, showToast }) {
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      const res = await DashboardService.updateHero(hero);
      setHero(res.data);
      showToast('Hero section updated successfully!');
    } catch (err) {
      showToast(err.message || 'Error updating Hero', 'error');
    } finally {
      setSavingHero(false);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSavingAbout(true);
    try {
      const res = await DashboardService.updateAbout(about);
      setAbout(res.data);
      showToast('About Us section updated successfully!');
    } catch (err) {
      showToast(err.message || 'Error updating About', 'error');
    } finally {
      setSavingAbout(false);
    }
  };

  const handleUpload = async (e, onUrl) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      onUrl(data.url);
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Hero & About Us Management</h2>
          <p>Update homepage top banner, headline, CTA button, and brand story.</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Hero Section Card */}
        <div className="card">
          <h3>Hero Banner Section</h3>
          <form onSubmit={handleSaveHero} style={{ marginTop: 16 }}>
            <div className="form-group">
              <label className="form-label">Main Heading</label>
              <input
                type="text"
                className="form-input"
                value={hero.main_heading || ''}
                onChange={(e) => setHero({ ...hero, main_heading: e.target.value })}
                placeholder="Welcome to Urban Cruise Delhi"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sub Heading</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={hero.sub_heading || ''}
                onChange={(e) => setHero({ ...hero, sub_heading: e.target.value })}
                placeholder="Luxury Tempo Travellers, Force Urbania and executive buses..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Background Image URL</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  className="form-input"
                  value={hero.banner_image || ''}
                  onChange={(e) => setHero({ ...hero, banner_image: e.target.value })}
                  placeholder="https://... or upload"
                  required
                />
                <label className="btn-upload">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, (url) => setHero({ ...hero, banner_image: url }))}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              {hero.banner_image && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(hero.banner_image)}
                    alt="Banner Preview"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                    style={{ width: 100, height: 50, objectFit: 'cover', borderRadius: 4, border: '1px solid #334155' }}
                  />
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Preview (Direct upload or external link)</span>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">CTA Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={hero.cta_text || ''}
                  onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                  placeholder="Explore Fleet"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">CTA Button Link</label>
                <input
                  type="text"
                  className="form-input"
                  value={hero.cta_url || ''}
                  onChange={(e) => setHero({ ...hero, cta_url: e.target.value })}
                  placeholder="#vehicles"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-save" disabled={savingHero} style={{ marginTop: 12 }}>
              {savingHero ? 'Saving...' : 'Save Hero Section 💾'}
            </button>
          </form>
        </div>

        {/* About Section Card */}
        <div className="card">
          <h3>About Us Section</h3>
          <form onSubmit={handleSaveAbout} style={{ marginTop: 16 }}>
            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={about.section_title || ''}
                onChange={(e) => setAbout({ ...about, section_title: e.target.value })}
                placeholder="Dedicated to Delivering Excellence on Every Mile"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">About Story / Description</label>
              <textarea
                className="form-textarea"
                rows={5}
                value={about.description || ''}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                placeholder="Over a decade of excellence in luxury passenger transportation..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Featured Image URL</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  className="form-input"
                  value={about.featured_image || ''}
                  onChange={(e) => setAbout({ ...about, featured_image: e.target.value })}
                  placeholder="https://... or upload"
                  required
                />
                <label className="btn-upload">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, (url) => setAbout({ ...about, featured_image: url }))}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              {about.featured_image && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(about.featured_image)}
                    alt="Featured Preview"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                    style={{ width: 100, height: 50, objectFit: 'cover', borderRadius: 4, border: '1px solid #334155' }}
                  />
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Preview (Direct upload or external link)</span>
                </div>
              )}
            </div>

            <button type="submit" className="btn-save" disabled={savingAbout} style={{ marginTop: 12 }}>
              {savingAbout ? 'Saving...' : 'Save About Us 💾'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
