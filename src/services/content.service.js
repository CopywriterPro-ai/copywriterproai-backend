/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
const OpenAI = require('openai-api');
const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Content } = require('../models');
const config = require('../config/config');

const { openAIAPIKey } = config.openAI;
const openai = new OpenAI(openAIAPIKey);

const generateContentUsingGPT3 = async (engine, maxTokens, prompt, temperature, frequencyPenalty, presencePenalty, stop) => {
  // let filterLabel = await filterContents(prompt);
  // if (filterLabel === '2') {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Input contains unsafe contents!');
  // }

  // let gptResponse;
  // while(1) {
  //   gptResponse = await openai.complete({
  //     engine,
  //     prompt,
  //     maxTokens,
  //     temperature,
  //     topP: 1,
  //     presencePenalty,
  //     frequencyPenalty,
  //     bestOf: 1,
  //     n: 1,
  //     stream: false,
  //     stop,
  //   });
  // filterLabel = await filterContents(gptResponse.data.choices[0].text);
  // if (filterLabel !== '2') break;
  // }
  // return gptResponse.data;

  let gptResponse;
  let count = 0; // will try to generate content for maximum 10 times

  while (1) {
    gptResponse = await openai.complete({
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
    if (
      count === 10 ||
      (gptResponse.data.choices && gptResponse.data.choices[0].text.trim().replace(/\n\s*\n/g, '\n').length >= 5)
    ) {
      break;
    }
    count += 1;
  }
  gptResponse.data.choices[0].text = gptResponse.data.choices[0].text.trim().replace(/\n\s*\n/g, '\n');

  return gptResponse.data;
};

// const filterContents = async (content) => {
//   const response = await openai.complete({
//     engine: 'content-filter-alpha-c4',
//     prompt: `${content}\n--\nLabel:`,
//     max_tokens: 1,
//     temperature: 0,
//     topP: 1,
//     presence_penalty: 0,
//     frequency_penalty: 0,
//     logprobs: 10,
//   });

//   let outputLabel = response.data.choices[0].text;

//   const toxicThreshold = -0.355;

//   if (outputLabel === '2') {
//     const logprobs = response.data.choices[0].logprobs.top_logprobs[0];

//     if (logprobs['2'] < toxicThreshold) {
//       const logprob0 = logprobs['0'];
//       const logprob1 = logprobs['1'];

//       if (logprob0 && logprob1) {
//         outputLabel = logprob0 >= logprob1 ? '0' : '1';
//       } else if (logprob0) {
//         outputLabel = '0';
//       } else if (logprob1) {
//         outputLabel = '1';
//       }
//     }
//   }
//   if (!['0', '1', '2'].includes(outputLabel)) {
//     outputLabel = '2';
//   }

//   return outputLabel;
// };

const formatContents = async (userId, userEmail, documentType, prompt, apiInfos, choices) => {
  const contentInformation = {
    userId,
    userEmail,
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
  return contents
    .filter((text) => text.trim() !== '')
    .map((text, idx) => (idx ? text.substr(text[2] === ' ' ? 3 : 2, text.length).trim() : text.trim()));
};

// const cleanAllTexts = (contents) => {
//   return contents.filter((text) => text.trim() !== '').map((text) => text.substr(text.indexOf('-') + 1, text.length).trim());
// };

const storeData = async (userId, userEmail, task, prompt, apiInfos, choices) => {
  // const isIgnoresaving = config.content.ignoresavingdb.includes(userEmail);
  const formattedContents = await formatContents(userId, userEmail, task, prompt, apiInfos, choices);

  const content = await Content.create(formattedContents);

  // let content;

  // if (isIgnoresaving) {
  //   content = { ...formattedContents, id: uuidv4() };
  // } else {
  //   content = await Content.create(formattedContents);
  // }

  return content;
};

const formatResponse = (id, task, generatedTexts) => {
  return {
    id,
    task,
    generatedTexts,
  };
};

const processListContents = async (userId, userEmail, task, prompt, { id, object, created, model, choices }) => {
  const contents = cleanAllTexts(choices[0].text.split('\n'));
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    task,
    prompt,
    { id, object, created, model },
    contents
  );
  return formatResponse(_id, task, generatedContents);
};

const checkContentExistsOrNot = async (userEmail, { _id, index }) => {
  const content = await Content.findOne({ _id, userEmail });
  if (!content || index >= content.generatedContents.length || index < 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  return content;
};

const updateBookmarkedText = async (userEmail, { contentId, index, bookmarkedText }) => {
  const content = await checkContentExistsOrNot(userEmail, { _id: contentId, index });
  content.generatedContents[index] = bookmarkedText;
  await content.markModified('generatedContents');
  await content.save();
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
  updateBookmarkedText,
};
