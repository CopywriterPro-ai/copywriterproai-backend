const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const instagramAdTexts = async (userId, userEmail, { platformType, context, numberOfSuggestions}) => {
  const userPrompt = `Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}`;

  const prompt = `Write Instagram Ad Text for following platform

${userPrompt}
List of ${numberOfSuggestions} Instagram Ad Text:
-`;

  const adTexts = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, userEmail, 'facebook-ad-primary-texts', userPrompt, adTexts);
};

module.exports = {
  instagramAdTexts,
};
