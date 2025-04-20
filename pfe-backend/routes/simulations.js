const express = require("express");
const router = express.Router();
const db = require("../config/db"); 


router.post('/add', async (req, res) => {
    const { code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree } = req.body;

    try {
        // Vérifier si `code_typesimulation` existe
        const [typeCheck] = await db.query("SELECT * FROM typesimulations WHERE code_typesimulation = ?", [code_typesimulation]);

        // Si `code_typesimulation` n'existe pas, l'insérer d'abord
        if (typeCheck.length === 0) {
            await db.query("INSERT INTO typesimulations (code_typesimulation, lib_typesimulation) VALUES (?, ?)", 
            [code_typesimulation, `Type ${code_typesimulation}`]);
            console.log(`Ajout automatique de typesimulation: ${code_typesimulation}`);
        }

        // 🔹 Vérifier si `code_simulateur` existe
        const [simulatorCheck] = await db.query("SELECT * FROM simulateurs WHERE code_simulateur = ?", [code_simulateur]);

        // 🔹 Si `code_simulateur` n'existe pas, l'ajouter automatiquement
        if (simulatorCheck.length === 0) {
            await db.query(
                "INSERT INTO simulateurs (code_simulateur, lib_simulateur) VALUES (?, ?)", 
                [code_simulateur, `Simulateur ${code_simulateur}`]
            );
            console.log(`Ajout automatique du simulateur: ${code_simulateur}`);
        }

        // 🔹 Maintenant, insérer la simulation
        const [result] = await db.query(
            "INSERT INTO simulations (code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree) VALUES (?, ?, ?, ?, ?, ?)", 
            [code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree]
        );

        res.json({ success: true, message: "Simulation ajoutée avec succès", simulationId: result.insertId });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la simulation :", error);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
});

// Route pour obtenir les heures de simulation PNT par secteur avec recherche par date
// Route pour obtenir les heures de simulation PNT par secteur
router.get("/stats/pnt", async (req, res) => {
        const { dateDebut, dateFin } = req.query;
    
        try {
            const [results] = await db.query(`
                SELECT p.nom, p.prenom, p.matricule_pn, p.groupe_socioprofessionnel, 
                       s.num_simulation, s.date_simulation, 
                       SEC_TO_TIME(SUM(TIME_TO_SEC(s.duree))) AS heures_simulation,
                       COUNT(s.num_simulation) AS nombre_simulations
                FROM personnel_navigants p
                LEFT JOIN participationsimulation pa ON p.matricule_pn = pa.matricule_pn
                LEFT JOIN simulations s ON pa.code_simulation = s.num_simulation
                WHERE p.groupe_socioprofessionnel = 'technique'
                ${dateDebut && dateFin ? "AND s.date_simulation BETWEEN ? AND ?" : ""}
                GROUP BY p.matricule_pn, s.num_simulation
            `, dateDebut && dateFin ? [dateDebut, dateFin] : []);
    
            // Calculer le nombre total de simulations et la somme des heures
            const totalSimulations = results.length;
            let totalHours = 0;
    
            results.forEach((result) => {
                const [hours, minutes, seconds] = result.heures_simulation.split(":").map(Number);
                totalHours += hours * 3600 + minutes * 60 + seconds;
            });
    
            // Convertir totalHours en format HH:MM:SS
            const hours = Math.floor(totalHours / 3600).toString().padStart(2, "0");
            const minutes = Math.floor((totalHours % 3600) / 60).toString().padStart(2, "0");
            const seconds = (totalHours % 60).toString().padStart(2, "0");
            const totalTime = `${hours}:${minutes}:${seconds}`;
    
            // Retourner les résultats avec les statistiques de simulation
            res.json({
                simulations: results,
                totalSimulations,
                totalHours: totalTime,
            });
        } catch (error) {
            console.error("❌ Erreur SQL :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    });
    // Récupérer tous les personnels navigants
router.get('/personnels', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT matricule_pn, nom, prenom, code_grade FROM personnel_navigants');
      res.json(rows);
    } catch (error) {
      console.error("❌ Erreur récupération personnels :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });




module.exports = router;
