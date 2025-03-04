const db = require("../db");

class Reseau {
  static async getAllReseaux() {
    const [rows] = await db.query("SELECT * FROM reseaux");
    return rows;
  }
}

module.exports = Reseau;
