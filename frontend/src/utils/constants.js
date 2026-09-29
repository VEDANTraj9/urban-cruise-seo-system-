// API and Application Constants

const rawApiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_BASE = rawApiBase.replace(/\/+$/, '').endsWith('/api')
  ? rawApiBase.replace(/\/+$/, '')
  : `${rawApiBase.replace(/\/+$/, '')}/api`;

export const SITE_NAME = 'Urban Cruise';
export const SITE_TAGLINE = 'Luxury Fleet & Travel Rentals';

export const DEFAULT_SEO = {
  meta_title: 'Urban Cruise | Luxury Fleet & Bus Rentals in Delhi NCR',
  meta_description: 'Book luxury Tempo Travellers, Force Urbania, and executive charter buses with Urban Cruise Delhi for weddings, corporate events, and outstation trips.',
  focus_keywords: 'urban cruise, tempo traveller hire, force urbania rental, luxury bus delhi',
  canonical_url: 'http://localhost:3000',
  robots_index: true,
  robots_follow: true,
  og_title: 'Urban Cruise | Premium Group Travel Solutions',
  og_description: 'Luxury Tempo Travellers and Buses with verified chauffeurs and premium pushback comfort.',
  og_image: '/logo.png',
  twitter_card_type: 'summary_large_image'
};

export const DEFAULT_HERO = {
  main_heading: 'Welcome to Urban Cruise Delhi',
  sub_heading: 'Hire 9 to 20-seater luxury Tempo Travellers, Force Urbania, and executive charter buses for weddings, corporate events, and outstation trips.',
  banner_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
  cta_text: 'Explore Fleet',
  cta_url: '#vehicles'
};

export const DEFAULT_ABOUT = {
  section_title: 'Dedicated to Delivering Excellence on Every Mile',
  description: 'With over a decade of excellence in luxury passenger transportation, Urban Cruise provides sanitized, ultra-comfortable Tempo Travellers, Force Urbania, and executive buses with verified chauffeurs.',
  featured_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80'
};

export const DEFAULT_CONTACT = {
  phone_primary: '+91 93240 48224',
  phone_secondary: '+91 98765 43210',
  email: 'info@urbancruise.in',
  office_address: 'Delhi NCR, India',
  google_map_embed: ''
};
