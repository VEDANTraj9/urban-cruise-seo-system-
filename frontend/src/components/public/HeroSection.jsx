"use client";

import { getImageUrl, DEFAULT_HERO } from '@/utils/constants';

export default function HeroSection({ hero }) {
  const safeHero = hero || DEFAULT_HERO;

  return (
    <section className="hero-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getImageUrl(safeHero?.banner_image || DEFAULT_HERO.banner_image)}
        alt={safeHero?.main_heading || DEFAULT_HERO.main_heading}
        className="hero-bg"
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80'; }}
      />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Urban Cruise Fleet</div>
          <h1 className="hero-title">{safeHero?.main_heading || DEFAULT_HERO.main_heading}</h1>
          <p className="hero-subtitle">{safeHero?.sub_heading || DEFAULT_HERO.sub_heading}</p>
          <div className="hero-actions">
            <a href={safeHero?.cta_url || '#vehicles'} className="btn-hero-primary">
              {safeHero?.cta_text || 'Explore Fleet'}
            </a>
            <a href="#contact" className="btn-hero-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
