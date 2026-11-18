"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service';
import BrandLogo from '@/components/common/BrandLogo';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, []);

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <Link href="/" className="brand-logo-link" aria-label="Royal Wheels Delhi">
          <BrandLogo variant="dark" size="md" />
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
          
        </div>
      </div>
    </header>
  );
}
