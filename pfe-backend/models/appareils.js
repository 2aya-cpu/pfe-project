const db = require("../db");

class Appareil {
  static async getAllAppareils() {
    const [rows] = await db.query("SELECT * FROM appareils");
    return rows;
  }
}

module.exports = Appareil;
