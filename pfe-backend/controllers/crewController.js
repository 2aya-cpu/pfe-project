const Crew = require("../models/crewModel");

// Ajouter un équipage
exports.addCrew = (req, res) => {
  const crewData = req.body;

  if (!crewData.num_vol || !crewData.matricule_pilote || !crewData.date_affectation) {
    return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
  }

  Crew.addCrew(crewData, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de l’équipage:", err);
      return res.status(500).json({ error: "Erreur serveur lors de l'ajout de l’équipage." });
    }
    res.status(201).json({ message: "Équipage ajouté avec succès !" });
  });
};

// Récupérer l’équipage d’un vol
exports.getCrewByFlight = (req, res) => {
  const { num_vol } = req.params;

  Crew.getCrewByFlight(num_vol, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de l’équipage:", err);
      return res.status(500).json({ error: "Erreur serveur lors de la récupération de l’équipage." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Aucun équipage trouvé pour ce vol." });
    }

    res.status(200).json(result);
  });
};
