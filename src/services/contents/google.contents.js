/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  cleanAllTexts,
  storeData,
  processListContents,
  formatResponse,
} = require('../content.service');

const googleAdHeadlines = async (userId, { platform, audience }) => {
  const prompt = `Write 5 benefits Audience will get from following Platform

Platform: ${platform}
Audience: ${audience}

-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.9, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'ads-google-headlines', prompt, headlines);
};

const googleAdDescriptions = async (userId, { platform, audience }) => {
  const prompt = `Write 5 benefits Audience will get from following Platform

Platform: ${platform}
Audience: ${audience}

-`;

  const openAPIInformationsList = [];
  const googleAdDescriptionsList = [];

  for (let i = 0; i < 5; i++) {
    const generatedAdDescription = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 0.9, 0.2, 0.3, [
      '\n\n',
    ]);
    const { id, object, created, model, choices } = generatedAdDescription;

    openAPIInformationsList.push({ id, object, created, model });
    googleAdDescriptionsList.push(cleanAllTexts(choices[0].text.split('\n')).join('. '));
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'ads-google-descriptions',
    prompt,
    openAPIInformationsList,
    googleAdDescriptionsList
  );
  const userResponse = formatResponse(_id, 'ads-google-descriptions', generatedContents);

  return userResponse;
};

module.exports = {
  googleAdHeadlines,
  googleAdDescriptions,
};
