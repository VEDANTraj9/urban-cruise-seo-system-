const PublicService = require('../services/public.service');

class PublicController {
  static async getHomepage(req, res, next) {
    try {
      const data = await PublicService.getHomepageContent();
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }

  static async getSeo(req, res, next) {
    try {
      const data = await PublicService.getSeoMetadata();
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
