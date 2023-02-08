/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const paraphrase = async (userId, userEmail, { userText, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Paraphrase the following Paragraphs.

Paragraph
"""
The 8 best places of natural beauty in the world.
"""
Paraphrase in 2 creative way(s).
"""
1. 8 natural locations around the world that are especially beautiful.
2. World's most beautiful 8 natural beauties that will amaze you.
"""

Paragraph
"""
How are you?
"""
Paraphrase in 3 creative way(s).
"""
1. Is everything going well for you?
2. I hope you are doing well.
3. Do you feel well?
"""

Content
"""
${userText}
"""
Paraphrase in ${numberOfSuggestions} creative way(s).
"""
1.`;

  const paraphrasedContents = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 1, 0, 0, [
    '"""',
    `${numberOfSuggestions + 1}. `,
  ]);

  return processListContents(userId, userEmail, 'paraphrasing', userPrompt, paraphrasedContents);
};

const expander = async (userId, userEmail, { userText, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Original Text:
"""
Jupiter is the fifth closest planet to the Sun and the biggest in our Solar System. The gas giant has about one-thousandth of the Sun's mass but is still heavier than all other planets combined. Jupiter can be seen at night in a clear sky without any special equipment, which makes it stand out from other stars and objects.
"""
Expanded with more words and information:
"""
Jupiter is the fifth planet from the Sun. It may be less than one-thousandth as massive as our parent star, but it outweighs all other Solar System objects combined. Jupiter is a bright object in the sky that can be readily seen by anyone with normal vision at night. Jupiter is sometimes referred to as a "gas giant" because it is made primarily of gaseous and liquid matter, rather than solid matter. Jupiter's atmosphere is composed of about 88 percent hydrogen and 12 percent helium by percent volume of gas molecules, and trace amounts of methane, water vapor, ammonia, and "smoke"-like particles of unknown composition. There are also traces  of carbon, ethane, hydrogen sulfide, neon, oxygen, phosphine, and sulfur.
"""

Original Text:
"""
${userPrompt}
"""
Expanded with more words and information:
"""
`;

  const openAPIInformationsList = [];
  const expandedContentsList = [];

  while (numberOfSuggestions--) {
    const expandedContents = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 1, 0.2, 2, [
      '"""',
      'Original Text:',
    ]);
    const { id, object, created, model, choices } = expandedContents;

    openAPIInformationsList.push({ id, object, created, model });
    expandedContentsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'expander',
    userPrompt,
    openAPIInformationsList,
    expandedContentsList
  );
  const userResponse = formatResponse(_id, 'expander', generatedContents);

  return userResponse;
};

const simplifier = async (userId, userEmail, { userText, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `My second grader asked me what this passage means:
"""
${userPrompt}
"""
I rephrased it for him, in plain language a second grader can understand:
"""
`;

  const openAPIInformationsList = [];
  const simplifiedContentsList = [];

  while (numberOfSuggestions--) {
    const simplifiedContents = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.7, 0.0, 0.0, ['"""']);
    const { id, object, created, model, choices } = simplifiedContents;

    openAPIInformationsList.push({ id, object, created, model });
    simplifiedContentsList.push(choices[0].text.trim());
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

const summarizer = async (userId, userEmail, { userText, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `${userPrompt}

Tl;dr
`;

  const openAPIInformationsList = [];
  const summarizedContentsList = [];

  while (numberOfSuggestions--) {
    const summarizedContents = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.7, 0.0, 0.0, ['\n\n']);
    const { id, object, created, model, choices } = summarizedContents;

    openAPIInformationsList.push({ id, object, created, model });
    summarizedContentsList.push(choices[0].text.trim());
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

const abstractGenerator = async (userId, userEmail, { userText, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Write a SHORT ABSTRACT of the ORIGINAL TEXT.

ORIGINAL TEXT:
"""
${userPrompt}
"""

SHORT ABSTRACT:
"""
`;

  const openAPIInformationsList = [];
  const abstractsList = [];

  while (numberOfSuggestions--) {
    const abstract = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.7, 0.0, 0.0, [
      '"""',
      'ORIGINAL TEXT:',
    ]);
    const { id, object, created, model, choices } = abstract;

    openAPIInformationsList.push({ id, object, created, model });
    abstractsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'abstract',
    userPrompt,
    openAPIInformationsList,
    abstractsList
  );
  const userResponse = formatResponse(_id, 'abstract', generatedContents);

  return userResponse;
};

const notesFromPassage = async (userId, userEmail, { userText, numberOfPoints }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `I asked my students to note ALL the important informations from this passage:
"""
${userPrompt}
"""
My students wrote ${numberOfPoints} points:
1.`;

  let notes;
  while (1) {
    notes = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.7, 0.0, 0.0, ['"""', '\n\n']);
    if (notes.choices && notes.choices[0].text.trim() !== userPrompt) {
      notes.choices[0].text = `1. ${notes.choices[0].text.trim()}`;
      break;
    }
  }
  const { id, object, created, model, choices } = notes;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'notes-from-passage',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'notes-from-passage', generatedContents);

  return userResponse;
};

const grammarFixer = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Correct this to standard English:

${userPrompt}
`;

  const fixedContent = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.0, 0.0, 0.0, ['\n\n']);
  fixedContent.choices[0].text = fixedContent.choices[0].text.trim();

  const { id, object, created, model, choices } = fixedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'grammar-fixer',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'grammar-fixer', generatedContents);

  return userResponse;
};

const changeTone = async (userId, userEmail, { userText, tone, numberOfSuggestions }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Change the tone -

Original: The company really needs to work on its customer service.
Humorous: Company management should take a look at their customer service.

Original: Let's see how much I can do for you.
Friendly: I'd be happy to help in any way I can.

Original: Do you think we’re ready for the new school year?
Authoritative: Are we ready for the new school year?

Original: ${userPrompt}
${tone} (${numberOfSuggestions} unique ways):
1.`;

  const fixedContent = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.8, 0.0, 0.0, [
    '\n\n',
    `${numberOfSuggestions + 1}. `,
  ]);

  return processListContents(userId, userEmail, 'change-tone', userPrompt, fixedContent);
};

const activePassive = async (userId, userEmail, { userText, from, to }) => {
  const userPrompt = removeSpaces(userText);
  const convertFrom = removeSpaces(from);
  const convertTo = removeSpaces(to);

  const prompt = `Convert this sentence from ${convertFrom} to ${convertTo} voice.

${convertFrom}: ${userPrompt}

${convertTo}:`;

  const convertedContent = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.0, 0.0, 0.0, ['\n\n']);
  convertedContent.choices[0].text = convertedContent.choices[0].text.trim();

  const { id, object, created, model, choices } = convertedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'active-passive',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'active-passive', generatedContents);

  return userResponse;
};

const pointOfView = async (userId, userEmail, { userText, from, to, gender }) => {
  const userPrompt = removeSpaces(userText);
  const convertFrom = removeSpaces(from);
  const convertTo = removeSpaces(to);
  const convertGender = gender ? ` (gender ${removeSpaces(gender)})` : '';

  const prompt = `Convert this from ${convertFrom} to ${convertTo}:${convertGender}

${userPrompt}
`;

  const convertedContent = await generateContentUsingGPT3('text-davinci-003', 2000, prompt, 0.0, 0.0, 0.0, ['\n\n']);
  convertedContent.choices[0].text = convertedContent.choices[0].text.trim();

  const { id, object, created, model, choices } = convertedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'point-of-view',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'point-of-view', generatedContents);

  return userResponse;
};

module.exports = {
  paraphrase,
  expander,
  simplifier,
  summarizer,
  abstractGenerator,
  notesFromPassage,
  grammarFixer,
  changeTone,
  activePassive,
  pointOfView,
};
