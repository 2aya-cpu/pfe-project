const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Bienvenue sur le dashboard Admin' });
});

module.exports = router;
