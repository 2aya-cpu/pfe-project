
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ← Assure-toi d’avoir ce fichier pour ta connexion MySQL

// 🔹 GET all reseaux
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reseaux');
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET /reseaux:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 POST create reseau
router.post('/', async (req, res) => {
  const { lib_reseau } = req.body;
  try {
    const [result] = await db.query('INSERT INTO reseaux (lib_reseau) VALUES (?)', [lib_reseau]);
    res.status(201).json({ message: 'Réseau ajouté', id: result.insertId });
  } catch (err) {
    console.error('Erreur POST /reseaux:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 PUT update reseau
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_reseau } = req.body;
  try {
    await db.query('UPDATE reseaux SET lib_reseau = ? WHERE code_reseau = ?', [lib_reseau, id]);
    res.json({ message: 'Réseau modifié' });
  } catch (err) {
    console.error('Erreur PUT /reseaux/:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 DELETE reseau
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM reseaux WHERE code_reseau = ?', [id]);
    res.json({ message: 'Réseau supprimé' });
  } catch (err) {
    console.error('Erreur DELETE /reseaux/:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
