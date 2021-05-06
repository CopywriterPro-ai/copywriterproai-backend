const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const linkedinAdTexts = async (userId, { platformType, context }) => {
  const prompt = `Generate LinkedIn catchy Marketing text for following platform

Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}
List of 5 Marketing text:
-`;

  const adTexts = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0.8, 0.2, 0.3, ['\n\n']);
  return processListContents(userId, 'linkedin-ad-texts', prompt, adTexts);
};

const generateLinkedInSummary = async (userId, { name, profession, skills }) => {
  const professionalHeadline = `${profession} + ', +${skills}`;
  const prompt = `Generate LinkedIn profile summary according to Harvard career experts

Name: Jessica Yan
Professional headline: Research Scientist, Ph.D. Candidate, Data Analytics, Biotech, Pharma
Summary: I’m a research scientist working to better understand how neural activity motivates and shapes human behavior. My expertise includes project design and management, data analysis and interpretation, and the development and implementation of research tools. I enjoy generating new ideas and devising feasible solutions to broadly relevant problems. My colleagues would describe me as a driven, resourceful individual who maintains a positive, proactive attitude when faced with adversity. Currently, I’m seeking opportunities that will allow me to develop and promote technologies that benefit human health. Specific fields of interest include data analytics, biotechnology, and pharmaceuticals. Specialties: Research, Data Analytics, Biotech, Experiment experts.

Name: Nafis Faysal
Professional headline: Software Engineer, Product Manager, Lead Software Developer, Software Engineer Manager, Machine Learning Expert
Summary: I am a software engineer, product manager, and lead software developer focused on building quality products with modern and scalable technologies. I have a proven track record of engineering excellence in the areas of software development, product management, and technology management. I am skilled at hands-on development, team leadership, mentoring, and production level software engineering. I am a lifelong learner and accomplished engineer who is adept at translating business requirements into technical solutions.
Name: ${removeSpaces(name)}
Professional headline: ${removeSpaces(professionalHeadline)}
Summary:`;

  const openAPIInformationsList = [];
  const generateLinkedInSummaryList = [];

  for (let i = 0; i < 3; i++) {
    const linkedInSummary = await generateContentUsingGPT3('davinci-instruct-beta', 400, prompt, 0.7, 0, 0, [
      '\n',
      'Summary:',
    ]);
    const { id, object, created, model, choices } = linkedInSummary;

    openAPIInformationsList.push({ id, object, created, model });
    generateLinkedInSummaryList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'linkedin-summary',
    prompt,
    openAPIInformationsList,
    generateLinkedInSummaryList
  );

  const userResponse = formatResponse(_id, 'linkedin-summary', generatedContents);

  return userResponse;
};

module.exports = {
  linkedinAdTexts,
  generateLinkedInSummary,
};
