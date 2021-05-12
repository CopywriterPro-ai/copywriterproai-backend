const { generateContentUsingGPT3, processListContents } = require('../content.service');

const catchyHeadline = async (userId, { content }) => {
  const prompt = `Samples List -

- 7 Free Apps That Make Vacation Planning a Breeze
- 10 Things You Can Learn From the Apple Store
- Do You Do Any of These Ten Embarrassing Things?
- Tricky English Grammar Mistakes to Avoid
- Secret Strategy to Stop a Cold Quickly
- How I Made a Fortune With a "Fool Idea"
- Millionaire Day Trader Reveals How to Cash In

Generate Catchy Headlines for following online content like above Samples - 
Online Content: ${content}

List of 5 Catchy Headlines
-`;

  const catchyHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, 'catchy-headline', prompt, catchyHeadlines);
};

const attentionGrabbingHeadline = async (userId, { content }) => {
  const prompt = `Samples List -

- Can Twitter Predict the Future? Pentagon Says Maybe
- Do Media Vultures Perpetuate Mass Shootings?
- Is the Life of a Child Worth $1 to You?
- Suppose This Happened on Your Wedding Day!
- The Child Who Won the Hearts of All
- This Tiny Mistake Costs Gardeners $3,000 a Year
- When Doctors Feel "Rotten" This is What They Do
- You'll Never Get Hired if You Say This in a Job Interview

Generate Attention Grabbing Headlines for following online content like above Samples - 
Online Content: ${content}

List of 5 Attention Grabbing Headlines
-`;

  const attentionGrabbingHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, 'attention-grabbing-headline', prompt, attentionGrabbingHeadlines);
};

const newspaperHeadline = async (userId, { content }) => {
  const prompt = `Samples List -

- Is Zoom Fatigue a Real Thing?
- Can a Website Help You Beat Jet Lag?
- How Much is "Worker Tension" Costing Your Company?
- Streaming Video Could Kill Shared Data Plans
- Will Families Social Distance for the Holidays?
- How a New Discovery Made a Plain Girl Beautiful
- Top U.S. Cities for Bedbug Infestations
- Is Takeout the Latest Fine Dining Trend?

Generate Newspaper Headlines for following News like above Samples -
News: ${content}

List of 5 Newspaper Headlines
-`;

  const newspaperHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, 'newspaper-headline', prompt, newspaperHeadlines);
};

const resumeHeadline = async (userId, { profession }) => {
  const prompt = `Samples List -

- Detail-Oriented Administrative Professional
- Enthusiastic Customer Service Specialist With Call Center Experience
- Skilled Financial Services Representative
- Strategic Minded Executive Committed to Building Successful Startups
- Experienced Manufacturing Operations Manager
- Certified Safety Professional With Manufacturing and Construction Experience
- Results-Oriented Regional Manager
- Award-Winning Writer and Editor

Generate Resume Headlines for following ${profession} position like above Samples - 

List of 5 Resume Headlines
-`;

  const resumeHeadlines = await generateContentUsingGPT3('davinci-instruct-beta', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, 'resume-headline', prompt, resumeHeadlines);
};

module.exports = {
  catchyHeadline,
  attentionGrabbingHeadline,
  newspaperHeadline,
  resumeHeadline,
};
