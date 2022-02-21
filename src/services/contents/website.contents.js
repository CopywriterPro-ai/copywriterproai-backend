/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const websiteShortDescription = async (userId, userEmail, { industryType, businessName, numberOfSuggestions  }) => {
  const userPrompt = `Industry: ${removeSpaces(industryType)}
BusinessName: ${removeSpaces(businessName)}`;

  const prompt = `Generate website short descriptions between 100 to 120 words.

Industry: Software Firm
BusinessName: Codephilics
Description: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const websiteShortDescriptionList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const websiteShortDescription = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.7, 0.3, 0, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = websiteShortDescription;

    openAPIInformationsList.push({ id, object, created, model });
    websiteShortDescriptionList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-short-description',
    userPrompt,
    openAPIInformationsList,
    websiteShortDescriptionList
  );

  const userResponse = formatResponse(_id, 'website-short-description', generatedContents);

  return userResponse;
};

const keywordsFromText = async (userId, userEmail, { primaryText, numberOfSuggestions  }) => {
  const userPrompt = `Primary Text: ${removeSpaces(primaryText)}`;

  const prompt = `Generate Keywords extracted from content for Optimization search engine, SEO meta tag, or youtube tags.

Primary Text: Codephilics build products that let you grow your business more effectively. We help you to leverage your dreams whether you are working on your dream project, have a successful startup, or part of a Fortune 500.
Keywords: Startup, Product, Product Development, Product Management, Product Marketing, Product Strategy, Transformation, Idea,
Product Launch, Product Management, Product Marketing, Product Strategy, Product Development, Product Launch, Project Management, Consulting,
Digital Transformation, Innovation, Creativity
${userPrompt}
Keywords:`;

  const openAPIInformationsList = [];
  const KeywordsFromTextList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const KeywordsFromText = await generateContentUsingGPT3('davinci', 50, prompt, 0.7, 0.3, 0, ['\n', 'Keywords:']);
    const { id, object, created, model, choices } = KeywordsFromText;

    openAPIInformationsList.push({ id, object, created, model });
    KeywordsFromTextList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-keywords-from-text',
    userPrompt,
    openAPIInformationsList,
    KeywordsFromTextList
  );

  const userResponse = formatResponse(_id, 'website-keywords-from-text', generatedContents);

  return userResponse;
};

const SEOFriendlyBlogIdeas = async (userId, userEmail, { content, desiredOutcome, industry, targetAudience, numberOfSuggestions }) => {
  const userPrompt = `Content: ${removeSpaces(content)}
Desired outcome: ${removeSpaces(desiredOutcome)}
Industry: ${removeSpaces(industry)}
Target audience: ${removeSpaces(targetAudience)}`;

  const prompt = `I want to generate headlines for my blog post

Content: Online marketing
Desired outcome: More sales
Industry: Advertising
Target audience: SEO beginners
Headlines: Get Rid of Low Rankings Once and For All.\nHow to Recover From Online Marketing Low Rankings.\n7 Little-Known Factors That Could Affect Your Online Marketing.\n
Why You Might Be Failing at Online Marketing.
Content: Software agency
Desired outcome: More sales
Industry: Information technology
Target audience: CEO, CTO
Headlines: How Successful CEOs Build Software Agencies.\n9 Reasons Why Software Agencies Fail.\nTips for CEOs to Ensure Their Software Agency Survives.
${userPrompt}
Headlines:`;

  const openAPIInformationsList = [];
  const seoFriendlyBlogIdeasList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const seoFriendlyBlogIdeas = await generateContentUsingGPT3('davinci', 50, prompt, 0.7, 0.3, 0, ['\n', 'Headlines:']);
    const { id, object, created, model, choices } = seoFriendlyBlogIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    seoFriendlyBlogIdeasList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-seo-friendly-blog-ideas',
    userPrompt,
    openAPIInformationsList,
    seoFriendlyBlogIdeasList
  );

  const userResponse = formatResponse(_id, 'website-seo-friendly-blog-ideas', generatedContents);

  return userResponse;
};

const landingPageHeadline = async (userId, userEmail, { businessType, numberOfSuggestions }) => {
  const userPrompt = `Product: ${removeSpaces(businessType)}`;

  const prompt = `Generate High-Converting Landing page headline that will makes user to pay for the service

Product: Website hosting platform which fast, secure.
Headlines: The only website hosting platform you'll need!\nWorried about security?\nEverything you need for a successful website.\nYour one-stop-shop for hosting.\n
It's time to make your website a masterpiece.\nA company you can trust with your business.
Product: Marketing Agency
Headlines: Let's start taking your business to new heights.\nGrow your business with a Marketing Agency.\n
Make an impact with your marketing strategy.\nIt's time to take your business to the next level.\nLet's start taking your business to new heights.
Product: A fintech company that replaces bank
Headlines: Banking made simple.\nThe new way to bank.\nA fresh banking experience for today's customer.\nAn easy way to get all the benefits of a bank, without any of the hassles.
${userPrompt}
Headlines:`;

  const openAPIInformationsList = [];
  const landingPageHeadlineList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const seoFriendlyBlogIdeas = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.9, 1, 0, [
      '\n',
      'Headlines:',
    ]);
    const { id, object, created, model, choices } = seoFriendlyBlogIdeas;

    openAPIInformationsList.push({ id, object, created, model });
    landingPageHeadlineList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-landing-page-headline',
    userPrompt,
    openAPIInformationsList,
    landingPageHeadlineList
  );

  const userResponse = formatResponse(_id, 'website-landing-page-headline', generatedContents);

  return userResponse;
};

module.exports = {
  websiteShortDescription,
  keywordsFromText,
  SEOFriendlyBlogIdeas,
  landingPageHeadline,
};
