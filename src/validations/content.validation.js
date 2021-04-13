const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.string().required(),
    userText: Joi.string().required(),
    wordLimit: Joi.number().integer(),
  }),
};

const productDescription = {
  body: Joi.object().keys({
    task: Joi.string().required(),
    productName: Joi.string().required(),
    type: Joi.string().required(),
    targetPeople: Joi.string().required(),
    features: Joi.string().required(),
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
  })
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
  campaignPostIdeaFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
};
