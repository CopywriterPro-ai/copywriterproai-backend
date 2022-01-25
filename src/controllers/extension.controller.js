const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const generator = require('../services/contents');
const { subscriberService } = require('../services');
const { subscription } = require('../config/plan');

const generate = catchAsync(async (req, res) => {
  const { _id, email, role } = req.user;
  const { words, freeTrial, subscription: currentPackage, isPaidSubscribers } = await subscriberService.getOwnSubscribe(
    email
  );

  const isAdmin = role === 'admin';

  if (words === 0 && !isAdmin) {
    res.status(httpStatus.PAYMENT_REQUIRED).send({ message: 'Upgrade our friendship today!' });
  } else if (currentPackage === subscription.FREEMIUM && freeTrial.eligible === false && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Free trial expired, Upgrade our friendship today!' });
  } else if (freeTrial.eligible === true && freeTrial.dailyLimitExceeded === true && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Free trial daily limit exceeded' });
  } else if (freeTrial.eligible === false && isPaidSubscribers === false && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Subscription expired,' });
  } else {
    const { task } = req.body;

    let generatedContent;

    if (task === 'paraphrasing') {
      generatedContent = await generator.extension.paraphrase(_id, email, req.body);
    } else if (task === 'change-tone') {
      generatedContent = await generator.extension.changeTone(_id, email, req.body);
    } else if (task === 'simplifier') {
      generatedContent = await generator.extension.simplify(_id, email, req.body);
    } else if (task === 'summarizer') {
      generatedContent = await generator.extension.summarize(_id, email, req.body);
    }

    res.status(httpStatus.OK).send(generatedContent);
  }
});

module.exports = {
  generate,
};
