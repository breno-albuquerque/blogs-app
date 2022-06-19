const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {},
  { timestamps: false });

  return PostCategoryTable;
}

module.exports = PostCategorySchema;