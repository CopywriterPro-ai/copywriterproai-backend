const { generateContentUsingGPT3, removeSpaces, processListContents } = require('../content.service');

const imageIdeasFromAdText = async (userId, { product, adText }) => {
  const prompt = `Generate image content for following Ads of the product.
Product: ${product}
Ads: ${adText}
List of 5 Image contents:
-`;

  const imageIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.1, 0.2, ['\n\n']);
  return processListContents(userId, 'image-idea-from-ad-text', prompt, imageIdeas);
};

module.exports = {
  imageIdeasFromAdText,
};
