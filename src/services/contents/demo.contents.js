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

  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${userPrompt}
Paraphrase:`;

  let paraphrasedContents;
  while (1) {
    paraphrasedContents = await generateContentUsingGPT3('davinci', 100, prompt, 0.9, 0.9, 0.9, ['\n']);
    if (paraphrasedContents.choices[0].text.trim() !== userPrompt) {
      paraphrasedContents.choices[0].text = paraphrasedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = paraphrasedContents;
  await storeData('paraphrasing', userPrompt, { id, object, created, model }, choices[0].text);

  return [choices[0].text];
};

const blogHeadline = async ({ blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to "Blog About" that can persuade and hook people to the following Blog -

${userPrompt}

List of 4 Blog headlines:
-`;

  const blogHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 1, 0.2, 0.1, ['\n\n']);

  const cleanedContents = cleanAllTexts(blogHeadlines.choices[0].text.split('\n'));
  const { generatedContents } = await storeData('blog-headline', userPrompt, blogHeadlines, cleanedContents);

  return generatedContents.slice(0, 3);
};

module.exports = {
  paraphrase,
  blogHeadline,
};
