// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Charge les variables d'environnement
dotenv.config();

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
const escalesRoutes = require('./routes/escale');
app.use('/api/escales', escalesRoutes);
const typesimulationRoutes = require('./routes/typesimulation');
app.use('/api/typesimulations', typesimulationRoutes);
const simulateurRoutes = require('./routes/simulateur');
app.use('/api/simulateurs', simulateurRoutes);
const naturevolRoutes = require('./routes/naturevol');
app.use('/api/natures_vols', naturevolRoutes);
const tronconRoutes = require('./routes/troncon');
app.use('/api/troncons', tronconRoutes);

// ✅ Importation des routes
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
const userRoutes = require("./routes/users"); // Corrected path to match the file name
const typeavion = require("./routes/typeavion"); // Corrected path to match the file name
const gradesRoutes = require('./routes/grades');
const reseauxRoutes = require('./routes/reseaux'); // ← ajouter cette ligne

const contratsRoutes = require('./routes/contrats');


// ✅ Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/pn", pnRoutes);
app.use("/api/bases", bases);
app.use('/api/positions', positionsRouter); 
app.use("/api", referencesRoutes);
app.use("/api/acnature", acnatureRoutes);
app.use("/api/vols", volsRoutes);
app.use("/api/equipage", equipageRoutes);
app.use("/api/simulations", simulationsRoutes);
app.use("/api/participationsim", participationsimRoutes);
app.use("/api/tablesimulation", tablesimulationsRoutes);
app.use("/api/pr", pr);
app.use("/api/users", userRoutes); // User management routes
app.use('/api/typeavions',typeavion);
app.use('/api/grades', gradesRoutes);
app.use('/api/contrats', contratsRoutes);
const rolesRoutes = require('./routes/roles');
app.use('/api/reseaux', reseauxRoutes); // ← connecter la route
app.use('/api/roles', rolesRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur détectée :", err.message);
  res.status(500).json({ error: err.message });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
