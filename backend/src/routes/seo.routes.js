const express = require('express');
const router = express.Router();
const SeoController = require('../controllers/seo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateSeoSchema } = require('../validations/seo.validation');

router.get('/', authMiddleware, SeoController.getSeo);
router.put('/', authMiddleware, validate(updateSeoSchema), SeoController.updateSeo);

module.exports = router;
