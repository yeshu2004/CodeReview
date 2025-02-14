const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
  You are a professional code reviewer. Analyze the provided code snippet for errors, inefficiencies, and areas of improvement.

  - If no changes are needed, **motivate the user with a positive and encouraging message**.
  - Format the response in **beautiful Markdown** for better readability.

  **Response Structure:**
  ---
  **🛑 Errors & Fixes:**  
  (Clearly list the errors found and how to fix them)

  ---
  **✨ Improved Code (If applicable):**  
  \`\`\`js
  (Improved Code)
  \`\`\`

  ---
  **🚀 Encouragement:**  
  (Motivational message to appreciate the user’s coding skills)
`

  });
  

async function generateContent(prompt) {
    const result = await model.generateContent(prompt)
    return result.response.text();
}

module.exports = generateContent