/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const problemAgitateSolution = async (userId, { productName, productDescription }) => {
  const cleanedProductName = removeSpaces(productName);
  const cleanedProductDescription = removeSpaces(productDescription);

  const userPrompt = `Product Name: ${cleanedProductName}
Product Description: ${cleanedProductDescription}`;

  const prompt = `Write engaging and lead generating PAS (Problem, Agitate (Exaggerate the Problem), Solution) sales copy for Product Description -

Product Description: Tempurpedic mattress.

# Problem: When was the last time you had a really good night’s sleep? You know the kind of sleep where you wake up feeling refreshed and genuinely excited about getting out of bed?
# Exaggerate the Problem: A bad night’s sleep can leave you feeling like someone packed your skull with cotton wool. You can’t concentrate, you feel irritable and no amount of coffee will clear the fog in your brain.
# Solution: If this is a regular occurrence for you, you need to know about our new Tempurpedic mattress. You won’t be sleeping. You’ll be floating, with perfect support all night long.

Product Description: ${cleanedProductName}, ${cleanedProductDescription}

# Problem:`;

  const openAPIInformationsList = [];
  const problemAgitateSolutionList = [];

  for (let i = 0; i < 3; i++) {
    const pasSalesCopy = await generateContentUsingGPT3('davinci-instruct-beta', 150, prompt, 1, 0, 0, [
      '\n\n',
      'Product Description:',
    ]);
    const { id, object, created, model, choices } = pasSalesCopy;

    openAPIInformationsList.push({ id, object, created, model });
    choices[0].text = choices[0].text.replace('Exaggerate the Problem', 'Agitate');
    choices[0].text = choices[0].text.replace('Exaggerate the problem', 'Agitate');

    problemAgitateSolutionList.push(`# Problem: ${choices[0].text.trim()}`);
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'problem-agitate-solution',
    userPrompt,
    openAPIInformationsList,
    problemAgitateSolutionList
  );

  const userResponse = formatResponse(_id, 'problem-agitate-solution', generatedContents);

  return userResponse;
};

const problemAgitateSolutionOutcome = async (userId, { productName, productDescription }) => {
  const cleanedProductName = removeSpaces(productName);
  const cleanedProductDescription = removeSpaces(productDescription);

  const userPrompt = `Product Name: ${cleanedProductName}
Product Description: ${cleanedProductDescription}`;

  const prompt = `Write engaging and lead generating PASO (Problem, Agitate (Exaggerate the Problem), Solution, Outcome) sales copy for Product Description -

Product Description: UNstuck strategy session, a consultation service.

# Problem: Finding the perfect hotel can be stressful. Almost too stressful to bother. You read articles on SEO and email marketing, attracting website traffic, effective design and conversion strategies. They make sense on paper but applying those tactics to your business is another matter.
# Exaggerate the Problem: Hunting down all your options, working out how far away the local hotspots are and reading reviews from other ‘guests’. Then, of course, there is the price. And all within your lunch hour? Impossible!
# Solution: Not impossible. Awesomehotels.com makes finding the best hotel deals quick and easy. We compare hundreds of travel sites for you so you get the best hotel deal available. And all faster than you can say “ham, cheese and pickle on rye”.
# Outcome: In just a few clicks, you’ll have your ideal accommodation secured – at the best price – leaving you free to daydream about how to treat yourself with the money you just saved.

Product Description: ${cleanedProductName}, ${cleanedProductDescription}

# Problem:`;

  const openAPIInformationsList = [];
  const problemAgitateSolutionOutcomeList = [];

  for (let i = 0; i < 3; i++) {
    const pasoSalesCopy = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 1, 0, 0, [
      '\n\n',
      'Product Description:',
    ]);
    const { id, object, created, model, choices } = pasoSalesCopy;

    openAPIInformationsList.push({ id, object, created, model });
    choices[0].text = choices[0].text.replace('Exaggerate the Problem', 'Agitate');
    choices[0].text = choices[0].text.replace('Exaggerate the problem', 'Agitate');

    problemAgitateSolutionOutcomeList.push(`# Problem: ${choices[0].text.trim()}`);
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'problem-agitate-solution-outcome',
    userPrompt,
    openAPIInformationsList,
    problemAgitateSolutionOutcomeList
  );

  const userResponse = formatResponse(_id, 'problem-agitate-solution-outcome', generatedContents);

  return userResponse;
};

const attentionInterestDesireAction = async (userId, { productName, productDescription }) => {
  const cleanedProductName = removeSpaces(productName);
  const cleanedProductDescription = removeSpaces(productDescription);

  const userPrompt = `Product Name: ${cleanedProductName}
Product Description: ${cleanedProductDescription}`;

  const prompt = `Write engaging and lead generating AIDA (Attention (grab attention with question), Interest, Desire, Action) sales copy for Product Description -

Product Description: Writesonic makes it super easy and fast for you to compose high-performing landing pages, product descriptions, ads, and blog posts in seconds.

# Attention: Are you tired of having to hire expensive copywriters to write your content?
# Interest: We’re a team of marketers that are passionate about helping businesses succeed. We created Writesonic to help businesses scale their marketing efforts without breaking the bank.
# Desire: You want to get more traffic and sales, but you don’t have the time or budget for it. Let us help you with our AI-powered content marketing tool! Our copywriting software will whip up high-quality content for your landing pages, blog posts and ads in minutes!
# Action: Click this ad now so we can schedule an introductory call where we'll discuss what it is exactly that will make you feel more successful online!

Product Description: ${cleanedProductName}, ${cleanedProductDescription}

# Attention:`;

  const openAPIInformationsList = [];
  const attentionInterestDesireActionList = [];

  for (let i = 0; i < 3; i++) {
    const aidaSalesCopy = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 1, 0, 0, [
      '\n\n',
      'Product Description:',
    ]);
    const { id, object, created, model, choices } = aidaSalesCopy;

    openAPIInformationsList.push({ id, object, created, model });
    attentionInterestDesireActionList.push(`# Attention: ${choices[0].text.trim()}`);
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'attention-interest-desire-action',
    userPrompt,
    openAPIInformationsList,
    attentionInterestDesireActionList
  );

  const userResponse = formatResponse(_id, 'attention-interest-desire-action', generatedContents);

  return userResponse;
};

module.exports = {
  problemAgitateSolution,
  problemAgitateSolutionOutcome,
  attentionInterestDesireAction,
};
