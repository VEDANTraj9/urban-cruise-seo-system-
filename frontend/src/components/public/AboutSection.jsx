"use client";

import { getImageUrl, DEFAULT_ABOUT } from '@/utils/constants';

export default function AboutSection({ about }) {
  const safeAbout = about || DEFAULT_ABOUT;

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(safeAbout?.featured_image || DEFAULT_ABOUT.featured_image)}
              alt={safeAbout?.section_title || DEFAULT_ABOUT.section_title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="about-content">
            <span className="section-tag">About Royal Wheels Delhi</span>
            <h2 className="about-title">{safeAbout?.section_title || DEFAULT_ABOUT.section_title}</h2>
            <p className="about-desc">{safeAbout?.description || DEFAULT_ABOUT.description}</p>

            <div className="about-features-list">
              <div className="about-feature-item">
                <span className="about-feature-icon">✓</span>
                <span>Pushback Reclining Seats</span>
              </div>
              <div className="about-feature-item">
                <span className="about-feature-icon">✓</span>
                <span>Individual AC Vents & Wi-Fi</span>
              </div>
              <div className="about-feature-item">
                <span className="about-feature-icon">✓</span>
                <span>Police-Verified Chauffeurs</span>
              </div>
              <div className="about-feature-item">
                <span className="about-feature-icon">✓</span>
                <span>Transparent All-Inclusive Pricing</span>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <a href="#contact" className="btn-nav">
                <span>Book Your Royal Ride</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
