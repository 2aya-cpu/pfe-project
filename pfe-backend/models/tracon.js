const db = require("../db");

class Troncon {
  static async getAllTroncons() {
    const [rows] = await db.query("SELECT * FROM troncons");
    return rows;
  }
}

module.exports = Troncon;
