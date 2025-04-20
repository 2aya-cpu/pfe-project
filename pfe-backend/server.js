// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Charge les variables d'environnement
dotenv.config();

const app = express(); // Initialize app first
app.set('trust proxy', 1); // Trust the first proxy

const PORT = process.env.PORT || 5000;

// Middleware de sécurité
app.use(cors({
  origin: ['http://localhost:8080', 'http://172.20.10.2:8080']
}));
app.use(helmet());
app.use(express.json());

// Middleware de limitation de débit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max
});
app.use(limiter);

// Routes spécifiques
const escalesRoutes = require('./routes/escale');
const typesimulationRoutes = require('./routes/typesimulation');
const simulateurRoutes = require('./routes/simulateur');
const naturevolRoutes = require('./routes/naturevol');
const tronconRoutes = require('./routes/troncon');

// ✅ Importation des routes principales
const authRoutes = require("./routes/authRoutes");
const pnRoutes = require("./routes/pnRoutes"); 
const referencesRoutes = require("./routes/references");
const acnatureRoutes = require("./routes/acnature");
const volsRoutes = require("./routes/vols");
const equipageRoutes = require("./routes/equipage");
const simulationsRoutes = require("./routes/simulations");
const participationsimRoutes = require("./routes/participationsim");
const tablesimulationsRoutes = require("./routes/tablesimulation");
const pr = require("./routes/pr");
const bases = require("./routes/bases");
const positionsRouter = require('./routes/positions');
const userRoutes = require("./routes/users");
const typeavion = require("./routes/typeavion");
const gradesRoutes = require('./routes/grades');
const reseauxRoutes = require('./routes/reseaux');
const contratsRoutes = require('./routes/contrats');
const rolesRoutes = require('./routes/roles');

// ✅ Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/pn", pnRoutes);
app.use("/api/bases", bases);
app.use("/api/positions", positionsRouter); 
app.use("/api", referencesRoutes);
app.use("/api/acnature", acnatureRoutes);
app.use("/api/vols", volsRoutes);
app.use("/api/equipage", equipageRoutes);
app.use("/api/simulations", simulationsRoutes);
app.use("/api/participationsim", participationsimRoutes);
app.use("/api/tablesimulation", tablesimulationsRoutes);
app.use("/api/pr", pr);
app.use("/api/users", userRoutes);
app.use("/api/typeavions", typeavion);
app.use("/api/grades", gradesRoutes);
app.use("/api/contrats", contratsRoutes);
app.use("/api/reseaux", reseauxRoutes);
app.use("/api/roles", rolesRoutes);
app.use('/api/escales', escalesRoutes);
app.use('/api/typesimulations', typesimulationRoutes);
app.use('/api/simulateurs', simulateurRoutes);
app.use('/api/natures_vols', naturevolRoutes);
app.use('/api/troncons', tronconRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur détectée :", err.message);
  res.status(500).json({ error: err.message });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log("Serveur démarré sur http://localhost:" + PORT);
});
