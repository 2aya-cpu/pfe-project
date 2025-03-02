const Base = sequelize.define('Base', {
    code_base: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_base: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'bases',
    timestamps: false,
  });