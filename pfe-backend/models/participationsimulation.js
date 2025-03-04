const db = require("../db");

class ParticipationSimulation {
  static async getAllParticipationsSimulations() {
    const [rows] = await db.query("SELECT * FROM participationsimulation");
    return rows;
  }
}

module.exports = ParticipationSimulation;
