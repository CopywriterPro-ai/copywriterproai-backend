const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { contentValidation } = require('../../validations');
const { contentController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrase')
  .post(auth('generateContent'), validate(contentValidation.paraphrase), contentController.generate);

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
  .route('/generate/campaign-post-idea')
  .post(auth('generateContent'), validate(contentValidation.campaignPostIdeaFromBusinessType), contentController.generate);

router
  .route('/generate/facebook-ad-primary-texts')
  .post(auth('generateContent'), validate(contentValidation.facebookAdPrimaryTexts), contentController.generate);

router
  .route('/generate/facebook-ad-headlines')
  .post(auth('generateContent'), validate(contentValidation.facebookAdHeadlines), contentController.generate);

router
  .route('/generate/facebook-ad-link-descriptions')
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
  .route('/generate/google-ad-headlines')
  .post(auth('generateContent'), validate(contentValidation.googleAdHeadlines), contentController.generate);

router
  .route('/generate/google-ad-descriptions')
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
  .route('/generate/keywords-from-text')
  .post(auth('generateContent'), validate(contentValidation.keywordsFromText), contentController.generate);

module.exports = router;
