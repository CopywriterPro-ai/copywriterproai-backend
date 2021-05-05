const express = require('express');
const passport = require('passport');
const validate = require('../../middlewares/validate');
const passportAuth = require('../../middlewares/passportAuth');
const verifyEmail = require('../../middlewares/verifyEmail');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/verify-account', validate(authValidation.verifyAccount), verifyEmail(), authController.verifyAccount);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), verifyEmail(), authController.resetPassword);
router.post('/strategy-login', validate(authValidation.strategyLogin), passportAuth(), authController.strategyLogin);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  authController.strategyCallback
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  authController.strategyCallback
);

module.exports = router;
