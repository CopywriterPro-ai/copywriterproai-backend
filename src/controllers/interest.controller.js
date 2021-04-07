const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { interestService, contentService } = require('../services');

const updateInterests = catchAsync(async (req, res) => {
  const userInterest = await interestService.checkDocumentExistsOrNot(req.params.userId);
  await contentService.checkContentExistsOrNot(req.body);
  await interestService.updateInterest(userInterest, req.query.action, req.body);
  res.status(httpStatus.OK).send({ message: `${req.query.action} added!` });
});

module.exports = {
  updateInterests,
};
