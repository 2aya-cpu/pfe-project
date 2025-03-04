const db = require("../db");

class TypeSimulation {
  static async getAllTypesSimulations() {
    const [rows] = await db.query("SELECT * FROM typesimulations");
    return rows;
  }
}

module.exports = TypeSimulation;
