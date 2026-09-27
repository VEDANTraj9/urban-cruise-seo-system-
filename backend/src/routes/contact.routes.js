const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { contactSchema } = require('../validations/contact.validation');

router.get('/', authMiddleware, ContactController.get);
router.put('/', authMiddleware, validate(contactSchema), ContactController.update);

module.exports = router;
