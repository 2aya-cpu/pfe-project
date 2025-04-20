const express = require('express');
const router = express.Router();
const pool = require("../config/db");  // Utilise 'pool' au lieu de 'db'

// Récupérer tous les tronçons
router.get('/', async (req, res) => {
  try {
    const [troncons] = await pool.query('SELECT * FROM troncons');
    res.json(troncons);
  } catch (err) {
    console.error("Erreur de récupération des tronçons:", err);
    res.status(500).send("Erreur du serveur");
  }
});

// Ajouter un tronçon
router.post('/', async (req, res) => {
  try {
    const { lib_troncon, code_escale_depart, code_escale_arrivee } = req.body;
    await pool.query(
      'INSERT INTO troncons (lib_troncon, code_escale_depart, code_escale_arrivee) VALUES (?, ?, ?)', 
      [lib_troncon, code_escale_depart, code_escale_arrivee]
    );
    res.status(201).send("Tronçon ajouté");
  } catch (err) {
    console.error("Erreur d'ajout de tronçon:", err);
    res.status(500).send("Erreur du serveur");
  }
});

// Mettre à jour un tronçon
router.put('/:code_troncon', async (req, res) => {
  try {
    const { code_troncon } = req.params;
    const { lib_troncon, code_escale_depart, code_escale_arrivee } = req.body;
    await pool.query(
      'UPDATE troncons SET lib_troncon = ?, code_escale_depart = ?, code_escale_arrivee = ? WHERE code_troncon = ?',
      [lib_troncon, code_escale_depart, code_escale_arrivee, code_troncon]
    );
    res.send("Tronçon mis à jour");
  } catch (err) {
    console.error("Erreur de mise à jour du tronçon:", err);
    res.status(500).send("Erreur du serveur");
  }
});

// Supprimer un tronçon
router.delete('/:code_troncon', async (req, res) => {
  try {
    const { code_troncon } = req.params;
    await pool.query('DELETE FROM troncons WHERE code_troncon = ?', [code_troncon]);
    res.send("Tronçon supprimé");
  } catch (err) {
    console.error("Erreur de suppression du tronçon:", err);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
