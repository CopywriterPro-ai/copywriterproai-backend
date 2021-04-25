const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const youtubeVideoIdeas = async (userId, { topic }) => {
  const prompt = `Generate 5 awesome YouTube video idea about ${removeSpaces(topic)}.

-`;

  const videoIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'youtube-video-ideas', prompt, videoIdeas);
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
