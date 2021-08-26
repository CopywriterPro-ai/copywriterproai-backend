/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const generateCatchyBusinessTaglines = async (userId, userEmail, { companyName, businessType }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(businessType)}`;

  const prompt = `Writer Catchy Business Taglines.

Company Name: Mastercard
Business Type: Financial services
Taglines: There are some things money can't buy. For everything else, there's MasterCard.

Company Name: M&M
Business Type: Chocolates, Food
Taglines: Melts in Your Mouth, Not in Your Hands

Company Name: Verizon
Business Type: wireless network operator
Taglines: Can You Hear Me Now? Good.

Company Name: Nike
Business Type:  footwear, apparel, equipment, accessories
Taglines:  Just Do It.

Company Name: Apple
Business Type: Designs, develops, and sells consumer electronics, computer software, and online services
Taglines: Think Different.

Company Name: BMW
Business Type: produces luxury vehicles and motorcycles
Taglines: Designed for Driving Pleasure.

Company Name: The New York Times
Business Type: daily newspaper, worldwide news
Taglines: All the News That's Fit to Print

${userPrompt}
Taglines:`;

  const openAPIInformationsList = [];
  const catchyBusinessTaglinesList = [];

  for (let i = 0; i < 5; i++) {
    const catchyBusinessTaglines = await generateContentUsingGPT3('davinci-instruct-beta', 20, prompt, 0.9, 0, 0, [
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
