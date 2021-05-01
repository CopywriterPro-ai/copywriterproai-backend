const { generateContentUsingGPT3, removeSpaces, storeData, formatResponse } = require('../content.service');

const emailSubjectsFromBody = async (userId, { emailBody }) => {
  const prompt = `Write email subject based on email body to increase email opening by less than 50 words.

emailBody: ${removeSpaces(emailBody)}
Subject:`;

  const openAPIInformationsList = [];
  const emailSubjectsFromBodyList = [];

  for (let i = 0; i < 5; i++) {
    const emailSubjectFromBody = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.7, 1, 0, [
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
    prompt,
    openAPIInformationsList,
    emailSubjectsFromBodyList
  );

  const userResponse = formatResponse(_id, 'email-subject-from-body', generatedContents);

  return userResponse;
};

module.exports = {
  emailSubjectsFromBody,
};
