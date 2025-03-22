const express = require('express');
const router  = express.Router();
const guiterController = require('../controllers/guiters')
const validation = require('../middleware/validation_Middleware');



router.get('/', guiterController.getAll);
router.get('/:id',guiterController.getsingle);
router.post('/', validation.saveGuiter, guiterController.createGuiter_maker);
router.put('/:id', validation.saveGuiter, guiterController.updateGuiter_maker);
router.delete('/:id', guiterController.deleteGuiter_maker);





module.exports = router;