const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.valid('paraphrasing').required(),
    userText: Joi.string().required(),
    wordLimit: Joi.number().integer(),
  }),
};

const blogOutline = {
  body: Joi.object().keys({
    task: Joi.valid('blog-outline').required(),
    numberOfPoints: Joi.number().required(),
    blogAbout: Joi.string().required(),
  }),
};

const blogIdea = {
  body: Joi.object().keys({
    task: Joi.valid('blog-idea').required(),
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
  }),
};

const blogHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('blog-headline').required(),
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
    blogAbout: Joi.string().required(),
  }),
};

const blogIntro = {
  body: Joi.object().keys({
    task: Joi.valid('blog-intro').required(),
    title: Joi.string().required(),
    about: Joi.string().required(),
  }),
};

const productDescription = {
  body: Joi.object().keys({
    task: Joi.valid('product-description').required(),
    productName: Joi.string().required(),
    productType: Joi.string().required(),
  }),
};

const makeProductDescriptionSEOFriendly = {
  body: Joi.object().keys({
    task: Joi.valid('seo-friendly-product-description').required(),
    productName: Joi.string().trim().required(),
    productType: Joi.string().trim().required(),
    productFeatures: Joi.string().trim().required(),
    productBenefits: Joi.string().trim().required(),
    targetAudience: Joi.string().trim().required(),
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

const catchyHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('catchy-headline').required(),
    content: Joi.string().required(),
  }),
};

const attentionGrabbingHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('attention-grabbing-headline').required(),
    content: Joi.string().required(),
  }),
};

const newspaperHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('newspaper-headline').required(),
    content: Joi.string().required(),
  }),
};

const resumeHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('resume-headline').required(),
    profession: Joi.string().required(),
  }),
};

const campaignPostIdeaFromBusinessType = {
  body: Joi.object().keys({
    task: Joi.valid('campaign-facebook-post', 'twitter-campaign-post').required(),
    platformType: Joi.string().required(),
  }),
};

const facebookAdPrimaryTexts = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-primary-texts').required(),
    companyName: Joi.string().required(),
    businessType: Joi.string().required(),
    benefits: Joi.string().required(),
  }),
};

const facebookAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-headlines').required(),
    productName: Joi.string().required(),
    businessType: Joi.string().required(),
    customerBenefit: Joi.string().required(),
  }),
};

const facebookAdLinkDescription = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-link-descriptions').required(),
    companyName: Joi.string().required(),
    platformType: Joi.string().required(),
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
    companyName: Joi.string().required(),
    businessType: Joi.string().required(),
    benefits: Joi.string().required(),
  }),
};

const googleAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('ads-google-headlines').required(),
    name: Joi.string().required(),
    businessType: Joi.string().required(),
  }),
};

const googleAdDescriptions = {
  body: Joi.object().keys({
    task: Joi.valid('ads-google-descriptions').required(),
    businessName: Joi.string().required(),
    productCategories: Joi.string().required(),
    uniqueness: Joi.string().required(),
    promotions: Joi.string().required(),
    keywords: Joi.string().required(),
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

const generatedSubjectFromBody = {
  body: Joi.object().keys({
    task: Joi.valid('email-subject-from-body').required(),
    emailBody: Joi.string().required(),
  }),
};

const websiteShortDescription = {
  body: Joi.object().keys({
    task: Joi.valid('website-short-description').required(),
    industryType: Joi.string().required(),
    businessName: Joi.string().required(),
  }),
};

const keywordsFromText = {
  body: Joi.object().keys({
    task: Joi.valid('website-keywords-from-text').required(),
    primaryText: Joi.string().required(),
  }),
};

const videoTagsFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-tags-from-description').required(),
    primaryText: Joi.string().required(),
  }),
};

const channelTagsFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-channel-tags-from-description').required(),
    primaryText: Joi.string().required(),
  }),
};

const seoFriendlyBlogIdeas = {
  body: Joi.object().keys({
    task: Joi.valid('website-seo-friendly-blog-ideas').required(),
    content: Joi.string().required(),
    desiredOutcome: Joi.string().required(),
    industry: Joi.string().required(),
    targetAudience: Joi.string().required(),
  }),
};

const landingPageHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('website-landing-page-headline').required(),
    businessType: Joi.string().trim().required(),
  }),
};

const productName = {
  body: Joi.object().keys({
    task: Joi.valid('product-name').required(),
    productDescription: Joi.string().required(),
    keywords: Joi.string().required(),
  }),
};

const linkedInSummary = {
  body: Joi.object().keys({
    task: Joi.valid('linkedin-summary').required(),
    profession: Joi.string().required(),
    skills: Joi.string().required(),
  }),
};

const catchyBusinessTaglines = {
  body: Joi.object().keys({
    task: Joi.valid('catchy-business-taglines').required(),
    companyName: Joi.string().trim().required(),
    businessType: Joi.string().trim().required(),
  }),
};

const fiverrCategoriesHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('fiverr-categories-headline').required(),
    categoriesName: Joi.string().trim().required(),
  }),
};

const CVSummary = {
  body: Joi.object().keys({
    task: Joi.valid('cv-summary').required(),
    yourJobTitle: Joi.string().required(),
    keyAchievements: Joi.string().required(),
    yearsOfExperience: Joi.string().required(),
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
  blogOutline,
  blogIdea,
  blogHeadline,
  blogIntro,
  productDescription,
  makeProductDescriptionSEOFriendly,
  productReview,
  catchyHeadline,
  attentionGrabbingHeadline,
  newspaperHeadline,
  resumeHeadline,
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
  generatedSubjectFromBody,
  websiteShortDescription,
  keywordsFromText,
  videoTagsFromDescription,
  channelTagsFromDescription,
  seoFriendlyBlogIdeas,
  landingPageHeadline,
  productName,
  linkedInSummary,
  catchyBusinessTaglines,
  fiverrCategoriesHeadline,
  CVSummary,
};
