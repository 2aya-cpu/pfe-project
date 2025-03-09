const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Route de connexion (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT avec id et rôle
    const token = jwt.sign(
      { id: user.id, role: user.id_role }, // Inclure le rôle dans le token
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Connexion réussie", token, role: user.id_role });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
