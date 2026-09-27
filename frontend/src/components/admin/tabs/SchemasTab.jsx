"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';

const SCHEMA_TYPES = ['Organization', 'FAQ', 'Breadcrumb', 'Website', 'LocalBusiness'];

export default function SchemasTab({ schemas, setSchemas, showToast }) {
  const [selectedType, setSelectedType] = useState('Organization');
  const [saving, setSaving] = useState(false);

  const activeSchema = schemas.find(s => s.schema_type === selectedType) || {
    schema_type: selectedType,
    schema_data: {},
    is_active: true
  };

  const [jsonData, setJsonData] = useState('');
  const [editingRaw, setEditingRaw] = useState(false);

  const handleToggle = async (schemaType, currentStatus) => {
    try {
      const res = await DashboardService.toggleSchema(schemaType, !currentStatus);
      setSchemas(prev => prev.map(s => s.schema_type === schemaType ? res.data : s));
      showToast(`${schemaType} schema is now ${!currentStatus ? 'Active' : 'Disabled'}`);
    } catch (err) {
      showToast(err.message || 'Failed to toggle status', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let dataToSave = activeSchema.schema_data;
      if (editingRaw && jsonData) {
        dataToSave = JSON.parse(jsonData);
      }
      const res = await DashboardService.saveSchema(selectedType, dataToSave, activeSchema.is_active);
      setSchemas(prev => {
        const idx = prev.findIndex(s => s.schema_type === selectedType);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = res.data;
          return updated;
        }
        return [...prev, res.data];
      });
      showToast(`${selectedType} schema saved successfully!`);
      setEditingRaw(false);
    } catch (err) {
      showToast(err.message || 'Error saving schema data', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>JSON-LD Structured Data Schemas</h2>
          <p>Configure rich snippets for Google search results (Organization, FAQ, LocalBusiness, Breadcrumbs).</p>
        </div>
      </div>

      <div className="schema-selector-tabs">
        {SCHEMA_TYPES.map((type) => {
          const registered = schemas.find(s => s.schema_type === type);
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                setSelectedType(type);
                setEditingRaw(false);
              }}
              className={`schema-btn ${selectedType === type ? 'active' : ''}`}
            >
              {type} {registered?.is_active && <span className="status-dot-active" />}
            </button>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>{selectedType} Schema</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={Boolean(activeSchema.is_active)}
                onChange={() => handleToggle(selectedType, activeSchema.is_active)}
              />
              <span className="toggle-slider" />
            </label>
            <span style={{ fontSize: 13, fontWeight: 600, color: activeSchema.is_active ? '#16a34a' : '#94a3b8' }}>
              {activeSchema.is_active ? 'Active' : 'Disabled'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Schema JSON Data</label>
            <textarea
              className="form-textarea"
              rows={12}
              style={{ fontFamily: 'monospace', fontSize: 13 }}
              value={editingRaw ? jsonData : JSON.stringify(activeSchema.schema_data || {}, null, 2)}
              onChange={(e) => {
                setEditingRaw(true);
                setJsonData(e.target.value);
              }}
              placeholder={`{\n  "name": "Urban Cruise",\n  "url": "https://urbancruise.in"\n}`}
              required
            />
          </div>

          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Saving...' : `Save ${selectedType} Schema 💾`}
          </button>
        </form>
      </div>
    </div>
  );
}
