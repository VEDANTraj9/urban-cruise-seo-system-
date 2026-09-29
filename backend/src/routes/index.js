const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const seoRoutes = require('./seo.routes');
const schemaRoutes = require('./schema.routes');
const homepageRoutes = require('./homepage.routes');
const vehicleRoutes = require('./vehicle.routes');
const occasionRoutes = require('./occasion.routes');
const testimonialRoutes = require('./testimonial.routes');
const galleryRoutes = require('./gallery.routes');
const contactRoutes = require('./contact.routes');
const uploadRoutes = require('./upload.routes');
const publicRoutes = require('./public.routes');

// API Root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Urban Cruise Delhi REST API is active and healthy!',
    version: '1.0.0',
    endpoints: {
      seo: '/api/public/seo',
      homepage: '/api/public/homepage',
      vehicles: '/api/public/vehicles',
      auth: '/api/auth/login'
    }
  });
});

router.use('/auth', authRoutes);
router.use('/seo', seoRoutes);
router.use('/schemas', schemaRoutes);
router.use('/homepage', homepageRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/occasions', occasionRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact', contactRoutes);
router.use('/upload', uploadRoutes);
router.use('/public', publicRoutes);

module.exports = router;
