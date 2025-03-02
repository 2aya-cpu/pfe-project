const Appareil = sequelize.define('Appareil', {
    matricule_app: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_appareil: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code_typeavion: {
      type: DataTypes.INTEGER,
    },
    date_acquisition: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'appareils',
    timestamps: false,
  });
  
  // Relation : Un appareil appartient à un type d'avion
  Appareil.belongsTo(TypeAvion, { foreignKey: 'code_typeavion' });