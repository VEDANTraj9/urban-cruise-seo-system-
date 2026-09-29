"use client";

import { getImageUrl } from '@/utils/constants';

export default function VehiclesSection({ vehicles }) {
  return (
    <section id="vehicles" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Fleet</span>
          <h2 className="section-title">Luxury Vehicles for Group Travel</h2>
          <p className="section-desc">
            Choose from 9 to 20 seater Tempo Travellers, Force Urbania, and full-size luxury buses.
          </p>
        </div>

        <div className="vehicles-grid">
          {(!vehicles || vehicles.length === 0) ? (
            <p className="empty-section-hint">
              Fleet listings will appear here once added from the Admin Dashboard.
            </p>
          ) : (
            vehicles.map((v) => (
              <div key={v.id} className="vehicle-card">
                <div className="vehicle-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(v.image)}
                    alt={v.name}
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                  />
                  <span className="vehicle-capacity-tag">{v.seating_capacity} Seater</span>
                </div>
                <div className="vehicle-card-body">
                  <div>
                    <h3 className="vehicle-name">{v.name}</h3>
                    <p className="vehicle-description">{v.description}</p>
                    <div className="features-list">
                      {(Array.isArray(v.features)
                        ? v.features
                        : (typeof v.features === 'string'
                            ? v.features.split(',').map(s => s.trim()).filter(Boolean)
                            : [])
                      ).map((f, i) => (
                        <span key={i} className="feature-pill">✓ {f}</span>
                      ))}
                    </div>
                  </div>
                  <a href="#contact" className="btn-book-vehicle">
                    Inquire Booking
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
