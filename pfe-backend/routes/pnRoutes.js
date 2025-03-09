const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Récupérer tous les PN
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM personnel_navigants");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des PN :", err);
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
    code_base,
    code_contrat,
    code_grade,
    lib_qualification,
  } = req.body;
  
  try {
    const sql = `
      INSERT INTO personnel_navigants 
      (matricule_pn, nom, prenom, encadrement, instructeur, date_sortie, code_base, code_contrat, code_grade, lib_qualification)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      matricule_pn,
      nom,
      prenom,
      encadrement,
      instructeur,
      date_sortie,
      code_base,
      code_contrat,
      code_grade,
      lib_qualification,
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
    code_base,
    code_contrat,
    code_grade,
    lib_qualification,
  } = req.body;
  
  try {
    const sql = `
      UPDATE personnel_navigants 
      SET nom=?, prenom=?, encadrement=?, instructeur=?, date_sortie=?, 
          code_base=?, code_contrat=?, code_grade=?, lib_qualification=? 
      WHERE matricule_pn=?
    `;
    const values = [
      nom,
      prenom,
      encadrement,
      instructeur,
      date_sortie,
      code_base,
      code_contrat,
      code_grade,
      lib_qualification,
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
