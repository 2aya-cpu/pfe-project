const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🔍 Rechercher et afficher les participations
router.get("/", async (req, res) => {
    try {
        const search = req.query.search || "";
        console.log(`🔍 Recherche reçue : '${search}'`);

        const sql = `
            SELECT p.code_participation, v.num_voyage, v.etape, v.date_vol, 
                   a.lib_appareil, pn.matricule_pn, pn.nom, pn.prenom, 
                   g.lib_grade AS grade, pos.lib_position AS position
            FROM participations p
            JOIN vols v ON p.id = v.id
            JOIN appareils a ON v.matricule_app = a.matricule_app
            JOIN personnel_navigants pn ON p.matricule_pn = pn.matricule_pn
            JOIN positions pos ON p.code_position = pos.code_position
            JOIN grades g ON pn.code_grade = g.code_grade
            WHERE v.num_voyage LIKE ? 
               OR pn.nom LIKE ? 
               OR pn.prenom LIKE ? 
               OR g.lib_grade LIKE ?`;

        console.log("🔍 Exécution de la requête SQL...");
        
        const [results] = await db.execute(sql, [
            `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`
        ]);

        console.log(`✅ Nombre de résultats : ${results.length}`);
        res.json(results);
    } catch (err) {
        console.error("❌ Erreur SQL :", err);
        res.status(500).json({ error: err.message });
    }
});





// ✏ Modifier une participation
router.put("/:id", (req, res) => {
    const { matricule_pn, code_position } = req.body;
    const sql = "UPDATE participations SET matricule_pn = ?, code_position = ? WHERE code_participation = ?";

    db.query(sql, [matricule_pn, code_position, req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Participation mise à jour avec succès" });
    });
});

// 🗑 Supprimer une participation
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM participations WHERE code_participation = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Participation supprimée avec succès" });
    });
});

module.exports = router;
