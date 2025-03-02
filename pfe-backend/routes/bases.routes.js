const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.get('/', baseController.getAllBases);
router.get('/:id', baseController.getBaseById);
router.post('/', baseController.createBase);
router.put('/:id', baseController.updateBase);
router.delete('/:id', baseController.deleteBase);

module.exports = router;
