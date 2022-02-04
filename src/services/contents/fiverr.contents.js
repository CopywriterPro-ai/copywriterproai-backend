/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const profileDescription = async (userId, userEmail, { profession, experience, numberOfSuggestions }) => {
  const userPrompt = `PROFESSION: ${removeSpaces(profession)}
EXPERIENCE: ${removeSpaces(experience)}`;

  const prompt = `Create a Fiverr PROFILE DESCRIPTION that can get the client's attention.

PROFESSION: Voice Actress
EXPERIENCE: 17+ years
PROFILE DESCRIPTION:
I am a Voice Actress with over 17+ years of experience in everything from video games to phone systems to explainer videos to children's books. I am originally from the South East of England and have a natural British accent, as well as a Standard American accent from living in the US for 19 years. Over 55000 projects completed and counting!

PROFESSION: Copywriter
EXPERIENCE: 10 years
PROFILE DESCRIPTION:
I'm an award-winning marketing writer who is passionate about creating engaging and compelling sales, ad, web, and brand copy. From Amazon listings to personal websites, my mission is to ensure that each of my clients reaches the success they deserve. Let me help you go far in your endeavors!

${userPrompt}
PROFILE DESCRIPTION:`;

  const openAPIInformationsList = [];
  const profileDescriptionsList = [];

  while (numberOfSuggestions--) {
    const profileDescriptions = await generateContentUsingGPT3('text-davinci-001', 150, prompt, 1.0, 1.0, 1.0, ['\n\n']);
    const { id, object, created, model, choices } = profileDescriptions;

    openAPIInformationsList.push({ id, object, created, model });
    profileDescriptionsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'fiverr-profile-description',
    userPrompt,
    openAPIInformationsList,
    profileDescriptionsList
  );
  const userResponse = formatResponse(_id, 'fiverr-profile-description', generatedContents);

  return userResponse;
};

const generateFiverrCategoriesHeadline = async (userId, userEmail, { categoriesName }) => {
  const userPrompt = `Categories Name: ${removeSpaces(categoriesName)}`;

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
    userEmail,
    'fiverr-categories-headline',
    userPrompt,
    openAPIInformationsList,
    fiverrCategoriesHeadlineList
  );

  const userResponse = formatResponse(_id, 'fiverr-categories-headline', generatedContents);

  return userResponse;
};

module.exports = {
  profileDescription,
  generateFiverrCategoriesHeadline,
};
