const pool = require('../config/db');

class HeroModel {
  static async get() {
    const [rows] = await pool.query('SELECT * FROM hero_section LIMIT 1');
    return rows[0] || null;
  }

  static async update(data) {
    const { main_heading, sub_heading, banner_image, cta_text, cta_url } = data;
    const [existing] = await pool.query('SELECT id FROM hero_section LIMIT 1');

    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO hero_section (main_heading, sub_heading, banner_image, cta_text, cta_url) VALUES (?, ?, ?, ?, ?)',
        [main_heading, sub_heading, banner_image, cta_text, cta_url]
      );
    } else {
      await pool.query(
        'UPDATE hero_section SET main_heading = ?, sub_heading = ?, banner_image = ?, cta_text = ?, cta_url = ? WHERE id = ?',
        [main_heading, sub_heading, banner_image, cta_text, cta_url, existing[0].id]
      );
    }

    return this.get();
  }
}

module.exports = HeroModel;
