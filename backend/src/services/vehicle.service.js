const VehicleModel = require('../models/vehicle.model');

class VehicleService {
  static formatVehicle(v) {
    if (!v) return null;
    return {
      ...v,
      is_active: Boolean(v.is_active),
      features: typeof v.features === 'string' ? JSON.parse(v.features) : (v.features || [])
    };
  }

  static async getAllVehicles() {
    const rows = await VehicleModel.getAll();
    return rows.map(this.formatVehicle);
  }

  static async getActiveVehicles() {
    const rows = await VehicleModel.getActive();
    return rows.map(this.formatVehicle);
  }

  static async getVehicleById(id) {
    const v = await VehicleModel.getById(id);
    if (!v) {
      const err = new Error('Vehicle not found');
      err.status = 404;
      throw err;
    }
    return this.formatVehicle(v);
  }

  static async createVehicle(data) {
    const v = await VehicleModel.create(data);
    return this.formatVehicle(v);
  }

  static async updateVehicle(id, data) {
    await this.getVehicleById(id); // Ensure exists
    const v = await VehicleModel.update(id, data);
    return this.formatVehicle(v);
  }

  static async deleteVehicle(id) {
    await this.getVehicleById(id); // Ensure exists
    return await VehicleModel.delete(id);
  }

  static async reorderVehicles(items) {
    return await VehicleModel.reorder(items);
  }
}

module.exports = VehicleService;
