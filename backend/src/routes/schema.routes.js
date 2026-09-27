const express = require('express');
const router = express.Router();
const SchemaController = require('../controllers/schema.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { upsertSchemaSchema, toggleSchemaSchema } = require('../validations/schema.validation');

router.get('/', authMiddleware, SchemaController.getAll);
router.get('/:type', authMiddleware, SchemaController.getByType);
router.post('/', authMiddleware, validate(upsertSchemaSchema), SchemaController.upsert);
router.patch('/:type/toggle', authMiddleware, validate(toggleSchemaSchema), SchemaController.toggle);

module.exports = router;
