const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const instagramAdTexts = async (userId, { platformType, context }) => {
  const prompt = `Write Instagram Ad Text text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Instagram Ad Text:
-`;

  const adTexts = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'facebook-ad-primary-texts', prompt, adTexts);
};

module.exports = {
  instagramAdTexts,
};