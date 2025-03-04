// Importation des modules nécessaires
const express = require("express"); // Framework pour créer le serveur
const cors = require("cors"); // Middleware pour gérer les requêtes cross-origin (CORS)
const dotenv = require("dotenv"); // Module pour charger les variables d'environnement depuis un fichier .env
const helmet = require("helmet"); // Middleware pour sécuriser les en-têtes HTTP
const rateLimit = require("express-rate-limit"); // Middleware pour limiter le nombre de requêtes

// Charge les variables d'environnement du fichier .env dans process.env
dotenv.config();

// Crée une instance de l'application Express
const app = express();

// Définit le port du serveur. Utilise le port défini dans les variables d'environnement ou 5000 par défaut
const PORT = process.env.PORT || 5000;

// Middleware de sécurité
app.use(cors()); // Active CORS pour permettre les requêtes cross-origin
app.use(helmet()); // Sécurise les en-têtes HTTP pour protéger l'application
app.use(express.json()); // Permet à l'application de comprendre les données JSON dans les requêtes

// Middleware de limitation de débit (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de temps : 15 minutes
  max: 100, // Nombre maximal de requêtes autorisées dans la fenêtre de temps
});
app.use(limiter); // Applique la limitation de débit à toutes les routes

// Importation des routes
const authRoutes = require("./routes/authRoutes"); // Importe les routes liées à l'authentification
app.use("/api/auth", authRoutes); // Associe les routes d'authentification au préfixe "/api/auth"

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console
  res.status(500).json({ message: "Une erreur est survenue" }); // Renvoie une réponse d'erreur au client
});

// Démarre le serveur et écoute sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});