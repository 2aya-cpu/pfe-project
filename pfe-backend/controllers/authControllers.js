const User = require('../models/user');  // Import du modèle User
const bcrypt = require('bcryptjs');      // Pour hacher et comparer les mots de passe
const jwt = require('jsonwebtoken');     // Pour générer un token JWT

// --- Fonction de connexion (Login) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id, role: user.id_role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Fonction d'inscription (Register) ---
exports.register = async (req, res) => {
    const { name, email, password, id_role } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.create({ name, email, password: hashedPassword, id_role });

        // Générer un token JWT
        const token = jwt.sign({ id: newUser.id, role: newUser.id_role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "Utilisateur créé avec succès", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
