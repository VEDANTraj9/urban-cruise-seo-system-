"use client";

import { DEFAULT_CONTACT, getMapIframeSrc } from '@/utils/constants';

export default function ContactSection({ contact }) {
  const safeContact = contact || DEFAULT_CONTACT;

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Direct Inquiries</span>
          <h2 className="section-title">Get In Touch & Location</h2>
          <p className="section-desc">
            Call or visit our 24/7 fleet dispatch center to plan and book your luxury trip.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-label">📞 24x7 Helpline & Bookings</span>
              <span className="contact-value">{safeContact.phone_primary || DEFAULT_CONTACT.phone_primary}</span>
              {safeContact.phone_secondary && (
                <span className="contact-value">{safeContact.phone_secondary}</span>
              )}
            </div>

            <div className="contact-item">
              <span className="contact-label">✉️ Email Inquiries</span>
              <span className="contact-value">{safeContact.email || DEFAULT_CONTACT.email}</span>
            </div>

            <div className="contact-item">
              <span className="contact-label">📍 Headquarters & Fleet Depot</span>
              <span className="contact-value">{safeContact.office_address || DEFAULT_CONTACT.office_address}</span>
            </div>
          </div>

          <div className="map-card">
            <iframe
              src={getMapIframeSrc(contact?.google_map_embed)}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, width: '100%', borderRadius: 10 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Wheels Delhi Map Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
