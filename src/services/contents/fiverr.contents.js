/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT4, removeSpaces, storeData, formatResponse } = require('../content.service');

const profileDescription = async (userId, userEmail, { profession, experience, numberOfSuggestions }) => {
  const userPrompt = `PROFESSION: ${removeSpaces(profession)}
EXPERIENCE: ${removeSpaces(experience)}`;

  const prompt = `You are an expert in creating compelling Fiverr profile descriptions. Your task is to write a profile description that grabs the client's attention and highlights the individual's skills, experience, and unique selling points.

Guidelines:
1. **Relevance:** Ensure the description is relevant to the profession and experience.
2. **Engagement:** Create a description that captures the reader’s interest.
3. **Clarity:** Ensure the text is clear and concise.
4. **Persuasion:** Use persuasive language to highlight the individual's strengths.
5. **Professional Tone:** Maintain a professional tone throughout the description.

Examples:
PROFESSION: Voice Actress
EXPERIENCE: 17+ years
PROFILE DESCRIPTION:
I am a Voice Actress with over 17 years of experience in everything from video games to phone systems to explainer videos to children's books. I am originally from the South East of England and have a natural British accent, as well as a Standard American accent from living in the US for 19 years. I have completed over 55,000 projects and counting!

PROFESSION: Copywriter
EXPERIENCE: 10 years
PROFILE DESCRIPTION:
I'm an award-winning marketing writer with 10 years of experience creating engaging and compelling sales, ad, web, and brand copy. From Amazon listings to personal websites, my mission is to ensure that each of my clients reaches the success they deserve. Let me help you achieve your goals with top-notch copy that converts.

PROFESSION: Graphic Designer
EXPERIENCE: 8 years
PROFILE DESCRIPTION:
As a seasoned Graphic Designer with 8 years of experience, I specialize in creating visually stunning and effective designs for various platforms. Whether you need a new logo, website design, or social media graphics, I have the skills and creativity to bring your vision to life. Let's work together to create something amazing!

PROFESSION: SEO Specialist
EXPERIENCE: 5 years
PROFILE DESCRIPTION:
With 5 years of experience in SEO, I have helped numerous businesses improve their online visibility and drive organic traffic. My expertise includes keyword research, on-page optimization, and link building. I am dedicated to helping your business achieve higher search engine rankings and increased website traffic. Let's take your online presence to the next level!

${userPrompt}
PROFILE DESCRIPTION:`;

  const openAPIInformationsList = [];
  const profileDescriptionsList = [];

  while (numberOfSuggestions--) {
    const profileDescriptions = await generateContentUsingGPT4('gpt-4o', 150, prompt, 1.0, 1.0, 1.0, ['\n\n']);
    const { id, object, created, model, choices } = profileDescriptions;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    profileDescriptionsList.push(choices[0].message.content.trim());
  }

  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'fiverr-profile-description',
    userPrompt,
    openAPIInformationsList,
    profileDescriptionsList
  );
  const userResponse = formatResponse(_id, 'fiverr-profile-description', generatedContents);

  return userResponse;
};

const generateFiverrCategoriesHeadline = async (userId, userEmail, { categoriesName }) => {
  const userPrompt = `Categories Name: ${removeSpaces(categoriesName)}`;

  const prompt = `You are an expert in creating catchy and engaging Fiverr gig headlines. Your task is to write headlines based on the given categories name that attract potential clients and clearly convey the service being offered.

Guidelines:
1. **Catchiness:** Ensure the headlines are catchy and grab attention.
2. **Clarity:** Ensure the headlines clearly convey the service being offered.
3. **Relevance:** Ensure the headlines are relevant to the categories name.
4. **Professional Tone:** Maintain a professional tone throughout the headline.
5. **Brevity:** Keep the headlines concise and to the point.

Examples:
- I will design 5 modern minimalist logos
- I will create a custom video intro
- I will design a creative 3D logo in 24hrs with full copyrights
- I will design professional podcast cover art and iTunes podcast logo
- I will proofread and correct your Spanish texts within 72 hours
- I will mix and master your music, including djent, prog, metal, rock, and punk
- I will mix, master, and pitch correct your single or album
- I will mix and master your music to sound amazing

${userPrompt}
Headline:`;

  const openAPIInformationsList = [];
  const fiverrCategoriesHeadlineList = [];

  for (let i = 0; i < 5; i++) {
    const catchyBusinessTaglines = await generateContentUsingGPT4('gpt-4o', 20, prompt, 0.9, 0, 0, ['\n', 'Headline:']);
    const { id, object, created, model, choices } = catchyBusinessTaglines;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('choices[0]:', choices[0]);
    console.log('choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    fiverrCategoriesHeadlineList.push(choices[0].message.content.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'fiverr-categories-headline',
    userPrompt,
    openAPIInformationsList,
    fiverrCategoriesHeadlineList
  );

  const userResponse = formatResponse(_id, 'fiverr-categories-headline', generatedContents);

  return userResponse;
};

module.exports = {
  profileDescription,
  generateFiverrCategoriesHeadline,
};
