module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'BlogPosts',
      [
        {
          id: 1,
          title: 'Looking back or looking forward?',
          content: 'You can not connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.',
          userId: 4,
          published: new Date('2008-08-01T19:58:00.000Z'),
          updated: new Date('2008-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Take Risks!',
          content: 'The biggest risk is not taking any risk... In a world that changing really quickly, the only strategy that is guaranteed to fail is not taking risks.',
          userId: 1,
          published: new Date('2018-08-01T19:58:00.000Z'),
          updated: new Date('2018-08-01T19:58:51.000Z'),
        },
        {
          id: 3,
          title: 'Feedback',
          content: 'I think it is very important to have a feedback loop, where you are constantly thinking about what you have done and how you could be doing it better.',
          userId: 2,
          published: new Date('2019-08-01T19:58:00.000Z'),
          updated: new Date('2019-08-01T19:58:51.000Z'),
        },
        {
          id: 4,
          title: 'Only compare you with yourself',
          content: 'Do not compare yourself with anyone in this world… if you do so, you are insulting yourself.',
          userId: 3,
          published: new Date('2020-08-01T19:58:00.000Z'),
          updated: new Date('2020-08-01T19:58:51.000Z'),
        },
        {
          id: 5,
          title: 'Companies and Mistakes',
          content: 'I made so many mistakes in running the company so far, basically any mistake you can think of I probably made. I think, if anything, the Facebook story is a great example of how if you are building a product that people love you can make a lot of mistakes',
          userId: 1,
          published: new Date('2021-08-01T19:58:00.000Z'),
          updated: new Date('2021-08-01T19:58:51.000Z'),
        },
      ],
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};
