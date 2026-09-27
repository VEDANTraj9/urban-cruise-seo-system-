const pool = require('../config/db');

class TestimonialModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getActive() {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY display_order ASC, id ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { customer_name, review, rating, customer_image, display_order = 0, is_active = true } = data;
    const [result] = await pool.query(
      'INSERT INTO testimonials (customer_name, review, rating, customer_image, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [customer_name, review, rating, customer_image, display_order, is_active]
    );
    return this.getById(result.insertId);
  }

  static async update(id, data) {
    const { customer_name, review, rating, customer_image, display_order, is_active } = data;
    await pool.query(
      `UPDATE testimonials SET
        customer_name = COALESCE(?, customer_name),
        review = COALESCE(?, review),
        rating = COALESCE(?, rating),
        customer_image = COALESCE(?, customer_image),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [customer_name, review, rating, customer_image, display_order, is_active, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = TestimonialModel;
