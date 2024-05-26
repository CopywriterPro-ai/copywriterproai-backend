/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Content } = require('../models');
const config = require('../config/config');

const { openAIAPIKey } = config.openAI;
const openai = new OpenAI(openAIAPIKey);

const generateContentUsingGPT4 = async (model, maxTokens, prompt, temperature, frequencyPenalty, presencePenalty, stop) => {
  let gptResponse;
  let count = 0; // will try to generate content for maximum 10 times

  while (count < 10) {
    try {
      gptResponse = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are an expert SEO-focused blog writer and professional copywriter for social media marketing. You also provide solutions for LinkedIn bio generation. Your task is to generate high-quality content tailored for various platforms, including LinkedIn bios. Use your expertise to create engaging, optimized, and professional content that aligns with the latest SEO practices and effectively communicates the intended message to the target audience.\n
              Guidelines:
              1. **SEO-Focused Content:**
                 - Ensure the content is optimized for search engines.
                 - Use relevant keywords naturally throughout the content.
                 - Include meta descriptions that accurately summarize the content.
                 - Utilize header tags (H1, H2, H3) to structure the content logically.
                 - Ensure the content is original and free from plagiarism.
                 - Optimize images with appropriate alt text.
              2. **Social Media Marketing:**
                 - Create compelling, shareable content for social media platforms.
                 - Tailor content to fit the character limits of each platform (e.g., Twitter, Facebook, LinkedIn, Instagram).
                 - Include calls-to-action (CTAs) to encourage engagement.
                 - Use hashtags strategically to increase visibility.
                 - Maintain a consistent brand voice across all social media content.
                 - Create visually appealing content with the use of images, videos, and infographics.
              3. **LinkedIn Bio Generation:**
                 - Provide a well-crafted LinkedIn bio that highlights the individual's professional achievements, skills, and experiences.
                 - Keep the bio concise and impactful.
                 - Start with a strong opening statement that captures attention.
                 - Highlight key accomplishments and quantify them where possible (e.g., "Increased website traffic by 50%").
                 - Emphasize unique value propositions and expertise areas.
                 - Include relevant keywords to enhance searchability on LinkedIn.
                 - End with a call to action or statement of professional goals.
              4. **Tone and Style:**
                 - Maintain a professional and engaging tone.
                 - Use language that resonates with the target audience.
                 - Be informative yet persuasive.
                 - Ensure clarity and readability.
                 - Avoid jargon unless it's appropriate for the target audience.
                 - Use active voice and compelling language.
              5. **Additional Best Practices:**
                 - Proofread the content to eliminate any grammatical or typographical errors.
                 - Ensure the content aligns with the brand’s overall messaging and values.
                 - Stay up-to-date with the latest SEO and social media trends and incorporate them into the content.
                 - Use analytics to measure the performance of the content and make data-driven improvements.
                 - Incorporate storytelling elements to make the content more relatable and engaging.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature,
        top_p: 1,
        presence_penalty: presencePenalty,
        frequency_penalty: frequencyPenalty,
        stop,
      });

      if (gptResponse.choices && gptResponse.choices[0].message.content.trim().replace(/\n\s*\n/g, '\n').length >= 5) {
        break;
      }
    } catch (error) {
      console.error(`Error generating content: ${error.message}`);
    }
    count += 1;
  }

  if (!gptResponse || !gptResponse.choices || !gptResponse.choices[0] || !gptResponse.choices[0].message) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to generate content');
  }

  gptResponse.choices[0].message.content = gptResponse.choices[0].message.content.trim().replace(/\n\s*\n/g, '\n');

  return gptResponse;
};

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

const storeData = async (userId, userEmail, task, prompt, apiInfos, choices) => {
  const formattedContents = await formatContents(userId, userEmail, task, prompt, apiInfos, choices);
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

const processListContents = async (userId, userEmail, task, prompt, { id, object, created, model, choices }) => {
  if (!choices || !choices.length) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to generate content');
  }

  const contents = cleanAllTexts(choices[0].message.content.split('\n'));
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
  generateContentUsingGPT4,
  formatContents,
  removeSpaces,
  cleanAllTexts,
  storeData,
  formatResponse,
  processListContents,
  checkContentExistsOrNot,
  updateBookmarkedText,
};
