const express = require('express');
const router = express.Router();
const db = require('../config/db'); // adapte le chemin si nécessaire

// 🟢 Récupérer tous les contrats
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contrats');
    res.json(rows);
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des contrats' });
  }
});

// 🟢 Ajouter un contrat
router.post('/', async (req, res) => {
  const { lib_contrat } = req.body;
  try {
    const [result] = await db.query('INSERT INTO contrats (lib_contrat) VALUES (?)', [lib_contrat]);
    res.status(201).json({ message: 'Contrat ajouté avec succès', id: result.insertId });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de l’ajout du contrat' });
  }
});

// 🟡 Modifier un contrat
router.put('/:code_contrat', async (req, res) => {
  const { code_contrat } = req.params;
  const { lib_contrat } = req.body;
  try {
    const [result] = await db.query('UPDATE contrats SET lib_contrat = ? WHERE code_contrat = ?', [lib_contrat, code_contrat]);
    res.json({ message: 'Contrat modifié avec succès' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la modification du contrat' });
  }
});

// 🔴 Supprimer un contrat
router.delete('/:code_contrat', async (req, res) => {
  const { code_contrat } = req.params;
  try {
    const [result] = await db.query('DELETE FROM contrats WHERE code_contrat = ?', [code_contrat]);
    res.json({ message: 'Contrat supprimé avec succès' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du contrat' });
  }
});

module.exports = router;
