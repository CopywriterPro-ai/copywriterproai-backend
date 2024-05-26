const { generateContentUsingGPT4, processListContents, removeSpaces } = require('../content.service');

const imageIdeasFromAdText = async (userId, userEmail, { product, adText, numberOfSuggestions }) => {
  const userPrompt = `Product: ${removeSpaces(product)}
Ad: ${removeSpaces(adText)}`;

  const prompt = `You are a creative director with expertise in generating compelling visual content ideas. Your task is to generate image content ideas for the following ad of a product. Use your expertise to create engaging, innovative, and visually appealing content that effectively communicates the ad's message and captures the audience's attention.

Guidelines:
1. **Relevance:** Ensure each image idea is directly related to the product and the ad text.
2. **Visual Appeal:** Create ideas that are visually striking and likely to catch the viewer’s eye.
3. **Message Clarity:** Ensure the image ideas clearly convey the ad's message.
4. **Innovation:** Propose unique and creative visual concepts.
5. **Engagement:** Focus on ideas that will engage the audience and encourage them to learn more about the product.
6. **Versatility:** Consider ideas that can be used across various platforms and formats (e.g., social media, print, online ads).

Examples:
Product: Eco-Friendly Water Bottle
Ad: "Stay hydrated and save the planet with our eco-friendly water bottle. Perfect for on-the-go lifestyles."
Image Content Ideas:
- A close-up shot of the water bottle with a backdrop of a lush, green forest.
- A lifestyle shot of a person using the water bottle while hiking, with a clear focus on the product.
- An image of the water bottle surrounded by recyclable materials, highlighting its eco-friendly aspect.

Product: Noise-Canceling Headphones
Ad: "Experience the sound of silence with our top-rated noise-canceling headphones."
Image Content Ideas:
- A serene image of someone wearing the headphones in a bustling city, with the city noise visibly muted.
- A close-up shot of the headphones with a sleek, modern background.
- An image of the headphones placed on a desk next to a 'Do Not Disturb' sign, emphasizing the peace and quiet they provide.

Product: Organic Skincare Cream
Ad: "Nourish your skin with our 100% organic skincare cream. Gentle on your skin, tough on imperfections."
Image Content Ideas:
- A close-up shot of the skincare cream jar surrounded by fresh, organic ingredients.
- A person applying the cream, with a focus on the smooth, glowing skin.
- An image of the skincare cream placed in a serene, spa-like setting, emphasizing relaxation and self-care.

${userPrompt}
List of ${numberOfSuggestions} Image Content Ideas:
-`;

  const imageIdeas = await generateContentUsingGPT4('gpt-4o', 50, prompt, 0.8, 0.1, 0.2, ['\n\n']);
  return processListContents(userId, userEmail, 'image-idea-from-ad-text', userPrompt, imageIdeas);
};

module.exports = {
  imageIdeasFromAdText,
};
