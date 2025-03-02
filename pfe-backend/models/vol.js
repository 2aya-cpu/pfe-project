const Vol = sequelize.define('Vol', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    num_voyage: {
      type: DataTypes.STRING(50),
    },
    etape: {
      type: DataTypes.STRING(50),
    },
    date_vol: {
      type: DataTypes.DATE,
    },
    code_troncon: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'vols',
    timestamps: false,
  });
  
  // Relation : Un vol appartient à un tronçon
  Vol.belongsTo(Troncon, { foreignKey: 'code_troncon' });