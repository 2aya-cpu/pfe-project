const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust based on your DB connection file

// Get all types d'avions
router.get('/', (req, res) => {
  const query = 'SELECT * FROM typeavions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching typeavions:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;

