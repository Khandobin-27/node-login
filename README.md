# node-login
![Login Screenshot](/media/screenshot.png)

A react login/register page which is connected to local node server and PostgreSQL database.
- **login-api** is the local node server which is built with Express framework and connected to PostgreSQL database;
- **login-page** is the front-end login/register page built with React and connected to the local server.

To run the applicaiton with the server start both folders (login-api and login-api) by running *npm install* command.
Also, to be able to use PostgreSQL database, You need to create your own database and insert its name and password in the **server.js** file.
