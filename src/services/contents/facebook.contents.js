const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const campaignPostFromBusinessType = async (userId, task, { platformType }) => {
  const prompt = `Write a Facebook Ad Primary text from the given context.

Platform: ${removeSpaces(platformType)}
List of 5 Primary text:
-`;

  const campaignPostIdea = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, task, prompt, campaignPostIdea);
};

const facebookAdPrimaryTexts = async (userId, { platformType, companyName, benefits }) => {
  const prompt = `Write Facebook Ad Primary text for following platform

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

Business Name: ${platformType}
Business Type: ${companyName}
Customers Benefit: ${benefits}
Description:
List of 5 Primary texts:
-`;

  const primaryTexts = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'ads-facebook-primary-texts', prompt, primaryTexts);
};

const facebookAdHeadlines = async (userId, { platformType }) => {
  // const prompt = `Catchy short Headlines for Facebook ad Samples:
  // - Taste the grains. Build your body
  // - Reignite your spark
  // - Mapping Corona virus outbreak across the world
  // - Feel & Finance Better
  // - We ❤️ Pets. We 💣 Viruses
  // - 30% Off First Subscription Order with Code X
  // - Dentist Quality Night Guards
  //

  const prompt = `Catchy short Headlines for Facebook ad Samples:
  - Shop the latest engagement right trends. [website_link].
  - A CRAZY comfortable sneaker concealed pitching an elegant, luxurious shoe!.
  - Discover the new X Collection.
  - ENTIRE SITE is an Additional 60% OFF during our Labour Day Blowout Sale! Enter Promo Code.
  - Adorable baby one-piece Soft & Cute Limited time up to 80% OFF.
  - You have a limited offer of up to 80%.
  - Hair Extensions, the way way to add instant length and volume.
  - Be the perfect host with Royal Albert Dinnerware!
  - Update Your closet for WINTER! Get AESTHETIC clothing at an affordable price.
  - X socks are so comfortable, you won’t want to wear any other socks.
  - One Bag. Every Lifestyle.
  - I can’t express how incredible this watch looks on the wrist.
  - Staying Healthy has never been more important!
  - You bring the idea. We will help take it from there.

Now write 5 catchy short Headline for following platform

Platform: ${removeSpaces(platformType)}
List of 5 catchy short Headline
-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'ads-facebook-headlines', prompt, headlines);
};

const facebookAdLinkDescription = async (userId, { platformType, companyName }) => {
  const prompt = `Write 5 Link Description for the following Platform and Ad headline.

Company Name: DoorDash
Business Type: Online food ordering
Description: Explore our selection of local favourites with $0 delivery fee for your first month. $10 order minimum.

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\n✓ Hand-Picked Ego-Free Professional Graphic Designers\\n✓ No Overhead Costs\\n✓ Always Available - No PTO, Emergencies, or Sick Days\\n✓ Same-Day Revisions\\n✓ Unlimited Graphic Design Help

Company Name: Bolt
Business Type: Ride-hailing
Ad Creative Description: Get £15 off your first trip with the Bolt app. Enter promo code HEYLONDON in your app and enjoy the discount.

Company Name: Mailchimp
Business Type: Marketing Automation Platform
Description: So your business is up and running! Now what? Grow with a Marketing CRM that gets smarter as you go. That's what

Now write 5 long catchy Description for following platform

Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(platformType)}
Description:
List of 5 catchy long Description using 150 words
`;

  const linkDescriptions = await generateContentUsingGPT3('davinci-instruct-beta', 300, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'ads-facebook-link-descriptions', prompt, linkDescriptions);
};

const facebookAdsFromProductDescription = async (userId, { product }) => {
  const prompt = `Write Facebook Ad for following Product

Product: ${removeSpaces(product)}
List of 5 Ads:
-`;

  const adsFromProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', 150, prompt, 0.8, 0.2, 0.4, [
    '\n\n',
  ]);
  return processListContents(userId, 'facebook-ads-from-product-description', prompt, adsFromProductDescription);
};

module.exports = {
  campaignPostFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
};
