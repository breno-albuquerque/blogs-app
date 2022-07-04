module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Likes',
      [
        {
          postId: 1,
          userId: 1,
        },
        {
          postId: 2,
          userId: 1,
        },
        {
          postId: 5,
          userId: 1,
        },
        {
          postId: 1,
          userId: 2,
        },
        {
          postId: 4,
          userId: 2,
        },
        {
          postId: 2,
          userId: 2,
        },
        {
          postId: 5,
          userId: 3,
        },
        {
          postId: 3,
          userId: 3,
        },
        {
          postId: 1,
          userId: 3,
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
