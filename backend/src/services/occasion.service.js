const OccasionModel = require('../models/occasion.model');

class OccasionService {
  static async getAllOccasions() {
    return await OccasionModel.getAll();
  }

  static async getActiveOccasions() {
    return await OccasionModel.getActive();
  }

  static async getOccasionById(id) {
    const item = await OccasionModel.getById(id);
    if (!item) {
      const err = new Error('Occasion not found');
      err.status = 404;
      throw err;
    }
    return item;
  }

  static async createOccasion(data) {
    return await OccasionModel.create(data);
  }

  static async updateOccasion(id, data) {
    await this.getOccasionById(id); // Ensure exists
    return await OccasionModel.update(id, data);
  }

  static async deleteOccasion(id) {
    await this.getOccasionById(id); // Ensure exists
    return await OccasionModel.delete(id);
  }
}

module.exports = OccasionService;
