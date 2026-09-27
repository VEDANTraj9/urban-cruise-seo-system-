const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { vehicleSchema, vehicleUpdateSchema, reorderVehiclesSchema } = require('../validations/vehicle.validation');

router.get('/', authMiddleware, VehicleController.getAll);
router.get('/:id', authMiddleware, VehicleController.getById);
router.post('/', authMiddleware, validate(vehicleSchema), VehicleController.create);
router.put('/reorder', authMiddleware, validate(reorderVehiclesSchema), VehicleController.reorder);
router.put('/:id', authMiddleware, validate(vehicleUpdateSchema), VehicleController.update);
router.delete('/:id', authMiddleware, VehicleController.delete);

module.exports = router;
