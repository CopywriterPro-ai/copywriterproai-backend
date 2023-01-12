/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  storeData,
  processListContents,
  formatResponse,
} = require('../extension.service');

const paraphrase = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Paraphrase the Original text.

Original: Her life spanned years of incredible change for women as they gained more rights than ever before.
Paraphrase: She lived through the exciting era of women's liberation.

Original: ${userPrompt}
3 unique way(s) to Paraphrase:
1.`;

  const paraphrasedContents = await generateContentUsingGPT3('text-davinci-003', 200, prompt, 0.9, 0.9, 0.9, ['\n\n']);

  return processListContents(userId, userEmail, 'paraphrasing', userPrompt, paraphrasedContents);
};

const grammarFixer = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Correct this to standard English:

${userPrompt}
`;

  const fixedContent = await generateContentUsingGPT3('text-davinci-003', 200, prompt, 0.0, 0.0, 0.0, ['\n\n']);
  fixedContent.choices[0].text = fixedContent.choices[0].text.trim();

  const { id, object, created, model, choices } = fixedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'grammar-fixer',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'grammar-fixer', generatedContents);

  return userResponse;
};

const simplifier = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `My second grader asked me what this passage means:
"""
${userPrompt}
"""
I rephrased it for him, in plain language a second grader can understand:
"""
`;

  const openAPIInformationsList = [];
  const simplifiedContentsList = [];

  let numberOfSuggestions = 3;
  while (numberOfSuggestions--) {
    const simplifiedContents = await generateContentUsingGPT3('text-davinci-003', 150, prompt, 0.7, 0.0, 0.0, ['"""']);
    const { id, object, created, model, choices } = simplifiedContents;

    openAPIInformationsList.push({ id, object, created, model });
    simplifiedContentsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'simplifier',
    userPrompt,
    openAPIInformationsList,
    simplifiedContentsList
  );
  const userResponse = formatResponse(_id, 'simplifier', generatedContents);

  return userResponse;
};

const summarizer = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `${userPrompt}

Tl;dr
`;

  const openAPIInformationsList = [];
  const summarizedContentsList = [];

  let numberOfSuggestions = 3;
  while (numberOfSuggestions--) {
    const summarizedContents = await generateContentUsingGPT3('text-davinci-003', 100, prompt, 0.7, 0.0, 0.0, ['\n\n']);
    const { id, object, created, model, choices } = summarizedContents;

    openAPIInformationsList.push({ id, object, created, model });
    summarizedContentsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'summarizer',
    userPrompt,
    openAPIInformationsList,
    summarizedContentsList
  );
  const userResponse = formatResponse(_id, 'summarizer', generatedContents);

  return userResponse;
};

const changeTone = async (userId, userEmail, { userText, tone }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Change the tone -

Original: The company really needs to work on its customer service.
Humorous: Company management should take a look at their customer service.

Original: Let's see how much I can do for you.
Friendly: I'd be happy to help in any way I can.

Original: Do you think we’re ready for the new school year?
Authoritative: Are we ready for the new school year?

Original: ${userPrompt}
${tone} (3 unique ways):
1.`;

  const fixedContent = await generateContentUsingGPT3('text-davinci-003', 200, prompt, 0.8, 0.0, 0.0, ['\n\n']);

  return processListContents(userId, userEmail, 'change-tone', userPrompt, fixedContent);
};

module.exports = {
  paraphrase,
  grammarFixer,
  simplifier,
  summarizer,
  changeTone,
};
