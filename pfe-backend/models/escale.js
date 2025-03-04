const db = require("../db");

class Escale {
  static async getAllEscales() {
    const [rows] = await db.query("SELECT * FROM escales");
    return rows;
  }
}

module.exports = Escale;
