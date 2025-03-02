const Simulateur = sequelize.define('Simulateur', {
  code_simulateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lib_simulateur: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'simulateurs',
  timestamps: false,
});