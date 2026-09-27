const pool = require('../config/db');

class OccasionModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM occasions ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getActive() {
    const [rows] = await pool.query('SELECT * FROM occasions WHERE is_active = TRUE ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM occasions WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { title, description, image, display_order = 0, is_active = true } = data;
    const [result] = await pool.query(
      'INSERT INTO occasions (title, description, image, display_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [title, description, image, display_order, is_active]
    );
    return this.getById(result.insertId);
  }

  static async update(id, data) {
    const { title, description, image, display_order, is_active } = data;
    await pool.query(
      `UPDATE occasions SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [title, description, image, display_order, is_active, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM occasions WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = OccasionModel;
