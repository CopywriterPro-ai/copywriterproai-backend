/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const paraphrase = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${userPrompt}
Paraphrase:`;

  let paraphrasedContents;
  while (1) {
    paraphrasedContents = await generateContentUsingGPT3('davinci', 100, prompt, 0.9, 0.9, 0.9, ['\n']);
    if (paraphrasedContents.choices[0].text.trim() !== userPrompt) {
      paraphrasedContents.choices[0].text = paraphrasedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = paraphrasedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'paraphrasing',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'paraphrasing', generatedContents);

  return userResponse;
};

const expander = async (userId, userEmail, { userText }) => {
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

  let expandedContents;
  while (1) {
    expandedContents = await generateContentUsingGPT3('davinci', 200, prompt, 0.6, 0.2, 0.0, ['"""', 'Original Text:']);
    if (expandedContents.choices && expandedContents.choices[0].text.trim() !== userPrompt) {
      expandedContents.choices[0].text = expandedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = expandedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'expander',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'expander', generatedContents);

  return userResponse;
};

const simplify = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `My second grader asked me what this passage means:
"""
${userPrompt}
"""
I rephrased it for him, in plain language a second grader can understand:
"""`;

  let simplifiedContents;
  while (1) {
    simplifiedContents = await generateContentUsingGPT3('davinci', 150, prompt, 0.5, 0.2, 0.0, ['"""']);
    if (simplifiedContents.choices && simplifiedContents.choices[0].text.trim() !== userPrompt) {
      simplifiedContents.choices[0].text = simplifiedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = simplifiedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'simplifier',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'simplifier', generatedContents);

  return userResponse;
};

const summarize = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Original Text:
"""
There are times when the night sky glows with bands of color. They may fall in folds like a curtain drawn across the heavens. The lights usually grow brighter, then suddenly dim. During this time the sky glows with pale yellow, pink, green, violet, blue, and red. These lights are called the Aurora Borealis. Some people call them the Northern Lights. Scientists have been watching them for hundreds of years. They are not quite sure what causes them. In ancient times Long Beach City College WRSC Page 2 of 2 people were afraid of the Lights. They imagined that they saw fiery dragons in the sky. Some even concluded that the heavens were on fire.
"""
Short Summary:
"""
The Aurora Borealis, or Northern Lights, are bands of color in the night sky. Ancient people thought that these lights were dragon on fire, and even modern scientists are not sure what they are.
"""

Original Text:
"""
${userPrompt}
"""
Short Summary:
"""
`;

  let summarizedContents;
  while (1) {
    summarizedContents = await generateContentUsingGPT3('davinci', 150, prompt, 0.7, 0.0, 0.0, ['"""', 'Original Text:']);
    if (summarizedContents.choices && summarizedContents.choices[0].text.trim() !== userPrompt) {
      summarizedContents.choices[0].text = summarizedContents.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = summarizedContents;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'summarizer',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'summarizer', generatedContents);

  return userResponse;
};

const notesFromPassage = async (userId, userEmail, { userText }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `I asked my students to note ALL the important informations from this passage:
"""
${userPrompt}
"""
My students wrote -
1.`;

  let notes;
  while (1) {
    notes = await generateContentUsingGPT3('davinci-instruct-beta', 150, prompt, 0.7, 0.0, 0.0, ['"""', '\n\n']);
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

  const prompt = `Original: ${userPrompt}
Standard American English:`;

  const fixedContent = await generateContentUsingGPT3('davinci', 200, prompt, 0.0, 0.0, 0.0, ['\n']);
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

const changeTone = async (userId, userEmail, { userText, tone }) => {
  const userPrompt = removeSpaces(userText);

  const prompt = `Change the tone -

Original: I asked the mayor about earthquake preparedness, and he said we haven’t done enough to be ready.
Formal: When asked about earthquake preparedness, Mayor Kim said the city has more work to do.

Original: The company really needs to work on its customer service.
Humorous: Company management should take a look at their customer service.

Original: Let's see how much I can do for you.
Friendly: I'd be happy to help in any way I can.

Original: Do you think we’re ready for the new school year?
Authoritative: Are we ready for the new school year?

Original: ${userPrompt}
${tone}:`;

  const fixedContent = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 0.8, 0.0, 0.0, ['\n\n']);
  fixedContent.choices[0].text = fixedContent.choices[0].text.trim();

  const { id, object, created, model, choices } = fixedContent;
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'change-tone',
    userPrompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'change-tone', generatedContents);

  return userResponse;
};

module.exports = {
  paraphrase,
  expander,
  simplify,
  summarize,
  notesFromPassage,
  grammarFixer,
  changeTone,
};
