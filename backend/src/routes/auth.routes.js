const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { loginSchema } = require('../validations/auth.validation');

router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
