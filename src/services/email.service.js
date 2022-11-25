const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const { email, env, frontendUrl } = require('../config/config');
const logger = require('../config/logger');
const tokenService = require('./token.service');
const { mailTypes } = require('../config/mailtype');
const ApiError = require('../utils/ApiError');

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
  const subject = 'Welcome to CopywriterPro';

  const html = `<div> Hi ${name}, <div><br>
  <p>Welcome to CopywriterPro! We're so excited to have you on board.<br/><br/>
  CopywriterPro is the world's first AI powered copywriting tool. <br/><br/>
  Here's what you can expect:<br/><br/>
  - A user-friendly interface that makes writing copy a breeze<br/>
  - Powerful AI technology that will help you write better copy, faster<br/>
  - A community of like-minded copywriters to connect with and learn from<br/><br/>
  We can't wait to see what you can do with CopywriterPro. If you have any questions, our team is always here to help.<br/><br/>
  Thank you for joining us and Happy Writing!<br/><br/>
  Cheers,<br/>
  The CopywriterProAI Team
 </p>
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
  <div>Thank you, <br>The CopywriterProAI Team</br></div>`;

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

  const html = `<div>
  <p>Hi ${name.firstName}<br/><br/>

  Welcome to CopywriterPro! We're so glad you're here.<br/><br/>

  To get started, we just need to verify your email address. Please click the link below to confirm your account and start using our AI-powered copywriting tool.<br/></br/>

  Confirm My Account  <a href=${frontendUrl.web}/account-verification?token=${token}><button style="
  border: none;
  background: #0A7EFA;
  cursor: pointer;
  padding: 8px;
  color: white;
  min-width: 100px;
  border-radius: 5px;
">Verify Account</button></a><br/><br/>

  We can't wait to help you write better copy, faster.<br/><br/>

  Cheers,<br/><br/>

  The CopywriterProAI Team
</p>
  </div>`;

  await sendEmail(to, subject, html);
};

const checkImageType = async (image) => {
  console.log(image[0]);
  try {
    if (image.length && !['image/jpeg', 'image/png'].includes(image[0].type)) {
      throw new Error();
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image type not allowed!');
  }
}

const featureRequest = async (subject, { name, email: _email, feature, image } ) => {
  // await checkImageType(image);

  const html = `
  <div>
    <div>
      <b>From: ${name}, ${_email}</b>
    </div>
    <br/>
    <div>
      <p>${feature}</p>
    </div>
  </div>`;

  await sendEmail(supportMail, subject, html);
};

const bugReport = async (subject, { name, email: _email, report, image } ) => {
  // await checkImageType(image);

  const html = `
  <div>
    <div>
      <b>From: ${name}, ${_email}</b>
    </div>
    <br/>
    <div>
      <p>${report}</p>
    </div>
  </div>`;

  await sendEmail(supportMail, subject, html);
};

const userMessage = async (subject, { name, email: _email, message, image }) => {
  // await checkImageType(image);

  const html = `
  <div>
    <div>
      <b>From: ${name}, ${_email}</b>
    </div>
    <br/>
    <div>
      <p>${message}</p>
    </div>
  </div>`;

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
