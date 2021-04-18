const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

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

  const titlesFromDescription = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.3, 0.4, ['\n\n']);
  return processListContents(userId, 'youtube-video-titles-from-description', prompt, titlesFromDescription);
};

module.exports = {
  youtubeVideoIdeas,
  youtubeVideoTitleFromDescription,
};
