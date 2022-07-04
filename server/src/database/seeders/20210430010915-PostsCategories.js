module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'PostCategories',
      [
        {
          postId: 1,
          categoryId: 7,
        },
        {
          postId: 2,
          categoryId: 5,
        },
        {
          postId: 3,
          categoryId: 4,
        },
        {
          postId: 4,
          categoryId: 3,
        },
        {
          postId: 5,
          categoryId: 6,
        },
        {
          postId: 5,
          categoryId: 7,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('PostCategories', null, {});
  },
};
