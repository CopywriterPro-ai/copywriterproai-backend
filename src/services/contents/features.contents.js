/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT4, removeSpaces, storeData, formatResponse } = require('../content.service');

const proofread = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are an expert in English grammar and proofreading. Your task is to correct the given text to standard English. Ensure that the text is grammatically correct, clear, and concise.

Guidelines:
1. **Correct Grammar:** Fix any grammatical errors.
2. **Clarity:** Ensure the text is clear and easy to understand.
3. **Conciseness:** Keep the text concise and to the point.
4. **Punctuation:** Correct any punctuation errors.
5. **Spelling:** Correct any spelling mistakes.

Original Text:
${userPrompt}
Corrected Text:`;

  const fixedContent = await generateContentUsingGPT4('gpt-4o', 200, prompt, 0.0, 0.0, 0.0, ['\n\n']);
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

module.exports = {
  proofread,
};
