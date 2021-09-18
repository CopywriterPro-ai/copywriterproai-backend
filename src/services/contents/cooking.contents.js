/* eslint-disable no-await-in-loop */
const { generateContentUsingGPT3, storeData, formatResponse } = require('../content.service');

const generateRecipe = async (userId, userEmail, { recipeName, ingredients }) => {
  const userPrompt = `
Recipe Name: ${recipeName}
Ingredients: ${ingredients}`;

  const prompt = `
Write a recipe based on these ingredients and instructions:
Recipe Name: Frito Pie
Ingredients: Fritos,Chili,Shredded cheddar cheese, Sweet white or red onions, diced small, Sour cream
Directions: Preheat oven to 350 degrees. Spread fritos on an oven-safe dish. Top with chili and cover with cheese. Bake for 10 minutes. Garnish with onion and sour cream.

${userPrompt}
Directions:`;

  const openAPIInformationsList = [];
  const generateRecipeList = [];

  for (let i = 0; i < 1; i++) {
    const recipe = await generateContentUsingGPT3('davinci-instruct-beta', 50, prompt, 0, 0, 0, ['\n', 'Directions:']);
    const { id, object, created, model, choices } = recipe;

    openAPIInformationsList.push({ id, object, created, model });
    generateRecipeList.push(choices[0].text.trim());
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
