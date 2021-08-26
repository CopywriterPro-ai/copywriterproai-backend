/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateAmazonProductListings = async (userId, userEmail, { productName, productCategories, productFeatures }) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Product Categories: ${removeSpaces(productCategories)}
productFeatures: ${removeSpaces(productFeatures)}`;

  const prompt = `Write Amazon Product Description

Product Name: ZINUS Shalini Upholstered Platform Bed
Product Categories: Beds
Product Features: Twin size supports a maximum weight capacity of 350 pounds, slats are spaced 2.7 inches apart, 2-person assembly in under an hour, Wooden slats
Description:
Woven Fabric Upholstery With Steel Framework
GOOD LOOKS, CONFIDENT STYLE - With its easy-as-pie assembly, sturdy construction and elegant diamond pattern stitching, the Shalini stands the test of time and makes a stunningly chic addition to your bedroom
DURABLY DESIGNED - Interior steel framework and dense foam padding add comfort and longevity; Twin size supports a maximum weight capacity of 350 pounds, while all other sizes can support up to 700 pounds
NO BOX SPRING NEEDED - Durable wood slats support and extend the life of your latex, memory foam or spring mattress without the need for a box spring; For the twin and full sizes, slats are spaced 2.7 inches apart, and for other sizes, slats are spaced 3.2 inches apart
EASY ASSEMBLY – Everything you need is efficiently packed into one box and shipped straight to your door; all parts, tools and instructions are conveniently located in the zippered compartment of the headboard for easy, 2-person assembly in under an hour
Worry-free 5 year limited warranty included; Mattress sold separately
Furniture Finish: Wooden slats

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const amazonProductListingsList = [];

  for (let i = 0; i < 3; i++) {
    const amazonProductListings = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.9, 0, 0, ['\n\n']);
    const { id, object, created, model, choices } = amazonProductListings;

    openAPIInformationsList.push({ id, object, created, model });
    amazonProductListingsList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'amazon-product-listings',
    userPrompt,
    openAPIInformationsList,
    amazonProductListingsList
  );

  const userResponse = formatResponse(_id, 'amazon-product-listings', generatedContents);

  return userResponse;
};

module.exports = {
  generateAmazonProductListings,
};
