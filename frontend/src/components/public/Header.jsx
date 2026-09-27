"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, []);

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <Link href="/" className="brand-logo-link" aria-label="Urban Cruise">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Urban Cruise"
            className="brand-logo-img"
          />
        </Link>

        <nav className="nav-menu" aria-label="Main Navigation">
          <Link href="#vehicles" className="nav-link">Vehicles</Link>
          <Link href="#occasions" className="nav-link">Occasions</Link>
          <Link href="#about" className="nav-link">About Us</Link>
          <Link href="#testimonials" className="nav-link">Reviews</Link>
          <Link href="#gallery" className="nav-link">Gallery</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
        </nav>

        <div className="nav-actions">
          {isLoggedIn ? (
            <Link href="/admin/dashboard" className="btn-nav btn-nav-dashboard" title="Open Admin Dashboard">
              Dashboard ⚙️
            </Link>
          ) : (
            <Link href="/admin/login" className="btn-nav">
              Admin Login 🔒
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
