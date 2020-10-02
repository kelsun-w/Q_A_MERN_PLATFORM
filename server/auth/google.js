const { request } = require('express');
var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;
const config = require('../config');

/**  
 * Configure the Google strategy for use by Passport.
 * OAuth 2.0-based strategies require a `verify` function which receives the
 * credential (`accessToken`) for accessing the Google API on the user's
 * behalf, along with the user's profile.  The function must invoke `done`
 * with a user object, which will be set at `req.user` in route handlers after 
 * authentication.
 */
const googleStrategy = new Strategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: '/api' + config.google.callbackURL,
},
  function (accessToken, refreshToken, profile, done) {
    const object = {
      'firstName': profile.name.givenName,
      'lastName': profile.name.familyName,
      'userName': profile.displayName,
      'email': profile._json.email,
      'email_verified': profile._json.email_verified,
      'hd': profile._json.hd
    }
    return done(null, object);
  });

module.exports = googleStrategy;