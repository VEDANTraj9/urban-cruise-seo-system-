const HeroModel = require('../models/hero.model');
const AboutModel = require('../models/about.model');

class HomepageService {
  static async getHero() {
    return await HeroModel.get();
  }

  static async updateHero(data) {
    return await HeroModel.update(data);
  }

  static async getAbout() {
    return await AboutModel.get();
  }

  static async updateAbout(data) {
    return await AboutModel.update(data);
  }
}

module.exports = HomepageService;
