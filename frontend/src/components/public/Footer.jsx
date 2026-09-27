"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service';

export default function Footer({ contact }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, []);

  const phone = contact?.phone_primary || '+91 93240 48224';
  const phoneSecondary = contact?.phone_secondary || '+91 98765 43210';
  const email = contact?.email || 'info@urbancruise.in';
  const address = contact?.office_address || 'Plot No. 14, Commercial Transport Plaza, Connaught Place, New Delhi - 110001';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <footer className="site-footer">
      {/* 1. Trust Features Banner */}
      <div className="footer-trust-strip">
        <div className="container footer-trust-inner">
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <div>
              <strong>GPS & Sanitized</strong>
              <p>Cleaned & tracked before every ride</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">👨‍✈️</span>
            <div>
              <strong>Verified Chauffeurs</strong>
              <p>Polite, trained, & punctual</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⭐</span>
            <div>
              <strong>4.9 / 5 Rated</strong>
              <p>Top choice across Delhi NCR</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💬</span>
            <div>
              <strong>24x7 Customer Desk</strong>
              <p>Instant support on Call & WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Footer Grid */}
      <div className="container footer-main-grid">
        {/* Column 1: Brand Info & Mission */}
        <div className="footer-col footer-col-brand">
          <Link href="/" className="footer-logo-link" aria-label="Urban Cruise">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Urban Cruise" className="footer-logo-img" />
          </Link>
          <p className="footer-about-text">
            Delhi NCR’s premier luxury vehicle rental service. Providing high-end Force Urbania, Maharaja Tempo Travellers, and executive buses for weddings, corporate travel, and family outstation tours.
          </p>

          <div className="footer-social-links">
            <a
              href={`https://wa.me/${cleanPhone}?text=Hi%20Urban%20Cruise%2C%20I%20want%20to%20inquire%20about%20vehicle%20rental.`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-whatsapp"
              title="Chat on WhatsApp"
            >
              💬 WhatsApp Us
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="social-btn social-call"
              title="Call Us Directly"
            >
              📞 Call Now
            </a>
          </div>
        </div>

        {/* Column 2: Luxury Fleet */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Luxury Fleet</h4>
          <ul className="footer-links-list">
            <li><a href="#vehicles">Force Urbania (10-17 Seater)</a></li>
            <li><a href="#vehicles">9 Seater Maharaja Recliner</a></li>
            <li><a href="#vehicles">12 Seater Luxury Traveller</a></li>
            <li><a href="#vehicles">16 Seater Executive Coach</a></li>
            <li><a href="#vehicles">20 Seater Mini Tourist Bus</a></li>
            <li><a href="#vehicles">26 Seater AC Charter Bus</a></li>
          </ul>
        </div>

        {/* Column 3: Popular Trips & Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Services & Occasions</h4>
          <ul className="footer-links-list">
            <li><a href="#occasions">Wedding Guest Logistics</a></li>
            <li><a href="#occasions">Corporate Delegation Shuttles</a></li>
            <li><a href="#occasions">Delhi to Manali / Shimla Tour</a></li>
            <li><a href="#occasions">Agra & Jaipur Golden Triangle</a></li>
            <li><a href="#occasions">Delhi IGI T3 Airport Transfers</a></li>
            <li><a href="#occasions">Outstation Family Vacations</a></li>
          </ul>
        </div>

        {/* Column 4: Contact & Office */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-col-title">Contact & Dispatch</h4>
          <div className="footer-contact-items">
            <div className="f-contact-row">
              <span className="f-contact-icon">📍</span>
              <span>{address}</span>
            </div>
            <div className="f-contact-row">
              <span className="f-contact-icon">📞</span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            </div>
            {phoneSecondary && (
              <div className="f-contact-row">
                <span className="f-contact-icon">📱</span>
                <a href={`tel:${phoneSecondary.replace(/\s+/g, '')}`}>{phoneSecondary}</a>
              </div>
            )}
            <div className="f-contact-row">
              <span className="f-contact-icon">✉️</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="f-contact-row">
              <span className="f-contact-icon">⏰</span>
              <span>Open 24 Hours • 7 Days a Week</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Urban Cruise Delhi</strong>. All rights reserved. • Premium Transport Solutions
          </p>
          <div className="footer-bottom-links">
            <a href="#about">About Us</a>
            <a href="#testimonials">Reviews</a>
            <a href="#contact">Contact</a>
            {isLoggedIn ? (
              <Link href="/admin/dashboard" className="footer-admin-link">
                Dashboard ⚙️
              </Link>
            ) : (
              <Link href="/admin/login" className="footer-admin-link">
                Admin Portal 🔒
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
