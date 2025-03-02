const express = require('express');
const router = express.Router();
const typeSimulationController = require('../controllers/typesimulationController');

router.get('/', typeSimulationController.getAllTypeSimulations);
router.get('/:id', typeSimulationController.getTypeSimulationById);
router.post('/', typeSimulationController.createTypeSimulation);
router.put('/:id', typeSimulationController.updateTypeSimulation);
router.delete('/:id', typeSimulationController.deleteTypeSimulation);

module.exports = router;
