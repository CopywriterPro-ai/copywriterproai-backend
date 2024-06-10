/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentWithModel,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

// Blog Contents
const blogIdea = async (userId, userEmail, { productName, productDescription, numberOfSuggestions = 1 }, apiKey) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Product Description: ${removeSpaces(productDescription)}`;

  const prompt = `You are a creative and insightful blog writer. Your task is to generate high-quality blog ideas that can generate leads for the given product. Use your expertise to create engaging, innovative, and relevant content that effectively communicates the intended message to the target audience.

Guidelines:
1. **Relevance:** Each blog idea should be directly related to the product and its features.
2. **Engagement:** Ideas should be designed to capture the reader’s interest and encourage them to read further.
3. **Innovation:** Propose ideas that are not just informative but also entertaining or thought-provoking.
4. **Lead Generation:** Focus on how each blog idea can help generate leads, such as including calls to action or highlighting benefits that solve customer pain points.
5. **Clarity and Conciseness:** Ensure each idea is clear and concise, providing a brief explanation for each idea.

${userPrompt}

List of ${numberOfSuggestions} BLOG IDEAS:
1.`;

  const blogIdeas = await generateContentWithModel('gpt-4o', 100, prompt, 1.0, 1.0, 1.0, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ], apiKey);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('blogIdeas.choices[0]:', blogIdeas.choices[0]);
  console.log('blogIdeas.choices[0].message.content:', blogIdeas.choices[0].message.content);

  return processListContents(userId, userEmail, 'blog-idea', userPrompt, blogIdeas);
};

const blogHeadline = async (userId, userEmail, { about, numberOfSuggestions = 1 }, apiKey) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}`;

  const prompt = `You are a skilled and creative blog writer. Your task is to generate attention-grabbing blog headlines relevant to the given topic. Use your expertise to create engaging, clear, and compelling headlines that effectively communicate the intended message to the target audience.

Guidelines:
1. **Relevance:** Each headline should accurately reflect the blog content.
2. **Engagement:** Headlines should be catchy and encourage clicks.
3. **Clarity:** Headlines should be clear and concise.
4. **Emotional Appeal:** Use words that evoke curiosity or strong emotions.
5. **Unique Value:** Ensure each headline stands out from the competition.

${userPrompt}

List of ${numberOfSuggestions} BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentWithModel('gpt-4o', 100, prompt, 1.0, 1.0, 1.0, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ], apiKey);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('blogHeadlines.choices[0]:', blogHeadlines.choices[0]);
  console.log('blogHeadlines.choices[0].message.content:', blogHeadlines.choices[0].message.content);

  return processListContents(userId, userEmail, 'blog-headline', userPrompt, blogHeadlines);
};

const blogIntro = async (userId, userEmail, { about, headline, numberOfSuggestions = 1 }, apiKey) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `You are a proficient and engaging blog writer. Your task is to write a long descriptive, captivating BLOG INTRODUCTION. The introduction should draw the reader in, provide an overview of what the blog will cover, and explain why the reader should care about the topic.

Guidelines:
1. **Engagement:** Start with a hook to grab the reader’s attention.
2. **Relevance:** Clearly state what the blog is about.
3. **Value Proposition:** Explain the benefit to the reader.
4. **Clarity and Conciseness:** Be clear and concise while providing enough detail to set the stage for the rest of the blog.
5. **Tone and Style:** Maintain a professional and engaging tone that resonates with the target audience.

${userPrompt}
BLOG INTRODUCTION (A brief description of what the blog is about and why someone might want to read it):
`;

  const openAPIInformationsList = [];
  const blogIntrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogIntros = await generateContentWithModel('gpt-4o', 450, prompt, 1.0, 1.0, 1.0, ['\n\n\n'], apiKey);
    const { id, object, created, model, choices } = blogIntros;
    openAPIInformationsList.push({ id, object, created, model });

    // Log choices[0] and choices[0].message.content for debugging
    console.log('blogIntros.choices[0]:', blogIntros.choices[0]);
    console.log('blogIntros.choices[0].message.content:', blogIntros.choices[0].message.content);

    blogIntrosList.push(choices[0].message.content.trim());
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

const blogOutline = async (userId, userEmail, { about, headline, numberOfPoints, numberOfSuggestions = 1 }, apiKey) => {
  let userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `You are an experienced blog writer. Your task is to create a comprehensive BLOG OUTLINE for the following topic. Ensure each point is clear, concise, and logically organized. Highlight the main topics and subtopics that will be covered in the blog.

Guidelines:
1. **Structure:** Use a logical and easy-to-follow structure.
2. **Clarity:** Each point should be clear and specific.
3. **Relevance:** Ensure all points are relevant to the blog topic.
4. **Detail:** Provide enough detail to give a clear direction for the blog.
5. **Engagement:** Ensure the outline will help create engaging and informative content.

Example of BLOG OUTLINE:

BLOG OUTLINE (5 points):
1. What is Slack and How is it helping us?
2. How Flexible and Easy to use Slack is?
3. Why did all of a sudden it is becoming highly popular?
4. What makes it unique from other similar apps (if any)?
5. What are the methods to integrate Slack into current development processes?

Now write a BLOG OUTLINE for the following blog like the example.

${userPrompt}
BLOG OUTLINE (${numberOfPoints} points):
1.`;

  const openAPIInformationsList = [];
  const blogOutlinesList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutlines = await generateContentWithModel('gpt-4o', 200, prompt, 1, 0.5, 0.5, [
      '\n\n',
      `${numberOfPoints + 1}. `,
    ], apiKey);
    const { id, object, created, model, choices } = blogOutlines;
    openAPIInformationsList.push({ id, object, created, model });

    // Log choices[0] and choices[0].message.content for debugging
    console.log('blogOutlines.choices[0]:', blogOutlines.choices[0]);
    console.log('blogOutlines.choices[0].message.content:', blogOutlines.choices[0].message.content);

    choices[0].message.content = `1. ${choices[0].message.content}`;

    const cleanedBlogOutline = choices[0].message.content
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

const blogTopic = async (userId, userEmail, { about, headline, userText, numberOfSuggestions = 1 }, apiKey) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}
BLOG TOPIC: ${removeSpaces(userText)}`;

  const prompt = `You are a knowledgeable blog writer. Your task is to write a medium-sized paragraph on the following BLOG TOPIC with valuable information. Ensure the paragraph is informative, engaging, and provides clear insights or actionable advice.

Guidelines:
1. **Engagement:** Capture the reader’s interest from the start.
2. **Clarity:** Be clear and concise.
3. **Value:** Provide valuable information or insights.
4. **Relevance:** Ensure the content is directly related to the blog topic.

${userPrompt}
`;

  const openAPIInformationsList = [];
  const blogTopicWritingsList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogTopicWriting = await generateContentWithModel('gpt-4o', 500, prompt, 0.8, 0, 0, ['\n\n\n'], apiKey);
    const { id, object, created, model, choices } = blogTopicWriting;
    openAPIInformationsList.push({ id, object, created, model });

    // Log choices[0] and choices[0].message.content for debugging
    console.log('blogTopicWriting.choices[0]:', blogTopicWriting.choices[0]);
    console.log('blogTopicWriting.choices[0].message.content:', blogTopicWriting.choices[0].message.content);

    blogTopicWritingsList.push(choices[0].message.content.trim());
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

const blogOutro = async (userId, userEmail, { about, headline, numberOfSuggestions = 1 }, apiKey) => {
  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}
BLOG HEADLINE: ${removeSpaces(headline)}`;

  const prompt = `You are a skilled blog writer. Your task is to write a short, sweet, and engaging BLOG CONCLUSION maintaining context for the following blog. The conclusion should summarize the main points, reinforce the value of the content, and provide a clear call to action.

Guidelines:
1. **Summarize:** Briefly summarize the main points of the blog.
2. **Reinforce Value:** Reinforce the value of the content.
3. **Call to Action:** Include a clear and compelling call to action.
4. **Clarity:** Be clear and concise.
5. **Engagement:** End on an engaging note to leave a lasting impression.

${userPrompt}
BLOG CONCLUSION:
`;

  const openAPIInformationsList = [];
  const blogOutrosList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const blogOutros = await generateContentWithModel('gpt-4o', 200, prompt, 0.7, 1.0, 1.0, ['\n\n'], apiKey);
    const { id, object, created, model, choices } = blogOutros;
    openAPIInformationsList.push({ id, object, created, model });

    // Log choices[0] and choices[0].message.content for debugging
    console.log('blogOutros.choices[0]:', blogOutros.choices[0]);
    console.log('blogOutros.choices[0].message.content:', blogOutros.choices[0].message.content);

    blogOutrosList.push(choices[0].message.content.trim());
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

const shortBlog = async (userId, userEmail, { about, headline, keywords }, apiKey) => {
  about = removeSpaces(about);
  headline = removeSpaces(headline);
  keywords = keywords.map((keyword) => removeSpaces(keyword));

  keywords = keywords ? keywords.join(', ') : '';
  about += keywords ? `, ${keywords}` : '';

  const userPrompt = `BLOG TOPIC: ${about}`;

  const prompt = `You are a proficient blog writer. Your task is to write a very short blog (300 to 400 words) on the given topic. Ensure the blog is concise, engaging, and provides valuable insights. Use the following guidelines to optimize the content for readability.

Guidelines:
1. **Conciseness:** Keep the blog within 300 to 400 words.
2. **Engagement:** Write in a way that captures and retains the reader’s interest.
3. **Value:** Provide valuable information or insights.
4. **Clarity:** Ensure the content is clear and easy to read.
5. **Structure:** Use short paragraphs and bullet points where appropriate.

Blog headline: ${headline}

`;

  const _blog = await generateContentWithModel('gpt-4o', 600, prompt, 0.7, 0, 0, ['\n\n\n\n'], apiKey);

  const { id, object, created, model, choices } = _blog;

  // Log choices[0] and choices[0].message.content for debugging
  console.log('shortBlog.choices[0]:', choices[0]);
  console.log('shortBlog.choices[0].message.content:', choices[0].message.content);

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'short-blog',
    userPrompt,
    { id, object, created, model },
    choices[0].message.content
  );

  const userResponse = formatResponse(_id, 'short-blog', generatedContents);

  return userResponse;
};

const longBlog = async (userId, userEmail, { about, headline, keywords, contents = '' }, apiKey) => {
  about = removeSpaces(about);
  headline = removeSpaces(headline);
  keywords = keywords.map((keyword) => removeSpaces(keyword));

  keywords = keywords ? keywords.join(', ') : '';
  about += keywords ? `, ${keywords}` : '';

  const userPrompt = `BLOG ABOUT: ${removeSpaces(about)}`;

  const prompt = `You are an experienced blog writer. Your task is to continue writing the following long descriptive blog. Ensure the continuation maintains the same tone and style, and provides valuable insights or information.

Guidelines:
1. **Consistency:** Maintain the same tone and style as the initial content.
2. **Engagement:** Keep the reader engaged with compelling content.
3. **Value:** Provide valuable insights or information.
4. **Clarity:** Ensure the content is clear and easy to read.

${userPrompt}

Blog headline: ${headline}

${contents}`;

  const _blog = await generateContentWithModel('gpt-4o', 256, prompt, 1.0, 0, 0, ['\n\n\n\n'], apiKey);

  const { id, object, created, model, choices } = _blog;

  // Log choices[0] and choices[0].message.content for debugging
  console.log('longBlog.choices[0]:', choices[0]);
  console.log('longBlog.choices[0].message.content:', choices[0].message.content);

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'long-blog',
    userPrompt,
    { id, object, created, model },
    choices[0].message.content
  );

  const userResponse = formatResponse(_id, 'long-blog', generatedContents);

  return userResponse;
};

const blogFromOutline = async (userId, userEmail, { headline, intro, outline }, apiKey) => {
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

  const prompt = `You are a skilled blog writer. Your task is to write a blog based on the given outline. Ensure the content is engaging, informative, and follows the structure provided by the outline.

Guidelines:
1. **Structure:** Follow the provided outline closely.
2. **Engagement:** Keep the reader engaged with compelling content.
3. **Value:** Provide valuable insights or information.
4. **Clarity:** Ensure the content is clear and easy to read.
5. **Consistency:** Maintain a consistent tone and style throughout the blog.

${userPrompt}

${outline[0]}

`;

  const _blog = await generateContentWithModel('gpt-4o', 2000, prompt, 1.0, 0, 0, ['\n\n\n\n'], apiKey);

  const { id, object, created, model, choices } = _blog;

  // Log choices[0] and choices[0].message.content for debugging
  console.log('blogFromOutline.choices[0]:', choices[0]);
  console.log('blogFromOutline.choices[0].message.content:', choices[0].message.content);

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'blog-from-outline',
    userPrompt,
    { id, object, created, model },
    choices[0].message.content
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
