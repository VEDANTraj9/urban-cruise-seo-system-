const express = require('express');
const router = express.Router();
const OccasionController = require('../controllers/occasion.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { occasionSchema, occasionUpdateSchema } = require('../validations/occasion.validation');

router.get('/', authMiddleware, OccasionController.getAll);
router.get('/:id', authMiddleware, OccasionController.getById);
router.post('/', authMiddleware, validate(occasionSchema), OccasionController.create);
router.put('/:id', authMiddleware, validate(occasionUpdateSchema), OccasionController.update);
router.delete('/:id', authMiddleware, OccasionController.delete);

module.exports = router;
