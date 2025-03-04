const db = require("../db");

class Role {
  static async getAllRoles() {
    const [rows] = await db.query("SELECT * FROM roles");
    return rows;
  }
}

module.exports = Role;
