const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load standard .env
dotenv.config();

// Load .env.local if present (useful for local development)
const localEnvPath = path.resolve(__dirname, '../../.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'seo_homepage_db',
  JWT_SECRET: process.env.JWT_SECRET || 'royal_fleet_secure_jwt_token_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};
