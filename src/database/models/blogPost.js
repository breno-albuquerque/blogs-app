const blogPostSchema = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    published: DataTypes.TIMESTAMP,
    updated: DataTypes.TIMESTAMP,
  }, { timestamp: false });

  blogPostTable.associate = (models) => {
    blogPostTable.belongsTo(models.User, {
      foreignKey: 'userId', as: 'posts'
    })
  }

  return blogPostTable;
}

module.exports = blogPostSchema;