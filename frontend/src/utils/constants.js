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
  google_map_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887391942!2d77.2159562!3d28.6289018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b045055b%3A0x6b40283ffbf49842!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
};
