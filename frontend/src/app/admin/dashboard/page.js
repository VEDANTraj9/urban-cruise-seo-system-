"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useDashboardData } from '@/hooks/useDashboardData';
import Sidebar from '@/components/admin/Sidebar';
import Toast from '@/components/admin/Toast';
import OverviewTab from '@/components/admin/tabs/OverviewTab';
import SeoTab from '@/components/admin/tabs/SeoTab';
import SchemasTab from '@/components/admin/tabs/SchemasTab';
import HomepageTab from '@/components/admin/tabs/HomepageTab';
import VehiclesTab from '@/components/admin/tabs/VehiclesTab';
import OccasionsTab from '@/components/admin/tabs/OccasionsTab';
import TestimonialsTab from '@/components/admin/tabs/TestimonialsTab';
import GalleryTab from '@/components/admin/tabs/GalleryTab';
import ContactTab from '@/components/admin/tabs/ContactTab';
import '@/styles/dashboard.css';

const TAB_TITLES = {
  overview: 'Overview & Statistics',
  seo: 'SEO & Meta Tags',
  schemas: 'Structured Schema Markup',
  homepage: 'Hero & About Section',
  vehicles: 'Fleet Management',
  occasions: 'Occasions & Services',
  testimonials: 'Client Testimonials',
  gallery: 'Photo Gallery & SEO Alt Tags',
  contact: 'Contact Info & Google Maps'
};

export default function AdminDashboardPage() {
  const { currentUser, checking, logout } = useAuth({ requireAuth: true });
  const { toast, showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const {
    loading,
    seo, setSeo,
    schemas, setSchemas,
    hero, setHero,
    about, setAbout,
    vehicles, setVehicles,
    occasions, setOccasions,
    testimonials, setTestimonials,
    gallery, setGallery,
    contact, setContact
  } = useDashboardData(showToast);

  const handleToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setSidebarOpen(prev => !prev);
    } else {
      setDesktopCollapsed(prev => !prev);
    }
  };

  if (checking || loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
        <p>Loading Urban Cruise Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`dashboard-layout ${desktopCollapsed ? 'desktop-collapsed' : ''} ${sidebarOpen ? 'mobile-open' : ''}`}>
      <Toast toast={toast} />

      {/* Backdrop for Mobile Hamburger Drawer */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        currentUser={currentUser}
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
          setDesktopCollapsed(true);
        }}
      />

      <div className="dashboard-content-area">
        {/* Modern Topbar with Animated Hamburger Menu */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className={`hamburger-btn ${sidebarOpen || desktopCollapsed ? 'open' : ''}`}
              onClick={handleToggle}
              aria-label="Toggle Navigation Menu"
              title="Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
            <div className="topbar-title-wrap">
              <h1 className="topbar-title">{TAB_TITLES[activeTab] || 'Dashboard'}</h1>
              <span className="topbar-subtitle">Urban Cruise Admin Panel</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-admin-badge">
              <span className="online-indicator" />
              <span>{currentUser?.name || 'Administrator'}</span>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <OverviewTab
              vehicles={vehicles}
              occasions={occasions}
              testimonials={testimonials}
              gallery={gallery}
              schemas={schemas}
              seo={seo}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'seo' && (
            <SeoTab seo={seo} setSeo={setSeo} showToast={showToast} />
          )}

          {activeTab === 'schemas' && (
            <SchemasTab schemas={schemas} setSchemas={setSchemas} showToast={showToast} />
          )}

          {activeTab === 'homepage' && (
            <HomepageTab hero={hero} setHero={setHero} about={about} setAbout={setAbout} showToast={showToast} />
          )}

          {activeTab === 'vehicles' && (
            <VehiclesTab vehicles={vehicles} setVehicles={setVehicles} showToast={showToast} />
          )}

          {activeTab === 'occasions' && (
            <OccasionsTab occasions={occasions} setOccasions={setOccasions} showToast={showToast} />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} showToast={showToast} />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab gallery={gallery} setGallery={setGallery} showToast={showToast} />
          )}

          {activeTab === 'contact' && (
            <ContactTab contact={contact} setContact={setContact} showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}
