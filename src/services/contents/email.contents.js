/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  storeData,
  formatResponse,
  processListContents,
} = require('../content.service');

const emailMarketingCampaignSubject = async (userId, { productDescription }) => {
  const userPrompt = `Product Description: ${removeSpaces(productDescription)}`;

  const prompt = `Examples of Marketing Email's persuasive Subject lines that can get click -
- Uh-oh, your prescription is expiring
- Free (Cool!) Clothes Alert
- The timer’s going off on your cart!
- What Did You Think? Write a Review.
- Important Weather Advisory
- 1,750 points for you. Valentine's flowers & more for them.
- Rock the color of the year
- Black Friday shoppers are the worst customers
- *Don't Open This Email*
- I got Botox—& THIS is what it looked like
- Zillow: "What Can You Afford?"
- As You Wish
- Google sees smartphone heroics in Oreo. It's The Daily Crunch.
- Not Cool, Guys
- DO NOT Commit These Instagram Atrocities
- Buffer has been hacked - here is what's going on
- Everything you wanted to know about email copy but were too afraid to ask
- Abra-cord-abra! Yeah, we said it.
- China Falls, Sleepy Unicorns, And The Deals Aren’t Bigger In Texas
- Hot freebie alert! 15 free gifts, you pick 5.
- Watch Out for This Amazon Phishing Scam.

Write 5 short persuasive Email Subject lines for following Product like above examples.
${userPrompt}

List of 6 Email Subject Lines -
-`;

  const marketingEmailSubject = await generateContentUsingGPT3('davinci', 100, prompt, 1, 0, 0, ['\n\n']);
  return processListContents(userId, 'email-marketing-campaign-subject', userPrompt, marketingEmailSubject);
};

const emailMarketingCampaignBody = async (userId, { productDescription, about, subjectLine }) => {
  const userPrompt = `Product Description: ${removeSpaces(productDescription)}
About: ${removeSpaces(about)}
Subject: ${removeSpaces(subjectLine)}`;

  const prompt = `Email Template Structure -
[Greeting],
[Email Body]
Thanks,
[Team Name]

Follow the above Email Template and write a small email marketing campaign that can stand out and persuade people -
${userPrompt}

Small Email Marketing Campaign:
`;

  const openAPIInformationsList = [];
  const emailMarketingCampaignBodyList = [];

  for (let i = 0; i < 3; i++) {
    const emailBody = await generateContentUsingGPT3('davinci-instruct-beta', 300, prompt, 1, 0.5, 0, ['\n\n\n', 'About:', 'Subject:']);
    const { id, object, created, model, choices } = emailBody;

    openAPIInformationsList.push({ id, object, created, model });
    emailMarketingCampaignBodyList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'email-marketing-campaign-body',
    userPrompt,
    openAPIInformationsList,
    emailMarketingCampaignBodyList
  );

  const userResponse = formatResponse(_id, 'email-marketing-campaign-body', generatedContents);

  return userResponse;
};

const emailBody = async (userId, { about, to, tone }) => {
  const userPrompt = `About: ${removeSpaces(about)}
To: ${removeSpaces(to)}
Tone: ${removeSpaces(tone)}`;

  const prompt = `Email Template - 
- Subject
- Email greeting,
- Body

Follow the Email Template and write Email Subject and Body in following tone.
${userPrompt}

Subject:`;

  const openAPIInformationsList = [];
  const emailBodyList = [];

  for (let i = 0; i < 1; i++) {
    const emailBodyText = await generateContentUsingGPT3('davinci-instruct-beta', 250, prompt, 0.9, 0, 0, ['\n\n\n', 'About:', 'Subject:']);
    const { id, object, created, model, choices } = emailBodyText;

    openAPIInformationsList.push({ id, object, created, model });
    emailBodyList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'email-body',
    userPrompt,
    openAPIInformationsList,
    emailBodyList
  );

  const userResponse = formatResponse(_id, 'email-body', generatedContents);

  return userResponse;
};

const emailSubjectsFromBody = async (userId, { emailBody }) => {
  const userPrompt = `Email Body: ${removeSpaces(emailBody)}`;

  const prompt = `Write email subject based on email body to increase email opening by less than 50 words.

${userPrompt}
Subject:`;

  const openAPIInformationsList = [];
  const emailSubjectsFromBodyList = [];

  for (let i = 0; i < 5; i++) {
    const emailSubjectFromBody = await generateContentUsingGPT3('davinci-instruct-beta', 20, prompt, 0.7, 1, 0, [
      '\n',
      'Subject:',
    ]);
    const { id, object, created, model, choices } = emailSubjectFromBody;

    openAPIInformationsList.push({ id, object, created, model });
    emailSubjectsFromBodyList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'email-subject-from-body',
    userPrompt,
    openAPIInformationsList,
    emailSubjectsFromBodyList
  );

  const userResponse = formatResponse(_id, 'email-subject-from-body', generatedContents);

  return userResponse;
};

module.exports = {
  emailMarketingCampaignSubject,
  emailMarketingCampaignBody,
  emailBody,
  emailSubjectsFromBody,
};
