var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;
const config = require('../config');

/**  
 * Configure the Google strategy for use by Passport.
 * OAuth 2.0-based strategies require a `verify` function which receives the
 * credential (`accessToken`) for accessing the Google API on the user's
 * behalf, along with the user's profile.  The function must invoke `cb`
 * with a user object, which will be set at `req.user` in route handlers after 
 * authentication.
 */
const googleStrategy = new Strategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: '/api'+config.google.callbackURL
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile._json);
  });

module.exports = googleStrategy;