module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          name: 'TypeScript',
        },
        {
          id: 2,
          name: 'Python',
        },
        {
          id: 3,
          name: 'Node.js',
        },
        {
          id: 4,
          name: 'Docker',
        },
        {
          id: 5,
          name: 'MySQL',
        },
        {
          id: 6,
          name: 'React',
        },
        {
          id: 7,
          name: 'Flask',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
