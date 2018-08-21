const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); //this needs to be before passport
require('./services/passport');

mongoose.connect(encodeURI(keys.mongoURI), {
  auth: {
    user: keys.mongoUser,
    password: keys.mongoPassword,
  }
});

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
