const db = require("../db");

class Grade {
  static async getAllGrades() {
    const [rows] = await db.query("SELECT * FROM grades");
    return rows;
  }
}

module.exports = Grade;
