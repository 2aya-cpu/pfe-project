const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Récupérer tous les types de simulation
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM typesimulations');
    res.json(rows);
  } catch (error) {
    console.error('Erreur get typesimulations :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter un type de simulation
router.post('/', async (req, res) => {
  const { lib_typesimulation } = req.body;
  try {
    await pool.query('INSERT INTO typesimulations (lib_typesimulation) VALUES (?)', [lib_typesimulation]);
    res.status(201).json({ message: 'Type de simulation ajouté' });
  } catch (error) {
    console.error('Erreur post typesimulation :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Modifier un type de simulation
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_typesimulation } = req.body;
  try {
    await pool.query('UPDATE typesimulations SET lib_typesimulation = ? WHERE code_typesimulation = ?', [lib_typesimulation, id]);
    res.json({ message: 'Type de simulation modifié' });
  } catch (error) {
    console.error('Erreur put typesimulation :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un type de simulation
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM typesimulations WHERE code_typesimulation = ?', [id]);
    res.json({ message: 'Type de simulation supprimé' });
  } catch (error) {
    console.error('Erreur delete typesimulation :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
