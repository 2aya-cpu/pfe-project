const express = require('express');
const router = express.Router();
const pool = require('../config/db');  // Utiliser 'pool' partout

// Récupérer toutes les bases
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM bases');
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des bases:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des bases', error: err });
  }
});

// Ajouter une base
router.post('/', async (req, res) => {
  const { lib_base } = req.body;
  const query = 'INSERT INTO bases (lib_base) VALUES (?)';
  try {
    const [results] = await pool.query(query, [lib_base]);
    res.json({ message: 'Base ajoutée avec succès', id: results.insertId });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la base:', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la base', error: err });
  }
});

// Modifier une base
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_base } = req.body;
  const query = 'UPDATE bases SET lib_base = ? WHERE code_base = ?';
  try {
    await pool.query(query, [lib_base, id]);
    res.json({ message: 'Base modifiée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la modification de la base:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la modification de la base', error: err });
  }
});

// Supprimer une base
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bases WHERE code_base = ?';
  try {
    await pool.query(query, [id]);
    res.json({ message: 'Base supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la base:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la base', error: err });
  }
});

module.exports = router;
