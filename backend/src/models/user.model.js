const pool = require('../config/db');

class UserModel {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async create({ name, email, passwordHash, role = 'admin' }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role]
    );
    return result.insertId;
  }
}

module.exports = UserModel;
