const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER, // Type de données : nombre entier
      primaryKey: true,       // Clé primaire (identifiant unique)
      autoIncrement: true,    // Auto-incrémenté (1, 2, 3, ...)
    },
    description: {
      type: DataTypes.STRING(255), // Type de données : chaîne de caractères (max 255)
      allowNull: false,            // Ce champ ne peut pas être vide
    },
  }, {
    tableName: 'roles', // Nom de la table dans la base de données
    timestamps: false,  // Désactiver les champs `createdAt` et `updatedAt`
  });