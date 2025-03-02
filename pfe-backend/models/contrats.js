const Contrat = sequelize.define('Contrat', {
    code_contrat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_contrat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'contrats',
    timestamps: false,
  });