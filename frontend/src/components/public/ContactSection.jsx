"use client";

import { DEFAULT_CONTACT } from '@/utils/constants';

function getMapIframeSrc(embed) {
  if (!embed || typeof embed !== 'string') {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887391942!2d77.2159562!3d28.6289018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b045055b%3A0x6b40283ffbf49842!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  }
  const trimmed = embed.trim();
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  return trimmed;
}

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
