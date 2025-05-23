const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");  // <--- Importer bcrypt

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
  console.log("Données reçues :", req.body);
  const { name, email, etat, password, id_role } = req.body;
  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = le "salt rounds"

    // Insertion avec le mot de passe haché
    await db.query(
      "INSERT INTO users (name, email, etat, password, id_role) VALUES (?, ?, ?, ?, ?)",
      [name, email, etat, hashedPassword, id_role]
    );

    res.json({ message: "Utilisateur ajouté avec mot de passe sécurisé !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un utilisateur
router.put("/:id", async (req, res) => {
  const { name, email, etat, password, id_role } = req.body;
  try {
    // Hacher le nouveau mot de passe avant la mise à jour
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET name=?, email=?, etat=?, password=?, id_role=? WHERE id=?",
      [name, email, etat, hashedPassword, id_role, req.params.id]
    );

    res.json({ message: "Utilisateur mis à jour avec mot de passe sécurisé !" });
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