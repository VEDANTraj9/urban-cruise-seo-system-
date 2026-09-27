export default function ContactSection({ contact }) {
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
              <span className="contact-value">{contact.phone_primary}</span>
              {contact.phone_secondary && (
                <span className="contact-value">{contact.phone_secondary}</span>
              )}
            </div>

            <div className="contact-item">
              <span className="contact-label">Email Address</span>
              <span className="contact-value">{contact.email}</span>
            </div>

            <div className="contact-item">
              <span className="contact-label">Office Address</span>
              <span className="contact-value">{contact.office_address}</span>
            </div>
          </div>

          <div className="map-card">
            {contact.google_map_embed ? (
              <div
                style={{ width: '100%', height: '100%', minHeight: 320 }}
                dangerouslySetInnerHTML={{ __html: contact.google_map_embed }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 260, color: '#94a3b8' }}>
                Google Map Location
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
