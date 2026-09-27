const OccasionService = require('../services/occasion.service');

class OccasionController {
  static async getAll(req, res, next) {
    try {
      const occasions = await OccasionService.getAllOccasions();
      return res.status(200).json({
        success: true,
        data: occasions
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const occasion = await OccasionService.getOccasionById(req.params.id);
      return res.status(200).json({
        success: true,
        data: occasion
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const occasion = await OccasionService.createOccasion(req.body);
      return res.status(201).json({
        success: true,
        message: 'Occasion created successfully',
        data: occasion
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const occasion = await OccasionService.updateOccasion(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Occasion updated successfully',
        data: occasion
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await OccasionService.deleteOccasion(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Occasion deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OccasionController;
