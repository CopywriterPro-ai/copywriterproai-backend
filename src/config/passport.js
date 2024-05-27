const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { jwt, googleOauth2, facebookOauth } = require('./config');
const { strategyVerify } = require('../services/user.service');
const { authTypes } = require('./auths');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

// Check if the environment is development
const isDevelopment = process.env.NODE_ENV === 'development';

// Define the Google OAuth callback URL based on the environment
const googleCallbackURL = isDevelopment
  ? 'http://localhost:8080/v1/auth/google/callback'
  : 'https://api.copywriterpro.ai/v1/auth/google/callback';

// Options for JWT strategy
const jwtOptions = {
  secretOrKey: jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Options for Google OAuth strategy
const googleOptions = {
  clientID: googleOauth2.clientId,
  clientSecret: googleOauth2.secretId,
  callbackURL: googleCallbackURL,
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

// Options for Facebook OAuth strategy
const facebookOptions = {
  clientID: facebookOauth.appId,
  clientSecret: facebookOauth.appSecret,
  callbackURL: 'https://api.copywriterpro.ai/v1/auth/facebook/callback',
  profileFields: ['email', 'displayName', 'photos', 'first_name', 'last_name'],
};

// Function to verify JWT tokens
const jwtVerify = async (payload, done) => {
  try {
    // Check if the token type is ACCESS
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    // Find the user by the ID in the payload
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    // If user is found, pass the user object to the next middleware
    done(null, user);
  } catch (error) {
    // If an error occurs, pass the error to the next middleware
    done(error, false);
  }
};

// Create instances of each strategy with the options and verification functions
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOptions, strategyVerify(authTypes.GOOGLE));
const facebookStrategy = new FacebookStrategy(facebookOptions, strategyVerify(authTypes.FACEBOOK));

module.exports = {
  jwtStrategy,
  googleStrategy,
  facebookStrategy,
};
