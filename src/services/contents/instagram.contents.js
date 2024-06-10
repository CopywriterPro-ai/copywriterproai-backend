const { generateContentWithModel, removeSpaces, processListContents } = require('../content.service');

const instagramAdTexts = async (userId, userEmail, { platformType, context, numberOfSuggestions }) => {
  const userPrompt = `Platform: ${removeSpaces(platformType)}
Context: ${removeSpaces(context)}`;

  const prompt = `You are an expert in creating compelling Instagram ad texts. Your task is to generate engaging and persuasive ad texts for the given platform type and context, similar to the provided samples.

Guidelines:
1. **Relevance:** Ensure the ad texts are relevant to the platform type and context.
2. **Engagement:** Create ad texts that capture the audience’s interest.
3. **Clarity:** Ensure the ad texts are clear and concise.
4. **Call to Action:** Include a strong call to action to encourage user engagement.
5. **Creativity:** Use creative language to make the ad texts stand out.

Examples:
Platform: Fitness App
Context: New Year Resolution
Instagram Ad Text:
- "Kickstart your New Year with our Fitness App! Get personalized workout plans, track your progress, and achieve your fitness goals. Download now and start your journey to a healthier you!"

Platform: Online Learning Platform
Context: Back to School
Instagram Ad Text:
- "Ready to ace your classes this semester? Join our Online Learning Platform and access thousands of courses from top universities. Learn at your own pace and get ahead. Sign up today!"

Platform: Eco-Friendly Products
Context: Earth Day
Instagram Ad Text:
- "Celebrate Earth Day with our range of eco-friendly products! From reusable bags to biodegradable straws, we've got everything you need to make a positive impact. Shop now and save the planet!"

${userPrompt}
List of ${numberOfSuggestions} Instagram Ad Texts:
-`;

  const adTexts = await generateContentWithModel('gpt-4o', 100, prompt, 0.8, 0.2, 0.1, ['\n\n']);

  // Log choices[0] and choices[0].message.content for debugging
  console.log('choices[0]:', adTexts.choices[0]);
  console.log('choices[0].message.content:', adTexts.choices[0].message.content);

  return processListContents(userId, userEmail, 'instagram-ad-texts', userPrompt, adTexts);
};

module.exports = {
  instagramAdTexts,
};
