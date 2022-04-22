const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { plagiarismCheckerService } = require('../services');

const searchContent = catchAsync(async (req, res) => {
  const { text } = req.body;
  const result = await plagiarismCheckerService.searchContent(text);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, result });
});

module.exports = {
  searchContent,
};
