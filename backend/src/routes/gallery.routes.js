const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/gallery.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { gallerySchema, galleryUpdateSchema } = require('../validations/gallery.validation');

router.get('/', authMiddleware, GalleryController.getAll);
router.get('/:id', authMiddleware, GalleryController.getById);
router.post('/', authMiddleware, validate(gallerySchema), GalleryController.create);
router.put('/:id', authMiddleware, validate(galleryUpdateSchema), GalleryController.update);
router.delete('/:id', authMiddleware, GalleryController.delete);

module.exports = router;
