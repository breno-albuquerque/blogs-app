module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('BlogPosts',
      [
        {
          id: 1,
          title: 'Try TypeScript!',
          content: 'If you already learned how to manipulate the DOM using JavaScript, you should get to know TypeScript!',
          userId: 1,
          published: new Date('2020-08-01T19:58:00.000Z'),
          updated: new Date('2020-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Start with Python!',
          content: 'Python is a great language to begginers, it is high level and easy to learn comapring to others languages',
          userId: 2,
          published: new Date('2021-08-01T19:58:00.000Z'),
          updated: new Date('2021-08-01T19:58:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};
