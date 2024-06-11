/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentWithModel, storeData, formatResponse, removeSpaces } = require('../content.service');

const websiteShortDescription = async (userId, userEmail, { industryType, businessName, numberOfSuggestions }) => {
  const userPrompt = `Industry: ${removeSpaces(industryType)}
Business Name: ${removeSpaces(businessName)}`;

  const prompt = `Generate website short descriptions between 100 to 120 words. Ensure that the descriptions are engaging, informative, and reflect the unique qualities of the business.

Examples:
Industry: Software Firm
Business Name: Codephilics
Description: Codephilics builds products that help you grow your business more effectively. Whether you are working on your dream project, running a successful startup, or part of a Fortune 500 company, we provide the tools you need to leverage your dreams. Our solutions are designed to enhance productivity, drive growth, and ensure success.

Industry: Digital Marketing
Business Name: MarketMaster
Description: At MarketMaster, we specialize in creating innovative digital marketing strategies that drive results. Our team of experts is dedicated to helping businesses of all sizes enhance their online presence and achieve their marketing goals. From SEO to social media marketing, we offer a full range of services to meet your needs.

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const contentList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedContent = await generateContentWithModel('gpt-4o', 150, prompt, 0.7, 0.3, 0, ['\n', 'Description:']);
    const { id, object, created, model, choices } = generatedContent;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    contentList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-short-description',
    userPrompt,
    openAPIInformationsList,
    contentList
  );

  return formatResponse(_id, 'website-short-description', generatedContents);
};

const keywordsFromText = async (userId, userEmail, { primaryText, numberOfSuggestions }) => {
  const userPrompt = `Primary Text: ${removeSpaces(primaryText)}`;

  const prompt = `Generate a list of SEO keywords extracted from the given content. These keywords should be relevant and useful for optimization in search engines, SEO meta tags, or YouTube tags.

Examples:
Primary Text: Codephilics builds products that help you grow your business more effectively. We help you leverage your dreams whether you are working on your dream project, have a successful startup, or are part of a Fortune 500 company.
Keywords: Startup, Product Development, Business Growth, Technology Solutions, Innovation, Productivity Tools, Software Solutions, Business Success

${userPrompt}
Keywords:`;

  const openAPIInformationsList = [];
  const contentList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedContent = await generateContentWithModel('gpt-4o', 150, prompt, 0.7, 0.3, 0, ['\n', 'Keywords:']);
    const { id, object, created, model, choices } = generatedContent;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    contentList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-keywords-from-text',
    userPrompt,
    openAPIInformationsList,
    contentList
  );

  return formatResponse(_id, 'website-keywords-from-text', generatedContents);
};

const SEOFriendlyBlogIdeas = async (userId, userEmail, { content, desiredOutcome, industry, targetAudience, numberOfSuggestions }) => {
  const userPrompt = `Content: ${removeSpaces(content)}
Desired outcome: ${removeSpaces(desiredOutcome)}
Industry: ${removeSpaces(industry)}
Target audience: ${removeSpaces(targetAudience)}`;

  const prompt = `Generate SEO-friendly blog post headlines that are engaging and tailored to the given content, desired outcome, industry, and target audience.

Examples:
Content: Online marketing
Desired outcome: More sales
Industry: Advertising
Target audience: SEO beginners
Headlines:
- Get Rid of Low Rankings Once and For All
- How to Recover From Online Marketing Low Rankings
- 7 Little-Known Factors That Could Affect Your Online Marketing
- Why You Might Be Failing at Online Marketing

Content: Software agency
Desired outcome: More sales
Industry: Information technology
Target audience: CEO, CTO
Headlines:
- How Successful CEOs Build Software Agencies
- 9 Reasons Why Software Agencies Fail
- Tips for CEOs to Ensure Their Software Agency Survives

${userPrompt}
Headlines:`;

  const openAPIInformationsList = [];
  const contentList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedContent = await generateContentWithModel('gpt-4o', 150, prompt, 0.7, 0.3, 0, ['\n', 'Headlines:']);
    const { id, object, created, model, choices } = generatedContent;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    contentList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-seo-friendly-blog-ideas',
    userPrompt,
    openAPIInformationsList,
    contentList
  );

  return formatResponse(_id, 'website-seo-friendly-blog-ideas', generatedContents);
};

const landingPageHeadline = async (userId, userEmail, { businessType, numberOfSuggestions }) => {
  const userPrompt = `Product: ${removeSpaces(businessType)}`;

  const prompt = `Generate high-converting landing page headlines that compel users to pay for the service. The headlines should be clear, engaging, and reflect the unique value proposition of the product.

Examples:
Product: Website hosting platform which is fast and secure.
Headlines:
- The only website hosting platform you'll need!
- Worried about security?
- Everything you need for a successful website.
- Your one-stop-shop for hosting.
- It's time to make your website a masterpiece.
- A company you can trust with your business.

Product: Marketing Agency
Headlines:
- Let's start taking your business to new heights.
- Grow your business with a Marketing Agency.
- Make an impact with your marketing strategy.
- It's time to take your business to the next level.
- Let's start taking your business to new heights.

Product: A fintech company that replaces banks
Headlines:
- Banking made simple.
- The new way to bank.
- A fresh banking experience for today's customer.
- An easy way to get all the benefits of a bank, without any of the hassles.

${userPrompt}
Headlines:`;

  const openAPIInformationsList = [];
  const contentList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const generatedContent = await generateContentWithModel('gpt-4o', 150, prompt, 0.7, 0.3, 0, ['\n', 'Headlines:']);
    const { id, object, created, model, choices } = generatedContent;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    contentList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'website-landing-page-headline',
    userPrompt,
    openAPIInformationsList,
    contentList
  );

  return formatResponse(_id, 'website-landing-page-headline', generatedContents);
};

module.exports = {
  websiteShortDescription,
  keywordsFromText,
  SEOFriendlyBlogIdeas,
  landingPageHeadline,
};
