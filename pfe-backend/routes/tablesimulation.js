const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ✅ Route pour récupérer tous les types de simulation (Mise avant `/:id`)
router.get("/typesimulation", async (req, res) => {
    try {
        const [types] = await pool.query("SELECT * FROM typesimulations");
        res.json(types);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des types de simulation :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// ✅ Route pour récupérer tous les simulateurs (Mise avant `/:id`)
router.get("/simulateurs", async (req, res) => {
    try {
        const [simulateurs] = await pool.query("SELECT * FROM simulateurs");
        res.json(simulateurs);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des simulateurs :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// ✅ Récupérer toutes les simulations avec recherche par numéro, type ou simulateur
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let query = `
            SELECT 
                s.num_simulation, 
                t.lib_typesimulation, 
                sim.lib_simulateur, 
                s.date_simulation, 
                s.heure_debut, 
                s.heure_fin, 
                s.duree
            FROM simulations s
            JOIN typesimulations t ON s.code_typesimulation = t.code_typesimulation
            JOIN simulateurs sim ON s.code_simulateur = sim.code_simulateur
        `;
        let values = [];

        if (search) {
            query += `
                WHERE 
                    s.num_simulation LIKE ? OR
                    LOWER(t.lib_typesimulation) LIKE ? OR
                    LOWER(sim.lib_simulateur) LIKE ?
            `;
            const likeSearch = `%${search.toLowerCase()}%`;
            values.push(likeSearch, likeSearch, likeSearch);
        }

        const [rows] = await pool.query(query, values);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});


// ✅ Récupérer une seule simulation par ID (mis après les routes spécifiques)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📌 ID reçu pour la recherche : ${id}`); // Debug

        const [rows] = await pool.query("SELECT * FROM simulations WHERE num_simulation = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Simulation non trouvée." });
        }

        res.json(rows[0]); // Retourne la simulation trouvée
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// ✅ Ajouter une simulation
router.post("/", async (req, res) => {
    try {
        const { code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree } = req.body;
        const query = `
            INSERT INTO simulations (code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree)
            VALUES (?, ?, ?, ?, ?, ?)`;
        await pool.query(query, [code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree]);
        res.status(201).json({ message: "Simulation ajoutée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

// ✅ Modifier une simulation
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { lib_typesimulation, lib_simulateur, date_simulation, heure_debut, heure_fin, duree } = req.body;

        console.log("📌 Données reçues pour modification :", req.body); // ✅ Debug

        // 🔍 Trouver le code_typesimulation depuis son libellé
        const [typeRows] = await pool.query(
            "SELECT code_typesimulation FROM typesimulations WHERE lib_typesimulation = ?",
            [lib_typesimulation]
        );
        if (typeRows.length === 0) {
            return res.status(400).json({ error: "Type de simulation introuvable." });
        }
        const code_typesimulation = typeRows[0].code_typesimulation;

        // 🔍 Trouver le code_simulateur depuis son libellé
        const [simRows] = await pool.query(
            "SELECT code_simulateur FROM simulateurs WHERE lib_simulateur = ?",
            [lib_simulateur]
        );
        if (simRows.length === 0) {
            return res.status(400).json({ error: "Simulateur introuvable." });
        }
        const code_simulateur = simRows[0].code_simulateur;

        // ✅ Mettre à jour la simulation avec les codes trouvés
        const query = `
            UPDATE simulations 
            SET code_typesimulation=?, code_simulateur=?, date_simulation=?, heure_debut=?, heure_fin=?, duree=? 
            WHERE num_simulation=?
        `;
        const [result] = await pool.query(query, [code_typesimulation, code_simulateur, date_simulation, heure_debut, heure_fin, duree, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Simulation non trouvée." });
        }

        res.json({ message: "Simulation modifiée avec succès" });
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour :", error);
        res.status(500).send("Erreur serveur");
    }
});



// ✅ Supprimer une simulation
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM simulations WHERE num_simulation = ?", [id]);
        res.json({ message: "Simulation supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
