// Importation des modules nécessaires
const express = require("express"); // Framework pour créer des routes
const bcrypt = require("bcryptjs"); // Module pour hacher et comparer les mots de passe
const jwt = require("jsonwebtoken"); // Module pour créer des tokens JWT (authentification)
const User = require("../models/user"); // Modèle utilisateur pour interagir avec la base de données

// Crée un routeur Express pour gérer les routes
const router = express.Router();

// Route de connexion (Login)
router.post("/login", async (req, res) => {
  // Récupère l'email et le mot de passe depuis le corps de la requête
  const { email, password } = req.body;

  try {
    // Cherche l'utilisateur dans la base de données par son email
    const user = await User.findByEmail(email);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 400
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Compare le mot de passe fourni avec le mot de passe haché stocké dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Si les mots de passe ne correspondent pas, renvoie une erreur 400
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Si tout est valide, crée un token JWT pour l'utilisateur
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Renvoie le token au client
    res.json({ token });
  } catch (err) {
    // En cas d'erreur, renvoie une erreur 500 avec le message d'erreur
    res.status(500).json({ message: err.message });
  }
});

// Route d'inscription (Register) - Optionnelle
router.post("/register", async (req, res) => {
  // Récupère l'email et le mot de passe depuis le corps de la requête
  const { email, password } = req.body;

  try {
    // Hache le mot de passe avec un coût de 10 (plus c'est élevé, plus c'est sécurisé mais lent)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crée un nouvel utilisateur dans la base de données avec l'email et le mot de passe haché
    await User.create(email, hashedPassword);
    // Renvoie une réponse de succès
    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    // En cas d'erreur, renvoie une erreur 500 avec le message d'erreur
    res.status(500).json({ message: err.message });
  }
});

// Exporte le routeur pour être utilisé dans d'autres fichiers
module.exports = router;