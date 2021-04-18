/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const productDescription = async (userId, { productName, type, audience, benefits }) => {
  const prompt = `Write Product description for following Product details
"""
Name: ${removeSpaces(productName)}
Type: ${removeSpaces(type)}
Audience: ${removeSpaces(audience)}
Benefits: ${removeSpaces(benefits)}
Description:
`;

  const openAPIInformationsList = [];
  const productDescriptionsList = [];

  for (let i = 0; i < 5; i++) {
    const generatedProductDescription = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.8, 0.2, 0.3, [
      '"""',
      '\n\n',
    ]);
    const { id, object, created, model, choices } = generatedProductDescription;

    openAPIInformationsList.push({ id, object, created, model });
    productDescriptionsList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    'product-description',
    prompt,
    openAPIInformationsList,
    productDescriptionsList
  );
  const userResponse = formatResponse(_id, 'product-description', generatedContents);

  return userResponse;
};

const makeProductDescriptionSEOFriendly = async (userId, { userText }) => {
  const prompt = `Make the following Text SEO-friendly and engaging.

Text: ${removeSpaces(userText)}
New Text:`;

  let SEOFriendlyProductDescription;
  while (1) {
    SEOFriendlyProductDescription = await generateContentUsingGPT3('davinci', 500, prompt, 0.9, 0.2, 0.3, ['\n']);
    if (
      SEOFriendlyProductDescription.choices &&
      SEOFriendlyProductDescription.choices[0].text.trim() !== '' &&
      SEOFriendlyProductDescription.choices[0].text.trim() !== removeSpaces(userText)
    ) {
      SEOFriendlyProductDescription.choices[0].text = SEOFriendlyProductDescription.choices[0].text.trim();
      break;
    }
  }
  const { id, object, created, model, choices } = SEOFriendlyProductDescription;
  const { _id, generatedContents } = await storeData(
    userId,
    'seo-friendly-product-description',
    prompt,
    { id, object, created, model },
    choices[0].text
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

module.exports = {
  productDescription,
  makeProductDescriptionSEOFriendly,
  productReview,
};
