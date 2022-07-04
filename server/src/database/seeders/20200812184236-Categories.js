module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: 'Python',
        },
        {
          id: 2,
          name: 'Apple',
        },
        {
          id: 3,
          name: 'Comparisons',
        },
        {
          id: 4,
          name: 'Feedback',
        },
        {
          id: 5,
          name: 'Risks',
        },
        {
          id: 6,
          name: 'Facebook',
        },
        {
          id: 7,
          name: 'Companies',
        },
        {
          id: 8,
          name: 'Perspective',
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
