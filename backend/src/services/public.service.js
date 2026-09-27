const SeoService = require('./seo.service');
const SchemaService = require('./schema.service');
const HomepageService = require('./homepage.service');
const VehicleService = require('./vehicle.service');
const OccasionService = require('./occasion.service');
const TestimonialService = require('./testimonial.service');
const GalleryService = require('./gallery.service');
const ContactService = require('./contact.service');

class PublicService {
  /**
   * Fetches all SEO metadata and generated JSON-LD structured schemas
   * for dynamic injection into Next.js head.
   */
  static async getSeoMetadata() {
    const seo = await SeoService.getSeoSettings('homepage');
    const jsonLdSchemas = await SchemaService.generateJsonLdMarkup();

    return {
      seo,
      jsonLdSchemas
    };
  }

  /**
   * Fetches all dynamic content sections for the public homepage.
   */
  static async getHomepageContent() {
    const [hero, about, vehicles, occasions, testimonials, gallery, contact] = await Promise.all([
      HomepageService.getHero(),
      HomepageService.getAbout(),
      VehicleService.getActiveVehicles(),
      OccasionService.getActiveOccasions(),
      TestimonialService.getActiveTestimonials(),
      GalleryService.getAllGallery(),
      ContactService.getContactInfo()
    ]);

    return {
      hero,
      about,
      vehicles,
      occasions,
      testimonials,
      gallery,
      contact
    };
  }
}

module.exports = PublicService;
