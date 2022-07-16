module.exports = {
  websiteShortDescription: {
    task: 'website-short-description',
    businessName: {
      min: 3,
      max: 50,
    },
    industryType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  keywordsFromText: {
    task: 'website-keywords-from-text',
    primaryText: {
      min: 10,
      max: 400,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  seoFriendlyBlogIdeas: {
    task: 'website-seo-friendly-blog-ideas',
    content: {
      min: 5,
      max: 100,
    },
    desiredOutcome: {
      min: 5,
      max: 100,
    },
    industry: {
      min: 5,
      max: 50,
    },
    targetAudience: {
      min: 3,
      max: 50,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  landingPageHeadline: {
    task: 'website-landing-page-headline',
    businessType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
