/* eslint-disable no-restricted-syntax */
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

  const blogIdeas = await generateContentUsingGPT3('text-davinci-002', 100, prompt, 1.0, 1.0, 1.0, [
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

  const blogHeadlines = await generateContentUsingGPT3('text-davinci-002', 100, prompt, 1.0, 1.0, 1.0, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);
  return processListContents(userId, userEmail, 'blog-headline', userPrompt, blogHeadlines);
};

const blogIntro = async (userId, userEmail, { about, headline, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `Write a long descriptive, sweet and captivating BLOG INTRODUCTION.

${userPrompt}
BLOG INTRODUCTION (A brief description of what a blog is about and why someone might want to read it):
`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogIntros = await generateContentUsingGPT3('text-davinci-002', 450, prompt, 1.0, 1.0, 1.0, ['\n\n\n']);
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

  const prompt = `Example of BLOG OUTLINE.

BLOG OUTLINE (5 points):
1. What is Slack and How is it helping us?
2. How Flexible and Easy to use Slack is?
3. Why did all of a sudden it is becoming highly popular?
4. What makes it unique from other similar apps (if any)?
5. What are the methods to integrate slack into current development process?

Now write a BLOG OUTLINE for the following blog like Example.

${userPrompt}
BLOG OUTLINE (${numberOfPoints} points):
1.`;
  // console.log(prompt);
  const openAPIInformationsList = [];
  const blogOutlinesList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutlines = await generateContentUsingGPT3('text-davinci-001', 200, prompt, 1, 0.5, 0.5, [
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

const blogTopic = async (userId, userEmail, { about, headline, userText, numberOfSuggestions = 1 }) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}
BLOG TOPIC: ${removeSpaces(userText)}`;

  const prompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}

Write a medium sized paragraph on the following BLOG TOPIC with valuable information.

BLOG TOPIC: ${removeSpaces(userText)}
`;

  const openAPIInformationsList = [];
  const blogTopicWritingsList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogTopicWriting = await generateContentUsingGPT3('text-davinci-002', 500, prompt, 0.8, 0, 0, ['\n\n\n']);
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
    const blogOutros = await generateContentUsingGPT3('text-davinci-002', 200, prompt, 0.7, 1.0, 1.0, ['\n\n']);
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

const shortBlog = async (userId, userEmail, { about, headline, keywords }) => {
  about = removeSpaces(about);
  headline = removeSpaces(headline);
  keywords = keywords.map((keyword) => removeSpaces(keyword));

  keywords = keywords ? keywords.join(', ') : '';
  about += keywords ? `, ${keywords}` : '';

  const userPrompt = `BLOG TOPIC: ${about}`;

  const prompt = `Write a very short blog (300 to 400 words) on "${about}"

Blog headline: ${headline}

`;

  const _blog = await generateContentUsingGPT3('text-davinci-002', 600, prompt, 0.7, 0, 0, ['\n\n\n\n']);

  const { id, object, created, model, choices } = _blog;

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'short-blog',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );

  const userResponse = formatResponse(_id, 'short-blog', generatedContents);

  return userResponse;
};

const longBlog = async (userId, userEmail, { about, headline, keywords, contents = '' }) => {
  about = removeSpaces(about);
  headline = removeSpaces(headline);
  keywords = keywords.map((keyword) => removeSpaces(keyword));

  keywords = keywords ? keywords.join(', ') : '';
  about += keywords ? `, ${keywords}` : '';

  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}`;

  const prompt = `Continue writing the following long long descriptive blog.

${userPrompt}

Blog headline: ${headline}

${contents}`;

  const _blog = await generateContentUsingGPT3('text-davinci-002', 256, prompt, 1.0, 0, 0, ['\n\n\n\n']);

  const { id, object, created, model, choices } = _blog;

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'long-blog',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );

  const userResponse = formatResponse(_id, 'long-blog', generatedContents);

  return userResponse;
};

const blogFromOutline = async (userId, userEmail, { headline, intro, outline }) => {
  headline = removeSpaces(headline);
  intro = removeSpaces(intro);

  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  outline = outline.map((data, idx) => `${roman[idx]}. ${removeSpaces(data)}`);

  let convertedOutline = '';
  for (const data of outline) {
    convertedOutline += `${data}\n`;
  }

  const userPrompt = `BLOG HEADLINE: ${headline}
BLOG INTRO: ${intro}
BLOG OUTLINE: ${convertedOutline}`;

  const prompt = `BLOG HEADLINE: ${headline}

BLOG:

${intro}

Now write on the following points.

${convertedOutline}

${outline[0]}

`;

  const _blog = await generateContentUsingGPT3('text-davinci-002', 2000, prompt, 1.0, 0, 0, ['\n\n\n\n']);

  const { id, object, created, model, choices } = _blog;

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-from-outline',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );

  const userResponse = formatResponse(_id, 'blog-from-outline', `${outline[0]}\n${generatedContents}`);

  return userResponse;
};

module.exports = {
  blogIdea,
  blogHeadline,
  blogIntro,
  blogOutline,
  blogTopic,
  blogOutro,
  shortBlog,
  longBlog,
  blogFromOutline,
};
