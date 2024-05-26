/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT4,
  cleanAllTexts,
  storeData,
  processListContents,
  formatResponse,
  removeSpaces,
} = require('../content.service');

const googleAdHeadlines = async (userId, userEmail, { name, businessType, numberOfSuggestions }) => {
  const userPrompt = `Name: ${removeSpaces(name)}
Business Type: ${removeSpaces(businessType)}`;

  const prompt = `You are an expert in creating compelling Google Ad headlines. Your task is to write engaging and persuasive headlines based on the given name and business type. Ensure that the headlines capture the essence of the business and attract potential customers.

Guidelines:
1. **Relevance:** Ensure the headline is relevant to the business name and type.
2. **Engagement:** Create a headline that captures the audience’s interest.
3. **Clarity:** Ensure the headline is clear and concise.
4. **Persuasion:** Use persuasive language to encourage action.
5. **Professional Tone:** Maintain a professional tone throughout the headline.

Examples:
Name: Upwork
Business Type: Freelancer Market Place
Headline: Upwork™: Hire The Best - Trust Your Job To True Experts

Name: SEO Guru LTD
Business Type: SEO Services, Search Engine Optimization
Headline: Expert SEO Services UK | SEO Agency Of The Year 2019

Name: Namecheap
Business Type: Website hosting, cloud computing, data center
Headline: Namecheap provides website hosting from £2.50 | Get 50% off all packages

Name: Injury Lawyers 4U
Business Type: Law Firms
Headline: Injury Lawyers 4U™ | Expert Legal Advice

Name: Beds.co.ca
Business Type: Home Furniture
Headline: Beds at Beds.co.ca | Biggest Ever Bed Sale

${userPrompt}
Headline:`;

  const openAPIInformationsList = [];
  const googleAdHeadlinesList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const adHeadlines = await generateContentUsingGPT4('gpt-4o', 30, prompt, 0.9, 0.3, 0.2, [
      'Headline:',
      '\n',
    ]);
    const { id, object, created, model, choices } = adHeadlines;

    openAPIInformationsList.push({ id, object, created, model });
    googleAdHeadlinesList.push(cleanAllTexts(choices[0].text.split('\n')).join('. '));
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'ads-google-headlines',
    userPrompt,
    openAPIInformationsList,
    googleAdHeadlinesList
  );
  const userResponse = formatResponse(_id, 'ads-google-headlines', generatedContents);

  return userResponse;
};

const googleAdDescriptions = async (userId, userEmail, { businessName, productCategories, uniqueness, promotions, keywords, numberOfSuggestions }) => {
  const userPrompt = `Business Name: ${removeSpaces(businessName)}
Product Categories: ${removeSpaces(productCategories)}
What makes you unique: ${removeSpaces(uniqueness)}
Promotions: ${removeSpaces(promotions)}
Your business Keyword: ${removeSpaces(keywords)}`;

  const prompt = `You are an expert in creating compelling Google Ad descriptions. Your task is to write engaging and persuasive ad descriptions based on the given business name, product categories, uniqueness, promotions, and keywords. Ensure that the descriptions capture the benefits of the business and attract potential customers.

Guidelines:
1. **Relevance:** Ensure the description is relevant to the business and product categories.
2. **Engagement:** Create a description that captures the audience’s interest.
3. **Clarity:** Ensure the description is clear and concise.
4. **Persuasion:** Use persuasive language to highlight the uniqueness and promotions.
5. **Keywords:** Integrate the business keywords naturally into the description.

Examples:
Business Name: airyclub.com
Product Categories: Watches, Home Decor, Luggage & Bags & Wallets, Electronics, Electronics Industry & Business Home & Kitchen Watches Office & School Supplies.
What makes you unique: Cheap Products at Low Wholesale Prices
Promotions: Save Up to 80%
Your business Keyword: Marketplace, eCommerce, online store
Description: Electronics for £1 or Less Save Up to 80% www.airyclub.com 20000+ Products. Find Cheap Products at Low Wholesale Prices, Shop Now! Secure. Highly Committed. Free Shipping. Efficient & Fast Service. Save Up to 90% Fast Delivery. Easy Communication. Types: Watches, Home Decor, Luggage & Bags & Wallets, Electronics, Electronics Industry & Business Home & Kitchen Watches Office & School Supplies.

Business Name: denvertreeringdigital.com
Product Categories: Web Design & Development, Search Engine Optimizing, Search Engine Marketing
What makes you unique: Friendly Team, 24/7 live support, Quality
Promotions: Save Up to 10%
Your business Keyword: Web Design & Development, Search Engine Optimizing, Search Engine Marketing
Description: User-Friendly Lead Generation Designed in Denvertreeringdigital.com Tree Ring Digital designs high-performance websites unique to your business. Web Design & Development. Search Engine Optimizing. Website Maintenance. GeoFencing Services. Reputation Marketing Website Design SEO Services. Search Engine Marketing.

Business Name: rentalcars.com
Product Categories: Car Rental service
What makes you unique: 5 star rating, Best Price Guaranteed, Free Cancellations, Unbeatable Prices
Promotions: 5% off over 400 USD
Your business Keyword: Online Car Rental, travel car
Description: Car Rental in New York State From Only £4 Day rentalcars.com, Secure Your Car Rental Today. Best Price Guaranteed. Free Cancellations. Unbeatable Prices. We Speak Your Language. No Credit Card Fees. Includes Free Amendments. Types: Economy, Mini. Mini - from £4.00 day - 4 passengers.

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const googleAdDescriptionsList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedAdDescription = await generateContentUsingGPT4('gpt-4o', 60, prompt, 0.9, 0, 0, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = generatedAdDescription;

    openAPIInformationsList.push({ id, object, created, model });
    googleAdDescriptionsList.push(cleanAllTexts(choices[0].text.split('\n')).join('. '));
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'ads-google-descriptions',
    userPrompt,
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
