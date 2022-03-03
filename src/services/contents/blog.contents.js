/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const blogIdea = async (userId, userEmail, { productName, productDescription, numberOfSuggestions = 1 }) => {
  const userPrompt = `Name: ${removeSpaces(productName)}
Description: ${removeSpaces(productDescription)}`;

  const prompt = `Generate 5 BLOG IDEAS for following Product that can generate leads.

${userPrompt}

List of ${numberOfSuggestions} BLOG IDEAS:
1.`;

  const blogIdeas = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 1.0, 1.2, 1.2, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);
  return processListContents(userId, userEmail, 'blog-idea', userPrompt, blogIdeas);
};

const blogHeadline = async (userId, userEmail, { about, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to BLOG ABOUT that can persuade and hook people to the following Blog -

${userPrompt}

List of ${numberOfSuggestions} BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 1.0, 1.0, 1.0, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);
  return processListContents(userId, userEmail, 'blog-headline', userPrompt, blogHeadlines);
};

const blogIntro = async (userId, userEmail, { about, headline, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Write a sweet and captivating BLOG INTRODUCTION maintaining context for following blog that can hook the readers.

${userPrompt}
BLOG INTRODUCTION (between 100 to 130 words):
`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogIntros = await generateContentUsingGPT3('text-davinci-001', 250, prompt, 1.0, 1.5, 1.5, ['\n\n\n']);
    const { id, object, created, model, choices } = blogIntros;
    openAPIInformationsList.push({ id, object, created, model });
    blogIntrosList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-intro',
    userPrompt,
    openAPIInformationsList,
    blogIntrosList
  );
  const userResponse = formatResponse(_id, 'blog-intro', generatedContents);

  return userResponse;
};

const blogOutline = async (userId, userEmail, { about, headline, numberOfPoints, numberOfSuggestions = 1 }) => {
  let userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Create a BLOG OUTLINE for the following blog.

BLOG ABOUT: Slack
BLOG HEADLINE: How Slack is disrupting the enterprise productivity tools market
BLOG OUTLINE (5 points):
1. What is Slack and How it is helping us?
2. How Flexible and Easy to use Slack is?
3. Why did all of a sudden it is becoming highly popular?
4. What makes it unique from other similar apps (if any)?
5. What are the methods to integrate slack into current development process?
  
${userPrompt}
BLOG OUTLINE (${numberOfPoints} points):
1.`;
  // console.log(prompt);
  const openAPIInformationsList = [];
  const blogOutlinesList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutlines = await generateContentUsingGPT3('text-davinci-001', 150, prompt, 1, 0.5, 0.5, [
      '\n\n',
      `${numberOfPoints + 1}. `,
    ]);
    const { id, object, created, model, choices } = blogOutlines;
    openAPIInformationsList.push({ id, object, created, model });
    choices[0].text = `1. ${choices[0].text}`;

    const cleanedBlogOutline = choices[0].text
      .split('\n')
      .map((text) => text.substr(text.indexOf('. ') + 2, text.length))
      .join('\n');

    blogOutlinesList.push(cleanedBlogOutline);
  }

  userPrompt = `Number of points: ${numberOfPoints}
${userPrompt}`;

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-outline',
    userPrompt,
    openAPIInformationsList,
    blogOutlinesList
  );
  const userResponse = formatResponse(_id, 'blog-outline', generatedContents);

  return userResponse;
};

const blogTopic = async (userId, userEmail, { about, headline, topic, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}
BLOG TOPIC: ${removeSpaces(topic)}`;

  const prompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}

Write a medium sized paragraph on the following BLOG TOPIC with valuable information.

BLOG TOPIC: ${removeSpaces(topic)}
`;

  const openAPIInformationsList = [];
  const blogTopicWritingsList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogTopicWriting = await generateContentUsingGPT3('text-davinci-001', 300, prompt, 0.8, 1.4, 1.4, ['\n\n\n']);
    const { id, object, created, model, choices } = blogTopicWriting;
    openAPIInformationsList.push({ id, object, created, model });
    blogTopicWritingsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-topic',
    userPrompt,
    openAPIInformationsList,
    blogTopicWritingsList
  );

  const userResponse = formatResponse(_id, 'blog-topic', generatedContents);

  return userResponse;
};

const blogOutro = async (userId, userEmail, { about, headline, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Write a short, sweet, and engaging BLOG CONCLUSION maintaining context for the following blog.

${userPrompt}
BLOG CONCLUSION:
`;

  const openAPIInformationsList = [];
  const blogOutrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutros = await generateContentUsingGPT3('text-davinci-001', 150, prompt, 0.7, 1.7, 1.7, ['\n\n']);
    const { id, object, created, model, choices } = blogOutros;
    openAPIInformationsList.push({ id, object, created, model });
    blogOutrosList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-outro',
    userPrompt,
    openAPIInformationsList,
    blogOutrosList
  );
  const userResponse = formatResponse(_id, 'blog-outro', generatedContents);

  return userResponse;
};

const blog = async (userId, userEmail, { about }) => {
  const headline = (await blogHeadline(userId, userEmail, { about })).generatedTexts[0];
  const intro = (await blogIntro(userId, userEmail, { about, headline })).generatedTexts[0];

  const userPrompt = `Topic: ${removeSpaces(about)}`;

  const prompt = `Write a complete blog with a sweet intro on the following topic, that can rank on google and hook the readers.

${userPrompt}
Blog:

${intro}
`;

  const _blog = await generateContentUsingGPT3('text-davinci-001', 2000, prompt, 1.0, 1.4, 1.4, ['\n\n\n\n']);

  const { id, object, created, model, choices } = _blog;

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );

  const userResponse = { 
    id: _id,
    task: 'blog',
    headline,
    generatedBlog: `${intro}\n\n${generatedContents}`,
  };

  return userResponse;
};

module.exports = {
  blogIdea,
  blogHeadline,
  blogIntro,
  blogOutline,
  blogTopic,
  blogOutro,
  blog,
};
