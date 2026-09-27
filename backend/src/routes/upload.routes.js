const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/', authMiddleware, upload.single('image'), UploadController.uploadFile);

module.exports = router;
