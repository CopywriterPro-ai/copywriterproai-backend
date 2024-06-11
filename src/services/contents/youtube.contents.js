/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentWithModel, removeSpaces, processListContents, storeData, formatResponse } = require('../content.service');

const generateContent = async (userId, userEmail, taskType, userPrompt, prompt, numberOfSuggestions, endIndicator) => {
  const openAPIInformationsList = [];
  const contentList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedContent = await generateContentWithModel('gpt-4o', 2000, prompt, 1, 0, 0, [endIndicator]);
    const { id, object, created, model, choices } = generatedContent;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    contentList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    taskType,
    userPrompt,
    openAPIInformationsList,
    contentList
  );

  return formatResponse(_id, taskType, generatedContents);
};

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

  return generateContent(userId, userEmail, 'youtube-video-ideas', userPrompt, prompt, numberOfSuggestions, 'Titles:');
};

const youtubeVideoTitleFromDescription = async (userId, userEmail, { description, numberOfSuggestions }) => {
  const userPrompt = `Description: ${removeSpaces(description)}`;
  const prompt = `Write a catchy YouTube video title that summarizes the following description:

${userPrompt}
List of ${numberOfSuggestions} Titles:
-`;

  return generateContent(userId, userEmail, 'youtube-video-titles-from-description', userPrompt, prompt, numberOfSuggestions, '\n\n');
};

const generateTags = async (userId, userEmail, taskType, primaryText, numberOfSuggestions, promptType) => {
  const userPrompt = `Primary Text: ${removeSpaces(primaryText)}`;
  const prompt = `Generate keywords extracted from the following content for ${promptType}.

Primary Text: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or are part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea, Product Launch, Project Management, Consulting, Digital Transformation, Innovation, Creativity.

${userPrompt}
Keywords:`;

  return generateContent(userId, userEmail, taskType, userPrompt, prompt, numberOfSuggestions, 'Keywords:');
};

const generateVideoTagsFromDescription = async (userId, userEmail, { primaryText, numberOfSuggestions }) => {
  return generateTags(userId, userEmail, 'youtube-video-tags-from-description', primaryText, numberOfSuggestions, 'search engine optimization (SEO) and YouTube tags');
};

const generateChannelTagsFromDescription = async (userId, userEmail, { primaryText, numberOfSuggestions }) => {
  return generateTags(userId, userEmail, 'youtube-channel-tags-from-description', primaryText, numberOfSuggestions, 'search engine optimization (SEO) and YouTube channel tags');
};

const generateYoutubeVideoScript = async (userId, userEmail, { title, numberOfSuggestions }) => {
  const userPrompt = `Title: ${removeSpaces(title)}`;
  const prompt = `Write a long YouTube video script for the following title, starting with "Hi, everyone, welcome to another brand new video," between 800 to 1200 words.

${userPrompt}
`;

  return generateContent(userId, userEmail, 'youtube-video-script', userPrompt, prompt, numberOfSuggestions, '\n\n\n\n');
};

module.exports = {
  youtubeVideoIdeas,
  youtubeVideoTitleFromDescription,
  generateVideoTagsFromDescription,
  generateChannelTagsFromDescription,
  generateYoutubeVideoScript,
};
