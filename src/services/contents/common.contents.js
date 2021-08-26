const { generateContentUsingGPT3, processListContents, removeSpaces } = require('../content.service');

const imageIdeasFromAdText = async (userId, userEmail, { product, adText }) => {
  const userPrompt = `Product: ${removeSpaces(product)}
Ad: ${removeSpaces(adText)}
`;

  const prompt = `Generate image content for following Ad of the product.
${userPrompt}
List of 5 Image contents:
-`;

  const imageIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.1, 0.2, ['\n\n']);
  return processListContents(userId, userEmail, 'image-idea-from-ad-text', userPrompt, imageIdeas);
};

module.exports = {
  imageIdeasFromAdText,
};
