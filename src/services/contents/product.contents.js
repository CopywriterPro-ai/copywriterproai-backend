/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const productDescription = async (userId, { productName, productType }) => {
  const prompt = `Make the following Text SEO-friendly and engaging.
Product Name: LG KS-Q18ENZA air conditioner\n
Product Type: Air Conditioner\n
Short Description: LG KS-Q18ENZA 5 star rated split air conditioner with auto clean that's prevent bacteria or mould from breeding and eliminate potential odours from your features include - micro dust protection filter, dual inverter compressor, gold fin condenser, ocean black protection and many more. LG's DUAL Inverter Compressor with Varied Speed Dual Rotary Motor has a wider rotational frequency which saves more energy along with higher speed cooling range than conventional compressors. This ensures that our DUAL Inverter ACs cool faster, last longer and run quieter.\n

Product Name: Kennedy Barrel Chair\n
Product Type: Chair, Barrel Chair\n
Short Description:: The Kennedy Barrel Chair is one of Sean and Catherine's favorite pieces. This oversized chair is perfect for those looking t pend hours sprawled out reading their favorite book or for those who just want to cuddle with the one they I. The Kennedy Barrel Chair's handpicked fabric has a special sheen that creates a look of total elegance.\n

Product Name: ${productName}\n
Product Type: ${productType}\n
Short Description:`;

  const openAPIInformationsList = [];
  const productDescriptionSEOFriendlyList = [];

  for (let i = 0; i < 3; i++) {
    const productDescriptionSEOFriendly = await generateContentUsingGPT3('davinci', 300, prompt, 0.5, 0, 0, [
      '\n',
      'Short Description:',
    ]);
    const { id, object, created, model, choices } = productDescriptionSEOFriendly;

    openAPIInformationsList.push({ id, object, created, model });
    productDescriptionSEOFriendlyList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'product-description',
    prompt,
    openAPIInformationsList,
    productDescriptionSEOFriendlyList
  );

  const userResponse = formatResponse(_id, 'product-description', generatedContents);

  return userResponse;
};

const makeProductDescriptionSEOFriendly = async (
  userId,
  { productName, productType, targetAudience, productBenefits, productFeatures }
) => {
  const prompt = `Write Product description for following Product details
Product Name: LG KS-Q18ENZA air conditioner\n
Product Type: Air conditioner, Home Appliance\n
Product Features: DUAL Inverter | High Temperature cooling Score of 5\n100% Copper with Ocean Black Protection\nHi Grooved Copper\nActive Energy Control\nLow Refrigerant Detection
Product Benefits: Better Sleep\nPrevents Electronics From Overheating\nmproves Work Performance\nReduces the Risk of Dehydration\n
Target Audience: Everyone, Job Holders, Businessman
Description: LG KS-Q18ENZA 5 star rated split air conditioner with auto clean that's prevent bacteria or mould from breeding and eliminate potential odours from your features include - micro dust protection filter, dual inverter compressor, gold fin condenser, ocean black protection and many more. LG's DUAL Inverter Compressor with Varied Speed Dual Rotary Motor has a wider rotational frequency which saves more energy along with higher speed cooling range than conventional compressors. This ensures that our DUAL Inverter ACs cool faster, last longer and run quieter.\n

Product Name: ${productName}
Product Type: ${productType}
Product Features:${productFeatures}
Product Benefits: ${productBenefits}
Target Audience: ${targetAudience}
Description:`;

  const openAPIInformationsList = [];
  const roductDescriptionSEOFriendlyList = [];

  for (let i = 0; i < 3; i++) {
    const generatedProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.7, 0.2, 0.3, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = generatedProductDescription;

    openAPIInformationsList.push({ id, object, created, model });
    roductDescriptionSEOFriendlyList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'seo-friendly-product-description',
    prompt,
    openAPIInformationsList,
    roductDescriptionSEOFriendlyList
  );
  const userResponse = formatResponse(_id, 'seo-friendly-product-description', generatedContents);

  return userResponse;
};

const productReview = async (userId, { product, rating, comment }) => {
  const prompt = `Write Review from Comment for following Product

Product: ${removeSpaces(product)}
Rating: ${removeSpaces(rating)}
Comment: ${removeSpaces(comment)}
Review:`;

  let review;
  while (1) {
    review = await generateContentUsingGPT3('davinci', 200, prompt, 0.3, 0.2, 0.1, ['\n']);
    if (review.choices && review.choices[0].text.trim() !== '') {
      review.choices[0].text = review.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = review;
  const { _id, generatedContents } = await storeData(
    userId,
    'product-review',
    prompt,
    { id, object, created, model },
    choices[0].text
  );
  const userResponse = formatResponse(_id, 'product-review', generatedContents);

  return userResponse;
};

const generateProductName = async (userId, { productDescription, keywords }) => {
  const prompt = `This is a product name generator

Product description: A home milkshake maker
Seed words: fast, healthy, compact
Product names: HomeShaker, Fit Shaker, QuickShake, Shake Maker

Product description: A pair of shoes that can fit any foot size.
Seed words: adaptable, fit
Product names: CustomShoes, InstantFlex, SizingShoes, QuickFlex

Product description: ${removeSpaces(productDescription)}
Seed words: ${removeSpaces(keywords)}
Product names:`;

  const openAPIInformationsList = [];
  const generateProductNameList = [];

  for (let i = 0; i < 2; i++) {
    const productName = await generateContentUsingGPT3('davinci', 60, prompt, 0.5, 0, 0, ['\n', 'Product names:']);
    const { id, object, created, model, choices } = productName;

    openAPIInformationsList.push({ id, object, created, model });
    generateProductNameList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'product-name',
    prompt,
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
