const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Connexion MySQL

// Récupérer la liste des "Nature de vol"
router.get("/nature-vol", async (req, res) => {
    console.log("Requête reçue: GET /nature-vol");
    
    try {
        const [results] = await db.query("SELECT code_nature, lib_nature FROM natures_vols");
        res.json(results);
    } catch (err) {
        console.error(" Erreur SQL :", err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
});
// Route pour récupérer le nombre de vols et les heures de vol par nature
router.get("/stats-nature", async (req, res) => {
    console.log("🚀 Requête GET reçue pour /api/vols/stats-nature");
    const { date_debut, date_fin } = req.query;

    if (!date_debut || !date_fin) {
        console.warn("⚠️ Paramètres manquants ou incorrects");
        return res.status(400).json({ message: "Paramètres manquants ou incorrects" });
    }

    try {
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

        const [results] = await db.query(query, [date_debut, date_fin]);

        console.log("✅ Données récupérées :", results);
        res.json(results);
    } catch (err) {
        console.error("❌ Erreur SQL :", err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
});
router.get("/stats/avion", async (req, res) => {
    const { date_debut, date_fin } = req.query;

    try {
        const [results] = await db.query(`
            SELECT a.matricule_app, COUNT(v.id) AS nombre_vols,
                   SEC_TO_TIME(SUM(TIME_TO_SEC(v.temps_vol))) AS heures_vol
            FROM appareils a
            LEFT JOIN vols v ON a.matricule_app = v.matricule_app
            WHERE v.date_vol BETWEEN ? AND ?
            GROUP BY a.matricule_app
        `, [date_debut, date_fin]);

        res.json(results);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
router.get("/stats/pnc", async (req, res) => {
    const { date_debut, date_fin } = req.query;

    try {
        const [results] = await db.query(`
            SELECT p.nom, p.prenom, p.matricule_pn, p.groupe_socioprofessionnel, COUNT(v.id) AS nombre_vols,
                   SEC_TO_TIME(SUM(TIME_TO_SEC(v.temps_vol))) AS heures_vol
            FROM personnel_navigants p
            LEFT JOIN participations pa ON p.matricule_pn = pa.matricule_pn
            LEFT JOIN vols v ON pa.id = v.id
            WHERE p.groupe_socioprofessionnel = 'commerciale' AND v.date_vol BETWEEN ? AND ?
            GROUP BY p.matricule_pn
        `, [date_debut, date_fin]);

        res.json(results);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get("/stats/pnt", async (req, res) => {
    const { date_debut, date_fin } = req.query;

    try {
        const [results] = await db.query(`
            SELECT p.nom, p.prenom, p.matricule_pn, p.groupe_socioprofessionnel, COUNT(v.id) AS nombre_vols,
                   SEC_TO_TIME(SUM(TIME_TO_SEC(v.temps_vol))) AS heures_vol
            FROM personnel_navigants p
            LEFT JOIN participations pa ON p.matricule_pn = pa.matricule_pn
            LEFT JOIN vols v ON pa.id = v.id
            WHERE p.groupe_socioprofessionnel = 'technique' AND v.date_vol BETWEEN ? AND ?
            GROUP BY p.matricule_pn
        `, [date_debut, date_fin]);

        res.json(results);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get("/stats/pn", async (req, res) => {
    const { date_debut, date_fin } = req.query;
  
    try {
      const [results] = await db.query(`
        SELECT 
          p.nom,
          p.prenom,
          p.matricule_pn,
          p.groupe_socioprofessionnel,
          COUNT(v.id) AS nombre_vols,
          SEC_TO_TIME(SUM(TIME_TO_SEC(v.temps_vol))) AS heures_vol
        FROM personnel_navigants p
        LEFT JOIN participations pa ON p.matricule_pn = pa.matricule_pn
        LEFT JOIN vols v ON pa.id = v.id AND v.date_vol BETWEEN ? AND ?
        GROUP BY p.matricule_pn
      `, [date_debut, date_fin]);
  
      res.json(results);
    } catch (error) {
      console.error("❌ Erreur SQL :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  
// 🔹 Route pour obtenir les heures de vol et le nombre de vols par PN avec le libellé du grade
router.get("/stats/pn", async (req, res) => {
    const { date_debut, date_fin } = req.query;

    try {
        const [results] = await db.query(`
            SELECT p.nom, p.prenom, g.lib_grade AS grades, p.matricule_pn, p.groupe_socioprofessionnel, COUNT(v.id) AS nombre_vols,
                   SEC_TO_TIME(IFNULL(SUM(TIME_TO_SEC(v.temps_vol)), 0)) AS heures_vol
            FROM personnel_navigants p
            LEFT JOIN grades g ON p.code_grade = g.code_grade
            LEFT JOIN participations pa ON p.matricule_pn = pa.matricule_pn
            LEFT JOIN vols v ON pa.id = v.id
            WHERE v.date_vol BETWEEN ? AND ?
            GROUP BY p.matricule_pn
        `, [date_debut, date_fin]);
        
        res.json(results);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});



// Récupérer la liste des "Tronçons"
router.get("/troncons", async (req, res) => {
    try {
        const [results] = await db.query("SELECT code_troncon, lib_troncon FROM troncons");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer la liste des "Matricule app"
router.get("/matricule-app", async (req, res) => {
    try {
        const [results] = await db.query("SELECT matricule_app, lib_appareil FROM appareils");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un vol
router.post("/", async (req, res) => {
    try {
        const { num_voyage, etape, date_vol, code_troncon, code_nature, matricule_app, temps_vol, date_heure_depart, date_heure_arrivee } = req.body;

        // Vérifier si toutes les données sont fournies
        if (!num_voyage || !etape || !date_vol || !code_troncon || !code_nature || !matricule_app || !temps_vol || !date_heure_depart || !date_heure_arrivee) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        // Insérer le vol dans la base de données
        const sql = `
            INSERT INTO vols (num_voyage, etape, date_vol, code_troncon, code_nature, matricule_app, temps_vol, date_heure_depart, date_heure_arrivee)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [num_voyage, etape, date_vol, code_troncon, code_nature, matricule_app, temps_vol, date_heure_depart, date_heure_arrivee]);

        res.status(201).json({ message: "Vol ajouté avec succès", id: result.insertId });
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT v.id, v.num_voyage, v.etape, v.date_vol, 
                   v.code_troncon, t.lib_troncon, 
                   v.code_nature, n.lib_nature, 
                   v.matricule_app, a.lib_appareil, 
                   v.temps_vol, v.date_heure_depart, v.date_heure_arrivee
            FROM vols v
            LEFT JOIN troncons t ON v.code_troncon = t.code_troncon
            LEFT JOIN natures_vols n ON v.code_nature = n.code_nature
            LEFT JOIN appareils a ON v.matricule_app = a.matricule_app
        `);
        
        console.log("✅ Données récupérées :", rows); // Debug
        res.json(rows);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Récupérer un vol par ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            `SELECT v.id, v.num_voyage, v.etape, v.date_vol, 
                    t.lib_troncon, n.lib_nature, a.lib_appareil, 
                    v.temps_vol, v.date_heure_depart, v.date_heure_arrivee
            FROM vols v
            LEFT JOIN troncons t ON v.code_troncon = t.code_troncon
            LEFT JOIN natures_vols n ON v.code_nature = n.code_nature
            LEFT JOIN appareils a ON v.matricule_app = a.matricule_app
            WHERE v.id = ?`, [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Vol non trouvé" });
        }

        res.json(rows[0]); // Retourne le vol trouvé
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


// 🔹 Supprimer un vol
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM vols WHERE id = ?', [id]); 
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Vol non trouvé' });
        }
        res.json({ message: 'Vol supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// 🔹 Modifier un vol
router.put('/:id', async (req, res) => {
    console.log("📥 Données reçues pour modification :", req.body); // Vérification

    try {
        const { id } = req.params;
        const { num_voyage, etape, date_vol, code_troncon, code_nature, temps_vol, date_heure_depart, date_heure_arrivee, matricule_app } = req.body;

        const [result] = await db.query(
            `UPDATE vols 
             SET num_voyage=?, etape=?, date_vol=?, code_troncon=?, code_nature=?, temps_vol=?, date_heure_depart=?, date_heure_arrivee=?, matricule_app=? 
             WHERE id=?`,
            [num_voyage, etape, date_vol, code_troncon, code_nature, temps_vol, date_heure_depart, date_heure_arrivee, matricule_app, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Vol non trouvé' });
        }

        res.json({ message: 'Vol mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});



module.exports = router;
