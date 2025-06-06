const mysql = require("mysql2");
const bcrypt = require("bcrypt");

// Connexion à la base de données
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Modifie si nécessaire
  password: "", // Ajoute le mot de passe si nécessaire
  database: "pfe_db",
});

// Fonction pour hasher les mots de passe
const hashPassword = (password) => bcrypt.hashSync(password, 10);

// Données des rôles (L'ID est auto-incrémenté par MySQL)
const roles = [
  ["Admin"],
  ["Agent de saisie"],
];

// Données des utilisateurs (Admin & Agent de saisie)
const users = [
  ["Admin", "admin@example.com", "actif", hashPassword("admin123"), 1], // Admin (id_role = 1)
  ["Agent", "agent@example.com", "actif", hashPassword("agent123"), 2], // Agent de saisie (id_role = 2)
];

// Données du personnel navigant
const personnelNavigants = [
  [1, "Benyoucef", "Ali", "Oui", "Non", "2028-12-31", 1, 1, 1, "Boeing 737"],
  [2, "Amrani", "Sofia", "Non", "Oui", "2030-06-15", 2, 1, 2, "Airbus A320"],
  [3, "Dali", "Karim", "Oui", "Oui", "2027-09-20", 1, 2, 3, "Boeing 787"],
  [4, "Belhadj", "Nour", "Non", "Non", "2032-01-10", 2, 3, 4, "ATR 72"]
];

// Fonction pour insérer les rôles et récupérer leurs ID
const insertRoles = async () => {
  for (let role of roles) {
    await connection.promise().query("INSERT INTO roles (description) VALUES (?)", role);
  }
};

// Fonction pour insérer les utilisateurs
const insertUsers = async () => {
  for (let user of users) {
    await connection
      .promise()
      .query("INSERT INTO users (name, email, etat, password, id_role) VALUES (?, ?, ?, ?, ?)", user);
  }
};

// Fonction pour insérer le personnel navigant
const insertPersonnelNavigants = async () => {
  try {
    for (let personnel of personnelNavigants) {
      await connection
        .promise()
        .query(
          `INSERT INTO personnel_navigants 
            (matricule_pn, nom, prenom, encadrement, instructeur, date_sortie, code_base, code_contrat, code_grade, lib_qualification) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          personnel
        );
    }
    console.log("✅ Personnel navigant data inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting personnel navigant:", err);
  }
};

const insertData = async () => {
  try {
    // Insert roles and users if needed
    // await insertRoles(); // Uncomment if roles need to be inserted
    // await insertUsers(); // Uncomment if users need to be inserted

    // Insert personnel navigant
    await insertPersonnelNavigants(); // Make sure this line is correct

    console.log("✅ All data inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    connection.end(); // Always close the connection
  }
};

// Run the insert data function
insertData();
