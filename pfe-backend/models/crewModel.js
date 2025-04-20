const db = require("../config/db");

// Ajouter un équipage
exports.addCrew = (crewData, callback) => {
  const { num_vol, matricule_pilote, matricule_copilote, matricule_hotesse, date_affectation } = crewData;
  
  const query = `
    INSERT INTO equipage (num_vol, matricule_pilote, matricule_copilote, matricule_hotesse, date_affectation)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [num_vol, matricule_pilote, matricule_copilote, matricule_hotesse, date_affectation], callback);
};

// Récupérer l’équipage d’un vol
exports.getCrewByFlight = (num_vol, callback) => {
  const query = `SELECT * FROM equipage WHERE num_vol = ?`;
  db.query(query, [num_vol], callback);
};
