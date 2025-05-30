const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Connexion à la base de données

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Ajouter un utilisateur
router.post("/", async (req, res) => {
  const { name, email, etat, password, id_role } = req.body;
  try {
    await db.query("INSERT INTO users (name, email, etat, password, id_role) VALUES (?, ?, ?, ?, ?)", 
                   [name, email, etat, password, id_role]);
    res.json({ message: "Utilisateur ajouté !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un utilisateur
router.put("/:id", async (req, res) => {
  const { name, email, etat, password, id_role } = req.body;
  try {
    await db.query("UPDATE users SET name=?, email=?, etat=?, password=?, id_role=? WHERE id=?", 
                   [name, email, etat, password, id_role, req.params.id]);
    res.json({ message: "Utilisateur mis à jour !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "Utilisateur supprimé !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;