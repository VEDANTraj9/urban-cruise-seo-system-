const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static media uploads serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root landing endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Urban Cruise Delhi Backend API is running live!',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount All API Routes (Supports both /api/* and root fallback /*)
app.use('/api', routes);
app.use(routes);

// 404 Route Catcher
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// Central Global Error Handler
app.use(errorHandler);

module.exports = app;
