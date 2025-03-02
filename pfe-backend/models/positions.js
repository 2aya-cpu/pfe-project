const Position = sequelize.define('Position', {
    code_position: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_position: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'positions',
    timestamps: false,
  });