const express = require('express');
const router = express.Router();
const pool = require('../config/db');  // Utiliser 'pool' partout

// Récupérer toutes les positions
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM positions');
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des positions:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des positions', error: err });
  }
});

// Ajouter une position
router.post('/', async (req, res) => {
  const { lib_position } = req.body;
  
  // Vérification de la validité de l'entrée
  if (!lib_position || lib_position.trim() === '') {
    return res.status(400).json({ message: 'Le nom de la position est requis' });
  }

  const query = 'INSERT INTO positions (lib_position) VALUES (?)';
  try {
    const [results] = await pool.query(query, [lib_position]);
    res.json({ message: 'Position ajoutée avec succès', id: results.insertId });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la position:', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la position', error: err });
  }
});

// Modifier une position
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { lib_position } = req.body;

  if (!lib_position || lib_position.trim() === '') {
    return res.status(400).json({ message: 'Le nom de la position est requis' });
  }

  const query = 'UPDATE positions SET lib_position = ? WHERE code_position = ?';
  try {
    const [existingPosition] = await pool.query('SELECT * FROM positions WHERE code_position = ?', [id]);
    if (existingPosition.length === 0) {
      return res.status(404).json({ message: 'Position non trouvée' });
    }
    
    await pool.query(query, [lib_position, id]);
    res.json({ message: 'Position modifiée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la modification de la position:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la modification de la position', error: err });
  }
});

// Supprimer une position
// Supprimer une position
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM positions WHERE code_position = ?';
  try {
    const [results] = await pool.query(query, [id]);
    if (results.affectedRows > 0) {
      res.json({ message: 'Position supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Position non trouvée' });
    }
  } catch (err) {
    console.error('Erreur lors de la suppression de la position:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la position', error: err });
  }
});

module.exports = router;
