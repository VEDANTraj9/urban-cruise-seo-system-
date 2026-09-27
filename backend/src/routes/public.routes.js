const express = require('express');
const router = express.Router();
const PublicController = require('../controllers/public.controller');

// Public endpoints for dynamic homepage rendering and dynamic head injection
router.get('/homepage', PublicController.getHomepage);
router.get('/seo', PublicController.getSeo);

module.exports = router;
