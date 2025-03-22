const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 1. Get all users
router.get("/", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
      return;
    }
    res.json(results); // Send back the user data as JSON
  });
});

// 2. Add a new user
router.post("/", (req, res) => {
  const { name, email, etat, password, id_role } = req.body;
  const query =
    "INSERT INTO users (name, email, etat, password, id_role) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, email, etat, password, id_role], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error adding user", error: err });
      return;
    }
    res.json({ message: "User added successfully", userId: results.insertId });
  });
});

// 3. Update user state (etat)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { etat } = req.body;
  const query = "UPDATE users SET etat = ? WHERE id = ?";
  db.query(query, [etat, id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error updating user state", error: err });
      return;
    }
    res.json({ message: "User state updated successfully" });
  });
});

// 4. Delete a user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error deleting user", error: err });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
});
module.exports = router;