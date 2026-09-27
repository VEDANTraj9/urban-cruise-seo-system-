const pool = require('../config/db');

class GalleryModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY display_order ASC, id DESC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM gallery WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { image_url, alt_tag, display_order = 0 } = data;
    const [result] = await pool.query(
      'INSERT INTO gallery (image_url, alt_tag, display_order) VALUES (?, ?, ?)',
      [image_url, alt_tag, display_order]
    );
    return this.getById(result.insertId);
  }

  static async update(id, data) {
    const { image_url, alt_tag, display_order } = data;
    await pool.query(
      `UPDATE gallery SET
        image_url = COALESCE(?, image_url),
        alt_tag = COALESCE(?, alt_tag),
        display_order = COALESCE(?, display_order)
      WHERE id = ?`,
      [image_url, alt_tag, display_order, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM gallery WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = GalleryModel;
