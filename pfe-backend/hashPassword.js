const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "nouveauMotDePasse"; // Remplace par un mot de passe connu
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Mot de passe haché :", hashedPassword);
}

generateHash();
