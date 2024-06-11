/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const {
  generateContentWithModel,
  removeSpaces,
  storeData,
  formatResponse,
} = require('../content.service');

const emailMarketingCampaignSubject = async (userId, userEmail, { productDescription, numberOfSuggestions }) => {
  const userPrompt = `Product Description: ${removeSpaces(productDescription)}`;

  const prompt = `You are a professional email marketer. Your task is to generate persuasive and engaging subject lines for a marketing email campaign based on the given product description. Use your expertise to create subject lines that are likely to get clicks and increase email open rates.

Guidelines:
1. **Relevance:** Ensure the subject lines are directly related to the product.
2. **Engagement:** Create subject lines that capture the reader’s attention and encourage them to open the email.
3. **Clarity:** Keep the subject lines clear and concise.
4. **Persuasion:** Use persuasive language to entice the reader.
5. **Creativity:** Provide creative and unique subject lines that stand out.

Examples of Marketing Email's persuasive Subject lines:
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

${userPrompt}
-`;

  const openAPIInformationsList = [];
  const emailMarketingCampaignSubjectList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const marketingEmailSubject = await generateContentWithModel('gpt-4o', 100, prompt, 1, 0, 0, ['\n\n']);
    const { id, object, created, model, choices } = marketingEmailSubject;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('marketingEmailSubject.choices[0]:', choices[0]);
    console.log('marketingEmailSubject.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    emailMarketingCampaignSubjectList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'email-marketing-campaign-subject',
    userPrompt,
    openAPIInformationsList,
    emailMarketingCampaignSubjectList
  );

  const userResponse = formatResponse(_id, 'email-marketing-campaign-subject', generatedContents);

  return userResponse;
};

const emailMarketingCampaignBody = async (userId, userEmail, { productDescription, about, subjectLine, numberOfSuggestions }) => {
  const userPrompt = `Product Description: ${removeSpaces(productDescription)}
About: ${removeSpaces(about)}
Subject: ${removeSpaces(subjectLine)}`;

  const prompt = `You are a professional email marketer. Your task is to write a small email marketing campaign that can stand out and persuade people to take action. Follow the given structure and ensure the email is engaging, clear, and compelling.

Email Template Structure:
[Greeting],
[Email Body]
Thanks,
[Team Name]

Guidelines:
1. **Relevance:** Ensure the email content is directly related to the product and subject line.
2. **Engagement:** Create content that captures the reader’s interest and encourages them to take action.
3. **Clarity:** Keep the email clear and concise.
4. **Persuasion:** Use persuasive language to entice the reader.
5. **Call to Action:** Include a clear and compelling call to action.
6. **Professional Tone:** Maintain a professional tone throughout the email.

${userPrompt}

Small Email Marketing Campaign:
`;

  const openAPIInformationsList = [];
  const emailMarketingCampaignBodyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const emailBody = await generateContentWithModel('gpt-4o', 300, prompt, 1, 0.5, 0, ['\n\n\n', 'About:', 'Subject:']);
    const { id, object, created, model, choices } = emailBody;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('emailBody.choices[0]:', choices[0]);
    console.log('emailBody.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    emailMarketingCampaignBodyList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'email-marketing-campaign-body',
    userPrompt,
    openAPIInformationsList,
    emailMarketingCampaignBodyList
  );

  const userResponse = formatResponse(_id, 'email-marketing-campaign-body', generatedContents);

  return userResponse;
};

const emailBody = async (userId, userEmail, { about, to, tone, numberOfSuggestions }) => {
  const userPrompt = `About: ${removeSpaces(about)}
To: ${removeSpaces(to)}
Tone: ${removeSpaces(tone)}`;

  const prompt = `You are a professional email writer. Your task is to write an email subject and body based on the given details. Follow the given structure and ensure the email is engaging, clear, and appropriate for the intended tone and recipient.

Email Template:
- Subject
- Email greeting,
- Body

Guidelines:
1. **Relevance:** Ensure the email content is directly related to the given details.
2. **Engagement:** Create content that captures the reader’s interest.
3. **Clarity:** Keep the email clear and concise.
4. **Tone:** Ensure the email tone matches the specified tone.
5. **Professional Tone:** Maintain a professional tone throughout the email.

${userPrompt}

Subject:`;

  const openAPIInformationsList = [];
  const emailBodyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const emailBodyText = await generateContentWithModel('gpt-4o', 250, prompt, 0.9, 0, 0, ['\n\n\n', 'About:', 'Subject:']);
    const { id, object, created, model, choices } = emailBodyText;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('emailBodyText.choices[0]:', choices[0]);
    console.log('emailBodyText.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    emailBodyList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'email-body',
    userPrompt,
    openAPIInformationsList,
    emailBodyList
  );

  const userResponse = formatResponse(_id, 'email-body', generatedContents);

  return userResponse;
};

const emailSubjectsFromBody = async (userId, userEmail, { emailBody, numberOfSuggestions }) => {
  const userPrompt = `Email Body: ${removeSpaces(emailBody)}`;

  const prompt = `You are a professional email marketer. Your task is to write compelling subject lines based on the given email body to increase email opening rates. Ensure the subject lines are engaging, clear, and concise.

Guidelines:
1. **Relevance:** Ensure the subject lines are directly related to the email body content.
2. **Engagement:** Create subject lines that capture the reader’s attention and encourage them to open the email.
3. **Clarity:** Keep the subject lines clear and concise.
4. **Persuasion:** Use persuasive language to entice the reader.

${userPrompt}
Subject:`;

  const openAPIInformationsList = [];
  const emailSubjectsFromBodyList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const emailSubjectFromBody = await generateContentWithModel('gpt-4o', 20, prompt, 0.7, 1, 0, ['\n', 'Subject:']);
    const { id, object, created, model, choices } = emailSubjectFromBody;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('emailSubjectFromBody.choices[0]:', choices[0]);
    console.log('emailSubjectFromBody.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    emailSubjectsFromBodyList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
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
