// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Charge les variables d'environnement
dotenv.config();

// Crée une instance de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de sécurité
app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware de limitation de débit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max
});
app.use(limiter);

// **Importation des routes**
const authRoutes = require("./routes/authRoutes"); 
const pnRoutes = require("./routes/pnRoutes"); // Ajout des routes PN

app.use("/api/auth", authRoutes); // Routes d'authentification
app.use("/api/pn", pnRoutes); // Routes pour gérer les PN

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur est survenue" });
});

// **Démarrer le serveur**
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
