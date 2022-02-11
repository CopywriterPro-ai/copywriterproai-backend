/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const blogIdea = async (userId, userEmail, { productName, productDescription, numberOfSuggestions }) => {
  const userPrompt = `Name: ${removeSpaces(productName)}
Description: ${removeSpaces(productDescription)}`;

  const prompt = `Generate 5 BLOG IDEAS for following Product that can generate leads.

${userPrompt}

List of ${numberOfSuggestions} BLOG IDEAS:
1.`;

  const blogIdeas = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 0.8, 0.2, 0.3, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);
  return processListContents(userId, userEmail, 'blog-idea', userPrompt, blogIdeas);
};

const blogHeadline = async (userId, userEmail, { about, numberOfSuggestions }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}`;

  const prompt = `Generate attention-grabbing blog headlines relevant to BLOG ABOUT that can persuade and hook people to the following Blog -

${userPrompt}

List of ${numberOfSuggestions} BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-001', 100, prompt, 1, 0.2, 0.1, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);
  return processListContents(userId, userEmail, 'blog-headline', userPrompt, blogHeadlines);
};

const blogIntro = async (userId, userEmail, { about, headline, numberOfSuggestions }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Write a long captivating BLOG INTRODUCTION maintaining context for following blog that can hook the readers.

${userPrompt}
BLOG INTRODUCTION (LONG):
`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogIntros = await generateContentUsingGPT3('text-davinci-001', 400, prompt, 1, 0.5, 0.5, ['\n\n']);
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

const blogOutline = async (userId, userEmail, { about, headline, numberOfPoints, numberOfSuggestions }) => {
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

const blogTopic = async (userId, userEmail, { about, headline, topic, numberOfSuggestions }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}
BLOG TOPIC: ${removeSpaces(topic)}`;

  const prompt = `${userPrompt}

Write on the above topic with valuable information.
`;

  const openAPIInformationsList = [];
  const blogTopicWritingsList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogTopicWriting = await generateContentUsingGPT3('text-davinci-001', 500, prompt, 0.7, 0.0, 0.0, ['\n\n\n']);
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

const blogOutro = async (userId, userEmail, { about, headline, numberOfSuggestions }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Write a sweet, engaging BLOG CONCLUSION maintaining context for the following blog.

${userPrompt}
BLOG CONCLUSION:
`;

  const openAPIInformationsList = [];
  const blogOutrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutros = await generateContentUsingGPT3('text-davinci-001', 150, prompt, 0.7, 0, 0, ['\n\n']);
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

module.exports = {
  blogIdea,
  blogHeadline,
  blogIntro,
  blogOutline,
  blogTopic,
  blogOutro,
};
