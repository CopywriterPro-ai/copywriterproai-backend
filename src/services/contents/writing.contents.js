/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const paraphrase = async (userId, { userText }) => {
  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${removeSpaces(userText)}
Paraphrase:`;

  let paraphrasedContents;
  while (1) {
    paraphrasedContents = await generateContentUsingGPT3('davinci', 200, prompt, 0.9, 0.9, 0.9, ['\n']);
    if (
      paraphrasedContents.choices &&
      paraphrasedContents.choices[0].text.trim() !== '' &&
      paraphrasedContents.choices[0].text.trim() !== removeSpaces(userText)
    ) {
      paraphrasedContents.choices[0].text = paraphrasedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = paraphrasedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    'paraphrasing',
    prompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'paraphrasing', generatedContents);

  return userResponse;
};

const blogOutline = async (userId, { numberOfPoints, blogAbout }) => {
  const prompt = `Example -
I: Introduction
II: What Slack is doing to help DevOps
A: Large enterprise software company adopting it
III: What Slack is doing for the future of DevOps
IV: What they think of DevOps
V: Conclusion

Create an Outline in ${numberOfPoints} points like Example for a Blog about "${blogAbout}":

I:`;

  const openAPIInformationsList = [];
  const blogOutlinesList = [];

  for (let i = 0; i < 5; i++) {
    const blogOutlines = await generateContentUsingGPT3('davinci-instruct-beta', 60, prompt, 0.9, 0.2, 0.1, ['\n\n']);
    const { id, object, created, model, choices } = blogOutlines;

    openAPIInformationsList.push({ id, object, created, model });
    blogOutlinesList.push(`I:${choices[0].text.trim()}`);
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'blog-outline',
    prompt,
    openAPIInformationsList,
    blogOutlinesList
  );
  const userResponse = formatResponse(_id, 'blog-outline', generatedContents);

  return userResponse;
};

const blogIdea = async (userId, { productName, productDescription }) => {
  const prompt = `Generate 5 Blog ideas for following Product.

Name: ${productName}
Description: ${productDescription}

List of 5 Blog ideas
-`;

  const blogIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'blog-idea', prompt, blogIdeas);
};

const blogHeadline = async (userId, { productName, productDescription, blogAbout }) => {
  const prompt = `Generate 5 Blog titles for following Product.

Name: ${productName}
Description: ${productDescription}
About: ${blogAbout}

List of 5 Blog titles
-`;

  const blogHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.9, 0.2, 0.1, ['\n\n']);
  return processListContents(userId, 'blog-headline', prompt, blogHeadlines);
};

const blogIntro = async (userId, { title, about }) => {
  const prompt = `Write a Blog Intro for following that can hook the readers.
Title: ${title}
About: ${about}
Intro:`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < 5; i++) {
    const blogIntros = await generateContentUsingGPT3('davinci-instruct-beta', 100, prompt, 0.8, 0.1, 0.2, ['\n\n']);
    const { id, object, created, model, choices } = blogIntros;

    openAPIInformationsList.push({ id, object, created, model });
    blogIntrosList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(userId, 'blog-intro', prompt, openAPIInformationsList, blogIntrosList);
  const userResponse = formatResponse(_id, 'blog-intro', generatedContents);

  return userResponse;
};

module.exports = {
  paraphrase,
  blogOutline,
  blogIdea,
  blogHeadline,
  blogIntro,
};
