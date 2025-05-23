const express = require('express');
const router = express.Router();
const pool = require("../config/db");  // Utilise 'pool' au lieu de 'db'

// Route pour récupérer les statistiques
router.get("/", async (req, res) => {
    try {
      const volsReels = await pool.query("SELECT COUNT(*) AS count FROM vols");
      const simulations = await pool.query("SELECT COUNT(*) AS count FROM simulations");
      const personnelNavigant = await pool.query("SELECT COUNT(*) AS count FROM personnel_navigants");
  
      console.log("Vols réels:", volsReels[0][0]?.count);
      console.log("Simulations:", simulations[0][0]?.count);
      console.log("Personnel navigant:", personnelNavigant[0][0]?.count);
  
      res.json({
        volsReels: volsReels[0][0]?.count || 0,
        simulations: simulations[0][0]?.count || 0,
        personnelNavigant: personnelNavigant[0][0]?.count || 0,
      });
    } catch (err) {
      console.error("Erreur lors du chargement des statistiques:", err);
      res.status(500).json({ message: "Erreur lors du chargement des statistiques" });
    }
  });
  
  
  

module.exports = router;