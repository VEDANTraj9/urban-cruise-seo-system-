const pool = require('../config/db');

class AboutModel {
  static async get() {
    const [rows] = await pool.query('SELECT * FROM about_section LIMIT 1');
    return rows[0] || null;
  }

  static async update(data) {
    const { section_title, description, featured_image } = data;
    const [existing] = await pool.query('SELECT id FROM about_section LIMIT 1');

    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO about_section (section_title, description, featured_image) VALUES (?, ?, ?)',
        [section_title, description, featured_image]
      );
    } else {
      await pool.query(
        'UPDATE about_section SET section_title = ?, description = ?, featured_image = ? WHERE id = ?',
        [section_title, description, featured_image, existing[0].id]
      );
    }

    return this.get();
  }
}

module.exports = AboutModel;
