const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); //this needs to be required before passport
require('./services/passport');

// connect to externally hosted mongoDB - mLab
mongoose.connect(
  encodeURI(keys.mongoURI),
  {
    auth: {
      user: keys.mongoUser,
      password: keys.mongoPassword,
    },
  },
);

// declare express app
const app = express();

// set up cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session()); 

// routes
require('./routes/authRoutes')(app);

// for heroku deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
