const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Utiliser 'pool' partout

// 🔹 Récupérer la liste des PN disponibles
router.get('/pn', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT matricule_pn, nom, prenom FROM personnel_navigants');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Récupérer la liste des positions disponibles
router.get('/positions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM positions');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Enregistrer la participation d'un équipage à une simulation
// 🔹 Enregistrer la participation d'un équipage à la dernière simulation insérée
router.post('/ajouter-simulation', async (req, res) => {
    const { equipage } = req.body;

    if (!Array.isArray(equipage) || equipage.length === 0) {
        return res.status(400).json({ success: false, message: "Données invalides : Vérifiez equipage" });
    }

    try {
        // 🔹 Récupérer le dernier num_simulation inséré
        const [lastSimulation] = await pool.query(
            "SELECT num_simulation FROM simulations ORDER BY num_simulation DESC LIMIT 1"
        );

        if (lastSimulation.length === 0) {
            return res.status(400).json({ error: "Aucune simulation trouvée." });
        }

        const num_simulation = lastSimulation[0].num_simulation;
        console.log(`📌 Utilisation du dernier num_simulation: ${num_simulation}`);

        // 🔹 Insérer chaque membre de l'équipage
        for (const member of equipage) {
            await pool.query(
                "INSERT INTO participationsimulation (code_simulation, matricule_pn, code_position) VALUES (?, ?, ?)",
                [num_simulation, member.matricule_pn, member.code_position]
            );
        }

        res.json({ success: true, message: "Participations ajoutées avec succès", num_simulation });
    } catch (error) {
        console.error("Erreur lors de l'ajout des participations :", error);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
});
router.get('/last', async (req, res) => {
    try {
        const [lastSim] = await pool.query(
            "SELECT * FROM simulations ORDER BY num_simulation DESC LIMIT 1"
        );

        if (lastSim.length === 0) {
            return res.status(404).json({ error: "Aucune simulation trouvée." });
        }

        res.json(lastSim[0]); // 🔹 Retourne la dernière simulation
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});
// 🔹 Récupérer les participants d'une simulation spécifique
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                p.code_participationsimulation,  -- Ajout du code de participation
                p.matricule_pn, 
                pn.nom, 
                pn.prenom, 
                g.lib_grade AS grade,             -- Ajout du grade
                pos.lib_position AS position  -- Ajout de la position
            FROM participationsimulation p
            JOIN personnel_navigants pn ON p.matricule_pn = pn.matricule_pn
            JOIN grades g ON pn.code_grade = g.code_grade 
            JOIN positions pos ON p.code_position = pos.code_position
            WHERE p.code_simulation = ?`;
        
        const [rows] = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucun participant trouvé pour cette simulation." });
        }

        res.json(rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des participants :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
router.delete('/participation/:code_participationsimulation', async (req, res) => {
    const { code_participationsimulation } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM participationsimulation WHERE code_participationsimulation = ?", [code_participationsimulation]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "❌ Aucun participant trouvé avec cet ID." });
        }

        res.json({ success: true, message: "✅ Participant supprimé avec succès." });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


router.put('/:code_participation', async (req, res) => {
    try {
        const { code_participation } = req.params;
        const { matricule_pn, code_position } = req.body;

        if (!matricule_pn || !code_position) {
            return res.status(400).json({ error: "Données invalides" });
        }

        const result = await pool.query(
            "UPDATE participationsimulation SET matricule_pn = ?, code_position = ? WHERE code_participationsimulation = ?",
            [matricule_pn, code_position, code_participation]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Participation non trouvée." });
        }

        res.json({ success: true, message: "Participation mise à jour avec succès." });
    } catch (error) {
        console.error("❌ Erreur lors de la modification :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


// Récupérer toutes les positions
router.get('/positions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT code_position, lib_position FROM positions');
    res.json(rows);
  } catch (error) {
    console.error("❌ Erreur récupération positions :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


module.exports = router;
