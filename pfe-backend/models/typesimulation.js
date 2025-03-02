const TypeSimulation = sequelize.define('TypeSimulation', {
    code_typesimulation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_typesimulation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'typesimulations',
    timestamps: false,
  });