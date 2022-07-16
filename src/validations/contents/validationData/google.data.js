module.exports = {
  googleAdHeadlines: {
    task: 'ads-google-headlines',
    name: {
      min: 3,
      max: 50,
    },
    businessType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  googleAdDescriptions: {
    task: 'ads-google-descriptions',
    businessName: {
      min: 3,
      max: 50,
    },
    productCategories: {
      min: 5,
      max: 100,
      variable: true,
    },
    uniqueness: {
      min: 10,
      max: 100,
      variable: true,
    },
    promotions: {
      min: 5,
      max: 50,
    },
    keywords: {
      min: 3,
      max: 100,
      variable: true,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
