/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const Demo = require('../../models/demo.model');
const { generateContentUsingGPT3, removeSpaces, cleanAllTexts } = require('../content.service');

const storeData = async (documentType, prompt, openAPIInformation, generatedContents) => {
  const formattedContents = {
    documentType,
    prompt,
    openAPIInformation,
    generatedContents,
  };

  const content = await Demo.create(formattedContents);
  return content;
};

const paraphrase = async ({ userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Paraphrase the Original text.

Original: Her life spanned years of incredible change for women as they gained more rights than ever before.
Paraphrase: She lived through the exciting era of women's liberation.

Original: ${userPrompt}
3 unique ways to Paraphrase:
1.`;

  const paraphrasedContents = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 0.9, 0.9, 0.9, [
    '\n\n',
    '4. ',
  ]);

  const cleanedContents = cleanAllTexts(paraphrasedContents.choices[0].text.split('\n'));
  const { generatedContents } = await storeData('paraphrasing', userPrompt, paraphrasedContents, cleanedContents);

  return generatedContents;
};

const blogHeadline = async ({ blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to BLOG ABOUT that can persuade and hook people to the following Blog -

BLOG ABOUT: ${userPrompt}

List of 3 BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 1, 0.2, 0.1, ['\n\n']);

  const cleanedContents = cleanAllTexts(blogHeadlines.choices[0].text.split('\n'));
  const { generatedContents } = await storeData('blog-headline', userPrompt, blogHeadlines, cleanedContents);

  return generatedContents;
};

module.exports = {
  paraphrase,
  blogHeadline,
};
