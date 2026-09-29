"use client";

import { DEFAULT_CONTACT, getMapIframeSrc } from '@/utils/constants';

export default function ContactSection({ contact }) {
  const safeContact = contact || DEFAULT_CONTACT;

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contact Us</span>
          <h2 className="section-title">Get In Touch & Location</h2>
          <p className="section-desc">
            Call or visit our operations dispatch center to book your trip.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-label">Phone Numbers</span>
              <span className="contact-value">{safeContact.phone_primary || DEFAULT_CONTACT.phone_primary}</span>
              {safeContact.phone_secondary && (
                <span className="contact-value">{safeContact.phone_secondary}</span>
              )}
            </div>

            <div className="contact-item">
              <span className="contact-label">Email Address</span>
              <span className="contact-value">{safeContact.email || DEFAULT_CONTACT.email}</span>
            </div>

            <div className="contact-item">
              <span className="contact-label">Office Address</span>
              <span className="contact-value">{safeContact.office_address || DEFAULT_CONTACT.office_address}</span>
            </div>
          </div>

        <div className="map-card">
          <iframe
            src={getMapIframeSrc(contact?.google_map_embed)}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 360, width: '100%', borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Urban Cruise Delhi Map Location"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
