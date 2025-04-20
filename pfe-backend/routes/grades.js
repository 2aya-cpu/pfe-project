
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // adapte selon ton fichier db.js

// 🔍 GET - Tous les grades
router.get('/', async (req, res) => {
  try {
    const [grades] = await db.query('SELECT * FROM grades');
    res.json(grades);
  } catch (err) {
    console.error('Erreur GET /grades:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ➕ POST - Ajouter un grade
router.post('/', async (req, res) => {
  try {
    const { lib_grade } = req.body;
    const [result] = await db.query('INSERT INTO grades (lib_grade) VALUES (?)', [lib_grade]);
    res.status(201).json({ code_grade: result.insertId, lib_grade });
  } catch (err) {
    console.error('Erreur POST /grades:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✏️ PUT - Modifier un grade
router.put('/:code_grade', async (req, res) => {
  try {
    const { code_grade } = req.params;
    const { lib_grade } = req.body;
    await db.query('UPDATE grades SET lib_grade = ? WHERE code_grade = ?', [lib_grade, code_grade]);
    res.json({ message: 'Grade modifié avec succès' });
  } catch (err) {
    console.error('Erreur PUT /grades:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ❌ DELETE - Supprimer un grade
router.delete('/:code_grade', async (req, res) => {
  try {
    const { code_grade } = req.params;
    await db.query('DELETE FROM grades WHERE code_grade = ?', [code_grade]);
    res.json({ message: 'Grade supprimé avec succès' });
  } catch (err) {
    console.error('Erreur DELETE /grades:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
