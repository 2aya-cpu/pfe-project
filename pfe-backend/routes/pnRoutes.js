const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Récupérer tous les PN
// Récupérer tous les PN avec les libellés des bases, contrats et grades
router.get("/", async (req, res) => {
  console.log("Données reçues pour ajout :", req.body); // Ajout du log
  try {
    const sql = `
      SELECT pn.*, 
             b.lib_base, 
             c.lib_contrat, 
             g.lib_grade
      FROM personnel_navigants pn
      LEFT JOIN bases b ON pn.code_base = b.code_base
      LEFT JOIN contrats c ON pn.code_contrat = c.code_contrat
      LEFT JOIN grades g ON pn.code_grade = g.code_grade
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des PN :", err);
    res.status(500).json({ error: err.message });
  }
});

// Récupérer toutes les bases
router.get("/bases", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT code_base, lib_base FROM bases");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des bases :", err);
    res.status(500).json({ error: err.message });
  }
});

// Récupérer tous les contrats
router.get("/contrats", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT code_contrat, lib_contrat FROM contrats");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des contrats :", err);
    res.status(500).json({ error: err.message });
  }
});

// Récupérer tous les grades
router.get("/grades", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT code_grade, lib_grade FROM grades");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des grades :", err);
    res.status(500).json({ error: err.message });
  }
});


// Ajouter un PN
router.post("/", async (req, res) => {
  const {
    matricule_pn,
    nom,
    prenom,
    encadrement,
    instructeur,
    date_sortie,
    code_base, // Utiliser l'ID et non le libellé
    code_contrat,
    code_grade,
    lib_qualification,
    groupe_socioprofessionnel,
  } = req.body;
  
  try {
    const sql = `
      INSERT INTO personnel_navigants 
      (matricule_pn, nom, prenom, encadrement, instructeur, date_sortie, code_base, code_contrat, code_grade, lib_qualification, groupe_socioprofessionnel)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      matricule_pn,
      nom,
      prenom,
      encadrement,
      instructeur,
      date_sortie,
      code_base, // Ici on enregistre l'ID
      code_contrat,
      code_grade,
      lib_qualification,
      groupe_socioprofessionnel,
    ];
    await db.query(sql, values);
    res.json({ message: "PN ajouté avec succès !" });
  } catch (err) {
    console.error("Erreur lors de l'ajout d'un PN :", err);
    res.status(500).json({ error: err.message });
  }
});


// Modifier un PN
router.put("/:matricule_pn", async (req, res) => {
  const { matricule_pn } = req.params;
  const {
    nom,
    prenom,
    encadrement,
    instructeur,
    date_sortie,
    code_base, // Utilisation des IDs
    code_contrat,
    code_grade,
    lib_qualification,
    groupe_socioprofessionnel
  } = req.body;
  
  try {
    const sql = `
      UPDATE personnel_navigants 
      SET nom=?, prenom=?, encadrement=?, instructeur=?, date_sortie=?, 
          code_base=?, code_contrat=?, code_grade=?, lib_qualification=?, groupe_socioprofessionnel=?
      WHERE matricule_pn=?
    `;
    const values = [
      nom,
      prenom,
      encadrement,
      instructeur,
      date_sortie,
      code_base, // Ici on met l'ID et non le libellé
      code_contrat,
      code_grade,
      lib_qualification,
      groupe_socioprofessionnel,
      matricule_pn,
    ];
    await db.query(sql, values);
    res.json({ message: "PN modifié avec succès !" });
  } catch (err) {
    console.error("Erreur lors de la modification du PN :", err);
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un PN
router.delete("/:matricule_pn", async (req, res) => {
  const { matricule_pn } = req.params;
  console.log("Matricule reçu :", matricule_pn);

  try {
    const sql = "DELETE FROM personnel_navigants WHERE matricule_pn=?";
    await db.query(sql, [matricule_pn]);
    res.json({ message: "PN supprimé avec succès !" });
  } catch (err) {
    console.error("Erreur lors de la suppression du PN :", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;