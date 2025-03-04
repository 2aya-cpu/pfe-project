const db = require("../db");

class Vol {
  static async getAllVols() {
    const [rows] = await db.query("SELECT * FROM vols");
    return rows;
  }
}

module.exports = Vol;
