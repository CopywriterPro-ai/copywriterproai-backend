/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  cleanAllTexts,
  storeData,
  processListContents,
  formatResponse,
} = require('../content.service');

const googleAdHeadlines = async (userId, { name, businessType }) => {
  const prompt = `Write Google Ad Headline:

Name: Upwork
Business Type: Freelancer Market Place
Headline: Upwork™: Hire The Best - Trust Your Job To True Experts

Name: SEO Guru LTD
Business Type: SEO Services, Search Engine Optimization
Headline: Expert SEO Services UK | SEO Agency Of The Year 2019

Name: Namecheap
Business Type: Website hosting, cloud computing, data center
Headline: Namecheap provide website hosting from £2.50 | Get 50% off all packages

Name: Injury Lawyers 4U
Business Type: Law Farms
Headline: Injury Lawyers 4U™ | Expert Legal Advice

Name: Beds.co.ca
Business Type: Home Furniture
Headline: Beds at Beds.co.ca | Biggest Ever Bed Sale

Name: ${name}
Business Type: ${businessType}
Headline:`;

  const openAPIInformationsList = [];
  const googleAdHeadlinesList = [];

  for (let i = 0; i < 5; i++) {
    const adHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 30, prompt, 0.9, 0.3, 0.2, [
      'Headline:',
      '\n',
    ]);
    const { id, object, created, model, choices } = adHeadlines;

    openAPIInformationsList.push({ id, object, created, model });
    googleAdHeadlinesList.push(cleanAllTexts(choices[0].text.split('\n')).join('. '));
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'ads-google-headlines',
    prompt,
    openAPIInformationsList,
    googleAdHeadlinesList
  );
  const userResponse = formatResponse(_id, 'ads-google-headlines', generatedContents);

  return userResponse;
};

const googleAdDescriptions = async (userId, { businessName, productCategories, uniqueness, promotions, keywords }) => {
  const prompt = `Write benefits Audience will get from following Platform

Business Name: airyclub.com\n
Product Categories: Watches, Home Decor, Luggage & Bags & Wallets, Electronics, Electronics Industry & Business Home & Kitchen Watches Office & School Supplies.\n
What makes you unique: Cheap Products at Low Wholesale Prices\n
Promotions: Save Up to 80%\n
Your business Keyword: Marketplace, eCommerce, online store\n
Description: Electronics for £ 1 or Less Save Up to 80% www.airyclub.com 20000+ Products. Find Cheap Products at Low Wholesale Prices, Shop Now! Secure. Highly Committed. Free Shipping. Efficient & Fast Service. Save Up to 90% Fast Delivery. Easy Communication. Types: Watches, Home Decor, Luggage & Bags & Wallets, Electronics, Electronics Industry & Business Home & Kitchen Watches Office & School Supplies.\n

Business Name: denvertreeringdigital.com\n
Product Categories: Web Design & Development, Search Engine Optimizing, Search Engine Marketing\n
What makes you unique: Friendly Team, 24/7 live support, Quality\n
Promotions: Save Up to 10%\n
Your business Keyword: Web Design & Development, Search Engine Optimizing, Search Engine Marketing\n
Description: User-Friendly Lead Generation Designed in Denvertreeringdigital.com Tree Ring Digital designs high-performance websites unique to your business. Web Design & Development. Search Engine Optimizing. Website Maintenance. GeoFencing Services. Reputation Marketing Website Design SEO Services. Search Engine Marketing\n

Business Name: rentalcars.com\n
Product Categories: Car Rental service\n
What makes you unique: 5 star rating,Best Price Guaranteed, Free Cancellations, Unbeatable Prices\n
Promotions: 5% off over 400 USD\n
Your business Keyword: Online Car Rental, travel car\n
Description: Car Rental in New York State From Only £4 Day rentalcars.com, Secure Your Car Rental Today. Best Price Guaranteed. Free Cancellations. Unbeatable Prices. We Speak Your Language. No Credit Card Fees. Includes Free Amendments. Types: Economy, Mini. Mini - from £4.00 day - 4 passengers.\n

Business Name: ${businessName}\n
Product Categories: ${productCategories}\n
What makes you unique: ${uniqueness}\n
Promotions: ${promotions}\n
Your business Keyword: ${keywords}\n
Description:`;

  const openAPIInformationsList = [];
  const googleAdDescriptionsList = [];

  for (let i = 0; i < 5; i++) {
    const generatedAdDescription = await generateContentUsingGPT3('davinci-instruct-beta', 60, prompt, 0.9, 0, 0, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = generatedAdDescription;

    openAPIInformationsList.push({ id, object, created, model });
    googleAdDescriptionsList.push(cleanAllTexts(choices[0].text.split('\n')).join('. '));
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'ads-google-descriptions',
    prompt,
    openAPIInformationsList,
    googleAdDescriptionsList
  );
  const userResponse = formatResponse(_id, 'ads-google-descriptions', generatedContents);

  return userResponse;
};

module.exports = {
  googleAdHeadlines,
  googleAdDescriptions,
};
