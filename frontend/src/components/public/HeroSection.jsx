"use client";

import { getImageUrl, DEFAULT_HERO } from '@/utils/constants';

export default function HeroSection({ hero }) {
  const safeHero = hero || DEFAULT_HERO;

  return (
    <>
      <section className="hero-section">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(safeHero?.banner_image || DEFAULT_HERO.banner_image)}
          alt={safeHero?.main_heading || DEFAULT_HERO.main_heading}
          className="hero-bg"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        <div className="hero-overlay-gradient" />

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>👑</span>
              <span>Royal Wheels Delhi • Premium Fleet</span>
            </div>
            <h1 className="hero-title">{safeHero?.main_heading || DEFAULT_HERO.main_heading}</h1>
            <p className="hero-subtitle">{safeHero?.sub_heading || DEFAULT_HERO.sub_heading}</p>
            <div className="hero-actions">
              <a href={safeHero?.cta_url || '#vehicles'} className="btn-hero-primary">
                <span>{safeHero?.cta_text || 'Explore Luxury Fleet'}</span>
                <span>→</span>
              </a>
              <a href="#contact" className="btn-hero-secondary">
                Contact & Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Trust Highlights Banner */}
      <div className="hero-metrics-bar">
        <div className="container hero-metrics-grid">
          <div className="metric-item">
            <div className="metric-icon-wrap">🛡️</div>
            <div className="metric-data">
              <h4>100% Verified Fleet</h4>
              <p>GPS tracked & sanitized</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon-wrap">👨‍✈️</div>
            <div className="metric-data">
              <h4>Expert Chauffeurs</h4>
              <p>Uniformed, polite & tested</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon-wrap">⭐</div>
            <div className="metric-data">
              <h4>4.9 / 5.0 Rating</h4>
              <p>Over 5,000+ luxury tours</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon-wrap">⚡</div>
            <div className="metric-data">
              <h4>Instant Booking</h4>
              <p>24x7 WhatsApp & Call desk</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
