module.exports = {
  campaignPostIdeaFromBusinessType: {
    task: 'campaign-facebook-post',
    platformType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  facebookAdPrimaryTexts: {
    task: 'ads-facebook-primary-texts',
    companyName: {
      min: 3,
      max: 50,
    },
    businessType: {
      min: 5,
      max: 100,
    },
    benefits: {
      min: 10,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  facebookAdHeadlines: {
    task: 'ads-facebook-headlines',
    productName: {
      min: 3,
      max: 50,
    },
    businessType: {
      min: 5,
      max: 100,
    },
    customerBenefit: {
      min: 10,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  facebookAdLinkDescription: {
    task: 'ads-facebook-link-descriptions',
    companyName: {
      min: 3,
      max: 50,
    },
    platformType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  facebookAdsFromProductDescription: {
    task: 'facebook-ads-from-product-description',
    product: {
      min: 10,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
