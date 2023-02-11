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

  const prompt = `Paraphrase the following Paragraphs.

Paragraph
"""
The 8 best places of natural beauty in the world.
"""
Paraphrase in 2 creative way(s).
"""
1. 8 natural locations around the world that are especially beautiful.
2. World's most beautiful 8 natural beauties that will amaze you.
"""

Paragraph
"""
How are you?
"""
Paraphrase in 3 creative way(s).
"""
1. Is everything going well for you?
2. I hope you are doing well.
3. Do you feel well?
"""

Content
"""
${userText}
"""
Paraphrase in 3 creative way(s).
"""
1.`;

  const paraphrasedContents = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 1, 0, 0, ['"""', '4. ']);

  return processListContents('paraphrasing', userPrompt, paraphrasedContents);
};

const blogHeadline = async ({ blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to BLOG ABOUT that can persuade and hook people to the following Blog -

BLOG ABOUT: ${userPrompt}

List of 3 BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-003', 200, prompt, 1.0, 1.0, 1.0, ['\n\n', '4. ']);
  return processListContents('blog-headline', userPrompt, blogHeadlines);
};

module.exports = {
  paraphrase,
  blogHeadline,
};
