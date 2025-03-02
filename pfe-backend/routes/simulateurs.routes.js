const express = require('express');
const router = express.Router();
const simulateurController = require('../controllers/simulateurController');

router.get('/', simulateurController.getAllSimulateurs);
router.get('/:id', simulateurController.getSimulateurById);
router.post('/', simulateurController.createSimulateur);
router.put('/:id', simulateurController.updateSimulateur);
router.delete('/:id', simulateurController.deleteSimulateur);

module.exports = router;
