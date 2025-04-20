const express = require('express');
const router = express.Router();
const db = require('../config/db'); // connexion MySQL (mysql2/promise)

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM typeavions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { lib_typeavion } = req.body;
    await db.query('INSERT INTO typeavions (lib_typeavion) VALUES (?)', [lib_typeavion]);
    res.json({ message: 'Type avion ajouté avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:code_typeavion', async (req, res) => {
  try {
    const { lib_typeavion } = req.body;
    const { code_typeavion } = req.params;
    await db.query('UPDATE typeavions SET lib_typeavion = ? WHERE code_typeavion = ?', [lib_typeavion, code_typeavion]);
    res.json({ message: 'Type avion modifié avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:code_typeavion', async (req, res) => {
  try {
    const { code_typeavion } = req.params;
    await db.query('DELETE FROM typeavions WHERE code_typeavion = ?', [code_typeavion]);
    res.json({ message: 'Type avion supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
