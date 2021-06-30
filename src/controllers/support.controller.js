const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailService } = require('../services');

const featureRequest = catchAsync(async (req, res) => {
  const subject = 'Feature Request!';
  await emailService.featureRequest(subject, req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message:
      'Thank you for submitting your request. We will reach out to you as soon as we are done with analyzing your request.',
  });
});

const bugReport = catchAsync(async (req, res) => {
  const subject = 'Bug Report!';
  await emailService.bugReport(subject, req.body, req.file);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for reporting. We are looking into it.',
  });
});

const userMessage = catchAsync(async (req, res) => {
  const subject = 'User Message!';
  await emailService.userMessage(subject, req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for reaching out. We are looking into it.',
  });
});

module.exports = {
  featureRequest,
  bugReport,
  userMessage,
};
