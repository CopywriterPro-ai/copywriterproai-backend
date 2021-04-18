const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.valid('paraphrasing').required(),
    userText: Joi.string().required(),
    wordLimit: Joi.number().integer(),
  }),
};

const productDescription = {
  body: Joi.object().keys({
    task: Joi.valid('product-description').required(),
    productName: Joi.string().required(),
    type: Joi.string().required(),
    targetPeople: Joi.string().required(),
    benefits: Joi.string().required(),
  }),
};

const makeProductDescriptionSEOFriendly = {
  body: Joi.object().keys({
    task: Joi.valid('seo-friendly-product-description').required(),
    userText: Joi.string().required(),
  }),
};

const productReview = {
  body: Joi.object().keys({
    task: Joi.valid('product-review').required(),
    product: Joi.string().required(),
    rating: Joi.string().required(),
    comment: Joi.string().required(),
  }),
};

const campaignPostIdeaFromBusinessType = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-campaign-post', 'twitter-campaign-post').required(),
    platformType: Joi.string().required(),
  }),
};

const facebookAdPrimaryTexts = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-ad-primary-texts').required(),
    platformType: Joi.string().required(),
    context: Joi.string().required(),
  }),
};

const facebookAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-ad-headlines').required(),
    platformType: Joi.string().required(),
  }),
};

const facebookAdLinkDescription = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-ad-link-descriptions').required(),
    platformType: Joi.string().required(),
    headline: Joi.string().required(),
  }),
};

const facebookAdsFromProductDescription = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-ads-from-product-description').required(),
    product: Joi.string().required(),
  }),
};

const instagramAdTexts = {
  body: Joi.object().keys({
    task: Joi.valid('instagram-ad-texts').required(),
    platformType: Joi.string().required(),
    context: Joi.string().required(),
  }),
};

const linkedinAdTexts = {
  body: Joi.object().keys({
    task: Joi.valid('linkedin-ad-texts').required(),
    platformType: Joi.string().required(),
    context: Joi.string().required(),
  }),
};

const googleAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('google-ad-headlines').required(),
    name: Joi.string().required(),
    platform: Joi.string().required(),
  }),
};

const googleAdDescriptions = {
  body: Joi.object().keys({
    task: Joi.valid('google-ad-descriptions').required(),
    platform: Joi.string().required(),
    audience: Joi.string().required(),
  }),
};

const youtubeVideoTitleFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-titles-from-description').required(),
    description: Joi.string().required(),
  }),
};

const youtubeVideoIdeas = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-ideas').required(),
    topic: Joi.string().required(),
  }),
};

const imageIdeasFromAdText = {
  body: Joi.object().keys({
    task: Joi.valid('image-idea-from-ad-text').required(),
    product: Joi.string().required(),
    adText: Joi.string().required(),
  }),
};

// const generate = {
//   body: Joi.object().keys({
//     originalContent: Joi.string().required(),
//     documentType: Joi.string().required(),
//     tone: Joi.string(),
//     numberOfContents: Joi.number().integer(),
//     wordLimit: Joi.number().integer(),
//   }),
// };

module.exports = {
  paraphrase,
  productDescription,
  makeProductDescriptionSEOFriendly,
  productReview,
  campaignPostIdeaFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
  instagramAdTexts,
  linkedinAdTexts,
  googleAdHeadlines,
  googleAdDescriptions,
  youtubeVideoTitleFromDescription,
  youtubeVideoIdeas,
  imageIdeasFromAdText,
};
