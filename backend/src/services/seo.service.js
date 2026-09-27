const SeoModel = require('../models/seo.model');

class SeoService {
  static async getSeoSettings(pageIdentifier = 'homepage') {
    const settings = await SeoModel.getByPageIdentifier(pageIdentifier);
    if (!settings) {
      // return default fallback structure
      return {
        page_identifier: pageIdentifier,
        meta_title: 'Luxury Tempo Traveller & Bus Rentals',
        meta_description: 'Book premium vehicles for group travel.',
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
      };
    }
    return settings;
  }

  static async updateSeoSettings(pageIdentifier = 'homepage', data) {
    return await SeoModel.update(pageIdentifier, data);
  }
}

module.exports = SeoService;
