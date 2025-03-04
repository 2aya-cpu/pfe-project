const db = require("../config/db");

class User {
  // Récupérer un utilisateur par email
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;  // Retourne l'utilisateur trouvé ou null
  }

  // Créer un utilisateur
  static async create({ name, email, password, id_role }) {
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, id_role) VALUES (?, ?, ?, ?)",
      [name, email, password, id_role]
    );

    if (result.affectedRows > 0) {
      return { id: result.insertId, name, email, id_role };
    }
    return null;
  }

  // Récupérer tous les utilisateurs
  static async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }

  // Mettre à jour un utilisateur
  static async updateUser(id, { name, email, id_role }) {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, id_role = ? WHERE id = ?",
      [name, email, id_role, id]
    );
    return result.affectedRows > 0; // Retourne true si mis à jour
  }

  // Supprimer un utilisateur
  static async deleteUser(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0; // Retourne true si supprimé
  }
}

module.exports = User;
