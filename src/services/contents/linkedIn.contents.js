const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const linkedinAdTexts = async (userId, { platformType, context }) => {
  const prompt = `Generate LinkedIn catchy Marketing text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Marketing text: 

-`;

  const adTexts = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'linkedin-ad-texts', prompt, adTexts);
};

module.exports = {
  linkedinAdTexts,
};
