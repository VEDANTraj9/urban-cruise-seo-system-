"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';

export default function GalleryTab({ gallery, setGallery, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ image_url: '', alt_tag: '', display_order: 0 });
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.alt_tag?.trim()) {
      showToast('SEO Alt Tag is strictly required for search visibility!', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await DashboardService.createGalleryItem(newItem);
      setGallery(prev => [res.data, ...prev]);
      setNewItem({ image_url: '', alt_tag: '', display_order: 0 });
      setModalOpen(false);
      showToast('Image with SEO Alt Tag added to gallery!');
    } catch (err) {
      showToast(err.message || 'Failed to add image', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this gallery photo?')) return;
    try {
      await DashboardService.deleteGalleryItem(id);
      setGallery(prev => prev.filter(g => g.id !== id));
      showToast('Gallery image removed');
    } catch (err) {
      showToast(err.message || 'Failed to delete image', 'error');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      setNewItem(prev => ({ ...prev, image_url: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Photo Gallery & SEO Alt Tags</h2>
          <p>Every photo requires an optimized Alt Tag for Google Image Search and accessibility.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-add">
          + Add New Photo
        </button>
      </div>

      <div className="card">
        {gallery.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            No gallery images found. Click "+ Add New Photo" to add images with SEO Alt Tags.
          </div>
        ) : (
          <div className="gallery-admin-grid">
            {gallery.map((g) => (
              <div key={g.id} className="gallery-admin-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image_url} alt={g.alt_tag} />
                <div className="gallery-admin-body">
                  <span className="alt-tag-label">SEO Alt Tag:</span>
                  <p className="alt-tag-text">{g.alt_tag}</p>
                  <button onClick={() => handleDelete(g.id)} className="btn-card-delete">
                    Delete Photo 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Photo with SEO Alt Tag</h3>
            <form onSubmit={handleAdd} style={{ marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-input"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                    placeholder="https://... or upload photo"
                    required
                  />
                  <label className="btn-upload">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  SEO Alt Tag <span style={{ color: '#ef4444' }}>* (Mandatory)</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newItem.alt_tag}
                  onChange={(e) => setNewItem({ ...newItem, alt_tag: e.target.value })}
                  placeholder="e.g. Luxury 14 seater tempo traveller interior captain seats"
                  required
                />
                <span className="field-hint">Descriptive keywords for search engine indexing.</span>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save" disabled={saving}>
                  {saving ? 'Adding...' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
