
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtenir tous les simulateurs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM simulateurs');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Ajouter un simulateur
router.post('/', async (req, res) => {
  const { lib_simulateur } = req.body;
  try {
    await db.query('INSERT INTO simulateurs (lib_simulateur) VALUES (?)', [lib_simulateur]);
    res.status(201).json({ message: 'Simulateur ajouté' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l’ajout' });
  }
});

// Modifier un simulateur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_simulateur } = req.body;
  try {
    await db.query('UPDATE simulateurs SET lib_simulateur = ? WHERE code_simulateur = ?', [lib_simulateur, id]);
    res.json({ message: 'Simulateur modifié' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la modification' });
  }
});

// Supprimer un simulateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM simulateurs WHERE code_simulateur = ?', [id]);
    res.json({ message: 'Simulateur supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
