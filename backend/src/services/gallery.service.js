const GalleryModel = require('../models/gallery.model');

class GalleryService {
  static async getAllGallery() {
    return await GalleryModel.getAll();
  }

  static async getGalleryById(id) {
    const item = await GalleryModel.getById(id);
    if (!item) {
      const err = new Error('Gallery item not found');
      err.status = 404;
      throw err;
    }
    return item;
  }

  static async createGalleryItem(data) {
    return await GalleryModel.create(data);
  }

  static async updateGalleryItem(id, data) {
    await this.getGalleryById(id); // Ensure exists
    return await GalleryModel.update(id, data);
  }

  static async deleteGalleryItem(id) {
    await this.getGalleryById(id); // Ensure exists
    return await GalleryModel.delete(id);
  }
}

module.exports = GalleryService;
