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

const formatContents = async (userId, documentType, prompt, generatedContent) => {
  const contentInformation = {
    userId,
    prompt,
    documentType,
    openAPIInformation: {
      id: generatedContent.id,
      object: generatedContent.object,
      created: generatedContent.created,
      model: generatedContent.model,
    },
    generatedContents: generatedContent.choices,
  };
  return contentInformation;
};

const removeSpaces = (text) => {
  return text.trim().replace(/ +(?= )/g, '');
};

const getAllTexts = (contents) => {  
  return contents[0].text.split('\n');
};

const cleanAllTexts = (contents) => {
  return contents.filter((text) => text.trim() !== '').map((text) => text.substr(text.indexOf('-') + 1, text.length).trim());
};

const storeData = async (userId, task, prompt, paraphrasedContents) => {
  const formattedContents = await formatContents(userId, task, prompt, paraphrasedContents);
  const content = await Content.create(formattedContents);
  const generatedTexts = getAllTexts(paraphrasedContents.choices);
  const cleanTexts = cleanAllTexts(generatedTexts);

  const userResponse = {
    id: content._id,
    task,
    generatedTexts: cleanTexts,
  };

  return userResponse;
}

const paraphrase = async (userId, { userText }) => {
  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${removeSpaces(userText)}
Paraphrase:`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci', prompt, 0.75, 0.9, 0.9, ['\n']);
  const userResponse = await storeData(userId, 'paraphrasing', prompt, paraphrasedContents);

  return userResponse;
};

const productDescription = async (userId, { productName, type, targetPeople, features }) => {
  const prompt = `""""""
Product Name: Spirit II E-210 gas grill
Type: Grilling system
Target people: Everyone
Feature: Small in size, two-burner, GS4 grilling system, iGrill
Product description
Spirit II E-210, a two-burner grill is built to fit small spaces, and packed with features such as the powerful GS4 grilling system, iGrill capability, and convenient side tables for placing serving trays.
""""""
Product Name: ${removeSpaces(productName)}
Type: ${removeSpaces(type)}
Target people: ${removeSpaces(targetPeople)}
Feature: ${removeSpaces(features)}
Product description:`;

  const paraphrasedContents = await generateContentUsingGPT3('curie', prompt, 1, 0.1, 0.3, ['""""""', '\n']);
  const userResponse = await storeData(userId, 'product-description', prompt, paraphrasedContents);

  return userResponse;
};

const campaignPostFromBusinessType = async (userId, task, { platformType }) => {
  const prompt = `Write a Facebook Ad Primary text from the given context.

Platform: ${removeSpaces(platformType)}
List of 5 Primary text:
-`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  const userResponse = await storeData(userId, task, prompt, paraphrasedContents);

  return userResponse;
};

const facebookAdPrimaryTexts = async (userId, { platformType, context }) => {
  const prompt = `Write Facebook Ad Primary text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Primary texts:
-`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  const userResponse = await storeData(userId, 'facebook-ad-primary-texts', prompt, paraphrasedContents);

  return userResponse;
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

  const paraphrasedContents = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  const userResponse = await storeData(userId, 'facebook-ad-headlines', prompt, paraphrasedContents);

  return userResponse;
};

const facebookAdLinkDescription = async (userId, { platformType, headline }) => {
  const prompt = `Write 5 Link Description for the following Platform and Ad headline.

Platform: ${removeSpaces(platformType)}
Headline: ${removeSpaces(headline)}
List of 5 Link descriptions:
-`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.1, ['\n\n']);
  const userResponse = await storeData(userId, 'facebook-ad-link-descriptions', prompt, paraphrasedContents);

  return userResponse;
};

const facebookAdsFromProductDescription = async (userId, { product }) => {
  const prompt = `Write Facebook Ad for following Product

Product: ${removeSpaces(product)}
List of 5 Ads:
-`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci-instruct-beta', prompt, 0.8, 0.2, 0.4, ['\n\n']);
  const userResponse = await storeData(userId, 'facebook-ads-from-product-description', prompt, paraphrasedContents);

  return userResponse;
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
  checkContentExistsOrNot,
};
