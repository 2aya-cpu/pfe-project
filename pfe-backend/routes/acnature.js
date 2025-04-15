const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
    const { date_debut, date_fin } = req.query;

    if (!date_debut || !date_fin) {
        console.warn("⚠️ Paramètres manquants ou incorrects");
        return res.status(400).json({ message: "Paramètres manquants ou incorrects" });
    }

    console.log("📅 Paramètres reçus - Date début :", date_debut, ", Date fin :", date_fin);

    const query = `
        SELECT 
            n.lib_nature, 
            COALESCE(COUNT(v.id), 0) AS nombre_vols, 
            COALESCE(SEC_TO_TIME(SUM(TIME_TO_SEC(v.temps_vol))), '00:00:00') AS heures_vol
        FROM natures_vols n
        LEFT JOIN vols v ON n.code_nature = v.code_nature
        WHERE v.date_vol BETWEEN ? AND ?
        GROUP BY n.lib_nature;
    `;

    db.query(query, [date_debut, date_fin], (err, results) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }

        console.log("✅ Résultats SQL :", results);
        res.json(results);
    });
});

module.exports = router;
