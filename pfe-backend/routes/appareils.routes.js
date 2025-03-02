const express = require('express');
const router = express.Router();
const appareilController = require('../controllers/appareilController');

router.get('/', appareilController.getAllAppareils);
router.get('/:id', appareilController.getAppareilById);
router.post('/', appareilController.createAppareil);
router.put('/:id', appareilController.updateAppareil);
router.delete('/:id', appareilController.deleteAppareil);

module.exports = router;
