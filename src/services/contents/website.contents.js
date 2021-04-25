const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateWebsiteShortDescription = async (userId, { typeOfIndustry, businessName }) => {
  const prompt = `Generate website short descriptions between 100 to 120 words.

Industry: Software Firm
BusinessName: Codephilics
Description: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
Industry: ${typeOfIndustry}
BusinessName: ${businessName}
Description:`;

  const openAPIInformationsList = [];
  const websiteShortDescriptionList = [];

  for (let i = 0; i < 10; i++) {
    const websiteShortDescription = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 0.7, 0.3, 0, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = websiteShortDescription;

    openAPIInformationsList.push({ id, object, created, model });
    websiteShortDescriptionList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'website-short-description',
    prompt,
    openAPIInformationsList,
    websiteShortDescriptionList
  );

  const userResponse = formatResponse(_id, 'website-short-description', generatedContents);

  return userResponse;
};

const generateKeywordsFromText = async (userId, { primaryText }) => {
  const prompt = `Generate Keywords extracted from content for Optimization search engine, SEO meta tag, or youtube tags.

PrimaryText: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea,
Product Launch, Product Management, Product Marketing, Product Strategy, Product Development, Product Launch, Project Management, Consulting,
Digital Transformation, Innovation, Creativity
PrimaryText: ${primaryText}
Keywords:`;

  const openAPIInformationsList = [];
  const KeywordsFromTextList = [];

  for (let i = 0; i < 1; i++) {
    const KeywordsFromText = await generateContentUsingGPT3('davinci', 500, prompt, 0.7, 0.3, 0, ['Keywords:']);
    const { id, object, created, model, choices } = KeywordsFromText;

    openAPIInformationsList.push({ id, object, created, model });
    KeywordsFromTextList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'website-keywords-from-text',
    prompt,
    openAPIInformationsList,
    KeywordsFromTextList
  );

  const userResponse = formatResponse(_id, 'website-keywords-from-text', generatedContents);

  return userResponse;
};

module.exports = {
  generateWebsiteShortDescription,
  generateKeywordsFromText,
};
