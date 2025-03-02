const express = require('express');
const router = express.Router();
const volController = require('../controllers/volController');

router.get('/', volController.getAllVols);
router.get('/:id', volController.getVolById);
router.post('/', volController.createVol);
router.put('/:id', volController.updateVol);
router.delete('/:id', volController.deleteVol);

module.exports = router;
