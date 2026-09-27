const SchemaService = require('../services/schema.service');

class SchemaController {
  static async getAll(req, res, next) {
    try {
      const schemas = await SchemaService.getAllSchemas();
      return res.status(200).json({
        success: true,
        data: schemas
      });
    } catch (err) {
      next(err);
    }
  }

  static async getByType(req, res, next) {
    try {
      const schema = await SchemaService.getSchemaByType(req.params.type);
      if (!schema) {
        return res.status(404).json({
          success: false,
          message: `Schema not found for type: ${req.params.type}`
        });
      }
      return res.status(200).json({
        success: true,
        data: schema
      });
    } catch (err) {
      next(err);
    }
  }

  static async upsert(req, res, next) {
    try {
      const { schema_type, schema_data, is_active } = req.body;
      const saved = await SchemaService.saveSchema(schema_type, schema_data, is_active);
      return res.status(200).json({
        success: true,
        message: `${schema_type} schema saved successfully`,
        data: saved
      });
    } catch (err) {
      next(err);
    }
  }

  static async toggle(req, res, next) {
    try {
      const { type } = req.params;
      const { is_active } = req.body;
      const updated = await SchemaService.toggleStatus(type, is_active);
      return res.status(200).json({
        success: true,
        message: `${type} schema status updated`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SchemaController;
