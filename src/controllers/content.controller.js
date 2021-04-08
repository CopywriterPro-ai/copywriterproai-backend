const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User, Interest, Content } = require('../models');
const { contentService } = require('../services');

const generate = catchAsync(async (req, res) => {
  const { task } = req.body;
  let generatedContent;

  if (task === 'paraphrasing') {
    generatedContent = await contentService.paraphrase(req.user._id, req.body);
  } else if (task === 'product-description') {
    generatedContent = await contentService.productDescription(req.user._id, req.body);
  }

  res.status(httpStatus.OK).send(generatedContent);
});

module.exports = {
  generate,
};
