"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';

export default function TestimonialsTab({ testimonials, setTestimonials, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingItem({
      customer_name: '',
      review: '',
      rating: 5,
      customer_image: '',
      display_order: testimonials.length + 1,
      is_active: true
    });
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingItem({ ...t });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        customer_name: editingItem.customer_name,
        review: editingItem.review,
        rating: Number(editingItem.rating) || 5,
        customer_image: editingItem.customer_image || '',
        display_order: Number(editingItem.display_order) || 0,
        is_active: Boolean(editingItem.is_active)
      };

      let res;
      if (editingItem.id) {
        res = await DashboardService.updateTestimonial(editingItem.id, payload);
        setTestimonials(prev => prev.map(t => t.id === editingItem.id ? res.data : t));
        showToast('Review updated!');
      } else {
        res = await DashboardService.createTestimonial(payload);
        setTestimonials(prev => [...prev, res.data]);
        showToast('Testimonial added!');
      }
      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      showToast(err.message || 'Error saving testimonial', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      await DashboardService.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showToast('Review removed');
    } catch (err) {
      showToast(err.message || 'Failed to delete review', 'error');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      setEditingItem(prev => ({ ...prev, customer_image: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Customer Testimonials & Reviews</h2>
          <p>Manage customer feedback and 1-5 star ratings displayed on the homepage.</p>
        </div>
        <button onClick={openAddModal} className="btn-add">
          + Add New Review
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                    No reviews added yet. Click "+ Add New Review" to add one.
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.customer_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                          alt={t.customer_name}
                          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <strong>{t.customer_name}</strong>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: '#f59e0b', fontSize: 16 }}>{'★'.repeat(t.rating)}</span>
                    </td>
                    <td style={{ maxWidth: 300, color: '#64748b' }}>“{t.review}”</td>
                    <td>
                      <span className={`badge ${t.is_active ? 'badge-active' : 'badge-disabled'}`}>
                        {t.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => openEditModal(t)} className="btn-table-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="btn-table-delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && editingItem && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingItem.id ? 'Edit Testimonial' : 'Add Customer Review'}</h3>
            <form onSubmit={handleSave} style={{ marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingItem.customer_name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, customer_name: e.target.value })}
                  placeholder="e.g. Rajesh Sharma"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating (1 to 5 Stars)</label>
                <select
                  className="form-select"
                  value={editingItem.rating || 5}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                  <option value={2}>★★☆☆☆ (2 Stars - Poor)</option>
                  <option value={1}>★☆☆☆☆ (1 Star - Bad)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Customer Photo URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-input"
                    value={editingItem.customer_image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, customer_image: e.target.value })}
                    placeholder="https://... or upload photo"
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
                <label className="form-label">Review Text</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={editingItem.review || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, review: e.target.value })}
                  placeholder="Customer's experience and remarks..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
