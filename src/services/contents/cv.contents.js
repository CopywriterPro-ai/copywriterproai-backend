const { generateContentUsingGPT4, storeData, formatResponse, removeSpaces } = require('../content.service');

const generateCVSummary = async (userId, userEmail, { yourJobTitle, yearsOfExperience, keyAchievements, numberOfSuggestions }) => {
  const userPrompt = `Job Title: ${removeSpaces(yourJobTitle)}
Years Of Experience: ${yearsOfExperience}
Key Achievements: ${removeSpaces(keyAchievements)}`;

  const prompt = `You are a professional CV writer with expertise in crafting compelling and concise resume summaries. Your task is to write a resume summary based on the given job title, years of experience, and key achievements. Use your expertise to create an engaging, professional, and impactful summary that highlights the individual's strengths and achievements.

Guidelines:
1. **Relevance:** Ensure the summary is directly related to the job title and highlights relevant experience.
2. **Conciseness:** Keep the summary brief and to the point, ideally within 3-4 sentences.
3. **Achievements:** Clearly mention key achievements and their impact.
4. **Clarity:** Ensure the summary is easy to read and understand.
5. **Engagement:** Write in a way that captures the attention of hiring managers and recruiters.
6. **Professional Tone:** Maintain a professional tone throughout the summary.

Example:
Job Title: Data Analyst
Years Of Experience: 6
Key Achievements: reduced operating costs by over 20%, saved upwards of USD 500,000 a year
Summary: Disciplined and insightful Data Analyst with 6 years of experience analyzing business processes. Eager to leverage big data interpreting and visualizing skills to drive growth and boost sales results. In current role, identified a major bottleneck, reduced operating costs by over 20%, and saved upwards of USD 500,000 a year.

Job Title: Software Developer
Years Of Experience: 8
Key Achievements: led development of a new e-commerce platform that increased sales by 30%, implemented CI/CD pipelines reducing deployment time by 50%
Summary: Highly skilled Software Developer with 8 years of experience in full-stack development. Proven track record in leading development projects from concept to completion. Successfully led the development of a new e-commerce platform that increased sales by 30%. Implemented CI/CD pipelines reducing deployment time by 50%, enhancing operational efficiency.

${userPrompt}
Summary:`;

  const openAPIInformationsList = [];
  const generateCVSummaryList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const cvSummary = await generateContentUsingGPT4('gpt-4o', 200, prompt, 0.7, 0, 0, ['\n', 'Summary:']);
    const { id, object, created, model, choices } = cvSummary;

    openAPIInformationsList.push({ id, object, created, model });
    generateCVSummaryList.push(choices[0].text.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
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
