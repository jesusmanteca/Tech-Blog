const path = require("path");
// for the server framework, let's use express
const express = require("express");
// for the login session
const session = require("express-session");
// for the front end
const exphbs = require("express-handlebars");
// because this is the first place we encode, we'll require dotenv right from the start
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
// database configuration
const sequelize = require("./config/config");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// As the user is logged in, the session is made private with use of dotenv, which is called in server.js
const sess = {
  secret: process.env.Server_PW,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//helpers help with some functions and are useful for things like formatting dates so they don't look all bulky
const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});
//for the front end
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// express - for the routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/'));
// this is the sparkplug, the sequelize sync is the heart of the heart, from here, sequelize begins, which handles the databases. 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
