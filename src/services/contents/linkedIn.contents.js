/* eslint-disable no-await-in-loop */
const {
  generateContentUsingGPT3,
  removeSpaces,
  processListContents,
  storeData,
  formatResponse,
} = require('../content.service');

const linkedinAdTexts = async (userId, { companyName, businessType, benefits }) => {
  const userPrompt = `Company Name: ${removeSpaces(companyName)}
Business Type: ${removeSpaces(businessType)}
Benefits: ${removeSpaces(benefits)}`;

  const prompt = `Write LinkedIn ads Description upto 200 characters:

Company Name: Tableau Software
Business Type: Software, Information Technology
Benefits: $1.3 million to help Community Solutions eliminate veteran and chronic homelessness in 50 U.S. communities
Description: We're proud to announce we're committing over $1.3 million to help Community Solutions eliminate veteran and chronic homelessness in 50 U.S. communities! Learn more: https://lnkd.in/e2D8h-p

Company Name: JetBlue Airways
Business Type: Airline, travel, airline tickets, flights
Benefits: 20% off base airfare
Description: Get a jump on upcoming business travel with up to 20% off base airfare to all U.S. cities. Only for Blue Inc. members, only when you book by 5/23 for travel 5/22 - 6/21/18.

Company Name: Toptal
Business Type: Freelancer platform, connecting businesses with software engineers, designers, finance experts, product managers, and project managers
Benefits: remote company, remote work culture, flexibility workspace
Description: The modern workforce demands greater flexibility and variety, so top-tier professionals are turning to agile work to advance their knowledge, expertise, and careers. Explore more here:

Company Name: Visa
Business Type: Financial services company
Benefits: Supporting Female Entrepreneurs
Description: We're celebrating the unprecedented numbers of women starting businesses around the world by launching a new competition, the Visa Everywhere Initiative: Women's Global Edition. Learn more and apply for the chance to win $100,000: https://vi.sa/2J4DGOA

Company Name: DESIGN PICKLE
Business Type: UI/UX, Graphic Design
Benefits: Experienced UI/UX and Graphic Designer, professional UI/UX and Graphic Designer
Description: Need Graphic Design Help? In just a few clicks, you can scale your creative output by hiring a Design Pickle Pro designer.\\n✓ Hand-Picked Ego-Free Professional Graphic Designers\\\\n✓ No Overhead Costs\\\\n✓ Always Available - No PTO, Emergencies, or Sick Days\\\\n✓ Same-Day Revisions\\\\n✓ Unlimited Graphic Design Help

${userPrompt}
Description:`;

  const openAPIInformationsList = [];
  const linkedinAdTextsList = [];

  for (let i = 0; i < 5; i++) {
    const adTexts = await generateContentUsingGPT3('davinci', 100, prompt, 0.8, 0.2, 0.3, [
      '\n',
      'Description:',
    ]);
    const { id, object, created, model, choices } = adTexts;

    openAPIInformationsList.push({ id, object, created, model });
    linkedinAdTextsList.push(choices[0].text.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    'linkedin-ad-texts',
    userPrompt,
    openAPIInformationsList,
    linkedinAdTextsList
  );

  const userResponse = formatResponse(_id, 'linkedin-ad-texts', generatedContents);

  return userResponse;
};

const generateLinkedInSummary = async (userId, { profession, skills }) => {
  const userPrompt = `Profession: ${removeSpaces(profession)}
Skills: ${removeSpaces(skills)}`;

  const professionalHeadline = `${profession} + ', +${skills}`;
  const prompt = `Generate LinkedIn profile summary according to Harvard career experts

Professional headline: Research Scientist, Ph.D. Candidate, Data Analytics, Biotech, Pharma
Summary: I’m a research scientist working to better understand how neural activity motivates and shapes human behavior. My expertise includes project design and management, data analysis and interpretation, and the development and implementation of research tools. I enjoy generating new ideas and devising feasible solutions to broadly relevant problems. My colleagues would describe me as a driven, resourceful individual who maintains a positive, proactive attitude when faced with adversity. Currently, I’m seeking opportunities that will allow me to develop and promote technologies that benefit human health. Specific fields of interest include data analytics, biotechnology, and pharmaceuticals. Specialties: Research, Data Analytics, Biotech, Experiment experts.

Professional headline: Software Engineer, Product Manager, Lead Software Developer, Software Engineer Manager, Machine Learning Expert
Summary: I am a software engineer, product manager, and lead software developer focused on building quality products with modern and scalable technologies. I have a proven track record of engineering excellence in the areas of software development, product management, and technology management. I am skilled at hands-on development, team leadership, mentoring, and production level software engineering. I am a lifelong learner and accomplished engineer who is adept at translating business requirements into technical solutions.
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
    userPrompt,
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
