const express = require('express');
const router = express.Router();
const pool = require('../config/db');



// 🔹 Récupérer la liste des positions disponibles
router.get('/positions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM positions');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});router.get('/grades', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM grades');
        res.json(rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des grades :", error);
        res.status(500).send('Erreur serveur');
    }
});


// 🔹 Récupérer le dernier vol inséré dans `volreel`
router.get('/dernier-vol', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vols ORDER BY id DESC LIMIT 1');
        if (rows.length === 0) {
            return res.status(404).json({ error: "Aucun vol trouvé" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Récupérer la liste des PN (personnel navigant) disponibles
router.get('/pn', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT matricule_pn, nom, prenom FROM personnel_navigants');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Récupérer un équipage pour un vol spécifique
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📡 Requête reçue pour équipage du vol ID : ${id}`);

        const sql = `
            SELECT p.code_participation, pn.matricule_pn, pn.nom, pn.prenom, 
                   g.lib_grade AS grade, pos.lib_position AS position
            FROM participations p
            JOIN personnel_navigants pn ON p.matricule_pn = pn.matricule_pn
            JOIN positions pos ON p.code_position = pos.code_position
            JOIN grades g ON pn.code_grade = g.code_grade
            WHERE p.id = ?`;

        const [results] = await pool.query(sql, [id]);

        if (results.length === 0) {
            console.warn(`⚠️ Aucun équipage trouvé pour le vol ${id}`);
            return res.status(404).json({ error: "Aucun équipage trouvé pour ce vol" });
        }

        res.json(results);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: error.message });
    }
});
// 🔹 Enregistrer un équipage pour un vol
router.post('/ajouter', async (req, res) => {
    console.log("Requête reçue :", req.body);

    try {
        const { id, equipage } = req.body; // `equipage` est une liste de PN et leur position

        if (!id || !Array.isArray(equipage) || equipage.length !== 4) {
            return res.status(400).json({ error: 'Données invalides' });
        }

        for (const pn of equipage) {
            await pool.query(
                'INSERT INTO participations (id, matricule_pn, code_position) VALUES (?, ?, ?)', 
                [ id, pn.matricule_pn, pn.code_position ] // ✅ Utilisation correcte de `id_vol`
            );
        }

        res.status(201).json({ message: 'Équipage enregistré avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🚀 Supprimer un participant en utilisant son code_participation
router.delete('/participants/:code_participation', async (req, res) => {
    try {
        const { code_participation } = req.params;
        console.log(`🗑 Suppression du participant ${code_participation}`);

        const sql = `DELETE FROM participations WHERE code_participation = ?`;
        const [result] = await pool.query(sql, [code_participation]);

        if (result.affectedRows === 0) {
            console.warn(`⚠️ Aucun participant trouvé avec ce code`);
            return res.status(404).json({ error: "Aucun participant trouvé" });
        }

        res.json({ message: "Participant supprimé avec succès" });
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:code_participation', async (req, res) => {
    try {
        const { code_participation } = req.params;
        const { matricule_pn, code_position } = req.body;
        console.log("Données reçues :", req.body); // Ajoutez ce log pour voir les données envoyées par le client

        if (!matricule_pn || !code_position) {
            return res.status(400).json({ error: "Données invalides" });
        }

        const result = await pool.query(
            "UPDATE participations SET matricule_pn = ?, code_position = ? WHERE code_participation = ?",
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



  


module.exports = router;
