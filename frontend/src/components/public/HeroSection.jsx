import { getImageUrl } from '@/utils/constants';

export default function HeroSection({ hero }) {
  return (
    <section className="hero-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getImageUrl(hero.banner_image)}
        alt={hero.main_heading}
        className="hero-bg"
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80'; }}
      />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Urban Cruise Fleet</div>
          <h1 className="hero-title">{hero.main_heading}</h1>
          <p className="hero-subtitle">{hero.sub_heading}</p>
          <div className="hero-actions">
            <a href={hero.cta_url || '#vehicles'} className="btn-hero-primary">
              {hero.cta_text || 'Explore Fleet'}
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
