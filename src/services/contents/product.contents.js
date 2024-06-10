/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentWithModel, removeSpaces, storeData, formatResponse } = require('../content.service');

const productDescription = async (userId, userEmail, { productName, productType, numberOfSuggestions }) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Product Type: ${removeSpaces(productType)}`;

  const prompt = `You are an expert in writing SEO-friendly and engaging product descriptions. Your task is to craft a compelling short description based on the given product name and type. Ensure the description is concise, highlights key features, and includes SEO keywords.

Examples:
Product Name: LG KS-Q18ENZA air conditioner
Product Type: Air Conditioner
Short Description: LG KS-Q18ENZA 5 star rated split air conditioner with auto clean that prevents bacteria or mold from breeding and eliminates potential odors. Features include a micro dust protection filter, dual inverter compressor, gold fin condenser, and ocean black protection. LG's DUAL Inverter Compressor with Varied Speed Dual Rotary Motor has a wider rotational frequency, saving more energy while providing faster and quieter cooling. This ensures that our DUAL Inverter ACs cool faster, last longer, and run quieter.

Product Name: Kennedy Barrel Chair
Product Type: Chair, Barrel Chair
Short Description: The Kennedy Barrel Chair is a favorite for its oversized design, perfect for hours of reading or cuddling. Handpicked fabric with a special sheen creates a look of total elegance. Ideal for those who appreciate comfort and style.

${userPrompt}
Short Description:`;

  const openAPIInformationsList = [];
  const productDescriptionSEOFriendlyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const productDescriptionSEOFriendly = await generateContentWithModel('davinci', 50, prompt, 0.5, 0, 0, ['\n', 'Short Description:']);
    const { id, object, created, model, choices } = productDescriptionSEOFriendly;

    openAPIInformationsList.push({ id, object, created, model });
    productDescriptionSEOFriendlyList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'product-description',
    userPrompt,
    openAPIInformationsList,
    productDescriptionSEOFriendlyList
  );

  const userResponse = formatResponse(_id, 'product-description', generatedContents);

  return userResponse;
};

const makeProductDescriptionSEOFriendly = async (userId, userEmail, { productName, productType, targetAudience, productBenefits, productFeatures, numberOfSuggestions }) => {
  const userPrompt = `Product Name: ${removeSpaces(productName)}
Product Type: ${removeSpaces(productType)}
Product Features: ${removeSpaces(productFeatures)}
Product Benefits: ${removeSpaces(productBenefits)}
Target Audience: ${removeSpaces(targetAudience)}`;

  const prompt = `You are an expert in writing SEO-friendly product descriptions. Your task is to write a detailed product description based on the given product name, type, features, benefits, and target audience. Ensure the description is engaging, highlights key features, and includes SEO keywords.

Examples:
Product Name: LG KS-Q18ENZA air conditioner
Product Type: Air Conditioner, Home Appliance
Product Features: DUAL Inverter | High Temperature cooling Score of 5, 100% Copper with Ocean Black Protection, Hi Grooved Copper, Active Energy Control, Low Refrigerant Detection
Product Benefits: Better Sleep, Prevents Electronics From Overheating, Improves Work Performance, Reduces the Risk of Dehydration
Target Audience: Everyone, Job Holders, Businessmen
Description: LG KS-Q18ENZA 5 star rated split air conditioner with auto clean that prevents bacteria or mold from breeding and eliminates potential odors. Features include a micro dust protection filter, dual inverter compressor, gold fin condenser, ocean black protection, and many more. LG's DUAL Inverter Compressor with Varied Speed Dual Rotary Motor has a wider rotational frequency, saving more energy while providing faster and quieter cooling. This ensures that our DUAL Inverter ACs cool faster, last longer, and run quieter.

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const productDescriptionSEOFriendlyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedProductDescription = await generateContentWithModel('gpt-4o', 300, prompt, 0.7, 0.2, 0.3, ['\n', 'Description:']);
    const { id, object, created, model, choices } = generatedProductDescription;

    openAPIInformationsList.push({ id, object, created, model });
    productDescriptionSEOFriendlyList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'seo-friendly-product-description',
    userPrompt,
    openAPIInformationsList,
    productDescriptionSEOFriendlyList
  );

  const userResponse = formatResponse(_id, 'seo-friendly-product-description', generatedContents);

  return userResponse;
};

const productReview = async (userId, userEmail, { product, rating, comment, numberOfSuggestions }) => {
  const userPrompt = `Product: ${removeSpaces(product)}
Rating: ${removeSpaces(rating)}
Comment: ${removeSpaces(comment)}`;

  const prompt = `You are an expert in writing engaging product reviews. Your task is to write a review based on the given product, rating, and comment. Ensure the review is detailed, highlights key features, and reflects the given rating and comment.

Examples:
Product: LG KS-Q18ENZA air conditioner
Rating: 5 stars
Comment: Excellent cooling, very energy efficient, and quiet operation.
Review: The LG KS-Q18ENZA air conditioner is fantastic! It provides excellent cooling, is very energy efficient, and operates quietly. The dual inverter compressor ensures faster and quieter cooling, making it a great addition to any home. Highly recommend!

${userPrompt}
Review:`;

  const openAPIInformationsList = [];
  const productReviewList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const review = await generateContentWithModel('davinci', 100, prompt, 0.3, 0.2, 0.1, ['\n']);
    const { id, object, created, model, choices } = review;

    openAPIInformationsList.push({ id, object, created, model });
    productReviewList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'product-review',
    userPrompt,
    openAPIInformationsList,
    productReviewList
  );

  const userResponse = formatResponse(_id, 'product-review', generatedContents);

  return userResponse;
};

const generateProductName = async (userId, userEmail, { productDescription, keywords, numberOfSuggestions }) => {
  const userPrompt = `Product description: ${removeSpaces(productDescription)}
Keywords: ${removeSpaces(keywords)}`;

  const prompt = `You are an expert in generating product names based on the given product description and keywords. Your task is to create unique and engaging product names that reflect the product's features and benefits.

Examples:
Product description: A home milkshake maker
Keywords: fast, healthy, compact
Product names: HomeShaker, Fit Shaker, QuickShake, Shake Maker

Product description: A pair of shoes that can fit any foot size.
Keywords: adaptable, fit
Product names: CustomShoes, InstantFlex, SizingShoes, QuickFlex

${userPrompt}
Product names:`;

  const openAPIInformationsList = [];
  const generateProductNameList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const productName = await generateContentWithModel('davinci', 60, prompt, 0.5, 0, 0, ['\n', 'Product names:']);
    const { id, object, created, model, choices } = productName;

    openAPIInformationsList.push({ id, object, created, model });
    generateProductNameList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'product-name',
    userPrompt,
    openAPIInformationsList,
    generateProductNameList
  );

  const userResponse = formatResponse(_id, 'product-name', generatedContents);

  return userResponse;
};

module.exports = {
  productDescription,
  makeProductDescriptionSEOFriendly,
  productReview,
  generateProductName,
};
