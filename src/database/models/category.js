const categorySchema = (sequelize, DataTypes) => {
  const categorySchema = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING
  }, { timestampes: false });

  return categorySchema;
}

module.exports = categorySchema;