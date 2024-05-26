/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT4, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateCatchyBusinessTaglines = async (userId, userEmail, { companyName, businessType, numberOfSuggestions }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(businessType)}`;

  const prompt = `You are a creative copywriter with expertise in crafting memorable and impactful business taglines. Your task is to generate catchy business taglines for the given company. Use your expertise to create engaging, unique, and memorable taglines that effectively communicate the brand's message and resonate with the target audience.

Guidelines:
1. **Relevance:** Ensure each tagline is directly related to the company and its business type.
2. **Memorability:** Create taglines that are easy to remember and repeat.
3. **Brand Message:** Clearly convey the brand’s message and values.
4. **Brevity:** Keep taglines short and to the point.
5. **Uniqueness:** Ensure each tagline stands out from the competition.
6. **Emotional Appeal:** Use words that evoke emotions and connect with the audience.

Examples:
Company Name: Mastercard
Business Type: Financial services
Taglines: There are some things money can't buy. For everything else, there's MasterCard.

Company Name: M&M
Business Type: Chocolates, Food
Taglines: Melts in Your Mouth, Not in Your Hands.

Company Name: Verizon
Business Type: Wireless network operator
Taglines: Can You Hear Me Now? Good.

Company Name: Nike
Business Type: Footwear, apparel, equipment, accessories
Taglines: Just Do It.

Company Name: Apple
Business Type: Designs, develops, and sells consumer electronics, computer software, and online services
Taglines: Think Different.

Company Name: BMW
Business Type: Produces luxury vehicles and motorcycles
Taglines: Designed for Driving Pleasure.

Company Name: The New York Times
Business Type: Daily newspaper, worldwide news
Taglines: All the News That's Fit to Print.

${userPrompt}
Taglines:`;

  const openAPIInformationsList = [];
  const catchyBusinessTaglinesList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const catchyBusinessTaglines = await generateContentUsingGPT4('gpt-4o', 20, prompt, 0.9, 0, 0, [
      '\n',
      'Taglines:',
    ]);
    const { id, object, created, model, choices } = catchyBusinessTaglines;

    openAPIInformationsList.push({ id, object, created, model });
    catchyBusinessTaglinesList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'catchy-business-taglines',
    userPrompt,
    openAPIInformationsList,
    catchyBusinessTaglinesList
  );

  const userResponse = formatResponse(_id, 'catchy-business-taglines', generatedContents);

  return userResponse;
};

module.exports = {
  generateCatchyBusinessTaglines,
};
