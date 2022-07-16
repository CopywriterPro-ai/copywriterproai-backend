const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/content.validate');
const {
  amazon,
  blog,
  business,
  common,
  cv,
  email,
  facebook,
  features,
  fiverr,
  google,
  headline,
  instagram,
  linkedIn,
  product,
  recipe,
  sales,
  website,
  youtube,
  writing,
} = require('../../validations/contents');
const { contentController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrasing')
  .post(auth('generateContent'), validate(writing.paraphrase), contentController.generate);

router.route('/generate/expander').post(auth('generateContent'), validate(writing.expander), contentController.generate);

router.route('/generate/simplifier').post(auth('generateContent'), validate(writing.simplifier), contentController.generate);

router.route('/generate/summarizer').post(auth('generateContent'), validate(writing.summarizer), contentController.generate);

router
  .route('/generate/abstract')
  .post(auth('generateContent'), validate(writing.abstractGenerator), contentController.generate);

router
  .route('/generate/notes-from-passage')
  .post(auth('generateContent'), validate(writing.notesFromPassage), contentController.generate);

router
  .route('/generate/grammar-fixer')
  .post(auth('generateContent'), validate(writing.grammarFixer), contentController.generate);

router
  .route('/generate/change-tone')
  .post(auth('generateContent'), validate(writing.changeTone), contentController.generate);

router
  .route('/generate/active-passive')
  .post(auth('generateContent'), validate(writing.activePassive), contentController.generate);

router
  .route('/generate/point-of-view')
  .post(auth('generateContent'), validate(writing.pointOfView), contentController.generate);

router.route('/generate/proofread').post(auth('generateContent'), validate(features.proofread), contentController.generate);

router.route('/generate/short-blog').post(auth('generateContent'), validate(blog.shortBlog), contentController.generate);

router.route('/generate/long-blog').post(auth('generateContent'), validate(blog.longBlog), contentController.generate);

router
  .route('/generate/blog-from-outline')
  .post(auth('generateContent'), validate(blog.blogFromOutline), contentController.generate);

router.route('/generate/blog-idea').post(auth('generateContent'), validate(blog.blogIdea), contentController.generate);

router
  .route('/generate/blog-headline')
  .post(auth('generateContent'), validate(blog.blogHeadline), contentController.generate);

router.route('/generate/blog-outline').post(auth('generateContent'), validate(blog.blogOutline), contentController.generate);

router.route('/generate/blog-intro').post(auth('generateContent'), validate(blog.blogIntro), contentController.generate);

router.route('/generate/blog-topic').post(auth('generateContent'), validate(blog.blogTopic), contentController.generate);

router.route('/generate/blog-outro').post(auth('generateContent'), validate(blog.blogOutro), contentController.generate);

router
  .route('/generate/product-description')
  .post(auth('generateContent'), validate(product.productDescription), contentController.generate);

router
  .route('/generate/seo-friendly-product-description')
  .post(auth('generateContent'), validate(product.makeProductDescriptionSEOFriendly), contentController.generate);

router
  .route('/generate/product-review')
  .post(auth('generateContent'), validate(product.productReview), contentController.generate);

router
  .route('/generate/catchy-headline')
  .post(auth('generateContent'), validate(headline.catchyHeadline), contentController.generate);

router
  .route('/generate/attention-grabbing-headline')
  .post(auth('generateContent'), validate(headline.attentionGrabbingHeadline), contentController.generate);

router
  .route('/generate/newspaper-headline')
  .post(auth('generateContent'), validate(headline.newspaperHeadline), contentController.generate);

router
  .route('/generate/resume-headline')
  .post(auth('generateContent'), validate(headline.resumeHeadline), contentController.generate);

router
  .route('/generate/campaign-post-idea')
  .post(auth('generateContent'), validate(facebook.campaignPostIdeaFromBusinessType), contentController.generate);

router
  .route('/generate/ads-facebook-primary-texts')
  .post(auth('generateContent'), validate(facebook.facebookAdPrimaryTexts), contentController.generate);

router
  .route('/generate/ads-facebook-headlines')
  .post(auth('generateContent'), validate(facebook.facebookAdHeadlines), contentController.generate);

router
  .route('/generate/ads-facebook-link-descriptions')
  .post(auth('generateContent'), validate(facebook.facebookAdLinkDescription), contentController.generate);

router
  .route('/generate/facebook-ads-from-product-description')
  .post(auth('generateContent'), validate(facebook.facebookAdsFromProductDescription), contentController.generate);

router
  .route('/generate/instagram-ad-texts')
  .post(auth('generateContent'), validate(instagram.instagramAdTexts), contentController.generate);

router
  .route('/generate/linkedin-ad-texts')
  .post(auth('generateContent'), validate(linkedIn.linkedinAdTexts), contentController.generate);

router
  .route('/generate/ads-google-headlines')
  .post(auth('generateContent'), validate(google.googleAdHeadlines), contentController.generate);

router
  .route('/generate/ads-google-descriptions')
  .post(auth('generateContent'), validate(google.googleAdDescriptions), contentController.generate);

router
  .route('/generate/youtube-video-titles-from-description')
  .post(auth('generateContent'), validate(youtube.youtubeVideoTitleFromDescription), contentController.generate);

router
  .route('/generate/youtube-video-ideas')
  .post(auth('generateContent'), validate(youtube.youtubeVideoIdeas), contentController.generate);

router
  .route('/generate/youtube-video-script')
  .post(auth('generateContent'), validate(youtube.youtubeVideoScript), contentController.generate);

router
  .route('/generate/image-idea-from-ad-text')
  .post(auth('generateContent'), validate(common.imageIdeasFromAdText), contentController.generate);

router
  .route('/generate/email-marketing-campaign-subject')
  .post(auth('generateContent'), validate(email.emailMarketingCampaignSubject), contentController.generate);

router
  .route('/generate/email-marketing-campaign-body')
  .post(auth('generateContent'), validate(email.emailMarketingCampaignBody), contentController.generate);

router
  .route('/generate/email-body')
  .post(auth('generateContent'), validate(email.generateEmailBody), contentController.generate);

router
  .route('/generate/email-subject-from-body')
  .post(auth('generateContent'), validate(email.generatedSubjectFromBody), contentController.generate);

router
  .route('/generate/website-short-description')
  .post(auth('generateContent'), validate(website.websiteShortDescription), contentController.generate);

router
  .route('/generate/website-keywords-from-text')
  .post(auth('generateContent'), validate(website.keywordsFromText), contentController.generate);

router
  .route('/generate/youtube-video-tags-from-description')
  .post(auth('generateContent'), validate(youtube.videoTagsFromDescription), contentController.generate);

router
  .route('/generate/youtube-channel-tags-from-description')
  .post(auth('generateContent'), validate(youtube.channelTagsFromDescription), contentController.generate);

router
  .route('/generate/website-seo-friendly-blog-ideas')
  .post(auth('generateContent'), validate(website.seoFriendlyBlogIdeas), contentController.generate);

router
  .route('/generate/website-landing-page-headline')
  .post(auth('generateContent'), validate(website.landingPageHeadline), contentController.generate);

router
  .route('/generate/product-name')
  .post(auth('generateContent'), validate(product.productName), contentController.generate);

router
  .route('/generate/linkedin-summary')
  .post(auth('generateContent'), validate(linkedIn.linkedInSummary), contentController.generate);

router
  .route('/generate/catchy-business-taglines')
  .post(auth('generateContent'), validate(business.catchyBusinessTaglines), contentController.generate);

router
  .route('/generate/fiverr-profile-description')
  .post(auth('generateContent'), validate(fiverr.fiverrProfileDescription), contentController.generate);

router
  .route('/generate/fiverr-categories-headline')
  .post(auth('generateContent'), validate(fiverr.fiverrCategoriesHeadline), contentController.generate);

router.route('/generate/cv-summary').post(auth('generateContent'), validate(cv.CVSummary), contentController.generate);

router
  .route('/generate/amazon-product-listings')
  .post(auth('generateContent'), validate(amazon.amazonProductListings), contentController.generate);

router
  .route('/generate/problem-agitate-solution')
  .post(auth('generateContent'), validate(sales.problemAgitateSolution), contentController.generate);

router
  .route('/generate/problem-agitate-solution-outcome')
  .post(auth('generateContent'), validate(sales.problemAgitateSolutionOutcome), contentController.generate);

router
  .route('/generate/attention-interest-desire-action')
  .post(auth('generateContent'), validate(sales.attentionInterestDesireAction), contentController.generate);

router.route('/generate/generate-recipe').post(auth('generateContent'), validate(recipe.recipe), contentController.generate);

module.exports = router;