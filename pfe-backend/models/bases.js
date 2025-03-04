const db = require("../db");

class Base {
  static async getAllBases() {
    const [rows] = await db.query("SELECT * FROM bases");
    return rows;
  }
}

module.exports = Base;
