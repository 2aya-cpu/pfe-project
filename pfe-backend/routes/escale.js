
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtenir toutes les escales
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.*, r.lib_reseau 
      FROM escales e 
      LEFT JOIN reseaux r ON e.code_reseau = r.code_reseau
    `);
    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des escales:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter une escale
router.post('/', async (req, res) => {
  const { lib_escale, code_reseau } = req.body;
  try {
    await db.query('INSERT INTO escales (lib_escale, code_reseau) VALUES (?, ?)', [lib_escale, code_reseau]);
    res.status(201).json({ message: 'Escale ajoutée avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'escale:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Modifier une escale
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_escale, code_reseau } = req.body;
  try {
    await db.query('UPDATE escales SET lib_escale = ?, code_reseau = ? WHERE code_escale = ?', [lib_escale, code_reseau, id]);
    res.json({ message: 'Escale modifiée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la modification de l\'escale:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer une escale
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM escales WHERE code_escale = ?', [id]);
    res.json({ message: 'Escale supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'escale:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
