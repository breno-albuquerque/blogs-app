const postCategorySchema = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  },
  { timestamps: false });

  postCategoryTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: postCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: postCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'category',
    });
  }

  return postCategoryTable;
}

module.exports = postCategorySchema;