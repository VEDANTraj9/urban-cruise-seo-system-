const HomepageService = require('../services/homepage.service');

class HomepageController {
  static async getHero(req, res, next) {
    try {
      const hero = await HomepageService.getHero();
      return res.status(200).json({
        success: true,
        data: hero
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateHero(req, res, next) {
    try {
      const updated = await HomepageService.updateHero(req.body);
      return res.status(200).json({
        success: true,
        message: 'Hero section updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAbout(req, res, next) {
    try {
      const about = await HomepageService.getAbout();
      return res.status(200).json({
        success: true,
        data: about
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateAbout(req, res, next) {
    try {
      const updated = await HomepageService.updateAbout(req.body);
      return res.status(200).json({
        success: true,
        message: 'About Us section updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HomepageController;
