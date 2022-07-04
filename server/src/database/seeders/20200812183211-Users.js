module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [{
        id: 1,
        displayName: 'Mark Zuckerberg',
        email: 'marckzuck@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg',
      },
      {
        id: 2,
        displayName: 'Elon Musk',
        email: 'elonmusk@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg',
      },
      {
        id: 3,
        displayName: 'Bill Gates',
        email: 'billgates@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg',
      },
      {
        id: 4,
        displayName: 'Steve Jobs',
        email: 'stevejobs@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg',
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
