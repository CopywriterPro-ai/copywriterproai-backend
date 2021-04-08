const OpenAI = require('openai-api');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Content } = require('../models');
const config = require('../config/config');

const { openAIAPIKey } = config.openAI;
const openai = new OpenAI(openAIAPIKey);

const generateContentUsingGPT3 = async (engine, prompt, temperature, presencePenalty, frequencyPenalty, bestOf, stop) => {
  const gptResponse = await openai.complete({
    engine,
    prompt,
    maxTokens: 500,
    temperature,
    topP: 1,
    presencePenalty,
    frequencyPenalty,
    bestOf,
    n: 1,
    stream: false,
    stop,
  });

  return gptResponse.data;
};

const formatContents = async (userId, originalContent, documentType, generatedContent) => {
  const contentInformation = {
    userId,
    originalContent,
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
  const generatedTexts = [];
  for (let i = 0; i < contents.length; i++) {
    generatedTexts.push(contents[i].text);
  }
  return generatedTexts;
};

const paraphrase = async (userId, { userText }) => {
  const formattedUserText = removeSpaces(userText);

  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${formattedUserText}\nParaphrase:`;

  const paraphrasedContents = await generateContentUsingGPT3('davinci', prompt, 0.75, 0.9, 0.9, 1, ['\n']);

  const formattedContents = await formatContents(userId, prompt, 'paraphrasing', paraphrasedContents);
  const content = await Content.create(formattedContents);

  const generatedTexts = getAllTexts(paraphrasedContents.choices);

  const userResponse = {
    id: content._id,
    task: 'paraphrasing',
    generatedTexts,
  };

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

  const paraphrasedContents = await generateContentUsingGPT3('curie', prompt, 1, 0.3, 0.1, 2, ['""""""', '\n']);

  const formattedContents = await formatContents(userId, prompt, 'productDescription', paraphrasedContents);
  const content = await Content.create(formattedContents);

  const generatedTexts = getAllTexts(paraphrasedContents.choices);

  const userResponse = {
    id: content._id,
    task: 'product-description',
    generatedTexts,
  };

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
  checkContentExistsOrNot,
};
