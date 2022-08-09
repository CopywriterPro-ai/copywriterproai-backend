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

const formatResponse = (id, task, generatedTexts) => {
  return {
    id,
    task,
    generatedTexts,
  };
};

const processListContents = async (task, prompt, { id, object, created, model, choices }) => {
  const contents = cleanAllTexts(choices[0].text.split('\n'));
  const { _id, generatedContents } = await storeData(task, prompt, { id, object, created, model }, contents);
  return formatResponse(_id, task, generatedContents);
};

const paraphrase = async ({ userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Paraphrase the following text.

"""
${userPrompt}
"""
`;

  const openAPIInformationsList = [];
  const paraphrasedContentsList = [];

  for (let i = 0; i < 3; i++) {
    const paraphrasedContents = await generateContentUsingGPT3('text-davinci-002', 300, prompt, 1, 0.5, 0, ['"""']);
    const { id, object, created, model, choices } = paraphrasedContents;

    openAPIInformationsList.push({ id, object, created, model });
    paraphrasedContentsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    'paraphrasing',
    userPrompt,
    openAPIInformationsList,
    paraphrasedContentsList
  );
  const userResponse = formatResponse(_id, 'paraphrasing', generatedContents);

  return userResponse;
};

const blogHeadline = async ({ blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to BLOG ABOUT that can persuade and hook people to the following Blog -

BLOG ABOUT: ${userPrompt}

List of 3 BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-002', 100, prompt, 1.0, 1.0, 1.0, ['\n\n', '4. ']);
  return processListContents('blog-headline', userPrompt, blogHeadlines);
};

module.exports = {
  paraphrase,
  blogHeadline,
};
