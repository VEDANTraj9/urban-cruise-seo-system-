// API and Application Constants

const rawApiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_BASE = rawApiBase.replace(/\/+$/, '').endsWith('/api')
  ? rawApiBase.replace(/\/+$/, '')
  : `${rawApiBase.replace(/\/+$/, '')}/api`;

export function getImageUrl(src) {
  if (!src) return '/logo.png';
  let clean = String(src).trim();
  if (!clean) return '/logo.png';

  const liveBackend = (process.env.NEXT_PUBLIC_API_URL || 'https://urban-cruise-backend.onrender.com/api')
    .replace(/\/api\/?$/, '');

  // Upgrade http on render to https
  if (clean.startsWith('http://urban-cruise-backend.onrender.com')) {
    clean = clean.replace('http://', 'https://');
  }

  // Handle any localhost:5000 occurrences
  if (clean.includes('localhost:5000')) {
    return clean.replace(/https?:\/\/localhost:5000/, liveBackend);
  }

  // Handle relative uploads path
  if (clean.startsWith('/uploads/')) {
    return `${liveBackend}${clean}`;
  }
  if (clean.startsWith('uploads/')) {
    return `${liveBackend}/${clean}`;
  }

  return clean;
}

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

export function getMapIframeSrc(input) {
  if (!input || typeof input !== 'string') {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9961601053744!2d77.3325448!3d28.6461303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbdf6e5c3f2d%3A0x4ac4ecf5867fdb04!2sUrban%20Cruise%209%20to%2026%20Seater%20Tempo%20Traveller%20on%20Rent!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  }

  const str = input.trim();

  // 1. If user pasted raw iframe code, extract src
  const srcMatch = str.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }

  // 2. If it's already an embed URL
  if (str.includes('/maps/embed') || str.includes('output=embed')) {
    return str;
  }

  // 3. If it contains Urban Cruise place token or name
  if (
    str.includes('0x390cfbdf6e5c3f2d:0x4ac4ecf5867fdb04') ||
    str.toLowerCase().includes('urban+cruise') ||
    str.toLowerCase().includes('urban%20cruise')
  ) {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9961601053744!2d77.3325448!3d28.6461303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbdf6e5c3f2d%3A0x4ac4ecf5867fdb04!2sUrban%20Cruise%209%20to%2026%20Seater%20Tempo%20Traveller%20on%20Rent!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  }

  // 4. Coordinates in URL: @lat,lng
  const atMatch = str.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return `https://maps.google.com/maps?q=${atMatch[1]},${atMatch[2]}&hl=en&z=15&output=embed`;
  }

  // 5. Destination/place in URL
  const placeMatch = str.match(/\/maps\/(?:place|dir)\/([^/@?]+)/);
  if (placeMatch && placeMatch[1]) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')))}&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(str)}&output=embed`;
}

export const DEFAULT_CONTACT = {
  phone_primary: '+91-9876543210',
  phone_secondary: '+91-9123456780',
  email: 'booking@urbancruise.in',
  office_address: '3 – floor, Mahalaxmi Plaza, near Signature Global mall, Sector 3, Vaishali, Ghaziabad, Uttar Pradesh 201010',
  google_map_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9961601053744!2d77.3325448!3d28.6461303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbdf6e5c3f2d%3A0x4ac4ecf5867fdb04!2sUrban%20Cruise%209%20to%2026%20Seater%20Tempo%20Traveller%20on%20Rent!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
};
