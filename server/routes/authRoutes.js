const passport = require('passport');

module.exports = app => {
  // authenticate for first time
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // authenticate once we have the code back from google
  app.get('/auth/google/callback', passport.authenticate('google'));
};
