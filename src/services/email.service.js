const nodemailer = require('nodemailer');
const { email, env, frontendUrl } = require('../config/config');
const logger = require('../config/logger');
const tokenService = require('./token.service');
const { mailTypes } = require('../config/mailtype');

const transport = nodemailer.createTransport(email.smtp);
/* istanbul ignore next */
if (env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  const msg = { from: email.from, to, subject, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmailUsingToken = async (to) => {
  const subject = 'Reset password';
  const token = tokenService.generateMailingToken({ type: mailTypes.ACCOUNT_VERIFY, email: to });

  const html = `<div> Dear user, <div>
  <div>
  Trouble signing in?<br>
  Resetting your password is easy.<br>
  Just press the button below and follow the instructions. We'll have you up and running in no time.<br>
  <a href=${frontendUrl.web}/reset-password?token=${token}><button>Reset Password</button></a><br>
  If you did not make this request then please ignore this email.</div>
  </div>
  <div>Thank you, <br>The CopywriterPro Team</br></div>`;

  await sendEmail(to, subject, html);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
// const sendResetPasswordEmailUsingLink = async (to, token) => {
//   const subject = 'Reset password';
//   // replace this url with the link to the reset password page of your front-end app
//   const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
//   const text = `Dear user,
// To reset your password, click on this link: ${resetPasswordUrl}
// If you did not request any password resets, then ignore this email.`;
//   await sendEmail(to, subject, text);
// };

const sendVerifyAccountEmailUsingToken = async ({ id, email: to, name }) => {
  const subject = 'Verify Copywriter Account Email';
  const token = tokenService.generateMailingToken({ sub: id, type: mailTypes.ACCOUNT_VERIFY, email: to });

  const html = `<div>Hi ${name.firstName}, <div> <br>
  <div>
  Thanks for getting started with our CopywriterPro.AI!<br>
  We need a little more information to complete your registration, including a confirmation of your email address.<br>
  Click below to confirm your email address:<br>
  <a href=${frontendUrl.web}/account-verification?token=${token}><button>Verify Account</button></a><br>
  If you have problems, please paste the above URL into your web browser.<br>
  <div>Thank you, <br>The AICopywriter Team</br></div>`;

  await sendEmail(to, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmailUsingToken,
  sendVerifyAccountEmailUsingToken,
};
