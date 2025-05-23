const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/dashboard-summary', async (req, res) => {
  try {
    const [usersResult] = await db.query('SELECT COUNT(*) as total FROM users');
    const [flightsResult] = await db.query('SELECT COUNT(*) as total FROM typeavions');
    const [escalesResult] = await db.query('SELECT COUNT(*) as total FROM escales');

    res.json({
      totalUsers: usersResult[0].total,
      totalFlights: flightsResult[0].total,
      totalEscales: escalesResult[0].total
    });
  } catch (error) {
    console.error("Erreur dans /api/dashboard-summary:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
