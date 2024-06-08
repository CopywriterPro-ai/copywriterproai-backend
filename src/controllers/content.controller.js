const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const generator = require('../services/contents');
const { subscriberService } = require('../services');
const { subscription } = require('../config/plan');
const config = require('../config/config');

const generate = catchAsync(async (req, res) => {
  const { _id, email, userId, role, UserOwnOpenAIApiKey } = req.user;

  const {
    activeSubscription: { words, subscription: currentPackage },
    freeTrial,
    subscriberInfo: { isPaidSubscribers },
  } = await subscriberService.getOwnSubscribe(userId);

  const isAdmin = role === 'admin';

  if (words === 0 && !isAdmin) {
    res.status(httpStatus.PAYMENT_REQUIRED).send({ message: 'Your trial period has expired! You need to purchase a product to continue using it.' });
  } else if (currentPackage === subscription.FREEMIUM && freeTrial.eligible === false && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Your trial period has expired! You need to purchase a product to continue using it.' });
  } else if (freeTrial.eligible === true && freeTrial.dailyLimitExceeded === true && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Free trial daily limit exceeded! You need to purchase a product to continue using it.' });
  } else if (freeTrial.eligible === false && isPaidSubscribers === false && !isAdmin) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Your trial period has expired! You need to purchase a product to continue using it.' });
  } else {
    const { task } = req.body;
    let generatedContent = {};
    const apiKey = UserOwnOpenAIApiKey || config.openAI.openAIAPIKey;

    // Generate content based on the task provided in the request body
    switch (task) {
      case 'paraphrasing':
        generatedContent = await generator.writing.paraphrase(_id, email, req.body, apiKey);
        break;
      case 'expander':
        generatedContent = await generator.writing.expander(_id, email, req.body, apiKey);
        break;
      case 'simplifier':
        generatedContent = await generator.writing.simplifier(_id, email, req.body, apiKey);
        break;
      case 'summarizer':
        generatedContent = await generator.writing.summarizer(_id, email, req.body, apiKey);
        break;
      case 'abstract':
        generatedContent = await generator.writing.abstractGenerator(_id, email, req.body, apiKey);
        break;
      case 'notes-from-passage':
        generatedContent = await generator.writing.notesFromPassage(_id, email, req.body, apiKey);
        break;
      case 'grammar-fixer':
        generatedContent = await generator.writing.grammarFixer(_id, email, req.body, apiKey);
        break;
      case 'proofread':
        generatedContent = await generator.features.proofread(_id, email, req.body, apiKey);
        break;
      case 'change-tone':
        generatedContent = await generator.writing.changeTone(_id, email, req.body, apiKey);
        break;
      case 'active-passive':
        generatedContent = await generator.writing.activePassive(_id, email, req.body, apiKey);
        break;
      case 'point-of-view':
        generatedContent = await generator.writing.pointOfView(_id, email, req.body, apiKey);
        break;
      case 'short-blog':
        generatedContent = await generator.blog.shortBlog(_id, email, req.body, apiKey);
        break;
      case 'long-blog':
        generatedContent = await generator.blog.longBlog(_id, email, req.body, apiKey);
        break;
      case 'blog-from-outline':
        generatedContent = await generator.blog.blogFromOutline(_id, email, req.body, apiKey);
        break;
      // case 'blog-rewriter':
      //   generatedContent = await generator.blog.blogRewriter(_id, email, req.body, apiKey);
      //   break;
      case 'blog-idea':
        generatedContent = await generator.blog.blogIdea(_id, email, req.body, apiKey);
        break;
      case 'blog-headline':
        generatedContent = await generator.blog.blogHeadline(_id, email, req.body, apiKey);
        break;
      case 'blog-outline':
        generatedContent = await generator.blog.blogOutline(_id, email, req.body, apiKey);
        break;
      case 'blog-intro':
        generatedContent = await generator.blog.blogIntro(_id, email, req.body, apiKey);
        break;
      case 'blog-topic':
        generatedContent = await generator.blog.blogTopic(_id, email, req.body, apiKey);
        break;
      case 'blog-outro':
        generatedContent = await generator.blog.blogOutro(_id, email, req.body, apiKey);
        break;
      case 'product-description':
        generatedContent = await generator.product.productDescription(_id, email, req.body, apiKey);
        break;
      case 'seo-friendly-product-description':
        generatedContent = await generator.product.makeProductDescriptionSEOFriendly(_id, email, req.body, apiKey);
        break;
      case 'product-review':
        generatedContent = await generator.product.productReview(_id, email, req.body, apiKey);
        break;
      case 'catchy-headline':
        generatedContent = await generator.headline.catchyHeadline(_id, email, req.body, apiKey);
        break;
      case 'attention-grabbing-headline':
        generatedContent = await generator.headline.attentionGrabbingHeadline(_id, email, req.body, apiKey);
        break;
      case 'newspaper-headline':
        generatedContent = await generator.headline.newspaperHeadline(_id, email, req.body, apiKey);
        break;
      case 'resume-headline':
        generatedContent = await generator.headline.resumeHeadline(_id, email, req.body, apiKey);
        break;
      case 'campaign-facebook-post':
        generatedContent = await generator.facebook.campaignPostFromBusinessType(_id, email, req.body, apiKey);
        break;
      case 'ads-facebook-primary-texts':
        generatedContent = await generator.facebook.facebookAdPrimaryTexts(_id, email, req.body, apiKey);
        break;
      case 'ads-facebook-headlines':
        generatedContent = await generator.facebook.facebookAdHeadlines(_id, email, req.body, apiKey);
        break;
      case 'ads-facebook-link-descriptions':
        generatedContent = await generator.facebook.facebookAdLinkDescription(_id, email, req.body, apiKey);
        break;
      case 'facebook-ads-from-product-description':
        generatedContent = await generator.facebook.facebookAdsFromProductDescription(_id, email, req.body, apiKey);
        break;
      case 'instagram-ad-texts':
        generatedContent = await generator.instagram.instagramAdTexts(_id, email, req.body, apiKey);
        break;
      case 'linkedin-ad-texts':
        generatedContent = await generator.linkedIn.linkedinAdTexts(_id, email, req.body, apiKey);
        break;
      case 'ads-google-headlines':
        generatedContent = await generator.google.googleAdHeadlines(_id, email, req.body, apiKey);
        break;
      case 'ads-google-descriptions':
        generatedContent = await generator.google.googleAdDescriptions(_id, email, req.body, apiKey);
        break;
      case 'youtube-video-titles-from-description':
        generatedContent = await generator.youtube.youtubeVideoTitleFromDescription(_id, email, req.body, apiKey);
        break;
      case 'youtube-video-ideas':
        generatedContent = await generator.youtube.youtubeVideoIdeas(_id, email, req.body, apiKey);
        break;
      case 'youtube-video-script':
        generatedContent = await generator.youtube.generateYoutubeVideoScript(_id, email, req.body, apiKey);
        break;
      case 'image-idea-from-ad-text':
        generatedContent = await generator.commonTask.imageIdeasFromAdText(_id, email, req.body, apiKey);
        break;
      case 'email-marketing-campaign-subject':
        generatedContent = await generator.email.emailMarketingCampaignSubject(_id, email, req.body, apiKey);
        break;
      case 'email-marketing-campaign-body':
        generatedContent = await generator.email.emailMarketingCampaignBody(_id, email, req.body, apiKey);
        break;
      case 'email-body':
        generatedContent = await generator.email.emailBody(_id, email, req.body, apiKey);
        break;
      case 'email-subject-from-body':
        generatedContent = await generator.email.emailSubjectsFromBody(_id, email, req.body, apiKey);
        break;
      case 'website-short-description':
        generatedContent = await generator.website.websiteShortDescription(_id, email, req.body, apiKey);
        break;
      case 'website-keywords-from-text':
        generatedContent = await generator.website.keywordsFromText(_id, email, req.body, apiKey);
        break;
      case 'youtube-video-tags-from-description':
        generatedContent = await generator.youtube.generateVideoTagsFromDescription(_id, email, req.body, apiKey);
        break;
      case 'youtube-channel-tags-from-description':
        generatedContent = await generator.youtube.generateChannelTagsFromDescription(_id, email, req.body, apiKey);
        break;
      case 'website-seo-friendly-blog-ideas':
        generatedContent = await generator.website.SEOFriendlyBlogIdeas(_id, email, req.body, apiKey);
        break;
      case 'website-landing-page-headline':
        generatedContent = await generator.website.landingPageHeadline(_id, email, req.body, apiKey);
        break;
      case 'product-name':
        generatedContent = await generator.product.generateProductName(_id, email, req.body, apiKey);
        break;
      case 'linkedin-summary':
        generatedContent = await generator.linkedIn.generateLinkedInSummary(_id, email, req.body, apiKey);
        break;
      case 'catchy-business-taglines':
        generatedContent = await generator.business.generateCatchyBusinessTaglines(_id, email, req.body, apiKey);
        break;
      case 'fiverr-profile-description':
        generatedContent = await generator.fiverr.profileDescription(_id, email, req.body, apiKey);
        break;
      case 'fiverr-categories-headline':
        generatedContent = await generator.fiverr.generateFiverrCategoriesHeadline(_id, email, req.body, apiKey);
        break;
      case 'cv-summary':
        generatedContent = await generator.cv.generateCVSummary(_id, email, req.body, apiKey);
        break;
      case 'amazon-product-listings':
        generatedContent = await generator.amazon.generateAmazonProductListings(_id, email, req.body, apiKey);
        break;
      case 'problem-agitate-solution':
        generatedContent = await generator.sales.problemAgitateSolution(_id, email, req.body, apiKey);
        break;
      case 'problem-agitate-solution-outcome':
        generatedContent = await generator.sales.problemAgitateSolutionOutcome(_id, email, req.body, apiKey);
        break;
      case 'attention-interest-desire-action':
        generatedContent = await generator.sales.attentionInterestDesireAction(_id, email, req.body, apiKey);
        break;
      case 'generate-recipe':
        generatedContent = await generator.recipe.generateRecipe(_id, email, req.body, apiKey);
        break;
      default:
        res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid task type provided.' });
        return;
    }

    // Send the generated content as the response
    res.status(httpStatus.OK).send(generatedContent);
  }
});

module.exports = {
  generate,
};
