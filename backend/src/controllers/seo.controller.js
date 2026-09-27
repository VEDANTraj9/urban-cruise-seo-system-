const SeoService = require('../services/seo.service');

class SeoController {
  static async getSeo(req, res, next) {
    try {
      const page = req.query.page || 'homepage';
      const settings = await SeoService.getSeoSettings(page);
      return res.status(200).json({
        success: true,
        data: settings
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateSeo(req, res, next) {
    try {
      const page = req.query.page || 'homepage';
      const updated = await SeoService.updateSeoSettings(page, req.body);
      return res.status(200).json({
        success: true,
        message: 'SEO settings updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SeoController;
