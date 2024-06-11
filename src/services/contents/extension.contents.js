/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentWithModel,
  removeSpaces,
  storeData,
  processListContents,
  formatResponse,
} = require('../extension.service');

const paraphrase = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are a professional writer with expertise in paraphrasing content. Your task is to paraphrase the original text in multiple creative ways while retaining the original meaning.

Guidelines:
1. **Maintain Meaning:** Ensure the paraphrased content retains the original meaning.
2. **Creativity:** Provide creative and varied phrasings.
3. **Clarity:** Ensure the paraphrased content is clear and easy to understand.
4. **Variety:** Offer different structures and wording for each paraphrase.

Examples:
Original: Her life spanned years of incredible change for women as they gained more rights than ever before.
Paraphrase: She lived through the exciting era of women's liberation.

Original: ${userPrompt}
3 unique ways to Paraphrase:
1.`;

  const paraphrasedContents = await generateContentWithModel('gpt-4o', 200, prompt, 0.9, 0.9, 0.9, ['\n\n']);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('paraphrasedContents.choices[0]:', paraphrasedContents.choices[0]);
  console.log('paraphrasedContents.choices[0].message.content:', paraphrasedContents.choices[0].message.content);

  return processListContents(userId, userEmail, 'paraphrasing', userPrompt, paraphrasedContents);
};

const grammarFixer = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are an expert in English grammar. Your task is to correct the given text to standard English.

Guidelines:
1. **Correct Grammar:** Fix any grammatical errors.
2. **Clarity:** Ensure the text is clear and easy to understand.
3. **Conciseness:** Keep the text concise and to the point.

Original Text:
${userPrompt}
Corrected Text:`;

  const fixedContent = await generateContentWithModel('gpt-4o', 200, prompt, 0.0, 0.0, 0.0, ['\n\n']);
  fixedContent.choices[0].message.content = fixedContent.choices[0].message.content.trim();

  // Log choices[0] and choices[0].message.content for debugging
  console.log('fixedContent.choices[0]:', fixedContent.choices[0]);
  console.log('fixedContent.choices[0].message.content:', fixedContent.choices[0].message.content);

  const { id, object, created, model, choices } = fixedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'grammar-fixer',
    userPrompt,
    { id, object, created, model },
    choices[0].message.content
  );
  const userResponse = formatResponse(_id, 'grammar-fixer', generatedContents);

  return userResponse;
};

const simplifier = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are a professional writer with expertise in simplifying complex texts. Your task is to rephrase the given passage in plain language that a second grader can understand.

Guidelines:
1. **Maintain Meaning:** Ensure the simplified content retains the original meaning.
2. **Clarity:** Use simple and clear language.
3. **Engagement:** Make the text engaging and easy to read for young readers.

Original Text:
"""
${userPrompt}
"""
Simplified Text for a Second Grader:
"""
`;

  const openAPIInformationsList = [];
  const simplifiedContentsList = [];

  let numberOfSuggestions = 3;
  while (numberOfSuggestions--) {
    const simplifiedContents = await generateContentWithModel('gpt-4o', 150, prompt, 0.7, 0.0, 0.0, ['"""']);
    const { id, object, created, model, choices } = simplifiedContents;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('simplifiedContents.choices[0]:', simplifiedContents.choices[0]);
    console.log('simplifiedContents.choices[0].message.content:', simplifiedContents.choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    simplifiedContentsList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'simplifier',
    userPrompt,
    openAPIInformationsList,
    simplifiedContentsList
  );
  const userResponse = formatResponse(_id, 'simplifier', generatedContents);

  return userResponse;
};

const summarizer = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are a professional writer with expertise in summarizing content. Your task is to summarize the given text into a concise and clear summary.

Guidelines:
1. **Maintain Meaning:** Ensure the summary retains the original meaning.
2. **Clarity:** Use clear and concise language.
3. **Conciseness:** Keep the summary brief and to the point.

Original Text:
${userPrompt}
Summary:
`;

  const openAPIInformationsList = [];
  const summarizedContentsList = [];

  let numberOfSuggestions = 3;
  while (numberOfSuggestions--) {
    const summarizedContents = await generateContentWithModel('gpt-4o', 100, prompt, 0.7, 0.0, 0.0, ['\n\n']);
    const { id, object, created, model, choices } = summarizedContents;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('summarizedContents.choices[0]:', summarizedContents.choices[0]);
    console.log('summarizedContents.choices[0].message.content:', summarizedContents.choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    summarizedContentsList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'summarizer',
    userPrompt,
    openAPIInformationsList,
    summarizedContentsList
  );
  const userResponse = formatResponse(_id, 'summarizer', generatedContents);

  return userResponse;
};

const changeTone = async (userId, userEmail, { userText, tone }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `You are a professional writer with expertise in changing the tone of text. Your task is to change the tone of the given text into the specified tone in multiple unique ways.

Guidelines:
1. **Maintain Meaning:** Ensure the changed text retains the original meaning.
2. **Clarity:** Use clear and concise language.
3. **Tone Appropriateness:** Ensure the changed tone matches the specified tone.

Examples:
Original: The company really needs to work on its customer service.
Humorous: Company management should take a look at their customer service.

Original: Let's see how much I can do for you.
Friendly: I'd be happy to help in any way I can.

Original: Do you think we’re ready for the new school year?
Authoritative: Are we ready for the new school year?

Original: ${userPrompt}
${tone} (3 unique ways):
1.`;

  const fixedContent = await generateContentWithModel('gpt-4o', 200, prompt, 0.8, 0.0, 0.0, ['\n\n']);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('fixedContent.choices[0]:', fixedContent.choices[0]);
  console.log('fixedContent.choices[0].message.content:', fixedContent.choices[0].message.content);

  return processListContents(userId, userEmail, 'change-tone', userPrompt, fixedContent);
};

module.exports = {
  paraphrase,
  grammarFixer,
  simplifier,
  summarizer,
  changeTone,
};
