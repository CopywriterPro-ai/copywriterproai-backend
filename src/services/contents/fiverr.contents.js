/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateFiverrCategoriesHeadline = async (userId, { categorieName }) => {
  const userPrompt = `Categories Name: ${removeSpaces(categorieName)}`;

  const prompt = `Writer Catchy Headline for Fiverr based on example

example:I will design 5 modern minimalist logo design\nI will do custom video intro\nI will design creative 3d logo in 24hrs with copyrights\n
I will design podcast cover art and itunes podcast logo professionally\nI will proofread and correct your spanish texts in 72h\n
I will mix and master your music, djent, prog, metal, rock, punk\nI will mix, master, and pitch correct your single or album\nI will mix and master your music to sound amazing

${userPrompt}
Headline:`;

  const openAPIInformationsList = [];
  const fiverrCategoriesHeadlineList = [];

  for (let i = 0; i < 5; i++) {
    const catchyBusinessTaglines = await generateContentUsingGPT3('davinci-instruct-beta', 20, prompt, 0.9, 0, 0, [
      '\n',
      'Headline:',
    ]);
    const { id, object, created, model, choices } = catchyBusinessTaglines;

    openAPIInformationsList.push({ id, object, created, model });
    fiverrCategoriesHeadlineList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'fiverr-categories-headline',
    userPrompt,
    openAPIInformationsList,
    fiverrCategoriesHeadlineList
  );

  const userResponse = formatResponse(_id, 'fiverr-categories-headline', generatedContents);

  return userResponse;
};

module.exports = {
  generateFiverrCategoriesHeadline,
};
