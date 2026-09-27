"use client";

import { useRef, useEffect, useState } from 'react';

export default function TestimonialsSection({ testimonials }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Duplicate cards for smooth long scroll if 3 or more
  const items = testimonials.length >= 3 ? [...testimonials, ...testimonials] : testimonials;

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="testimonials-header-row">
          <div>
            <span className="section-tag">⭐ Client Reviews</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-desc">
              Real reviews from families, wedding planners, and corporate groups.
            </p>
          </div>

          <div className="testimonials-nav-btns">
            <button
              type="button"
              className="testimonial-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Previous Review"
              title="Previous Review"
            >
              ❮
            </button>
            <button
              type="button"
              className="testimonial-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Next Review"
              title="Next Review"
            >
              ❯
            </button>
          </div>
        </div>

        <div
          className="testimonials-carousel"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {items.map((t, idx) => (
            <div key={`${t.id || idx}-${idx}`} className="testimonial-card">
              <div className="testimonial-card-top">
                <div className="star-rating">
                  {'★'.repeat(t.rating || 5)}
                  <span className="rating-badge">{(t.rating || 5)}.0</span>
                </div>
                <div className="quote-mark">“</div>
              </div>
              <p className="review-text">“{t.review}”</p>
              <div className="reviewer-info">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.customer_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                  alt={t.customer_name}
                  className="reviewer-avatar"
                />
                <div>
                  <div className="reviewer-name">{t.customer_name}</div>
                  <div className="reviewer-status">✓ Verified Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
