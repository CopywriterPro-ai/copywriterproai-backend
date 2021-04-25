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
    const KeywordsFromText = await generateContentUsingGPT3('davinci', 500, prompt, 0.7, 0.3, 0, ['\n', 'Keywords:']);
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

const generateSEOFriendlyBlogIdeas = async (userId, { content, desiredOutcome, industry, targetAudience }) => {
  const prompt = `I want to generate headlines for my blog post

Content: Online marketing
Desired outcome: More sales
Industry: Advertising
Target audience: SEO beginners
Headlines: Get Rid of Low Rankings Once and For All, How to Recover From Online Marketing Low Rankings, 7 Little-Known Factors That Could Affect Your Online Marketing, Why You Might Be Failing at Online Marketing.
Content: Software agency
Desired outcome: More sales
Industry: Information technology
Target audience: CEO, CTO
Headlines: How Successful CEOs Build Software Agencies, 9 Reasons Why Software Agencies Fail, Tips for CEOs to Ensure Their Software Agency Survives.
Content: ${removeSpaces(content)}
Desired outcome: ${removeSpaces(desiredOutcome)}
Industry: ${removeSpaces(industry)}
Target audience: ${removeSpaces(targetAudience)}
Headlines:`;

  const openAPIInformationsList = [];
  const seoFriendlyBlogIdeasList = [];

  for (let i = 0; i < 3; i++) {
    const seoFriendlyBlogIdeas = await generateContentUsingGPT3('davinci', 500, prompt, 0.7, 0.3, 0, ['\n', 'Headlines:']);
    const { id, object, created, model, choices } = seoFriendlyBlogIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    seoFriendlyBlogIdeasList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'website-seo-friendly-blog-ideas',
    prompt,
    openAPIInformationsList,
    seoFriendlyBlogIdeasList
  );

  const userResponse = formatResponse(_id, 'website-seo-friendly-blog-ideas', generatedContents);

  return userResponse;
};

// TODO: Have to refactor and reimplement this method (Please don't use on prod)
const generateLandingPageHeadline = async (userId, { businessType }) => {
  const prompt = `Generate High-Converting Landing page headline ${businessType}
  Headlines:`;

  const openAPIInformationsList = [];
  const landingPageHeadlineList = [];

  for (let i = 0; i < 3; i++) {
    const seoFriendlyBlogIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 500, prompt, 0.7, 0.3, 0, [
      '\n',
      'Headlines:',
    ]);
    const { id, object, created, model, choices } = seoFriendlyBlogIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    landingPageHeadlineList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'website-landing-page-headline',
    prompt,
    openAPIInformationsList,
    landingPageHeadlineList
  );

  const userResponse = formatResponse(_id, 'website-landing-page-headline', generatedContents);

  return userResponse;
};

module.exports = {
  generateWebsiteShortDescription,
  generateKeywordsFromText,
  generateSEOFriendlyBlogIdeas,
  generateLandingPageHeadline,
};
