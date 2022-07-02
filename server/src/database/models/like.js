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
    models.BlogPost.belongsToMany(models.User, {
      through: likesTable,
      foreignKey: 'userId',
      otherKey: 'postId',
      as: 'usersWhoLiked',
      onDelete: 'CASCADE',
    });

    models.User.belongsToMany(models.BlogPost, {
      through: likesTable,
      foreignKey: 'postId',
      otherKey: 'userId',
      as: 'postsLiked',
    });
  };

  return likesTable;
};

module.exports = likesSchema;
