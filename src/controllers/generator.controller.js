const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const generateContent = catchAsync(async (req, res) => {

});

module.exports = {
  generateContent,
};