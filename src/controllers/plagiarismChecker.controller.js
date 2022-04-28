const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { plagiarismChecker } = require('../config/config');
const {
  subscriberService,
  plagiarismCheckerService,
  utilsService: { numberOfWords },
} = require('../services');

const searchContent = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const {
    activeSubscription,
    subscriberInfo: { isPaidSubscribers },
  } = await subscriberService.getOwnSubscribe(userId);

  const { plagiarismCheckerWords, subscription: currentPackage } = activeSubscription;

  const { text } = req.body;
  const numberOfWordsInText = numberOfWords(text);

  const isUserPackageAllowed = plagiarismChecker.allowedPackages.includes(currentPackage);
  const isWordsAvailable = plagiarismCheckerWords - numberOfWordsInText >= 0;

  if (isPaidSubscribers && isUserPackageAllowed && isWordsAvailable) {
    const results = await plagiarismCheckerService.searchContent(text);
    res.status(httpStatus.OK).send({ status: httpStatus.OK, results });

    await subscriberService.updateOwnSubscribe(userId, {
      activeSubscription: {
        ...activeSubscription,
        plagiarismCheckerWords: plagiarismCheckerWords - numberOfWordsInText,
      },
    });
  } else if (isPaidSubscribers && !isUserPackageAllowed) {
    res.status(httpStatus.PAYMENT_REQUIRED).send({ message: 'Plagiarism checker is not available for your package.' });
  } else if (isPaidSubscribers && isUserPackageAllowed && !isWordsAvailable) {
    res.status(httpStatus.PAYMENT_REQUIRED).send({ message: "You don't have enough words to check plagiarism!" });
  } else {
    res.status(httpStatus.FORBIDDEN).send({ message: "You don't have access to this feature!" });
  }
});

module.exports = {
  searchContent,
};
