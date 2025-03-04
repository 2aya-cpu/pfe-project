const db = require("../db");

class Simulateur {
  static async getAllSimulateurs() {
    const [rows] = await db.query("SELECT * FROM simulateurs");
    return rows;
  }
}

module.exports = Simulateur;
