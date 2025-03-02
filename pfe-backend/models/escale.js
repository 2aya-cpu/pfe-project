const Escale = sequelize.define('Escale', {
    code_escale: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_reseau: {
      type: DataTypes.INTEGER,
    },
    lib_escale: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'escales',
    timestamps: false,
  });
  
  // Relation : Une escale appartient à un réseau
  Escale.belongsTo(Reseau, { foreignKey: 'code_reseau' });