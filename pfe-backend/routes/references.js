const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🔹 Récupérer les tronçons
router.get("/troncons", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT code_troncon, lib_troncon FROM troncons");
        res.json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des tronçons :", err);
        res.status(500).send("Erreur serveur");
    }
});

// 🔹 Récupérer les natures
router.get("/natures", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT code_nature, lib_nature FROM natures_vols");
        res.json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des natures :", err);
        res.status(500).send("Erreur serveur");
    }
});

// 🔹 Récupérer les appareils
router.get("/appareils", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT matricule_app, lib_appareil FROM appareils");
        res.json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des appareils :", err);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
