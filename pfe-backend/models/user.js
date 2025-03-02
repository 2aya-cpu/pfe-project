const db = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;
  }

  static async create(email, password) {
    return db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
  }
}

module.exports = User;
