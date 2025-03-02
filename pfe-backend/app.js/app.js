// Importer les modules nécessaires
const express = require('express'); // Framework pour créer le serveur
const cors = require('cors'); // Middleware pour gérer les requêtes cross-origin
const dotenv = require('dotenv'); // Pour charger les variables d'environnement depuis un fichier .env
const db = require('./config/db'); // Importer la configuration de la base de données

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une instance d'Express
const app = express();

// Définir le port du serveur (utiliser le port défini dans .env ou 5000 par défaut)
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin (pour que le frontend puisse communiquer avec le backend)
app.use(express.json()); // Parser les requêtes en JSON (pour traiter les données envoyées par le frontend)

// Route de test
app.get('/', (req, res) => {
  // Répondre avec un message de bienvenue
  res.send('Bienvenue sur le backend Node.js avec MySQL !');
});

// Démarrer le serveur et écouter sur le port spécifié
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});