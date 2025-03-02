const Troncon = sequelize.define('Troncon', {
    code_troncon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_troncon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code_escale_depart: {
      type: DataTypes.INTEGER,
    },
    code_escale_arrivee: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'troncons',
    timestamps: false,
  });
  
  // Relations
  Troncon.belongsTo(Escale, { foreignKey: 'code_escale_depart', as: 'Depart' });
  Troncon.belongsTo(Escale, { foreignKey: 'code_escale_arrivee', as: 'Arrivee' });