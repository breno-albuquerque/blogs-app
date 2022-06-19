const blogPostSchema = (sequelize, DataTypes) => {
  const blogPostSchema = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.TIMESTAMP,
    updated: DataTypes.TIMESTAMP,
  }, { timestamp: false })
}