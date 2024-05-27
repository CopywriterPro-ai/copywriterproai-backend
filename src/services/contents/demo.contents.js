/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const Demo = require('../../models/demo.model');
const { generateContentUsingGPT4, removeSpaces, cleanAllTexts } = require('../content.service');

const storeData = async (documentType, prompt, openAPIInformation, generatedContents) => {
  const formattedContents = {
    documentType,
    prompt,
    openAPIInformation,
    generatedContents,
  };

  const content = await Demo.create(formattedContents);
  return content;
};

const formatResponse = (id, task, generatedTexts) => {
  return {
    id,
    task,
    generatedTexts,
  };
};

const processListContents = async (task, prompt, { id, object, created, model, choices }) => {
  const contents = cleanAllTexts(choices[0].message.content.split('\n'));

  // Log choices[0] and choices[0].message.content for debugging
  console.log('processListContents.choices[0]:', choices[0]);
  console.log('processListContents.choices[0].message.content:', choices[0].message.content);

  const { _id, generatedContents } = await storeData(task, prompt, { id, object, created, model }, contents);
  return formatResponse(_id, task, generatedContents);
};

const paraphrase = async ({ userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are a creative writer with expertise in paraphrasing content. Your task is to paraphrase the given paragraph in multiple creative ways. Ensure that the paraphrased content maintains the original meaning while providing different phrasing and structure.

Guidelines:
1. **Maintain Meaning:** Ensure the paraphrased content retains the original meaning.
2. **Creativity:** Provide creative and varied phrasings.
3. **Clarity:** Ensure the paraphrased content is clear and easy to understand.
4. **Variety:** Offer different structures and wording for each paraphrase.

Examples:
Paragraph
"""
The 8 best places of natural beauty in the world.
"""
Paraphrase in 2 creative ways.
"""
1. 8 natural locations around the world that are especially beautiful.
2. World's most beautiful 8 natural beauties that will amaze you.
"""

Paragraph
"""
How are you?
"""
Paraphrase in 3 creative ways.
"""
1. Is everything going well for you?
2. I hope you are doing well.
3. Do you feel well?
"""

Content
"""
${userText}
"""
Paraphrase in 3 creative ways.
"""
1.`;

  const paraphrasedContents = await generateContentUsingGPT4('gpt-4o', 2000, prompt, 1, 0, 0, ['"""', '4. ']);

  return processListContents('paraphrasing', userPrompt, paraphrasedContents);
};

const blogHeadline = async ({ blogAbout }) => {
  const userPrompt = `Blog About: ${removeSpaces(blogAbout)}`;

  const prompt = `You are an expert blog writer. Your task is to generate attention-grabbing blog headlines relevant to the given topic. Use your expertise to create engaging, clear, and compelling headlines that effectively communicate the intended message to the target audience.

Guidelines:
1. **Relevance:** Each headline should accurately reflect the blog content.
2. **Engagement:** Headlines should be catchy and encourage clicks.
3. **Clarity:** Headlines should be clear and concise.
4. **Emotional Appeal:** Use words that evoke curiosity or strong emotions.
5. **Unique Value:** Ensure each headline stands out from the competition.

Example:
Blog About: The benefits of a plant-based diet

List of 3 BLOG HEADLINES:
1. Discover the Amazing Health Benefits of a Plant-Based Diet
2. How Switching to a Plant-Based Diet Can Transform Your Life
3. Unlock the Secrets to a Healthier You with a Plant-Based Diet

${userPrompt}

List of 3 BLOG HEADLINES:
1.`;

  const blogHeadlines = await generateContentUsingGPT4('gpt-4o', 200, prompt, 1.0, 1.0, 1.0, ['\n\n', '4. ']);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('blogHeadlines.choices[0]:', blogHeadlines.choices[0]);
  console.log('blogHeadlines.choices[0].message.content:', blogHeadlines.choices[0].message.content);

  return processListContents('blog-headline', userPrompt, blogHeadlines);
};

module.exports = {
  paraphrase,
  blogHeadline,
};
