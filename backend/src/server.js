const app = require('./app');
const env = require('./config/env');
const initDatabase = require('./config/initDb');

const PORT = env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
  console.log(`📂 Uploads URL: http://localhost:${PORT}/uploads`);

  // Ensure tables and seed data exist
  await initDatabase();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
