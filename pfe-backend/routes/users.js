const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure db.js is using mysql2/promise

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    // Fetching users using async/await with promise-based query
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);  // Return users as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un utilisateur
router.post("/", async (req, res) => {
  console.log("Données reçues :", req.body);  // Debugging line to check the received data
  const { name, email, etat, password, id_role } = req.body;
  try {
    // Inserting user data using async/await with promise-based query
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
    // Updating user data using async/await with promise-based query
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
    // Deleting a user using async/await with promise-based query
    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "Utilisateur supprimé !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;