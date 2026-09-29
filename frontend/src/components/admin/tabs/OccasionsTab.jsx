"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';
import { getImageUrl } from '@/utils/constants';

export default function OccasionsTab({ occasions, setOccasions, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState(null);
  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingOccasion({
      title: '',
      description: '',
      image: '',
      display_order: occasions.length + 1,
      is_active: true
    });
    setModalOpen(true);
  };

  const openEditModal = (o) => {
    setEditingOccasion({ ...o });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: editingOccasion.title,
        description: editingOccasion.description,
        image: editingOccasion.image,
        display_order: Number(editingOccasion.display_order) || 0,
        is_active: Boolean(editingOccasion.is_active)
      };

      let res;
      if (editingOccasion.id) {
        res = await DashboardService.updateOccasion(editingOccasion.id, payload);
        setOccasions(prev => prev.map(o => o.id === editingOccasion.id ? res.data : o));
        showToast('Occasion updated successfully!');
      } else {
        res = await DashboardService.createOccasion(payload);
        setOccasions(prev => [...prev, res.data]);
        showToast('Occasion created successfully!');
      }
      setModalOpen(false);
      setEditingOccasion(null);
    } catch (err) {
      showToast(err.message || 'Error saving occasion', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this occasion?')) return;
    try {
      await DashboardService.deleteOccasion(id);
      setOccasions(prev => prev.filter(o => o.id !== id));
      showToast('Occasion removed');
    } catch (err) {
      showToast(err.message || 'Failed to delete occasion', 'error');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      setEditingOccasion(prev => ({ ...prev, image: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Occasions & Travel Services</h2>
          <p>Manage event packages: Weddings, Corporate Outings, Outstation Tours, and Airport Transfers.</p>
        </div>
        <button onClick={openAddModal} className="btn-add">
          + Add New Occasion
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Service / Occasion</th>
                <th>Description</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {occasions.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                    No occasions added yet. Click "+ Add New Occasion" to add one.
                  </td>
                </tr>
              ) : (
                occasions.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getImageUrl(o.image)}
                          alt={o.title}
                          onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <strong>{o.title}</strong>
                      </div>
                    </td>
                    <td style={{ maxWidth: 300, color: '#64748b' }}>{o.description}</td>
                    <td>
                      <span className={`badge ${o.is_active ? 'badge-active' : 'badge-disabled'}`}>
                        {o.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => openEditModal(o)} className="btn-table-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(o.id)} className="btn-table-delete">
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

      {modalOpen && editingOccasion && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingOccasion.id ? 'Edit Occasion' : 'Add New Occasion'}</h3>
            <form onSubmit={handleSave} style={{ marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Occasion Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingOccasion.title || ''}
                  onChange={(e) => setEditingOccasion({ ...editingOccasion, title: e.target.value })}
                  placeholder="e.g. Wedding Transportation"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-input"
                    value={editingOccasion.image || ''}
                    onChange={(e) => setEditingOccasion({ ...editingOccasion, image: e.target.value })}
                    placeholder="https://... or upload"
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
                {editingOccasion.image && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(editingOccasion.image)}
                      alt="Preview"
                      onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                      style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 4, border: '1px solid #334155' }}
                    />
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Preview (Direct upload or external link)</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={editingOccasion.description || ''}
                  onChange={(e) => setEditingOccasion({ ...editingOccasion, description: e.target.value })}
                  placeholder="Service details and highlights..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Occasion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
