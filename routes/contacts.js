const express = require('express');
const router  = express.Router();
const contactsController = require('../controllers/contacts')
const validation = require('../middleware/validation_Middleware');



router.get('/', contactsController.getAll);
router.get('/:id',contactsController.getsingle);
router.post('/', validation.saveContact, contactsController.createContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);





module.exports = router;