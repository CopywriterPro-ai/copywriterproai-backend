const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { jwt, googleOauth2, facebookOauth } = require('./config');
const { strategyVerify } = require('../services/user.service');
const { authTypes } = require('./auths');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const googleOptions = {
  clientID: googleOauth2.clientId,
  clientSecret: googleOauth2.secretId,
  callbackURL: 'https://api.copywriterpro.ai/v1/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

const facebookOptions = {
  clientID: facebookOauth.appId,
  clientSecret: facebookOauth.appSecret,
  callbackURL: 'https://api.copywriterpro.ai/v1/auth/facebook/callback',
  profileFields: ['email', 'displayName', 'photos', 'first_name', 'last_name'],
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOptions, strategyVerify(authTypes.GOOGLE));
const facebookStrategy = new FacebookStrategy(facebookOptions, strategyVerify(authTypes.FACEBOOK));

module.exports = {
  jwtStrategy,
  googleStrategy,
  facebookStrategy,
};
