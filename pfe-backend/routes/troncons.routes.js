const express = require('express');
const router = express.Router();
const tronconController = require('../controllers/tronconController');

router.get('/', tronconController.getAllTroncons);
router.get('/:id', tronconController.getTronconById);
router.post('/', tronconController.createTroncon);
router.put('/:id', tronconController.updateTroncon);
router.delete('/:id', tronconController.deleteTroncon);

module.exports = router;
