const { generateContentUsingGPT4, processListContents, removeSpaces } = require('../content.service');

const catchyHeadline = async (userId, userEmail, { content, numberOfSuggestions }) => {
  const userPrompt = `Content: ${removeSpaces(content)}`;

  const prompt = `You are an expert in creating catchy headlines. Your task is to generate engaging and persuasive headlines for online content, similar to the provided samples.

Guidelines:
1. **Catchiness:** Ensure the headlines are catchy and grab attention.
2. **Relevance:** Ensure the headlines are relevant to the content.
3. **Clarity:** Ensure the headlines are clear and concise.
4. **Engagement:** Create headlines that capture the audience’s interest.

Samples:
- 7 Free Apps That Make Vacation Planning a Breeze
- 10 Things You Can Learn From the Apple Store
- Do You Do Any of These Ten Embarrassing Things?
- Tricky English Grammar Mistakes to Avoid
- Secret Strategy to Stop a Cold Quickly
- How I Made a Fortune With a "Fool Idea"
- Millionaire Day Trader Reveals How to Cash In

Generate Catchy Headlines for the following online content like the above samples:
${userPrompt}

List of ${numberOfSuggestions} Catchy Headlines
-`;

  const catchyHeadlines = await generateContentUsingGPT4('gpt-4o', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, userEmail, 'catchy-headline', userPrompt, catchyHeadlines);
};

const attentionGrabbingHeadline = async (userId, userEmail, { content, numberOfSuggestions }) => {
  const userPrompt = `Content: ${removeSpaces(content)}`;

  const prompt = `You are an expert in creating attention-grabbing headlines. Your task is to generate engaging and persuasive headlines for online content, similar to the provided samples.

Guidelines:
1. **Attention-Grabbing:** Ensure the headlines grab attention immediately.
2. **Relevance:** Ensure the headlines are relevant to the content.
3. **Clarity:** Ensure the headlines are clear and concise.
4. **Engagement:** Create headlines that capture the audience’s interest.

Samples:
- Can Twitter Predict the Future? Pentagon Says Maybe
- Do Media Vultures Perpetuate Mass Shootings?
- Is the Life of a Child Worth $1 to You?
- Suppose This Happened on Your Wedding Day!
- The Child Who Won the Hearts of All
- This Tiny Mistake Costs Gardeners $3,000 a Year
- When Doctors Feel "Rotten" This is What They Do
- You'll Never Get Hired if You Say This in a Job Interview

Generate Attention-Grabbing Headlines for the following online content like the above samples:
${userPrompt}

List of ${numberOfSuggestions} Attention-Grabbing Headlines
-`;

  const attentionGrabbingHeadlines = await generateContentUsingGPT4('gpt-4o', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, userEmail, 'attention-grabbing-headline', userPrompt, attentionGrabbingHeadlines);
};

const newspaperHeadline = async (userId, userEmail, { content, numberOfSuggestions }) => {
  const userPrompt = `News: ${removeSpaces(content)}`;

  const prompt = `You are an expert in creating newspaper headlines. Your task is to generate engaging and persuasive headlines for news content, similar to the provided samples.

Guidelines:
1. **Relevance:** Ensure the headlines are relevant to the news content.
2. **Clarity:** Ensure the headlines are clear and concise.
3. **Engagement:** Create headlines that capture the audience’s interest.
4. **Professional Tone:** Maintain a professional tone throughout the headlines.

Samples:
- Is Zoom Fatigue a Real Thing?
- Can a Website Help You Beat Jet Lag?
- How Much is "Worker Tension" Costing Your Company?
- Streaming Video Could Kill Shared Data Plans
- Will Families Social Distance for the Holidays?
- How a New Discovery Made a Plain Girl Beautiful
- Top U.S. Cities for Bedbug Infestations
- Is Takeout the Latest Fine Dining Trend?

Generate Newspaper Headlines for the following news content like the above samples:
${userPrompt}

List of ${numberOfSuggestions} Newspaper Headlines
-`;

  const newspaperHeadlines = await generateContentUsingGPT4('gpt-4o', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, userEmail, 'newspaper-headline', userPrompt, newspaperHeadlines);
};

const resumeHeadline = async (userId, userEmail, { profession, numberOfSuggestions }) => {
  const userPrompt = `Profession: ${removeSpaces(profession)}`;

  const prompt = `You are an expert in creating resume headlines. Your task is to generate engaging and persuasive resume headlines for the given profession, similar to the provided samples.

Guidelines:
1. **Relevance:** Ensure the headlines are relevant to the profession.
2. **Clarity:** Ensure the headlines are clear and concise.
3. **Engagement:** Create headlines that capture the audience’s interest.
4. **Professional Tone:** Maintain a professional tone throughout the headlines.

Samples:
- Detail-Oriented Administrative Professional
- Enthusiastic Customer Service Specialist With Call Center Experience
- Skilled Financial Services Representative
- Strategic Minded Executive Committed to Building Successful Startups
- Experienced Manufacturing Operations Manager
- Certified Safety Professional With Manufacturing and Construction Experience
- Results-Oriented Regional Manager
- Award-Winning Writer and Editor

Generate Resume Headlines for the following ${removeSpaces(profession)} position like the above samples:
${userPrompt}

List of ${numberOfSuggestions} Resume Headlines
-`;

  const resumeHeadlines = await generateContentUsingGPT4('gpt-4o', 70, prompt, 0.9, 0, 0, ['\n\n']);
  return processListContents(userId, userEmail, 'resume-headline', userPrompt, resumeHeadlines);
};

module.exports = {
  catchyHeadline,
  attentionGrabbingHeadline,
  newspaperHeadline,
  resumeHeadline,
};
