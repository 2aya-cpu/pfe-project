const db = require("../db");

class TypeAvion {
  static async getAllTypes() {
    const [rows] = await db.query("SELECT * FROM typeavions");
    return rows;
  }
}

module.exports = TypeAvion;
