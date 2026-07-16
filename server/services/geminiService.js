const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateWorkflow = async (prompt) => {
  const systemPrompt = `
You are an automation workflow generator.

Return ONLY valid JSON.

Example:

[
  {
    "label":"Open URL",
    "url":"https://google.com"
  },
  {
    "label":"Type",
    "selector":"input[name='q']",
    "text":"ChatGPT"
  },
  {
    "label":"Click",
    "selector":"input[type='submit']"
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}

User Request:
${prompt}`,
  });

  return response.text;
};

module.exports = {
  generateWorkflow,
};