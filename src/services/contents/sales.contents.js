/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentWithModel, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateSalesCopy = async (userId, userEmail, taskType, { productName, productDescription, numberOfSuggestions }, template) => {
  const cleanedProductName = removeSpaces(productName);
  const cleanedProductDescription = removeSpaces(productDescription);

  const userPrompt = `Product Name: ${cleanedProductName}
Product Description: ${cleanedProductDescription}`;

  const prompt = `${template}

Product Description: ${cleanedProductName}, ${cleanedProductDescription}
# Problem:`;

  const openAPIInformationsList = [];
  const salesCopyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const salesCopy = await generateContentWithModel('gpt-4o', 200, prompt, 1, 0, 0, ['\n\n', 'Product Description:']);
    const { id, object, created, model, choices } = salesCopy;

    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    salesCopyList.push(`# Problem: ${choices[0].message.content.trim()}`);
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    taskType,
    userPrompt,
    openAPIInformationsList,
    salesCopyList
  );

  return formatResponse(_id, taskType, generatedContents);
};

const problemAgitateSolution = async (userId, userEmail, params) => {
  const template = `You are a professional copywriter. Your task is to write engaging and lead generating PAS (Problem, Agitate, Solution) sales copy for the given product. Highlight the problem, agitate (exaggerate the problem), and then provide a solution in a persuasive manner.

Examples:
Product Description: Tempurpedic mattress.
# Problem: When was the last time you had a really good night’s sleep? You know, the kind of sleep where you wake up feeling refreshed and genuinely excited about getting out of bed?
# Agitate: A bad night’s sleep can leave you feeling like someone packed your skull with cotton wool. You can’t concentrate, you feel irritable, and no amount of coffee will clear the fog in your brain.
# Solution: If this is a regular occurrence for you, you need to know about our new Tempurpedic mattress. You won’t be sleeping. You’ll be floating, with perfect support all night long.`;

  return generateSalesCopy(userId, userEmail, 'problem-agitate-solution', params, template);
};

const problemAgitateSolutionOutcome = async (userId, userEmail, params) => {
  const template = `You are a professional copywriter. Your task is to write engaging and lead generating PASO (Problem, Agitate, Solution, Outcome) sales copy for the given product. Highlight the problem, agitate (exaggerate the problem), provide a solution, and describe the positive outcome in a persuasive manner.

Examples:
Product Description: UNstuck strategy session, a consultation service.
# Problem: Finding the perfect hotel can be stressful. Almost too stressful to bother. You read articles on SEO and email marketing, attracting website traffic, effective design, and conversion strategies. They make sense on paper but applying those tactics to your business is another matter.
# Agitate: Hunting down all your options, working out how far away the local hotspots are and reading reviews from other ‘guests’. Then, of course, there is the price. And all within your lunch hour? Impossible!
# Solution: Not impossible. Awesomehotels.com makes finding the best hotel deals quick and easy. We compare hundreds of travel sites for you so you get the best hotel deal available. And all faster than you can say “ham, cheese, and pickle on rye”.
# Outcome: In just a few clicks, you’ll have your ideal accommodation secured – at the best price – leaving you free to daydream about how to treat yourself with the money you just saved.`;

  return generateSalesCopy(userId, userEmail, 'problem-agitate-solution-outcome', params, template);
};

const attentionInterestDesireAction = async (userId, userEmail, params) => {
  const template = `You are a professional copywriter. Your task is to write engaging and lead generating AIDA (Attention, Interest, Desire, Action) sales copy for the given product. Start with grabbing attention, then build interest, create desire, and end with a call to action.

Examples:
Product Description: Writesonic makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.
# Attention: Are you tired of having to hire expensive copywriters to write your content?
# Interest: We’re a team of marketers that are passionate about helping businesses succeed. We created Writesonic to help businesses scale their marketing efforts without breaking the bank.
# Desire: You want to get more traffic and sales, but you don’t have the time or budget for it. Let us help you with our AI-powered content marketing tool! Our copywriting software will whip up high-quality content for your landing pages, blog posts, and ads in minutes!
# Action: Click this ad now so we can schedule an introductory call where we'll discuss what it is exactly that will make you feel more successful online!`;

  return generateSalesCopy(userId, userEmail, 'attention-interest-desire-action', params, template);
};

module.exports = {
  problemAgitateSolution,
  problemAgitateSolutionOutcome,
  attentionInterestDesireAction,
};
