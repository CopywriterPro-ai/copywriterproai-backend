const OpenAI = require('openai-api');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Content } = require('../models');
const config = require('../config/config');

const { openAIAPIKey } = config.openAI;
const openai = new OpenAI(openAIAPIKey);

const generateContentUsingGPT3 = async (engine, maxTokens, prompt, temperature, frequencyPenalty, presencePenalty, stop) => {
  const gptResponse = await openai.complete({
    engine,
    prompt,
    maxTokens,
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

const processListContents = async (userId, task, prompt, { id, object, created, model, choices }) => {
  const contents = cleanAllTexts(choices[0].text.split('\n'));
  const { _id, generatedContents } = await storeData(userId, task, prompt, { id, object, created, model }, contents);
  return formatResponse(_id, task, generatedContents);
};

const checkContentExistsOrNot = async ({ contentId, index }) => {
  const content = await Content.findById(contentId);
  if (!content || index >= content.generatedContents.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
};

module.exports = {
  generateContentUsingGPT3,
  formatContents,
  removeSpaces,
  cleanAllTexts,
  storeData,
  formatResponse,
  processListContents,
  checkContentExistsOrNot,
};
