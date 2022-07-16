module.exports = {
  productDescription: {
    task: 'product-description',
    productName: {
      min: 3,
      max: 50,
    },
    productType: {
      min: 5,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  makeProductDescriptionSEOFriendly: {
    task: 'seo-friendly-product-description',
    productName: {
      min: 3,
      max: 50,
    },
    productType: {
      min: 5,
      max: 100,
    },
    productFeatures: {
      min: 5,
      max: 150,
      variable: true,
    },
    productBenefits: {
      min: 5,
      max: 150,
      variable: true,
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

  productReview: {
    task: 'product-review',
    product: {
      min: 3,
      max: 50,
    },
    rating: ['Worst', 'Bad', 'Average', 'Good', 'Best'],
    comment: {
      min: 10,
      max: 200,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },

  productName: {
    task: 'product-name',
    productDescription: {
      min: 10,
      max: 200,
    },
    keywords: {
      min: 3,
      max: 100,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
