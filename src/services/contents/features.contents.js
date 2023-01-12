/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const proofread = async (userId, userEmail, { userText }) => {
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

module.exports = {
  proofread,
};
