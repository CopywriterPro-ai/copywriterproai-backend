/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT4, removeSpaces, processListContents, storeData, formatResponse } = require('../content.service');

const youtubeVideoIdeas = async (userId, userEmail, { topic, numberOfSuggestions }) => {
  const userPrompt = `Topic: ${removeSpaces(topic)}`;

  const prompt = `Generate awesome YouTube video titles that get views for the following topic.

Examples:
Topic: Insurance
Titles:
- Know About Insurance - Module 1
- Insurance Basics and Types
- Types of Life Insurance Explained
- Car Insurance In Canada (For Immigrants)
- Major Types of Insurance In the United States & Their Purposes

Topic: Tying a Tie
Titles:
- How to Tie a Tie (Mirrored/Slowly) - Full Windsor Knot
- How to Tie a Tie | Windsor (aka Full Windsor or Double Windsor) | For Beginners
- How to Tie a Tie - Quick and Easy
- How to Tie a Tie in 10 Seconds | How to Make a Tie Knot Easy Way Step by Step Life Hack

Topic: Best Video Editing Software
Titles:
- 5 Best Free Video Editing Software for Windows & Mac
- Top 3 Best Free Video Editing Software (2023)
- Best Video Editing Software for Windows
- Best Video Editing Software in 2023

Topic: Cars and Driving Skills
Titles:
- Close Calls - Good Driving Skills or Luck?
- Amazing Trucks & Cars Driving Skills - Fast Reaction Saves Lives - Awesome
- The Most Amazing Cars and Driving Skills
- Top 10 Tips: New Drivers [Must Watch] | Learn Driving

${userPrompt}
Titles:`;

  const openAPIInformationsList = [];
  const youtubeVideoIdeasList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const videoIdeas = await generateContentUsingGPT4('davinci', 25, prompt, 0.9, 0, 0, ['\n', 'Titles:']);
    const { id, object, created, model, choices } = videoIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    youtubeVideoIdeasList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId, userEmail,
    'youtube-video-ideas',
    userPrompt,
    openAPIInformationsList,
    youtubeVideoIdeasList
  );

  const userResponse = formatResponse(_id, 'youtube-video-ideas', generatedContents);

  return userResponse;
};

const youtubeVideoTitleFromDescription = async (userId, userEmail, { description, numberOfSuggestions }) => {
  const userPrompt = `Description: ${removeSpaces(description)}`;

  const prompt = `Write a catchy YouTube video title that summarizes the following description:

${userPrompt}
List of ${numberOfSuggestions} Titles:
-`;

  const titlesFromDescription = await generateContentUsingGPT4('gpt-4oo', 25, prompt, 0.8, 0.3, 0.4, ['\n\n']);
  return processListContents(userId, userEmail, 'youtube-video-titles-from-description', userPrompt, titlesFromDescription);
};

const generateVideoTagsFromDescription = async (userId, userEmail, { primaryText, numberOfSuggestions }) => {
  const userPrompt = `Primary Text: ${removeSpaces(primaryText)}`;

  const prompt = `Generate keywords extracted from the following content for search engine optimization (SEO) and YouTube tags.

Primary Text: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or are part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea, Product Launch, Project Management, Consulting, Digital Transformation, Innovation, Creativity.

${userPrompt}
Keywords:`;

  const openAPIInformationsList = [];
  const videoTagsFromDescriptionList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const videoTagsFromDescription = await generateContentUsingGPT4('davinci', 50, prompt, 0.7, 0.3, 0, ['\n', 'Keywords:']);
    const { id, object, created, model, choices } = videoTagsFromDescription;

    openAPIInformationsList.push({ id, object, created, model });
    videoTagsFromDescriptionList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'youtube-video-tags-from-description',
    userPrompt,
    openAPIInformationsList,
    videoTagsFromDescriptionList
  );

  const userResponse = formatResponse(_id, 'youtube-video-tags-from-description', generatedContents);

  return userResponse;
};

const generateChannelTagsFromDescription = async (userId, userEmail, { primaryText, numberOfSuggestions }) => {
  const userPrompt = `Primary Text: ${removeSpaces(primaryText)}`;

  const prompt = `Generate keywords extracted from the following content for search engine optimization (SEO) and YouTube channel tags.

Primary Text: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or are part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea, Product Launch, Project Management, Consulting, Digital Transformation, Innovation, Creativity.

${userPrompt}
Keywords:`;

  const openAPIInformationsList = [];
  const channelTagsFromDescriptionList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const channelTagsFromDescription = await generateContentUsingGPT4('davinci', 80, prompt, 0.7, 0.3, 0, ['\n', 'Keywords:']);
    const { id, object, created, model, choices } = channelTagsFromDescription;

    openAPIInformationsList.push({ id, object, created, model });
    channelTagsFromDescriptionList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'youtube-channel-tags-from-description',
    userPrompt,
    openAPIInformationsList,
    channelTagsFromDescriptionList
  );

  const userResponse = formatResponse(_id, 'youtube-channel-tags-from-description', generatedContents);

  return userResponse;
};

const generateYoutubeVideoScript = async (userId, userEmail, { title, numberOfSuggestions }) => {
  const userPrompt = `Title: ${removeSpaces(title)}`;

  const prompt = `Write a long YouTube video script for the following title, starting with "Hi, everyone, welcome to another brand new video," between 800 to 1200 words.

${userPrompt}
`;

  const openAPIInformationsList = [];
  const youtubeVideoScriptList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const youtubeVideoScript = await generateContentUsingGPT4('gpt-4o', 2036, prompt, 0.7, 0, 0, ['\n\n\n\n']);
    const { id, object, created, model, choices } = youtubeVideoScript;

    openAPIInformationsList.push({ id, object, created, model });
    youtubeVideoScriptList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'youtube-video-script',
    userPrompt,
    openAPIInformationsList,
    youtubeVideoScriptList
  );

  const userResponse = formatResponse(_id, 'youtube-video-script', generatedContents);

  return userResponse;
};

module.exports = {
  youtubeVideoIdeas,
  youtubeVideoTitleFromDescription,
  generateVideoTagsFromDescription,
  generateChannelTagsFromDescription,
  generateYoutubeVideoScript,
};
