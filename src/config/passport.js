const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { jwt, googleOauth2 } = require('./config');
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
  callbackURL: '/v1/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
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

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ userId: profile.id });
    if (user) {
      done(null, user);
    } else {
      const newUser = await User.create({
        userId: profile.id,
        isVerified: true,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
        profileAvatar: profile._json.picture,
        authType: authTypes.GOOGLE,
      });
      done(null, newUser);
    }
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const googleStrategy = new GoogleStrategy(googleOptions, googleVerify);

module.exports = {
  jwtStrategy,
  googleStrategy,
};
