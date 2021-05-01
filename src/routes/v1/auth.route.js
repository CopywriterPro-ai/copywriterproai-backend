const express = require('express');
const passport = require('passport');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const { frontendUrl } = require('../../config/config');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/verify-account', validate(authValidation.verifyAccount), authController.verifyAccount);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const { userId, authType } = req.user;
    res.redirect(`${frontendUrl.web}/?verifyClientId=${userId}&authType=${authType}`);
  }
);

module.exports = router;
