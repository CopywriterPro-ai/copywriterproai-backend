const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { contentValidation } = require('../../validations');
const { contentController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrasing')
  .post(auth('generateContent'), validate(contentValidation.paraphrase), contentController.generate);

router
  .route('/generate/blog-outline')
  .post(auth('generateContent'), validate(contentValidation.blogOutline), contentController.generate);

router
  .route('/generate/blog-idea')
  .post(auth('generateContent'), validate(contentValidation.blogIdea), contentController.generate);

router
  .route('/generate/blog-headline')
  .post(auth('generateContent'), validate(contentValidation.blogHeadline), contentController.generate);

router
  .route('/generate/blog-intro')
  .post(auth('generateContent'), validate(contentValidation.blogIntro), contentController.generate);

router
  .route('/generate/product-description')
  .post(auth('generateContent'), validate(contentValidation.productDescription), contentController.generate);

router
  .route('/generate/seo-friendly-product-description')
  .post(auth('generateContent'), validate(contentValidation.makeProductDescriptionSEOFriendly), contentController.generate);

router
  .route('/generate/product-review')
  .post(auth('generateContent'), validate(contentValidation.productReview), contentController.generate);

router
  .route('/generate/catchy-headline')
  .post(auth('generateContent'), validate(contentValidation.catchyHeadline), contentController.generate);

router
  .route('/generate/attention-grabbing-headline')
  .post(auth('generateContent'), validate(contentValidation.attentionGrabbingHeadline), contentController.generate);

router
  .route('/generate/newspaper-headline')
  .post(auth('generateContent'), validate(contentValidation.newspaperHeadline), contentController.generate);

router
  .route('/generate/resume-headline')
  .post(auth('generateContent'), validate(contentValidation.resumeHeadline), contentController.generate);

router
  .route('/generate/campaign-post-idea')
  .post(auth('generateContent'), validate(contentValidation.campaignPostIdeaFromBusinessType), contentController.generate);

router
  .route('/generate/ads-facebook-primary-texts')
  .post(auth('generateContent'), validate(contentValidation.facebookAdPrimaryTexts), contentController.generate);

router
  .route('/generate/ads-facebook-headlines')
  .post(auth('generateContent'), validate(contentValidation.facebookAdHeadlines), contentController.generate);

router
  .route('/generate/ads-facebook-link-descriptions')
  .post(auth('generateContent'), validate(contentValidation.facebookAdLinkDescription), contentController.generate);

router
  .route('/generate/facebook-ads-from-product-description')
  .post(auth('generateContent'), validate(contentValidation.facebookAdsFromProductDescription), contentController.generate);

router
  .route('/generate/instagram-ad-texts')
  .post(auth('generateContent'), validate(contentValidation.instagramAdTexts), contentController.generate);

router
  .route('/generate/linkedin-ad-texts')
  .post(auth('generateContent'), validate(contentValidation.linkedinAdTexts), contentController.generate);

router
  .route('/generate/ads-google-headlines')
  .post(auth('generateContent'), validate(contentValidation.googleAdHeadlines), contentController.generate);

router
  .route('/generate/ads-google-descriptions')
  .post(auth('generateContent'), validate(contentValidation.googleAdDescriptions), contentController.generate);

router
  .route('/generate/youtube-video-titles-from-description')
  .post(auth('generateContent'), validate(contentValidation.youtubeVideoTitleFromDescription), contentController.generate);

router
  .route('/generate/youtube-video-ideas')
  .post(auth('generateContent'), validate(contentValidation.youtubeVideoIdeas), contentController.generate);

router
  .route('/generate/image-idea-from-ad-text')
  .post(auth('generateContent'), validate(contentValidation.imageIdeasFromAdText), contentController.generate);

router
  .route('/generate/email-subject-from-body')
  .post(auth('generateContent'), validate(contentValidation.generatedSubjectFromBody), contentController.generate);

router
  .route('/generate/website-short-description')
  .post(auth('generateContent'), validate(contentValidation.websiteShortDescription), contentController.generate);

router
  .route('/generate/website-keywords-from-text')
  .post(auth('generateContent'), validate(contentValidation.keywordsFromText), contentController.generate);

router
  .route('/generate/youtube-video-tags-from-description')
  .post(auth('generateContent'), validate(contentValidation.videoTagsFromDescription), contentController.generate);

router
  .route('/generate/youtube-channel-tags-from-description')
  .post(auth('generateContent'), validate(contentValidation.channelTagsFromDescription), contentController.generate);

router
  .route('/generate/website-seo-friendly-blog-ideas')
  .post(auth('generateContent'), validate(contentValidation.seoFriendlyBlogIdeas), contentController.generate);

router
  .route('/generate/website-landing-page-headline')
  .post(auth('generateContent'), validate(contentValidation.landingPageHeadline), contentController.generate);

router
  .route('/generate/product-name')
  .post(auth('generateContent'), validate(contentValidation.productName), contentController.generate);

router
  .route('/generate/linkedin-summary')
  .post(auth('generateContent'), validate(contentValidation.linkedInSummary), contentController.generate);

router
  .route('/generate/catchy-business-taglines')
  .post(auth('generateContent'), validate(contentValidation.catchyBusinessTaglines), contentController.generate);

router
  .route('/generate/fiverr-categories-headline')
  .post(auth('generateContent'), validate(contentValidation.fiverrCategoriesHeadline), contentController.generate);

router
  .route('/generate/cv-summary')
  .post(auth('generateContent'), validate(contentValidation.CVSummary), contentController.generate);

router
  .route('/generate/amazon-product-listings')
  .post(auth('generateContent'), validate(contentValidation.amazonProductListings), contentController.generate);

module.exports = router;
