const db = require("../db");

class Simulation {
  static async getAllSimulations() {
    const [rows] = await db.query("SELECT * FROM simulations");
    return rows;
  }
}

module.exports = Simulation;
