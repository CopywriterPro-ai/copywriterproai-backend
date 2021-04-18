/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const paraphrase = async (userId, { userText }) => {
  const prompt = `Original: He has tons of stuff to throw away.
Paraphrase: He needs to get rid of a lot of junk.
Original: Symptoms of influenza include fever and nasal congestion.
Paraphrase: A stuffy nose and elevated temperature are signs you may have the flu.
Original: ${removeSpaces(userText)}
Paraphrase:`;

  let paraphrasedContents;
  while (1) {
    paraphrasedContents = await generateContentUsingGPT3('davinci', 500, prompt, 0.9, 0.9, 0.9, ['\n']);
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

module.exports = {
  paraphrase,
};
