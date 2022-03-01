const nodemailer = require('nodemailer');
const { email, env, frontendUrl } = require('../config/config');
const logger = require('../config/logger');
const tokenService = require('./token.service');
const { mailTypes } = require('../config/mailtype');

const supportMail = 'support@copywriterpro.ai';

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

const sendEmailWithAttachment = async (to, subject, html, filename, image) => {
  const msg = {
    from: email.from,
    to,
    subject,
    html,
    attachments: [
      {
        filename,
        content: image.buffer,
      },
    ],
  };
  await transport.sendMail(msg);
};

const sendWelcomeEmail = async (to, name = '') => {
  const subject = 'Welcome to copywriterpro';

  const html = `<div> Hi ${name}, <div><br>
  <p>Welcome to CopywriterPro. Your free trial starts today.<br/>
  What happens next?<br/>
  Keep an eye on your inbox as we’ll be sending you the best tips for content writing and sales copy.<br/>
  To learn more about CopywriterPro [Tutorial LInk]</p>
  `;

  await sendEmail(to, subject, html);
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

  const html = `<div> Dear user, <div><br>
  <div>
  Trouble signing in?<br><br>
  Resetting your password is easy.<br><br>
  Just press the button below and follow the instructions. We'll have you up and running in no time.<br><br>
  <a href=${frontendUrl.web}/reset-password?token=${token}><button style="
  border: none;
  background: #0A7EFA;
  cursor: pointer;
  padding: 8px;
  color: white;
  min-width: 100px;
  border-radius: 5px;
">Reset Password</button></a><br><br>
  If you did not make this request then please ignore this email.</div>
  </div><br><br>
  <div>Thank you, <br>CopywriterProAI Team</br></div>`;

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
  const subject = 'Verify CopywriterProAI Account Email';
  const token = tokenService.generateMailingToken({ sub: id, type: mailTypes.ACCOUNT_VERIFY, email: to });

  const html = `<div>Hi ${name.firstName}, <div> <br>
  <div>
  Thank you so much for being our CopywriterPro.ai early adopters. We can't thank you enough for supporting us on this exciting journey. <br><br>
  We need a little more information to complete your registration, including a confirmation of your email address. Click below to confirm your email address:<br><br>
  <a href=${frontendUrl.web}/account-verification?token=${token}><button style="
  border: none;
  background: #0A7EFA;
  cursor: pointer;
  padding: 8px;
  color: white;
  min-width: 100px;
  border-radius: 5px;
">Verify Account</button></a><br><br>
  This link will be valid for 15 minutes.<br><br>
  If you have problems, please paste the above URL into your web browser.<br><br>
  <div>Thank you, <br>CopywriterProAI Team</br></div>`;

  await sendEmail(to, subject, html);
};

const featureRequest = async (subject, { email, feature }) => {
  const html = `<div> <b>From: </b>${email} </div><br>
  <div><b>${feature}</b></div>`;

  await sendEmail(supportMail, subject, html);
};

const bugReport = async (subject, { email, report }, image) => {
  const html = `<div> <b>From: </b>${email} </div><br>
  <div><b>${report}</b></div>`;
  await sendEmailWithAttachment(supportMail, subject, html, image.originalname, image);
};

const userMessage = async (subject, { email, message }) => {
  const html = `<div> <b>From: </b>${email} </div><br>
  <div><b>${message}</b></div>`;

  await sendEmail(supportMail, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendWelcomeEmail,
  sendResetPasswordEmailUsingToken,
  sendVerifyAccountEmailUsingToken,
  featureRequest,
  bugReport,
  userMessage,
};
