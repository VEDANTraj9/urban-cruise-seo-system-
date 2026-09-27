const GalleryService = require('../services/gallery.service');

class GalleryController {
  static async getAll(req, res, next) {
    try {
      const items = await GalleryService.getAllGallery();
      return res.status(200).json({
        success: true,
        data: items
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const item = await GalleryService.getGalleryById(req.params.id);
      return res.status(200).json({
        success: true,
        data: item
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const item = await GalleryService.createGalleryItem(req.body);
      return res.status(201).json({
        success: true,
        message: 'Gallery image added successfully',
        data: item
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const item = await GalleryService.updateGalleryItem(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Gallery image updated successfully',
        data: item
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await GalleryService.deleteGalleryItem(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Gallery image deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GalleryController;
