const express = require('express');
const router = express.Router();
const escaleController = require('../controllers/escaleController');

router.get('/', escaleController.getAllEscales);
router.get('/:id', escaleController.getEscaleById);
router.post('/', escaleController.createEscale);
router.put('/:id', escaleController.updateEscale);
router.delete('/:id', escaleController.deleteEscale);

module.exports = router;
