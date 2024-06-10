/* eslint-disable no-await-in-loop */
const { generateContentWithModel, storeData, formatResponse } = require('../content.service');

const generateRecipe = async (userId, userEmail, { recipeName, ingredients, numberOfSuggestions }) => {
  const userPrompt = `
Recipe Name: ${recipeName}
Ingredients: ${ingredients}`;

  const prompt = `You are a professional chef and recipe creator. Your task is to write a detailed and delicious recipe based on the given ingredients and instructions. Use your expertise to create engaging, easy-to-follow, and mouth-watering recipes that inspire home cooks.

Guidelines:
1. **Clarity:** Ensure the directions are clear and easy to follow.
2. **Detail:** Provide detailed steps, including preparation and cooking times.
3. **Flavor:** Emphasize the flavors and how they complement each other.
4. **Serving Suggestions:** Include suggestions for serving or pairing with other dishes.
5. **Variations:** Mention any variations or substitutions that can be made.
6. **Engagement:** Write in an engaging and enthusiastic tone to inspire the reader to try the recipe.

Example:
Recipe Name: Frito Pie
Ingredients: Fritos, Chili, Shredded cheddar cheese, Sweet white or red onions (diced small), Sour cream
Directions: Preheat oven to 350 degrees. Spread fritos on an oven-safe dish. Top with chili and cover with cheese. Bake for 10 minutes. Garnish with onion and sour cream.

${userPrompt}
Directions:`;

  const openAPIInformationsList = [];
  const generateRecipeList = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const recipe = await generateContentWithModel('gpt-4o', 50, prompt, 0, 0, 0, ['\n', 'Directions:']);
    const { id, object, created, model, choices } = recipe;

    // Log choices[0] and choices[0].message.content for debugging
    console.log('recipe.choices[0]:', choices[0]);
    console.log('recipe.choices[0].message.content:', choices[0].message.content);

    openAPIInformationsList.push({ id, object, created, model });
    generateRecipeList.push(choices[0].message.content.trim());
  }
  const { _id, generatedContents } = await storeData(
    userId,
    userEmail,
    'generate-recipe',
    userPrompt,
    openAPIInformationsList,
    generateRecipeList
  );

  const userResponse = formatResponse(_id, 'generate-recipe', generatedContents);

  return userResponse;
};

module.exports = {
  generateRecipe,
};
