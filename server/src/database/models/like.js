const likesSchema = (sequelize, DataTypes) => {
  const likesTable = sequelize.define(
    'Like',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    { timestamps: false },
  );

  likesTable.associate = (models) => {
    models.User.belongsToMany(models.BlogPost, {
      through: likesTable,
      foreignKey: 'userId',
      otherKey: 'postId',
      as: 'postsLiked',
      onDelete: 'CASCADE',
    });

    models.BlogPost.belongsToMany(models.User, {
      through: likesTable,
      foreignKey: 'postId',
      otherKey: 'userId',
      as: 'usersWhoLiked',
      onDelete: 'CASCADE',
    });
  };

  return likesTable;
};

module.exports = likesSchema;
