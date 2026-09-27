const pool = require('../config/db');

class SchemaModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM `schemas` ORDER BY id ASC');
    return rows;
  }

  static async getActiveSchemas() {
    const [rows] = await pool.query('SELECT * FROM `schemas` WHERE is_active = TRUE ORDER BY id ASC');
    return rows;
  }

  static async getByType(schemaType) {
    const [rows] = await pool.query('SELECT * FROM `schemas` WHERE schema_type = ? LIMIT 1', [schemaType]);
    return rows[0] || null;
  }

  static async upsert(schemaType, schemaData, isActive = true) {
    const [existing] = await pool.query('SELECT id FROM `schemas` WHERE schema_type = ?', [schemaType]);
    
    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO `schemas` (schema_type, schema_data, is_active) VALUES (?, ?, ?)',
        [schemaType, JSON.stringify(schemaData), isActive]
      );
    } else {
      await pool.query(
        'UPDATE `schemas` SET schema_data = ?, is_active = ? WHERE schema_type = ?',
        [JSON.stringify(schemaData), isActive, schemaType]
      );
    }

    return this.getByType(schemaType);
  }

  static async toggleStatus(schemaType, isActive) {
    await pool.query('UPDATE `schemas` SET is_active = ? WHERE schema_type = ?', [isActive, schemaType]);
    return this.getByType(schemaType);
  }
}

module.exports = SchemaModel;
