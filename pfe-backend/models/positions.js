const db = require("../db");

class Position {
  static async getAllPositions() {
    const [rows] = await db.query("SELECT * FROM positions");
    return rows;
  }
}

module.exports = Position;
