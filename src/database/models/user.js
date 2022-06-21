const userSchema = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  userTable.associate = (models) => {
    userTable.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'posts',
    });
  }

  return userTable;
}

module.exports = userSchema;