const express = require('express');
const router = express.Router();
const HomepageController = require('../controllers/homepage.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateHeroSchema, updateAboutSchema } = require('../validations/homepage.validation');

router.get('/hero', authMiddleware, HomepageController.getHero);
router.put('/hero', authMiddleware, validate(updateHeroSchema), HomepageController.updateHero);

router.get('/about', authMiddleware, HomepageController.getAbout);
router.put('/about', authMiddleware, validate(updateAboutSchema), HomepageController.updateAbout);

module.exports = router;
