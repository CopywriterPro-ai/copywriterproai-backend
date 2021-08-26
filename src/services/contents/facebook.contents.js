/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const campaignPostFromBusinessType = async (userId, userEmail, task, { platformType }) => {
  const userPrompt = `Platform: ${removeSpaces(platformType)}`;

  const prompt = `Write a Facebook Ad Primary text from the given context.

${userPrompt}
List of 5 Primary text:
-`;

  const campaignPostIdea = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, userEmail, task, userPrompt, campaignPostIdea);
};

const facebookAdPrimaryTexts = async (userId, userEmail, { businessType, companyName, benefits }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(businessType)}
Customers Benefit: ${removeSpaces(benefits)}`;

  const prompt = `Write long Facebook Ads description using more than 130 word:

Company Name: DoorDash
Business Type: Online food ordering
Customers Benefit: Makes the food ordering process easier, place an order at virtually any time, from anywhere, saving time
Description: Explore our selection of local favourites with $0 delivery fee for your first month. $10 order minimum.

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Customers Benefit: On-demand, flat-rate graphic design support by professional designers
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\n✓ Hand-Picked Ego-Free Professional Graphic Designers\\n✓ No Overhead Costs\\n✓ Always Available - No PTO, Emergencies, or Sick Days\\n✓ Same-Day Revisions\\n✓ Unlimited Graphic Design Help

Company Name: Bolt
Business Type: Ride-hailing
Customers Benefit: Saves Time and Money, Less Stress for Passenger and Driver, You Don't Have to Know The Routes, 20% off
Ad Creative Description: Get £15 off your first trip with the Bolt app. Enter promo code HEYLONDON in your app and enjoy the discount.

Company Name: Mailchimp
Business Type: Marketing Automation Platform
Customers Benefit: Send emails to targeted audiences, re-engage subscribers, interface is simple and customizable
Description: So your business is up and running! Now what? Grow with a Marketing CRM that gets smarter as you go. That's what.

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const facebookAdPrimaryTextsList = [];

  for (let i = 0; i < 5; i++) {
    const description = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.2, 0.1, [
      'Description:',
      '\n',
    ]);
    const { id, object, created, model, choices } = description;

    openAPIInformationsList.push({ id, object, created, model });
    facebookAdPrimaryTextsList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'ads-facebook-primary-texts',
    userPrompt,
    openAPIInformationsList,
    facebookAdPrimaryTextsList
  );

  const userResponse = formatResponse(_id, 'ads-facebook-primary-texts', generatedContents);

  return userResponse;
};

const facebookAdHeadlines = async (userId, userEmail, { productName, businessType, customerBenefit }) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Business Type: ${removeSpaces(businessType)}
Customer Benefit: ${removeSpaces(customerBenefit)}`;

  const prompt = `Catchy short Headlines for Facebook ads:

Product Name: Apple Watch Series 6
Business Type: Smartwatch
Customer Benefit: Mother's day sales
Headline: You can't put a price on giving Mom more time to enjoy.\nGet an Apple Watch For your mom this Mother's Day.\nMom deserves the best this Mother's Day. Get 15% off any of our watches.\n

Product Name: Sneakers RT
Business Type: Sneakers, Shoe
Customer Benefit: comfortable sneaker, luxurious shoe
Headline: A CRAZY comfortable Sneaker RT concealed pitching an elegant, luxurious shoe!.

Product Name: ebazar.com
Business Type: eCommerce, Online store
Customer Benefit: 60% OFF during our Labour Day
Headline: ENTIRE SITE is an Additional 60% OFF during our Labour Day Blowout Sale! Enter Promo Code.

Product Name: Baby's Clothing
Business Type: Baby Product
Customer Benefit: 80% OFF
Headline: Adorable baby one-piece Soft & Cute Limited time up to 80% OFF.

Product Name: Easy Travel Bag
Business Type: Leather bag, travel bag
Customer Benefit: One bag for everything
Headline: One Bag. Every Lifestyle.

${userPrompt}
Headline:`;

  const openAPIInformationsList = [];
  const facebookAdHeadlinesList = [];

  for (let i = 0; i < 5; i++) {
    const headlines = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.2, 0.1, [
      'Headline:',
      '\n',
    ]);
    const { id, object, created, model, choices } = headlines;

    openAPIInformationsList.push({ id, object, created, model });
    facebookAdHeadlinesList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'ads-facebook-headlines',
    userPrompt,
    openAPIInformationsList,
    facebookAdHeadlinesList
  );

  const userResponse = formatResponse(_id, 'ads-facebook-headlines', generatedContents);

  return userResponse;
};

const facebookAdLinkDescription = async (userId, userEmail, { platformType, companyName }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(platformType)}`;

  const prompt = `Write 5 Link Description for the following Platform and Ad headline.

Company Name: DoorDash
Business Type: Online food ordering
Description: Explore our selection of local favourites with $0 delivery fee for your first month. $10 order minimum.

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\n✓ Hand-Picked Ego-Free Professional Graphic Designers\\n✓ No Overhead Costs\\n✓ Always Available - No PTO, Emergencies, or Sick Days\\n✓ Same-Day Revisions\\n✓ Unlimited Graphic Design Help

Company Name: Bolt
Business Type: Ride-hailing
Description: Get £15 off your first trip with the Bolt app. Enter promo code HEYLONDON in your app and enjoy the discount.

Company Name: Mailchimp
Business Type: Marketing Automation Platform
Description: So your business is up and running! Now what? Grow with a Marketing CRM that gets smarter as you go. That's what

Now write 5 long catchy Description for following platform

${userPrompt}
Description:
List of 5 catchy link Description using 150 words
`;

  const linkDescriptions = await generateContentUsingGPT3('davinci-instruct-beta', 300, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, userEmail, 'ads-facebook-link-descriptions', userPrompt, linkDescriptions);
};

const facebookAdsFromProductDescription = async (userId, userEmail, { product }) => {
  const userPrompt = `Product: ${removeSpaces(product)}`;

  const prompt = `Write Facebook Ad for following Product

${userPrompt}
List of 5 Ads:
-`;

  const adsFromProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', 150, prompt, 0.8, 0.2, 0.4, [
    '\n\n',
  ]);
  return processListContents(
    userId,
    userEmail,
    'facebook-ads-from-product-description',
    userPrompt,
    adsFromProductDescription
  );
};

module.exports = {
  campaignPostFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
};
