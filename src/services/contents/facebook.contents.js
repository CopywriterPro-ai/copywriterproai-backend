/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT4,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const campaignPostFromBusinessType = async (userId, userEmail, task, { platformType, numberOfSuggestions }) => {
  const userPrompt = `Platform: ${removeSpaces(platformType)}`;

  const prompt = `You are an expert social media marketer. Your task is to write engaging Facebook Ad primary text based on the given platform type. Use your expertise to create compelling, clear, and persuasive ad texts that capture the audience's attention and encourage them to take action.

Guidelines:
1. **Relevance:** Ensure the text is relevant to the platform type.
2. **Engagement:** Create content that captures the audience’s interest.
3. **Clarity:** Ensure the text is clear and concise.
4. **Persuasion:** Use persuasive language to encourage action.
5. **Creativity:** Provide creative and unique texts that stand out.

${userPrompt}
List of ${numberOfSuggestions} Primary text:
-`;

  const campaignPostIdea = await generateContentUsingGPT4('gpt-4o', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, userEmail, task, userPrompt, campaignPostIdea);
};

const facebookAdPrimaryTexts = async (userId, userEmail, { businessType, companyName, benefits, numberOfSuggestions }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(businessType)}
Customers Benefit: ${removeSpaces(benefits)}`;

  const prompt = `You are a skilled copywriter. Your task is to write long Facebook Ads descriptions using more than 130 words. Use your expertise to create engaging, clear, and persuasive descriptions that highlight the benefits of the company’s product or service.

Guidelines:
1. **Length:** Ensure the description is more than 130 words.
2. **Relevance:** Ensure the description is relevant to the company and its benefits.
3. **Engagement:** Create content that captures the audience’s interest.
4. **Clarity:** Ensure the text is clear and concise.
5. **Persuasion:** Use persuasive language to encourage action.

Examples:
Company Name: DoorDash
Business Type: Online food ordering
Customers Benefit: Makes the food ordering process easier, place an order at virtually any time, from anywhere, saving time
Description: Explore our selection of local favourites with $0 delivery fee for your first month. $10 order minimum.

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Customers Benefit: On-demand, flat-rate graphic design support by professional designers
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\n✓ Hand-Picked Ego-Free Professional Graphic Designers\n✓ No Overhead Costs\n✓ Always Available - No PTO, Emergencies, or Sick Days\n✓ Same-Day Revisions\n✓ Unlimited Graphic Design Help

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

  for (let i = 0; i < numberOfSuggestions; i++) {
    const description = await generateContentUsingGPT4('gpt-4o', 100, prompt, 0.8, 0.2, 0.1, [
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

const facebookAdHeadlines = async (userId, userEmail, { productName, businessType, customerBenefit, numberOfSuggestions }) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Business Type: ${removeSpaces(businessType)}
Customer Benefit: ${removeSpaces(customerBenefit)}`;

  const prompt = `You are an expert in creating catchy and short headlines for Facebook ads. Your task is to generate headlines that are engaging, clear, and persuasive, based on the given product name, business type, and customer benefit.

Guidelines:
1. **Catchiness:** Ensure the headlines are catchy and grab attention.
2. **Relevance:** Ensure the headlines are relevant to the product, business type, and customer benefit.
3. **Clarity:** Ensure the headlines are clear and concise.
4. **Persuasion:** Use persuasive language to encourage action.

Examples:
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

  for (let i = 0; i < numberOfSuggestions; i++) {
    const headlines = await generateContentUsingGPT4('gpt-4o', 50, prompt, 0.8, 0.2, 0.1, [
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

  const prompt = `You are an expert in creating engaging and persuasive link descriptions for Facebook ads. Your task is to write five long, catchy descriptions for the given platform and ad headline.

Guidelines:
1. **Length:** Ensure each description is long and detailed.
2. **Catchiness:** Ensure the descriptions are catchy and grab attention.
3. **Relevance:** Ensure the descriptions are relevant to the platform and company.
4. **Clarity:** Ensure the descriptions are clear and concise.
5. **Persuasion:** Use persuasive language to encourage action.

Examples:
Company Name: DoorDash
Business Type: Online food ordering
Description: Explore our selection of local favourites with $0 delivery fee for your first month. $10 order minimum.

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\n✓ Hand-Picked Ego-Free Professional Graphic Designers\n✓ No Overhead Costs\n✓ Always Available - No PTO, Emergencies, or Sick Days\n✓ Same-Day Revisions\n✓ Unlimited Graphic Design Help

Company Name: Bolt
Business Type: Ride-hailing
Description: Get £15 off your first trip with the Bolt app. Enter promo code HEYLONDON in your app and enjoy the discount.

Company Name: Mailchimp
Business Type: Marketing Automation Platform
Description: So your business is up and running! Now what? Grow with a Marketing CRM that gets smarter as you go. That's what.

${userPrompt}
Description:
List of 5 catchy link descriptions using 150 words:`;

  const linkDescriptions = await generateContentUsingGPT4('gpt-4o', 300, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, userEmail, 'ads-facebook-link-descriptions', userPrompt, linkDescriptions);
};

const facebookAdsFromProductDescription = async (userId, userEmail, { product }) => {
  const userPrompt = `Product: ${removeSpaces(product)}`;

  const prompt = `You are an expert in creating Facebook ads. Your task is to write five engaging ads for the given product.

Guidelines:
1. **Relevance:** Ensure the ads are relevant to the product.
2. **Engagement:** Create content that captures the audience’s interest.
3. **Clarity:** Ensure the ads are clear and concise.
4. **Persuasion:** Use persuasive language to encourage action.
5. **Creativity:** Provide creative and unique ads that stand out.

${userPrompt}
List of 5 Ads:
-`;

  const adsFromProductDescription = await generateContentUsingGPT4('gpt-4o', 150, prompt, 0.8, 0.2, 0.4, [
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
