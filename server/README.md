# Blogs API (back-end):
This is a Node.js/Express API to manager users and their posts.

## Links:

* Deploy: (To-do)
* Video: (To-do)
* Front-end Repository: (To-do)

## TechStack and Services:

* Node.js (>=16.0.0)
* Express (4.17.1)
* MySQL (8.0.21)
* Sequelize (6.3.4)

## Install and Run:

* Dependencies:
  - Node.js  
  - MySQL

* Clone and Install package.json dependencies:
```
$ git clone git@github.com:breno-albuquerque/blogs-api-back-end.git
$ cd blogs-api-back-end
$ npm install
```

* Set up your enviroment variables:
  - Change the ```.env.example``` file name to ```.env```
  - Type your own enviroment credentials in this file
  
* Creating the database:
```
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```
  
* Running the API:
  - ```$ npm start```

## Features:

* (To-do)
