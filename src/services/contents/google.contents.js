/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  cleanAllTexts,
  storeData,
  processListContents,
  formatResponse,
} = require('../content.service');

const googleAdHeadlines = async (userId, { productName, platform }) => {
  const prompt = `Google Ad Headline Examples:
- Upwork™: Hire The Best - Trust Your Job To True Experts
- Expert SEO Services UK | SEO Agency Of The Year 2019
- Website hoting from £2.50 | Get 50% off all packages
- Injury Lawyers 4U™ | Expert Legal Advice
- Beds at Beds.co.ca | Biggest Ever Bed Sale

Now Write 5 short Google Ad Headlines for Following like Examples.

Name: ${productName}
Platform: ${platform}
List of 5 short Google Ad Headlines
-`;

  const headlines = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.9, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'ads-google-headlines', prompt, headlines);
};

const googleAdDescriptions = async (userId, { platform, audience }) => {
  const prompt = `Write 5 benefits Audience will get from following Platform

Platform: ${platform}
Audience: ${audience}
List of 5 benefits
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
