const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateWorkflow = async (prompt) => {
  const systemPrompt = `
You are an automation workflow generator.

Return ONLY valid JSON.

Do NOT wrap the response in markdown.
Do NOT use \`\`\`json.
Return only a JSON array.

Example:

[
  {
    "label": "Open URL",
    "url": "https://google.com"
  },
  {
    "label": "Type",
    "selector": "input[name='q']",
    "text": "ChatGPT"
  },
  {
    "label": "Click",
    "selector": "input[type='submit']"
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}

User Request:
${prompt}`,
  });

  const text = response.text();

  console.log("========== GEMINI RESPONSE ==========");
  console.log(text);
  console.log("=====================================");

  return text;
};

module.exports = {
  generateWorkflow,
};