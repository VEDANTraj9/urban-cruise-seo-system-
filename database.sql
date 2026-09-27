-- ==========================================================
-- Urban Cruise Delhi - Database Schema & Seed Data
-- Database: seo_homepage_db
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `seo_homepage_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `seo_homepage_db`;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Admin User (Email: admin@example.com, Password: admin123)
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`)
VALUES (1, 'System Administrator', 'admin@example.com', '$2b$10$2DPcEPMKlFfZhCS4.BIDUuDZhvAa4X9t7BCgiLfE0/7JDcJNesNO6', 'admin')
ON DUPLICATE KEY UPDATE `password_hash`='$2b$10$2DPcEPMKlFfZhCS4.BIDUuDZhvAa4X9t7BCgiLfE0/7JDcJNesNO6';

-- 2. SEO Settings Table
CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_identifier` VARCHAR(100) NOT NULL UNIQUE DEFAULT 'homepage',
  `meta_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT,
  `focus_keywords` TEXT,
  `canonical_url` VARCHAR(255),
  `robots_index` BOOLEAN DEFAULT TRUE,
  `robots_follow` BOOLEAN DEFAULT TRUE,
  `og_title` VARCHAR(255),
  `og_description` TEXT,
  `og_image` VARCHAR(500),
  `twitter_title` VARCHAR(255),
  `twitter_description` TEXT,
  `twitter_image` VARCHAR(500),
  `twitter_card_type` VARCHAR(50) DEFAULT 'summary_large_image',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `seo_settings` (`id`, `page_identifier`, `meta_title`, `meta_description`, `focus_keywords`, `canonical_url`, `robots_index`, `robots_follow`, `og_title`, `og_description`, `og_image`, `twitter_title`, `twitter_description`, `twitter_image`, `twitter_card_type`)
VALUES (1, 'homepage', 'Urban Cruise Delhi | Luxury Tempo Traveller & Bus Rentals', 'Book premium 9 to 20 seater Tempo Travellers, Force Urbania, and luxury buses in Delhi NCR with Urban Cruise. Pushback seats, dual AC, verified chauffeurs.', 'urban cruise delhi, luxury tempo traveller hire delhi, force urbania rental delhi, bus hire delhi ncr, wedding tempo traveller', 'https://urbancruise.in', 1, 1, 'Urban Cruise Delhi | Premium Group Travel Solutions', 'Luxury Tempo Travellers and Force Urbania rentals for weddings, corporate events, and outstation tours.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', 'Urban Cruise Delhi | Luxury Fleet Rentals', '9 to 20 Seater Tempo Travellers & Luxury Buses in Delhi NCR.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', 'summary_large_image')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 3. Schemas Table (JSON-LD)
CREATE TABLE IF NOT EXISTS `schemas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `schema_type` VARCHAR(100) NOT NULL UNIQUE,
  `schema_data` JSON NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `schemas` (`id`, `schema_type`, `schema_data`, `is_active`) VALUES
(1, 'Organization', '{"@context": "https://schema.org", "@type": "Organization", "name": "Urban Cruise Delhi", "url": "https://urbancruise.in", "logo": "https://urbancruise.in/logo.png", "contactPoint": {"@type": "ContactPoint", "telephone": "+91-9876543210", "contactType": "customer service", "areaServed": "IN", "availableLanguage": ["en", "hi"]}}', 1),
(2, 'LocalBusiness', '{"@context": "https://schema.org", "@type": "LocalBusiness", "name": "Urban Cruise Delhi", "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80", "telephone": "+91-9876543210", "email": "info@urbancruise.in", "priceRange": "$$", "address": {"@type": "PostalAddress", "streetAddress": "Connaught Place, Central Delhi", "addressLocality": "New Delhi", "addressRegion": "Delhi", "postalCode": "110001", "addressCountry": "IN"}}', 1),
(3, 'FAQ', '{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How to book a Tempo Traveller with Urban Cruise Delhi?", "acceptedAnswer": {"@type": "Answer", "text": "You can directly connect with us via WhatsApp or Call on +91-9876543210 for instant quotes and bookings."}}, {"@type": "Question", "name": "Are drivers verified and experienced for hills and outstation tours?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, all our chauffeurs are police-verified, highly experienced for highway and hill drives, and fully uniformed."}}]}', 1),
(4, 'Breadcrumb', '{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://urbancruise.in"}, {"@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://urbancruise.in/#vehicles"}]}', 1),
(5, 'Website', '{"@context": "https://schema.org", "@type": "WebSite", "name": "Urban Cruise Delhi", "url": "https://urbancruise.in"}', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 4. Hero Section Table
CREATE TABLE IF NOT EXISTS `hero_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `main_heading` VARCHAR(255) NOT NULL,
  `sub_heading` TEXT,
  `banner_image` VARCHAR(500),
  `cta_text` VARCHAR(100),
  `cta_url` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `hero_section` (`id`, `main_heading`, `sub_heading`, `banner_image`, `cta_text`, `cta_url`)
VALUES (1, 'Premium Luxury Tempo Traveller & Bus Rentals in Delhi NCR', 'Experience first-class group travel with luxury Maharaja seats, dual air-conditioning, onboard infotainment, and courteous chauffeurs for weddings, corporate, and outstation trips.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=85', 'Explore Luxury Fleet', '#vehicles')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 5. About Section Table
CREATE TABLE IF NOT EXISTS `about_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `section_title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `featured_image` VARCHAR(500),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `about_section` (`id`, `section_title`, `description`, `featured_image`)
VALUES (1, 'Redefining Group Luxury Travel in Capital', 'Urban Cruise Delhi is Delhi NCR\'s premier chauffeur-driven luxury fleet service. We specialize in 9 to 26 seater luxury tempo travellers, Force Urbania vans, and 45-seater luxury coaches. With over 10+ years of serving high-profile corporate delegates, luxury destination weddings, and VIP family trips, we guarantee punctuality, impeccably sanitized vehicles, transparent pricing, and 24x7 roadside assistance across North India.', 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 6. Vehicles Table
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `image` VARCHAR(500),
  `seating_capacity` INT NOT NULL,
  `description` TEXT,
  `features` JSON,
  `display_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `vehicles` (`id`, `name`, `image`, `seating_capacity`, `description`, `features`, `display_order`, `is_active`) VALUES
(1, 'Force Urbania Luxury Van', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 10, 'Next-generation luxury van with European styling, panoramic windows, reclining leather seats, individual AC vents, and ambient mood lighting.', '["Maharaja Reclining Seats", "Individual AC Vents", "Panoramic Sun Windows", "USB Fast Chargers", "LED Mood Lighting", "Air Suspension"]', 1, 1),
(2, '9 Seater Luxury Tempo Traveller', 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=800&q=80', 9, 'Ultra-plush 1x1 configuration Maharaja seating with extra legroom, ideal for small family trips, VIP delegates, and Agra-Jaipur golden triangle tours.', '["1x1 Maharaja Seats", "Chilled Dual AC", "LED TV & Audio System", "Mobile Charging Ports", "Huge Luggage Boot"]', 2, 1),
(3, '12 Seater Tempo Traveller', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 12, 'Spacious 2x1 seating with pushback comfort, overhead reading lights, high headroom, and pristine interiors for family vacations and outstation journeys.', '["2x1 Pushback Seats", "Dual Air Conditioning", "Ample Legroom", "Music & PA System", "Verified Chauffeur"]', 3, 1),
(4, '16 Seater Tempo Traveller', 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80', 16, 'The perfect medium-sized fleet choice for corporate retreats, wedding guests, and sightseeing across Delhi NCR, Manali, and Shimla.', '["Pushback Seats", "Powerful AC", "Surround Sound Audio", "Curtains & Clean Linens", "First Aid Kit"]', 4, 1),
(5, '20 Seater Tempo Traveller', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 20, 'Heavy-duty luxury traveler for large groups, sporting teams, and pilgrim tours with heavy luggage capacity and smooth highway cruising.', '["High Back Comfort Seats", "Dual Blower AC", "Smart TV & Mic", "Large Luggage Space", "GPS Tracking"]', 5, 1),
(6, 'Luxury Volvo Coach Bus', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 45, 'Premium 45-seater multi-axle luxury coach with air suspension, semi-sleeper seats, onboard washroom, and entertainment screens for grand corporate events and destination weddings.', '["Semi-Sleeper Seats", "Air Suspension", "Central AC & Heating", "PA Sound System", "Emergency Exits", "WiFi Onboard"]', 6, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 7. Occasions Table
CREATE TABLE IF NOT EXISTS `occasions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(500),
  `display_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `occasions` (`id`, `title`, `description`, `image`, `display_order`, `is_active`) VALUES
(1, 'Wedding Transportation', 'Grand arrival for baraatis and guests in decorated luxury tempo travellers and Volvo coaches across Delhi NCR and destination resorts.', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', 1, 1),
(2, 'Corporate Events & Summits', 'Punctual, dignified employee and VIP delegate shuttle services for conventions, conferences, and offsite team building retreats.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', 2, 1),
(3, 'Family Tours & Holidays', 'Comfortable long-distance rides to Himachal, Uttarakhand, and Rajasthan with child-friendly seating and experienced hill drivers.', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', 3, 1),
(4, 'Airport & Railway Transfers', 'Round-the-clock scheduled pickup and drop-offs to IGI Airport Terminal 3 and New Delhi Railway Station with flight tracking.', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80', 4, 1),
(5, 'Outstation & Pilgrimage Trips', 'Safe, worry-free group pilgrimages to Char Dham, Vaishno Devi, Vrindavan, and Golden Triangle with 24x7 route monitoring.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', 5, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 8. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(150) NOT NULL,
  `review` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `customer_image` VARCHAR(500),
  `display_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `testimonials` (`id`, `customer_name`, `review`, `rating`, `customer_image`, `display_order`, `is_active`) VALUES
(1, 'Vikram Singhania', 'Booked the Force Urbania for our corporate summit at Aerocity. The vehicle was spotlessly clean, chilled AC, and chauffeur Rajesh was exceptionally polite and punctual. Top notch service!', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 1, 1),
(2, 'Dr. Sunita Aggarwal', 'Hired a 16 seater luxury tempo traveller for our destination wedding in Neemrana. All guests praised the comfortable pushback seats and smooth driving through highway traffic. Highly recommended!', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 2, 1),
(3, 'Rohit Malhotra', 'Our family trip to Shimla and Manali in Urban Cruise\'s 12 seater was unforgettable. The driver was very skilled on mountain hairpins and knew all the best rest stops. Outstanding experience!', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 3, 1),
(4, 'Pooja Verma', 'Very transparent billing with no hidden toll or driver allowance surprises. The WhatsApp team coordinated everything within 10 minutes. Will definitely book again for office outings.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', 4, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 9. Gallery Table
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_tag` VARCHAR(255) NOT NULL,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `gallery` (`id`, `image_url`, `alt_tag`, `display_order`) VALUES
(1, 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 'Force Urbania luxury van exterior in Delhi', 1),
(2, 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=800&q=80', 'Luxury Maharaja plush leather seating interior', 2),
(3, 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80', 'Luxury 16 seater tempo traveller Delhi airport pickup', 3),
(4, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', 'Decorated wedding luxury bus fleet outside resort', 4)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 10. Contact Info Table
CREATE TABLE IF NOT EXISTS `contact_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `phone_primary` VARCHAR(50) NOT NULL,
  `phone_secondary` VARCHAR(50),
  `email` VARCHAR(100) NOT NULL,
  `office_address` TEXT NOT NULL,
  `google_map_embed` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `contact_info` (`id`, `phone_primary`, `phone_secondary`, `email`, `office_address`, `google_map_embed`)
VALUES (1, '+91-9876543210', '+91-9123456780', 'booking@urbancruise.in', 'Building 42, Barakhamba Road, Connaught Place, New Delhi - 110001', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887391942!2d77.2159562!3d28.6289018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b045055b%3A0x6b40283ffbf49842!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin')
ON DUPLICATE KEY UPDATE `id`=`id`;
