"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { DashboardService } from '@/services/dashboard.service';

export function useDashboardData(showToast) {
  const [loading, setLoading] = useState(true);
  const showToastRef = useRef(showToast);

  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  // States
  const [seo, setSeo] = useState({
    meta_title: '',
    meta_description: '',
    focus_keywords: '',
    canonical_url: '',
    robots_index: true,
    robots_follow: true,
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    twitter_card_type: 'summary_large_image'
  });

  const [schemas, setSchemas] = useState([]);
  const [hero, setHero] = useState({
    main_heading: '',
    sub_heading: '',
    banner_image: '',
    cta_text: '',
    cta_url: ''
  });

  const [about, setAbout] = useState({
    section_title: '',
    description: '',
    featured_image: ''
  });

  const [vehicles, setVehicles] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contact, setContact] = useState({
    phone_primary: '',
    phone_secondary: '',
    email: '',
    office_address: '',
    google_map_embed: ''
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DashboardService.fetchAll();
      if (data.seo) setSeo(data.seo);
      if (data.schemas) setSchemas(data.schemas);
      if (data.hero) setHero(data.hero);
      if (data.about) setAbout(data.about);
      if (data.vehicles) setVehicles(data.vehicles);
      if (data.occasions) setOccasions(data.occasions);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.gallery) setGallery(data.gallery);
      if (data.contact) setContact(data.contact);
    } catch (err) {
      if (showToastRef.current) {
        showToastRef.current(err.message || 'Error loading dashboard data', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    loading,
    refreshData: loadData,
    seo, setSeo,
    schemas, setSchemas,
    hero, setHero,
    about, setAbout,
    vehicles, setVehicles,
    occasions, setOccasions,
    testimonials, setTestimonials,
    gallery, setGallery,
    contact, setContact
  };
}
