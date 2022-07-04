# Blogs App

It's a blog website where users can publish articles !

## Links:

* Deploy: https://my-blogs-app.netlify.app/
* Demo: https://www.youtube.com/watch?v=YXt8Jxn_RlE

## Features:

##### Register/Delete Account:
  - Register an account with valid credentials.
  - Delete the account and all the data related.

##### Login/Logout:
  - Once registered, it is possible to log in and out.

##### Create a category:
  - Create new categories to the articles.

##### Publish an article:
  - Create new articles with title, content and related categories.

##### Edit and Delete an article:
  - It is possible to edit or delete articles, but only those who belongs to the current user.

## Main tech stack:

* Node.js (16.x)
* React.js (18.2)
* Express (4.17.1)
* Sequelize (6.3.4)

## Running it localy:

#### Requirements:

  - Node.js (>16)
  - A SQL database supported by Sequelize

##### Clone Repository

```
$ git clone git@github.com:breno-albuquerque/blogs-app.git
$ cd blogs-app
```

##### Set the Back-end environment variables

  - Change the ```.env.example``` file name to ```.env```
  - Type your own enviroment credentials in this file

##### Install server dependencies, create DB and run the API

```
$ cd server
$ npm install

$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed:all

$ npm start
```
  
##### Install and Run the React Front-end

```
$ cd client
$ npm install
$ npm start
```
