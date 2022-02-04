const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const generator = require('../services/contents');
const { subscriberService } = require('../services');

const generate = catchAsync(async (req, res) => {
  const { _id, email, role } = req.user;
  const {
    words,
    subscriberInfo: { isPaidSubscribers },
  } = await subscriberService.getOwnSubscribe(email);

  const isAdmin = role === 'admin';

  const { task } = req.body;
  let generatedContent = {};

  if ((words === 0 || isPaidSubscribers === false) && task !== 'paraphrasing' && task !== 'grammar-fixer' && !isAdmin) {
    res.status(httpStatus.PAYMENT_REQUIRED).send({ message: 'Upgrade our friendship today!' });
  }

  if (task === 'paraphrasing') {
    generatedContent = await generator.extension.paraphrase(_id, email, req.body);
  } else if (task === 'grammar-fixer') {
    generatedContent = await generator.extension.grammarFixer(_id, email, req.body);
  } else if (task === 'simplifier') {
    generatedContent = await generator.extension.simplifier(_id, email, req.body);
  } else if (task === 'summarizer') {
    generatedContent = await generator.extension.summarizer(_id, email, req.body);
  } else if (task === 'change-tone') {
    generatedContent = await generator.extension.changeTone(_id, email, req.body);
  }

  res.status(httpStatus.OK).send(generatedContent);
});

module.exports = {
  generate,
};
