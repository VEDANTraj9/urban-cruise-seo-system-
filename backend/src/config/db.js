const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  ...(env.DB_SSL ? { ssl: { rejectUnauthorized: false } } : {})
});

pool.getConnection()
  .then((conn) => {
    console.log('MySQL Database Connected successfully to:', env.DB_NAME);
    conn.release();
  })
  .catch((err) => {
    console.error('MySQL Database Connection failed:', err.message);
  });

module.exports = pool;
