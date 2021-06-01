const { generateContentUsingGPT3, storeData, formatResponse, removeSpaces } = require('../content.service');

const generateCVSummary = async (userId, { yourJobTitle, yearsOfExperience, employerName, keyAchievements }) => {
  const userPrompt = `Job Title: ${removeSpaces(yourJobTitle)}
Years Of Experience: ${removeSpaces(yearsOfExperience)}
Employer Name: ${removeSpaces(employerName)}
Key Achievements: ${removeSpaces(keyAchievements)}`;

  const prompt = `
Writer resume summary:

Job Title: Data Analytics
Years Of Experience: 6
Key Achievements: reduced operating costs by over 20%, saved upwards of USD 500,000 a year
Summary: Disciplined and insightful Data Analytics with 6 years of experience analyzing business processes. Eager to leverage big data interpreting and visualizing skills to drive growth and boost sales results. In current role, identified a major bottleneck, reduced operating costs by over 20%, and saved upwards of USD 500,000 a year.

${userPrompt}
Summary:`;

  const openAPIInformationsList = [];
  const generateCVSummaryList = [];

  for (let i = 0; i < 3; i++) {
    const cvSummary = await generateContentUsingGPT3('davinci-instruct-beta', 200, prompt, 0.7, 0, 0, ['\n', 'Summary:']);
    const { id, object, created, model, choices } = cvSummary;

    openAPIInformationsList.push({ id, object, created, model });
    generateCVSummaryList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'cv-summary',
    userPrompt,
    openAPIInformationsList,
    generateCVSummaryList
  );

  const userResponse = formatResponse(_id, 'cv-summary', generatedContents);

  return userResponse;
};

module.exports = {
  generateCVSummary,
};
