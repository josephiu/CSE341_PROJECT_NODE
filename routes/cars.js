const express = require('express');
const router  = express.Router();
const carsController = require('../controllers/cars')
const validation = require('../middleware/validation_Middleware');



router.get('/', carsController.getAll);
router.get('/:id',carsController.getsingle);
router.post('/', validation.saveCar, carsController.createCar);
router.put('/:id', validation.saveCar, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);





module.exports = router;