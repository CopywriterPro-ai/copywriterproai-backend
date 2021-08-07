/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
  cleanAllTexts,
} = require('../content.service');

const blogIdea = async (userId, { productName, productDescription }) => {
  const userPrompt = `Name: ${removeSpaces(productName)}
  Description: ${removeSpaces(productDescription)}`;

  const prompt = `Generate 5 Blog ideas for following Product.
  
  ${userPrompt}
  
  List of 5 Blog ideas
  -`;

  const blogIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'blog-idea', userPrompt, blogIdeas);
};

const blogHeadline = async (userId, { blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Generate "catchy and attention-grabbing" Blog titles that can persuade people and get more traffic for following Blog -
  
  ${userPrompt}
  
  List of 6 Blog titles:
  -`;

  const blogHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 1, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'blog-headline', userPrompt, blogHeadlines);
};

const blogOutline = async (userId, { numberOfPoints, blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `Blog Outline Example -

Blog about: Importance of logging in product development
Blog Outline (4 points):
1. Why Logging is important in product development?
2. Importance of logging in (software name) product development.
3. What are the misconceptions around Logging?
4. How we can create meaningful logs?

Blog about: How Slack is disrupting the enterprise productivity tools market
Blog Outline (5 points):
1. What is Slack and How it is helping us?
2. How Flexible and Easy to use Slack is?
3. Why did all of a sudden it is becoming highly popular?
4. What makes it unique from other similar apps (if any)?
5. Methods to integrate slack into current development process.

Create a Blog Outline in ${numberOfPoints + 1} points like Example.

${userPrompt}
Blog Outline (${numberOfPoints + 1} points):
1.`;
  // console.log(prompt);
  const openAPIInformationsList = [];
  const blogOutlinesList = [];

  for (let i = 0; i < 3; i++) {
    const blogOutlines = await generateContentUsingGPT3('davinci', 150, prompt, 1, 0.5, 0.2, [
      '\n\n',
      `${numberOfPoints + 1}. `,
    ]);
    const { id, object, created, model, choices } = blogOutlines;
    openAPIInformationsList.push({ id, object, created, model });
    const cleanedBlogOutline = choices[0].text.split('\n').slice(0, numberOfPoints).join('\n');

    blogOutlinesList.push(`1. ${cleanedBlogOutline}`);
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'blog-outline',
    userPrompt,
    openAPIInformationsList,
    blogOutlinesList
  );
  const userResponse = formatResponse(_id, 'blog-outline', generatedContents);

  return userResponse;
};

const blogIntro = async (userId, { title, about }) => {
  const userPrompt = `Blog Title: ${removeSpaces(title)}
  Blog About: ${removeSpaces(about)}`;

  const prompt = `Write an attention-grabbing Blog Intro for following blog that can persuade and hook the readers.
  
  ${userPrompt}
  Intro:`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < 3; i++) {
    const blogIntros = await generateContentUsingGPT3('davinci-instruct-beta', 250, prompt, 1, 0.1, 0.2, ['\n\n']);
    const { id, object, created, model, choices } = blogIntros;
    openAPIInformationsList.push({ id, object, created, model });
    blogIntrosList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'blog-intro',
    userPrompt,
    openAPIInformationsList,
    blogIntrosList
  );
  const userResponse = formatResponse(_id, 'blog-intro', generatedContents);

  return userResponse;
};

const blogTopic = async (userId, { about, topic }) => {
  const cleanedBlogAbout = removeSpaces(about);
  const cleanedBlogTopic = removeSpaces(topic);

  const userPrompt = `Blog About: ${cleanedBlogAbout}
  Blog Topic: ${cleanedBlogTopic}`;

  const prompt = `Write about "${cleanedBlogTopic}" for a Blog About "${cleanedBlogAbout}"
  
  ${cleanedBlogTopic} (opening with '[' and ending with ']'):
  [
  `;

  const blogTopicWriting = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 0.7, 0.0, 0.0, [']']);
  const { id, object, created, model, choices } = blogTopicWriting;

  const openAPIInformations = { id, object, created, model };
  const blogTopicResult = choices[0].text.trim();

  const { _id, generatedContents } = await storeData(userId, 'blog-topic', userPrompt, openAPIInformations, blogTopicResult);
  const userResponse = formatResponse(_id, 'blog-topic', generatedContents);

  return userResponse;
};

module.exports = {
  blogIdea,
  blogHeadline,
  blogOutline,
  blogIntro,
  blogTopic,
};
