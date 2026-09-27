"use client";

import { useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';

export default function ContactTab({ contact, setContact, showToast }) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await DashboardService.updateContact(contact);
      setContact(res.data);
      showToast('Contact details and Google Map saved!');
    } catch (err) {
      showToast(err.message || 'Error saving contact information', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>Contact Information & Interactive Map</h2>
          <p>Update phone numbers, email address, physical office location, and Google Maps embed.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="card">
          <h3>Communication Channels</h3>
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Primary Phone (Call / WhatsApp)</label>
            <input
              type="text"
              className="form-input"
              value={contact.phone_primary || ''}
              onChange={(e) => setContact({ ...contact, phone_primary: e.target.value })}
              placeholder="+91 93240 48224"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Secondary / Toll-Free Phone</label>
            <input
              type="text"
              className="form-input"
              value={contact.phone_secondary || ''}
              onChange={(e) => setContact({ ...contact, phone_secondary: e.target.value })}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Customer Support Email</label>
            <input
              type="email"
              className="form-input"
              value={contact.email || ''}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              placeholder="info@urbancruise.in"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Office / Dispatch Address</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={contact.office_address || ''}
              onChange={(e) => setContact({ ...contact, office_address: e.target.value })}
              placeholder="Delhi NCR, India"
              required
            />
          </div>
        </div>

        <div className="card">
          <h3>Google Map Embed</h3>
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Google Maps iframe HTML Code</label>
            <textarea
              className="form-textarea"
              rows={6}
              value={contact.google_map_embed || ''}
              onChange={(e) => setContact({ ...contact, google_map_embed: e.target.value })}
              placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
            />
            <span className="field-hint">Paste the full iframe embed code from Google Maps share options.</span>
          </div>

          {contact.google_map_embed && (
            <div style={{ marginTop: 16 }}>
              <span className="field-hint" style={{ fontWeight: 600 }}>Map Preview:</span>
              <div
                style={{ marginTop: 8, height: 200, borderRadius: 8, overflow: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: contact.google_map_embed }}
              />
            </div>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Saving...' : 'Save Contact Information 💾'}
          </button>
        </div>
      </form>
    </div>
  );
}
