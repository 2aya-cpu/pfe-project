const db = require("../db");

class Participation {
  static async getAllParticipations() {
    const [rows] = await db.query("SELECT * FROM participations");
    return rows;
  }
}

module.exports = Participation;
