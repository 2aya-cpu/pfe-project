const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🔹 GET – Récupérer toutes les natures de vol
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM natures_vols');
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 POST – Ajouter une nature de vol
router.post('/', async (req, res) => {
  const { lib_nature } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO natures_vols (lib_nature) VALUES (?)',
      [lib_nature]
    );
    res.json({ code_nature: result.insertId, lib_nature });
  } catch (err) {
    console.error('Erreur POST:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 PUT – Modifier une nature de vol
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_nature } = req.body;
  try {
    await db.query(
      'UPDATE natures_vols SET lib_nature = ? WHERE code_nature = ?',
      [lib_nature, id]
    );
    res.json({ message: 'Mise à jour réussie' });
  } catch (err) {
    console.error('Erreur PUT:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 DELETE – Supprimer une nature de vol
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM natures_vols WHERE code_nature = ?', [id]);
    res.json({ message: 'Suppression réussie' });
  } catch (err) {
    console.error('Erreur DELETE:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
