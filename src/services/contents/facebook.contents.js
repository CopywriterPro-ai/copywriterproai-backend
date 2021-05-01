const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const campaignPostFromBusinessType = async (userId, task, { platformType }) => {
  const prompt = `Write a Facebook Ad Primary text from the given context.

Platform: ${removeSpaces(platformType)}
List of 5 Primary text:
-`;

  const campaignPostIdea = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, task, prompt, campaignPostIdea);
};

const facebookAdPrimaryTexts = async (userId, { platformType, context }) => {
  const prompt = `Write Facebook Ad Primary text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Primary texts:
-`;

  const primaryTexts = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-primary-texts', prompt, primaryTexts);
};

const facebookAdHeadlines = async (userId, { platformType }) => {
  const prompt = `Catchy short Headlines for Facebook ad Samples:
- Taste the grains. Build your body
- Reignite your spark
- Mapping Corona virus outbreak across the world
- Feel & Finance Better
- We ❤️ Pets. We 💣 Viruses
- 30% Off First Subscription Order with Code X
- Dentist Quality Night Guards

Now write 5 catchy short Headline for following platform

Platform: ${removeSpaces(platformType)}
List of 5 catchy short Headline
-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-headlines', prompt, headlines);
};

const facebookAdLinkDescription = async (userId, { platformType, headline }) => {
  const prompt = `Write 5 Link Description for the following Platform and Ad headline.

Platform: ${removeSpaces(platformType)}
Headline: ${removeSpaces(headline)}
List of 5 Link descriptions:
-`;

  const linkDescriptions = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-link-descriptions', prompt, linkDescriptions);
};

const facebookAdsFromProductDescription = async (userId, { product }) => {
  const prompt = `Write Facebook Ad for following Product

Product: ${removeSpaces(product)}
List of 5 Ads:
-`;

  const adsFromProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.4, ['\n\n']);
  return processListContents(userId, 'facebook-ads-from-product-description', prompt, adsFromProductDescription);
};

module.exports = {
  campaignPostFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
};
