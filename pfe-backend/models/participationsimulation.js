const ParticipationSimulation = sequelize.define('ParticipationSimulation', {
    code_participationsimulation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_simulation: {
      type: DataTypes.INTEGER,
    },
    matricule_pn: {
      type: DataTypes.INTEGER,
    },
    code_position: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'participationsimulation',
    timestamps: false,
  });
  
  // Relations
  ParticipationSimulation.belongsTo(Simulation, { foreignKey: 'code_simulation' });
  ParticipationSimulation.belongsTo(PersonnelNavigant, { foreignKey: 'matricule_pn' });
  ParticipationSimulation.belongsTo(Position, { foreignKey: 'code_position' });