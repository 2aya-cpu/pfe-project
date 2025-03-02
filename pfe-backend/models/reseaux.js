const Reseau = sequelize.define('Reseau', {
    code_reseau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_reseau: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'reseaux',
    timestamps: false,
  });