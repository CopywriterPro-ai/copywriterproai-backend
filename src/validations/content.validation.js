const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.valid('paraphrasing').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const expander = {
  body: Joi.object().keys({
    task: Joi.valid('expander').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const simplifier = {
  body: Joi.object().keys({
    task: Joi.valid('simplifier').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const summarizer = {
  body: Joi.object().keys({
    task: Joi.valid('summarizer').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const abstractGenerator = {
  body: Joi.object().keys({
    task: Joi.valid('abstract').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const notesFromPassage = {
  body: Joi.object().keys({
    task: Joi.valid('notes-from-passage').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    numberOfPoints: Joi.number().min(2).max(10).required(),
  }),
};

const grammarFixer = {
  body: Joi.object().keys({
    task: Joi.valid('grammar-fixer').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
  }),
};

const proofread = {
  body: Joi.object().keys({
    task: Joi.valid('proofread').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(500).required(),
      otherwise: Joi.string().min(5).max(1000).required(),
    }),
  }),
};

const changeTone = {
  body: Joi.object().keys({
    task: Joi.valid('change-tone').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    tone: Joi.string()
      .required()
      .valid(
        'Formal',
        'Friendly',
        'Neutral',
        'Confident',
        'Curious',
        'Surprised',
        'Happy',
        'Angry',
        'Sad',
        'Concerned',
        'Encouraging',
        'Regretful',
        'Optimistic',
        'Excited',
        'Witty',
        'Persuasive',
        'Empathetic'
      ),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const activePassive = {
  body: Joi.object().keys({
    task: Joi.valid('active-passive').required(),
    userText: Joi.string().min(5).max(200).required(),
    from: Joi.string().required().valid('Active', 'Passive'),
    to: Joi.string().required().valid('Active', 'Passive'),
  }),
};

const pointOfView = {
  body: Joi.object().keys({
    task: Joi.valid('point-of-view').required(),
    userText: Joi.string().min(5).max(200).required(),
    from: Joi.string().required().valid('first-person', 'second-person', 'third-person'),
    to: Joi.string().required().valid('first-person', 'second-person', 'third-person'),
    gender: Joi.string().valid('male', 'female'),
  }),
};

const blog = {
  body: Joi.object().keys({
    task: Joi.valid('blog-writing').required(),
    about: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(400).required(),
      otherwise: Joi.string().min(10).max(600).required(),
    }),
  }),
};

const blogIdea = {
  body: Joi.object().keys({
    task: Joi.valid('blog-idea').required(),
    productName: Joi.string().min(3).max(50).required(),
    productDescription: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const blogHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('blog-headline').required(),
    about: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const blogIntro = {
  body: Joi.object().keys({
    task: Joi.valid('blog-intro').required(),
    about: Joi.string().min(10).max(200).required(),
    headline: Joi.string().min(10).max(150).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const blogOutline = {
  body: Joi.object().keys({
    task: Joi.valid('blog-outline').required(),
    numberOfPoints: Joi.number().min(3).max(10).required(),
    about: Joi.string().min(10).max(200).required(),
    headline: Joi.string().min(10).max(150).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const blogTopic = {
  body: Joi.object().keys({
    task: Joi.valid('blog-topic').required(),
    about: Joi.string().min(10).max(200).required(),
    headline: Joi.string().min(10).max(150).required(),
    topic: Joi.string().min(10).max(500).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const blogOutro = {
  body: Joi.object().keys({
    task: Joi.valid('blog-outro').required(),
    about: Joi.string().min(10).max(200).required(),
    headline: Joi.string().min(10).max(150).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const productDescription = {
  body: Joi.object().keys({
    task: Joi.valid('product-description').required(),
    productName: Joi.string().min(3).max(50).required(),
    productType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const makeProductDescriptionSEOFriendly = {
  body: Joi.object().keys({
    task: Joi.valid('seo-friendly-product-description').required(),
    productName: Joi.string().min(3).max(50).required(),
    productType: Joi.string().min(3).max(100).required(),
    productFeatures: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(3).max(150).required(),
      otherwise: Joi.string().min(10).max(250).required(),
    }),
    productBenefits: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(3).max(150).required(),
      otherwise: Joi.string().min(10).max(250).required(),
    }),
    targetAudience: Joi.string().min(3).max(50).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const productReview = {
  body: Joi.object().keys({
    task: Joi.valid('product-review').required(),
    product: Joi.string().min(3).max(50).required(),
    rating: Joi.string().required().valid('Worst', 'Bad', 'Average', 'Good', 'Best').insensitive(),
    comment: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const catchyHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('catchy-headline').required(),
    content: Joi.string().min(5).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const attentionGrabbingHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('attention-grabbing-headline').required(),
    content: Joi.string().min(5).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const newspaperHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('newspaper-headline').required(),
    content: Joi.string().min(5).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const resumeHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('resume-headline').required(),
    profession: Joi.string().min(5).max(50).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const campaignPostIdeaFromBusinessType = {
  body: Joi.object().keys({
    task: Joi.valid('campaign-facebook-post', 'twitter-campaign-post').required(),
    platformType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const facebookAdPrimaryTexts = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-primary-texts').required(),
    companyName: Joi.string().min(3).max(50).required(),
    businessType: Joi.string().min(5).max(100).required(),
    benefits: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const facebookAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-headlines').required(),
    productName: Joi.string().min(3).max(50).required(),
    businessType: Joi.string().min(5).max(100).required(),
    customerBenefit: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const facebookAdLinkDescription = {
  body: Joi.object().keys({
    task: Joi.valid('ads-facebook-link-descriptions').required(),
    companyName: Joi.string().min(3).max(50).required(),
    platformType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const facebookAdsFromProductDescription = {
  body: Joi.object().keys({
    task: Joi.valid('facebook-ads-from-product-description').required(),
    product: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const instagramAdTexts = {
  body: Joi.object().keys({
    task: Joi.valid('instagram-ad-texts').required(),
    platformType: Joi.string().min(5).max(100).required(),
    context: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const linkedinAdTexts = {
  body: Joi.object().keys({
    task: Joi.valid('linkedin-ad-texts').required(),
    companyName: Joi.string().min(3).max(50).required(),
    businessType: Joi.string().min(5).max(100).required(),
    benefits: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const googleAdHeadlines = {
  body: Joi.object().keys({
    task: Joi.valid('ads-google-headlines').required(),
    name: Joi.string().min(3).max(50).required(),
    businessType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const googleAdDescriptions = {
  body: Joi.object().keys({
    task: Joi.valid('ads-google-descriptions').required(),
    businessName: Joi.string().min(3).max(50).required(),
    productCategories: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(100).required(),
      otherwise: Joi.string().min(5).max(150).required(),
    }),
    uniqueness: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(100).required(),
      otherwise: Joi.string().min(10).max(200).required(),
    }),
    promotions: Joi.string().min(5).max(50).required(),
    keywords: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(3).max(100).required(),
      otherwise: Joi.string().min(3).max(150).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const youtubeVideoTitleFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-titles-from-description').required(),
    description: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const youtubeVideoIdeas = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-ideas').required(),
    topic: Joi.string().min(5).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const imageIdeasFromAdText = {
  body: Joi.object().keys({
    task: Joi.valid('image-idea-from-ad-text').required(),
    product: Joi.string().min(5).max(100).required(),
    adText: Joi.string().min(10).max(200).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const emailMarketingCampaignSubject = {
  body: Joi.object().keys({
    task: Joi.valid('email-marketing-campaign-subject').required(),
    productDescription: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const emailMarketingCampaignBody = {
  body: Joi.object().keys({
    task: Joi.valid('email-marketing-campaign-body').required(),
    productDescription: Joi.string().min(10).max(200).required(),
    about: Joi.string().min(10).max(150).required(),
    subjectLine: Joi.string().min(5).max(60).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const emailBody = {
  body: Joi.object().keys({
    task: Joi.valid('email-body').required(),
    about: Joi.string().min(10).max(150).required(),
    to: Joi.string().min(5).max(30).required(),
    tone: Joi.string()
      .required()
      .valid(
        'Formal',
        'Friendly',
        'Neutral',
        'Confident',
        'Curious',
        'Surprised',
        'Happy',
        'Angry',
        'Sad',
        'Concerned',
        'Encouraging',
        'Regretful',
        'Optimistic',
        'Excited',
        'Witty',
        'Persuasive',
        'Empathetic'
      )
      .insensitive(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const generatedSubjectFromBody = {
  body: Joi.object().keys({
    task: Joi.valid('email-subject-from-body').required(),
    emailBody: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(400).required(),
      otherwise: Joi.string().min(10).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const websiteShortDescription = {
  body: Joi.object().keys({
    task: Joi.valid('website-short-description').required(),
    industryType: Joi.string().min(5).max(100).required(),
    businessName: Joi.string().min(3).max(50).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const keywordsFromText = {
  body: Joi.object().keys({
    task: Joi.valid('website-keywords-from-text').required(),
    primaryText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(400).required(),
      otherwise: Joi.string().min(10).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const videoTagsFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-video-tags-from-description').required(),
    primaryText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(400).required(),
      otherwise: Joi.string().min(10).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const channelTagsFromDescription = {
  body: Joi.object().keys({
    task: Joi.valid('youtube-channel-tags-from-description').required(),
    primaryText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(10).max(400).required(),
      otherwise: Joi.string().min(10).max(600).required(),
    }),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const seoFriendlyBlogIdeas = {
  body: Joi.object().keys({
    task: Joi.valid('website-seo-friendly-blog-ideas').required(),
    content: Joi.string().min(5).max(100).required(),
    desiredOutcome: Joi.string().min(5).max(100).required(),
    industry: Joi.string().min(5).max(50).required(),
    targetAudience: Joi.string().min(3).max(50).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const landingPageHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('website-landing-page-headline').required(),
    businessType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const productName = {
  body: Joi.object().keys({
    task: Joi.valid('product-name').required(),
    productDescription: Joi.string().min(10).max(200).required(),
    keywords: Joi.string().min(3).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const linkedInSummary = {
  body: Joi.object().keys({
    task: Joi.valid('linkedin-summary').required(),
    profession: Joi.string().min(5).max(50).required(),
    skills: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const catchyBusinessTaglines = {
  body: Joi.object().keys({
    task: Joi.valid('catchy-business-taglines').required(),
    companyName: Joi.string().min(3).max(50).required(),
    businessType: Joi.string().min(5).max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const fiverrProfileDescription = {
  body: Joi.object().keys({
    task: Joi.valid('fiverr-profile-description').required(),
    profession: Joi.string().min(5).max(100).required(),
    experience: Joi.string().min(5).max(20).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
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
    yourJobTitle: Joi.string().min(3).max(50).required(),
    keyAchievements: Joi.string().min(10).max(150).required(),
    yearsOfExperience: Joi.number().max(100).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const problemAgitateSolution = {
  body: Joi.object().keys({
    task: Joi.valid('problem-agitate-solution').required(),
    productName: Joi.string().min(3).max(50).required(),
    productDescription: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const problemAgitateSolutionOutcome = {
  body: Joi.object().keys({
    task: Joi.valid('problem-agitate-solution-outcome').required(),
    productName: Joi.string().min(3).max(50).required(),
    productDescription: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const attentionInterestDesireAction = {
  body: Joi.object().keys({
    task: Joi.valid('attention-interest-desire-action').required(),
    productName: Joi.string().min(3).max(50).required(),
    productDescription: Joi.string().min(10).max(300).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
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

const amazonProductListings = {
  body: Joi.object().keys({
    task: Joi.valid('amazon-product-listings').required(),
    productName: Joi.string().min(3).max(50).required(),
    productCategories: Joi.string().min(5).max(50).required(),
    productFeatures: Joi.string().min(10).max(250).required(),
    numberOfSuggestions: Joi.number().min(1).max(10).required(),
  }),
};

const recipe = {
  body: Joi.object().keys({
    task: Joi.valid('generate-recipe').required(),
    recipeName: Joi.string().required(),
    ingredients: Joi.string().required(),
  }),
};

module.exports = {
  paraphrase,
  expander,
  simplifier,
  summarizer,
  abstractGenerator,
  notesFromPassage,
  grammarFixer,
  proofread,
  changeTone,
  activePassive,
  pointOfView,
  blog,
  blogIdea,
  blogHeadline,
  blogOutline,
  blogIntro,
  blogTopic,
  blogOutro,
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
  emailMarketingCampaignSubject,
  emailMarketingCampaignBody,
  emailBody,
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
  fiverrProfileDescription,
  fiverrCategoriesHeadline,
  CVSummary,
  amazonProductListings,
  problemAgitateSolution,
  problemAgitateSolutionOutcome,
  attentionInterestDesireAction,
  recipe,
};
