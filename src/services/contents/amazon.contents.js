/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT4, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateAmazonProductListings = async (
  userId,
  userEmail,
  { productName, productCategories, productFeatures, numberOfSuggestions },
  apiKey
) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Product Categories: ${removeSpaces(productCategories)}
Product Features: ${removeSpaces(productFeatures)}`;

  const prompt = `You are an expert in creating Amazon product descriptions. Your task is to write a compelling, SEO-friendly product description for the given product. Please follow the guidelines below to ensure the highest quality.

Guidelines:
1. **Product Name:** Include the product name at the beginning.
2. **Product Categories:** List the product categories.
3. **Product Features:** Highlight key features, focusing on benefits and unique selling points.
4. **Description:**
   - Start with a strong opening statement that grabs attention.
   - Provide detailed descriptions of the product features.
   - Use bullet points for clarity and readability.
   - Include any specifications, dimensions, and other relevant details.
   - Ensure the content is engaging and persuasive, encouraging potential customers to purchase.
   - Maintain a professional and informative tone.
   - Optimize the description with relevant keywords for SEO.

Example:
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

  for (let i = 0; i < numberOfSuggestions; i++) {
    const amazonProductListings = await generateContentUsingGPT4('gpt-4', 500, prompt, 0.9, 0, 0, ['\n\n'], apiKey);
    const { id, object, created, model, choices } = amazonProductListings;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('amazonProductListings.choices[0]:', choices[0]);
    console.log('amazonProductListings.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    amazonProductListingsList.push(choices[0].message.content.trim());
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
