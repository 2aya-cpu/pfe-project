const express = require('express');
const router = express.Router();
const reseauController = require('../controllers/reseauController');

router.get('/', reseauController.getAllReseaux);
router.get('/:id', reseauController.getReseauById);
router.post('/', reseauController.createReseau);
router.put('/:id', reseauController.updateReseau);
router.delete('/:id', reseauController.deleteReseau);

module.exports = router;
