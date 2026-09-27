const pool = require('../config/db');

class VehicleModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getActive() {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE is_active = TRUE ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { name, image, seating_capacity, description, features, display_order = 0, is_active = true } = data;
    const [result] = await pool.query(
      'INSERT INTO vehicles (name, image, seating_capacity, description, features, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, image, seating_capacity, description, JSON.stringify(features || []), display_order, is_active]
    );
    return this.getById(result.insertId);
  }

  static async update(id, data) {
    const { name, image, seating_capacity, description, features, display_order, is_active } = data;
    await pool.query(
      `UPDATE vehicles SET
        name = COALESCE(?, name),
        image = COALESCE(?, image),
        seating_capacity = COALESCE(?, seating_capacity),
        description = COALESCE(?, description),
        features = COALESCE(?, features),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [
        name,
        image,
        seating_capacity,
        description,
        features !== undefined ? JSON.stringify(features) : null,
        display_order,
        is_active,
        id
      ]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async reorder(items) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      for (const item of items) {
        await connection.query('UPDATE vehicles SET display_order = ? WHERE id = ?', [item.display_order, item.id]);
      }
      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = VehicleModel;
