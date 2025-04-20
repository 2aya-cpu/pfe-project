// Importer le module mysql2/promise pour utiliser les promesses
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer un pool de connexions à la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', // Hôte de la base de données (localhost par défaut)
  user: process.env.DB_USER || 'root', // Utilisateur de la base de données (root par défaut)
  password: process.env.DB_PASSWORD || '', // Mot de passe de la base de données (vide par défaut)
  database: process.env.DB_NAME || 'pfe_db', // Nom de la base de données (pfe_db par défaut)
  waitForConnections: true, // Attendre une connexion si le pool est plein
  connectionLimit: 10, // Nombre maximal de connexions dans le pool
  queueLimit: 0 // Nombre maximal de requêtes en attente (0 = illimité)
});

// Exporter le pool de connexions
module.exports = pool;