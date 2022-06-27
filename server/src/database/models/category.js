const categorySchema = (sequelize, DataTypes) => {
  const categorySchema = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, { timestamps: false });

  return categorySchema;
}

module.exports = categorySchema;