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
  } else if (task.substr(task.indexOf('-') + 1, task.length) === 'campaign-post') {
    generatedContent = await contentService.campaignPostFromBusinessType(req.user._id, task, req.body);
  } else if (task === 'facebook-ad-primary-texts') {
    generatedContent = await contentService.facebookAdPrimaryTexts(req.user._id, req.body);
  } else if (task === 'facebook-ad-headlines') {
    generatedContent = await contentService.facebookAdHeadlines(req.user._id, req.body);
  } else if (task === 'facebook-ad-link-descriptions') {
    generatedContent = await contentService.facebookAdLinkDescription(req.user._id, req.body);
  } else if (task === 'facebook-ads-from-product-description') {
    generatedContent = await contentService.facebookAdsFromProductDescription(req.user._id, req.body);
  } else if (task === 'linkedin-ad-texts') {
    generatedContent = await contentService.linkedinAdTexts(req.user._id, req.body);
  } else if (task === 'google-ad-headlines') {
    generatedContent = await contentService.googleAdHeadlines(req.user._id, req.body);
  } else if (task === 'youtube-video-titles-from-description') {
    generatedContent = await contentService.youtubeVideoTitleFromDescription(req.user._id, req.body);
  } else if (task === 'youtube-video-ideas') {
    generatedContent = await contentService.youtubeVideoIdeas(req.user._id, req.body);
  }

  res.status(httpStatus.OK).send(generatedContent);
});

module.exports = {
  generate,
};
