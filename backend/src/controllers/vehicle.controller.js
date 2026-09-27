const VehicleService = require('../services/vehicle.service');

class VehicleController {
  static async getAll(req, res, next) {
    try {
      const vehicles = await VehicleService.getAllVehicles();
      return res.status(200).json({
        success: true,
        data: vehicles
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const vehicle = await VehicleService.getVehicleById(req.params.id);
      return res.status(200).json({
        success: true,
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const vehicle = await VehicleService.createVehicle(req.body);
      return res.status(201).json({
        success: true,
        message: 'Vehicle added successfully',
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const vehicle = await VehicleService.updateVehicle(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Vehicle updated successfully',
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await VehicleService.deleteVehicle(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }

  static async reorder(req, res, next) {
    try {
      await VehicleService.reorderVehicles(req.body.items);
      return res.status(200).json({
        success: true,
        message: 'Vehicles reordered successfully'
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VehicleController;
