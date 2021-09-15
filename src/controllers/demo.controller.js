const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const generator = require('../services/contents');

const generate = catchAsync(async (req, res) => {
  const { task } = req.body;

  let generatedContent;

  if (task === 'paraphrasing') {
    generatedContent = await generator.demo.paraphrase(req.body);
  } else if (task === 'blog-headline') {
    generatedContent = await generator.demo.blogHeadline(req.body);
  }

  res.status(httpStatus.OK).send(generatedContent);
});

module.exports = {
  generate,
};
