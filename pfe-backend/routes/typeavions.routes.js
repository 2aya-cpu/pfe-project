const express = require('express');
const router = express.Router();
const typeAvionController = require('../controllers/typeavionController');

router.get('/', typeAvionController.getAllTypeAvions);
router.get('/:id', typeAvionController.getTypeAvionById);
router.post('/', typeAvionController.createTypeAvion);
router.put('/:id', typeAvionController.updateTypeAvion);
router.delete('/:id', typeAvionController.deleteTypeAvion);

module.exports = router;
