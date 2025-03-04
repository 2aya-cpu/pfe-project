const db = require("../db");

class Contrat {
  static async getAllContrats() {
    const [rows] = await db.query("SELECT * FROM contrats");
    return rows;
  }
}

module.exports = Contrat;
