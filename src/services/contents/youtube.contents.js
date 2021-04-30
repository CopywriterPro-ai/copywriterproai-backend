const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const youtubeVideoIdeas = async (userId, { topic }) => {
  const prompt = `Generate awesome YouTube video Title that Gets Views ${removeSpaces(topic)}.
Topic: Insurance
Title: Know About Insurance - Module 1.\nInsurance basic and Types.\nType of Life Insurance Explained.\nCar Insurance In Canada (For Immigrant).\nMajor Type of Insurance In the United States & The Purposes.

Topic: Tie & Tie
Title: How to Tie a Tie (Mirrored/slowly)- Full Windsor Knot.\nHow to Tie a Tie | Windsor (aka Full Windsor or Double Windsor) | For Beginners.\nHow to Tie a Tie - Quick and Easy.\nHow to Tie a Tie in 1- Seconds | How to make a Tie Knot Easy Way Step by Step Life Hack.

Topic: Best Video Editing Software
Title: 5 Best Free Video Editing Software For Windows & MacOs Laptop & Computer.\nTop 3 Best Free Video Editing Software(2019).\nBest Video Editing Software For Windows.\nBest Video Editing Software in 2019.

Topic: Cars and driving skills
Title: Close Calls - Good Deriving Skills or Luck?.\nAmazing Trucks & Card driving Skills - Fast Reaction Save Life - Awesome.\nThe most amazing cars and driving Skills.\nTop 10 Tips: New Drivers[must watch] | Learn driving.

Topic: ${removeSpaces(topic)}
Title:`;

  const openAPIInformationsList = [];
  const youtubeVideoIdeasList = [];

  for (let i = 0; i < 5; i++) {
    const videoIdeas = await generateContentUsingGPT3('davinci', 500, prompt, 0.9, 0, 0, ['\n', 'Title:']);
    const { id, object, created, model, choices } = videoIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    youtubeVideoIdeasList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'youtube-video-ideas',
    prompt,
    openAPIInformationsList,
    youtubeVideoIdeasList
  );

  const userResponse = formatResponse(_id, 'youtube-video-ideas', generatedContents);

  return userResponse;
};

const youtubeVideoTitleFromDescription = async (userId, { description }) => {
  const prompt = `Write a Title that summarizes Description

Description: ${removeSpaces(description)}
List of 5 Titles:

-`;

  const titlesFromDescription = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.3, 0.4, [
    '\n\n',
  ]);
  return processListContents(userId, 'youtube-video-titles-from-description', prompt, titlesFromDescription);
};

const generateVideoTagsFromDescription = async (userId, { primaryText }) => {
  const prompt = `Generate Keywords extracted from content for Optimization search engine, SEO meta tag, or youtube tags.

PrimaryText: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea,
Product Launch, Product Management, Product Marketing, Product Strategy, Product Development, Product Launch, Project Management, Consulting,
Digital Transformation, Innovation, Creativity.
PrimaryText: ${removeSpaces(primaryText)}
Keywords:`;

  const openAPIInformationsList = [];
  const videoTagsFromDescriptionList = [];

  for (let i = 0; i < 1; i++) {
    const videoTagsFromDescription = await generateContentUsingGPT3('davinci', 500, prompt, 0.7, 0.3, 0, [
      '\n',
      'Keywords:',
    ]);
    const { id, object, created, model, choices } = videoTagsFromDescription;

    openAPIInformationsList.push({ id, object, created, model });
    videoTagsFromDescriptionList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'youtube-video-tags-from-description',
    prompt,
    openAPIInformationsList,
    videoTagsFromDescriptionList
  );

  const userResponse = formatResponse(_id, 'youtube-video-tags-from-description', generatedContents);

  return userResponse;
};

const generateChannelTagsFromDescription = async (userId, { primaryText }) => {
  const prompt = `Generate Keywords extracted from content for Optimization search engine, SEO meta tag, or youtube tags.

PrimaryText: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea,
Product Launch, Product Management, Product Marketing, Product Strategy, Product Development, Product Launch, Project Management, Consulting,
Digital Transformation, Innovation, Creativity.
PrimaryText: ${removeSpaces(primaryText)}
Keywords:`;

  const openAPIInformationsList = [];
  const channelTagsFromDescriptionList = [];

  for (let i = 0; i < 1; i++) {
    const channelTagsFromDescription = await generateContentUsingGPT3('davinci', 500, prompt, 0.7, 0.3, 0, [
      '\n',
      'Keywords:',
    ]);
    const { id, object, created, model, choices } = channelTagsFromDescription;

    openAPIInformationsList.push({ id, object, created, model });
    channelTagsFromDescriptionList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'youtube-channel-tags-from-description',
    prompt,
    openAPIInformationsList,
    channelTagsFromDescriptionList
  );

  const userResponse = formatResponse(_id, 'youtube-channel-tags-from-description', generatedContents);

  return userResponse;
};

module.exports = {
  youtubeVideoIdeas,
  youtubeVideoTitleFromDescription,
  generateVideoTagsFromDescription,
  generateChannelTagsFromDescription,
};
