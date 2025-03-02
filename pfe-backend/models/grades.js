const Grade = sequelize.define('Grade', {
    code_grade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_grade: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'grades',
    timestamps: false,
  });