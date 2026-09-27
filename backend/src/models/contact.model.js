const pool = require('../config/db');

class ContactModel {
  static async get() {
    const [rows] = await pool.query('SELECT * FROM contact_info LIMIT 1');
    return rows[0] || null;
  }

  static async update(data) {
    const { phone_primary, phone_secondary, email, office_address, google_map_embed } = data;
    const [existing] = await pool.query('SELECT id FROM contact_info LIMIT 1');

    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO contact_info (phone_primary, phone_secondary, email, office_address, google_map_embed) VALUES (?, ?, ?, ?, ?)',
        [phone_primary, phone_secondary || null, email, office_address, google_map_embed]
      );
    } else {
      await pool.query(
        `UPDATE contact_info SET
          phone_primary = ?,
          phone_secondary = ?,
          email = ?,
          office_address = ?,
          google_map_embed = ?
        WHERE id = ?`,
        [phone_primary, phone_secondary || null, email, office_address, google_map_embed, existing[0].id]
      );
    }

    return this.get();
  }
}

module.exports = ContactModel;
