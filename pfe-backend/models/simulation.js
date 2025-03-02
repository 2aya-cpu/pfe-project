const Simulation = sequelize.define('Simulation', {
    num_simulation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_typesimulation: {
      type: DataTypes.INTEGER,
    },
    code_simulateur: {
      type: DataTypes.INTEGER,
    },
    date_simulation: {
      type: DataTypes.DATE,
    },
    heure_debut: {
      type: DataTypes.TIME,
    },
    heure_fin: {
      type: DataTypes.TIME,
    },
    duree: {
      type: DataTypes.TIME,
    },
  }, {
    tableName: 'simulations',
    timestamps: false,
  });
  
  // Relations
  Simulation.belongsTo(TypeSimulation, { foreignKey: 'code_typesimulation' });
  Simulation.belongsTo(Simulateur, { foreignKey: 'code_simulateur' });