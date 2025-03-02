const TypeAvion = sequelize.define('TypeAvion', {
    code_typeavion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_typeavion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'typeavions',
    timestamps: false,
  });