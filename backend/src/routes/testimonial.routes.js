const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { testimonialSchema, testimonialUpdateSchema } = require('../validations/testimonial.validation');

router.get('/', authMiddleware, TestimonialController.getAll);
router.get('/:id', authMiddleware, TestimonialController.getById);
router.post('/', authMiddleware, validate(testimonialSchema), TestimonialController.create);
router.put('/:id', authMiddleware, validate(testimonialUpdateSchema), TestimonialController.update);
router.delete('/:id', authMiddleware, TestimonialController.delete);

module.exports = router;
