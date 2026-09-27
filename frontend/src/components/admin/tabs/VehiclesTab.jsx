"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { uploadMedia } from '@/services/api.service';

export default function VehiclesTab({ vehicles, setVehicles, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingVehicle({
      name: '',
      image: '',
      seating_capacity: 12,
      description: '',
      features: '',
      display_order: vehicles.length + 1,
      is_active: true
    });
    setModalOpen(true);
  };

  const openEditModal = (v) => {
    setEditingVehicle({
      ...v,
      features: Array.isArray(v.features) ? v.features.join(', ') : v.features
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: editingVehicle.name,
        image: editingVehicle.image,
        seating_capacity: Number(editingVehicle.seating_capacity) || 12,
        description: editingVehicle.description,
        features: typeof editingVehicle.features === 'string'
          ? editingVehicle.features.split(',').map(f => f.trim()).filter(Boolean)
          : (editingVehicle.features || []),
        display_order: Number(editingVehicle.display_order) || 0,
        is_active: Boolean(editingVehicle.is_active)
      };

      let res;
      if (editingVehicle.id) {
        res = await DashboardService.updateVehicle(editingVehicle.id, payload);
        setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? res.data : v));
        showToast('Vehicle updated successfully!');
      } else {
        res = await DashboardService.createVehicle(payload);
        setVehicles(prev => [...prev, res.data]);
        showToast('Vehicle added to fleet!');
      }
      setModalOpen(false);
      setEditingVehicle(null);
    } catch (err) {
      showToast(err.message || 'Failed to save vehicle', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await DashboardService.deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
      showToast('Vehicle removed from fleet');
    } catch (err) {
      showToast(err.message || 'Failed to delete vehicle', 'error');
    }
  };

  const handleReorder = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= vehicles.length) return;

    const updated = [...vehicles];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reorderedList = updated.map((item, idx) => ({
      ...item,
      display_order: idx + 1
    }));
    setVehicles(reorderedList);

    try {
      await DashboardService.reorderVehicles(
        reorderedList.map(v => ({ id: v.id, display_order: v.display_order }))
      );
      showToast('Fleet reordered successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to save order', 'error');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading image...', 'success');
      const data = await uploadMedia(file);
      setEditingVehicle(prev => ({ ...prev, image: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Fleet Management</h2>
          <p>Add, edit, reorder (▲/▼), and toggle vehicle visibility on the homepage.</p>
        </div>
        <button onClick={openAddModal} className="btn-add">
          + Add New Vehicle
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Order</th>
                <th>Vehicle</th>
                <th>Capacity</th>
                <th>Key Features</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                    No vehicles in fleet. Click "+ Add New Vehicle" to add one.
                  </td>
                </tr>
              ) : (
                vehicles.map((v, idx) => (
                  <tr key={v.id}>
                    <td>
                      <div className="reorder-btns">
                        <button
                          type="button"
                          onClick={() => handleReorder(idx, 'up')}
                          disabled={idx === 0}
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReorder(idx, 'down')}
                          disabled={idx === vehicles.length - 1}
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={v.image}
                          alt={v.name}
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <strong>{v.name}</strong>
                      </div>
                    </td>
                    <td>{v.seating_capacity} Seater</td>
                    <td>
                      {(v.features || []).slice(0, 3).map((f, i) => (
                        <span key={i} className="feature-chip">{f}</span>
                      ))}
                    </td>
                    <td>
                      <span className={`badge ${v.is_active ? 'badge-active' : 'badge-disabled'}`}>
                        {v.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => openEditModal(v)} className="btn-table-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(v.id)} className="btn-table-delete">
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

      {/* Modal */}
      {modalOpen && editingVehicle && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingVehicle.id ? 'Edit Vehicle' : 'Add Vehicle to Fleet'}</h3>
            <form onSubmit={handleSave} style={{ marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingVehicle.name || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  placeholder="e.g. Force Urbania Luxury 14 Seater"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Seating Capacity</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingVehicle.seating_capacity || 12}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, seating_capacity: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingVehicle.display_order || 1}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Image URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-input"
                    value={editingVehicle.image || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
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
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={editingVehicle.description || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                  placeholder="Comfortable pushback seats, dual AC, stereo sound..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Features (Comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingVehicle.features || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, features: e.target.value })}
                  placeholder="Pushback Recliners, Dual AC, LED TV, Charging Ports"
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <input
                  type="checkbox"
                  id="vehicle_is_active"
                  checked={Boolean(editingVehicle.is_active)}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, is_active: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="vehicle_is_active" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Active & Visible in Fleet
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
