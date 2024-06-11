module.exports = {
  amazonProductListings: {
    task: 'amazon-product-listings',
    productName: {
      min: 3,
      max: 50,
    },
    productCategories: {
      min: 5,
      max: 50,
    },
    productFeatures: {
      min: 10,
      max: 250,
    },
    numberOfSuggestions: {
      min: 1,
      max: 10,
    },
  },
};
