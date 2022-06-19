const postCategorySchema = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {},
  { timestamps: false });

  postCategoryTable.associate = (models) => {
    postCategoryTable.hasMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'posts',
      through: postCategoryTable,
      otherKey: 'categoryId'
    });
  }

  postCategoryTable.associate = (models) => {
    postCategoryTable.hasMany(models.Categories, {
      foreignKey: 'categoryId',
      as: 'category',
      through: postCategoryTable,
      otherKey: 'postId'
    });
  }

  return postCategoryTable;
}

module.exports = postCategorySchema;