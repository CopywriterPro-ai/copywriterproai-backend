/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const OpenAI = require('openai-api');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Content } = require('../models');
const config = require('../config/config');

const { openAIAPIKey } = config.openAI;
const openai = new OpenAI(openAIAPIKey);

const generateContentUsingGPT3 = async (engine, prompt, temperature, frequencyPenalty, presencePenalty, stop) => {
  const gptResponse = await openai.complete({
    engine,
    prompt,
    maxTokens: 500,
    temperature,
    topP: 1,
    presencePenalty,
    frequencyPenalty,
    bestOf: 1,
    n: 1,
    stream: false,
    stop,
  });

  return gptResponse.data;
};

const formatContents = async (userId, documentType, prompt, apiInfos, choices) => {
  const contentInformation = {
    userId,
    prompt,
    documentType,
    openAPIInformation: apiInfos,
    generatedContents: choices,
  };
  return contentInformation;
};

const removeSpaces = (text) => {
  return text.trim().replace(/ +(?= )/g, '');
};

const cleanAllTexts = (contents) => {
  return contents.filter((text) => text.trim() !== '').map((text) => text.substr(text.indexOf('-') + 1, text.length).trim());
};

const storeData = async (userId, task, prompt, apiInfos, choices) => {
  const formattedContents = await formatContents(userId, task, prompt, apiInfos, choices);
  const content = await Content.create(formattedContents);
  return content;
};

const formatResponse = (id, task, generatedTexts) => {
  return {
    id,
    task,
    generatedTexts,
  };
};

const paraphrase = async (userId, { userText }) => {
  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${removeSpaces(userText)}
Paraphrase:`;

  let paraphrasedContents;
  while (1) {
    paraphrasedContents = await generateContentUsingGPT3('davinci', prompt, 0.9, 0.9, 0.9, ['\n']);
    if (
      paraphrasedContents.choices &&
      paraphrasedContents.choices[0].text.trim() !== '' &&
      paraphrasedContents.choices[0].text.trim() !== removeSpaces(userText)
    ) {
      paraphrasedContents.choices[0].text = paraphrasedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = paraphrasedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    'paraphrasing',
    prompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'paraphrasing', generatedContents);

  return userResponse;
};

const productDescription = async (userId, { productName, type, targetPeople, benefits }) => {
  const prompt = `Write Product description for following Product details
"""
Name: ${removeSpaces(productName)}
Type: ${removeSpaces(type)}
Target people: ${removeSpaces(targetPeople)}
Benefits: ${removeSpaces(benefits)}
Description:
`;

  const openAPIInformationsList = [];
  const productDescriptionsList = [];

  for (i = 0; i < 5; i++) {
    const generatedProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.3, [
      '"""',
      '\n\n',
    ]);
    const { id, object, created, model, choices } = generatedProductDescription;

    openAPIInformationsList.push({ id, object, created, model });
    productDescriptionsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'product-description',
    prompt,
    openAPIInformationsList,
    productDescriptionsList
  );
  const userResponse = formatResponse(_id, 'product-description', generatedContents);

  return userResponse;
};

const processListContents = async (userId, task, prompt, { id, object, created, model, choices }) => {
  const contents = cleanAllTexts(choices[0].text.split('\n'));
  const { _id, generatedContents } = await storeData(userId, task, prompt, { id, object, created, model }, contents);
  return formatResponse(_id, task, generatedContents);
}

const campaignPostFromBusinessType = async (userId, task, { platformType }) => {
  const prompt = `Write a Facebook Ad Primary text from the given context.

Platform: ${removeSpaces(platformType)}
List of 5 Primary text:

-`;

  const campaignPostIdea = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, task, prompt, campaignPostIdea);
};

const facebookAdPrimaryTexts = async (userId, { platformType, context }) => {
  const prompt = `Write Facebook Ad Primary text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Primary texts:

-`;

  const primaryTexts = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
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

-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-headlines', prompt, headlines);
};

const facebookAdLinkDescription = async (userId, { platformType, headline }) => {
  const prompt = `Write 5 Link Description for the following Platform and Ad headline.

Platform: ${removeSpaces(platformType)}
Headline: ${removeSpaces(headline)}
List of 5 Link descriptions:

-`;

  const linkDescriptions = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-link-descriptions', prompt, linkDescriptions);
};

const facebookAdsFromProductDescription = async (userId, { product }) => {
  const prompt = `Write Facebook Ad for following Product

Product: ${removeSpaces(product)}
List of 5 Ads:

-`;

  const adsFromProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.4, ['\n\n']);
  return processListContents(userId, 'facebook-ads-from-product-description', prompt, adsFromProductDescription);
};

const linkedinAdTexts = async (userId, { platformType, context }) => {
  const prompt = `Generate LinkedIn catchy Marketing text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Marketing text: 

-`;

  const adTexts = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'linkedin-ad-texts', prompt, adTexts);
};

const googleAdHeadlines = async (userId, { name, platform }) => {
  const prompt = `Google Ad Headline Examples:
- Upwork™: Hire The Best - Trust Your Job To True Experts
- Expert SEO Services UK | SEO Agency Of The Year 2019
- Website hoting from £2.50 | Get 50% off all packages
- Injury Lawyers 4U™ | Expert Legal Advice
- Beds at Beds.co.ca | Biggest Ever Bed Sale

Now Write 5 short Google Ad Headlines for Following like Examples.

Name: ${removeSpaces(name)}
Platform: ${removeSpaces(platform)}

-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.9, 0.3, 0.2, ['\n\n']);
  return processListContents(userId, 'google-ad-headlines', prompt, headlines);
};

const youtubeVideoTitleFromDescription = async (userId, { description }) => {
  const prompt = `Write a Title that hints Description

Description: ${removeSpaces(description)}
List of 5 Titles:

-`;

  const titlesFromDescription = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.3, 0.4, ['\n\n']);
  return processListContents(userId, 'youtube-video-titles-from-description', prompt, titlesFromDescription);
};

const youtubeVideoIdeas = async (userId, { topic }) => {
  const prompt = `Generate 5 awesome YouTube video idea about ${removeSpaces(topic)}.

-`;

  const videoIdeas = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'youtube-video-ideas', prompt, videoIdeas);
};

const checkContentExistsOrNot = async ({ contentId, index }) => {
  const content = await Content.findById(contentId);
  if (!content || index >= content.generatedContents.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
};

module.exports = {
  paraphrase,
  productDescription,
  campaignPostFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
  linkedinAdTexts,
  googleAdHeadlines,
  youtubeVideoTitleFromDescription,
  youtubeVideoIdeas,
  checkContentExistsOrNot,
};
