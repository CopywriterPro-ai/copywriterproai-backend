const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const userService = require('./user.service');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
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
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmailUsingOTP = async (to) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const html = `<div> Dear user, <div> <br>
  <div>To reset your password, you have to enter this verification code when prompted: <b>${OTP}</b>. <br>
  If you did not request any password resets, then ignore this email. </div> <br>
  <div>Thank you, <br>The AICopywriter Team</br></div>`;

  await userService.setPasswordResetCode(to, OTP);
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

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmailUsingOTP,
};
