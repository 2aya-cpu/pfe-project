const Participation = sequelize.define('Participation', {
    code_participation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_vol: {
      type: DataTypes.INTEGER,
    },
    matricule_pn: {
      type: DataTypes.INTEGER,
    },
    code_position: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'participations',
    timestamps: false,
  });
  
  // Relations
  Participation.belongsTo(Vol, { foreignKey: 'id_vol' });
  Participation.belongsTo(PersonnelNavigant, { foreignKey: 'matricule_pn' });
  Participation.belongsTo(Position, { foreignKey: 'code_position' });