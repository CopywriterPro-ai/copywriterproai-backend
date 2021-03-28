const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { interestService } = require('../services');

const updateLikes = catchAsync(async (req, res) => {
  const userInterest = await interestService.checkDocumentExistsOrNot(req.params.userId);
  await interestService.updateInterests(userInterest, 0, req.body); // 0 means like's list
  res.status(httpStatus.OK).send({ message: 'Like added!' });
});

const updateDislikes = catchAsync(async (req, res) => {
  const userInterest = await interestService.checkDocumentExistsOrNot(req.params.userId);
  await interestService.updateInterests(userInterest, 1, req.body); // 1 means dislike's list
  res.status(httpStatus.OK).send({ message: 'Dislike added!' });
});

module.exports = {
  updateLikes,
  updateDislikes,
};
