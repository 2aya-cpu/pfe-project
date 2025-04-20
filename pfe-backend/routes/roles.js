
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assure-toi que ce fichier utilise mysql2/promise

// 🔹 GET - Tous les rôles
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
  }
});

// 🔹 POST - Ajouter un rôle
router.post('/', async (req, res) => {
  const { description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO roles (description) VALUES (?)',
      [description]
    );
    res.status(201).json({ message: 'Rôle ajouté avec succès', id: result.insertId });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de l’ajout du rôle' });
  }
});

// 🔹 PUT - Modifier un rôle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE roles SET description = ? WHERE id = ?',
      [description, id]
    );
    res.json({ message: 'Rôle modifié avec succès' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la modification du rôle' });
  }
});

// 🔹 DELETE - Supprimer un rôle
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      'DELETE FROM roles WHERE id = ?',
      [id]
    );
    res.json({ message: 'Rôle supprimé avec succès' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
  }
});

module.exports = router;
