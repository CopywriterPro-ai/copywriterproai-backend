const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailService } = require('../services');

const featureRequest = catchAsync(async (req, res) => {
  const subject = 'Feature Request!';
  await emailService.userMessage(subject, req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for your suggestion!',
  });
});

const bugReport = catchAsync(async (req, res) => {
  const subject = 'Bug Report!';
  await emailService.userMessage(subject, req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for reporting! We are looking into it.',
  });
});

const userMessage = catchAsync(async (req, res) => {
  const subject = 'User Message!';
  await emailService.userMessage(subject, req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for reaching out. We will get back to you soon.',
  });
});

module.exports = {
  featureRequest,
  bugReport,
  userMessage,
};
