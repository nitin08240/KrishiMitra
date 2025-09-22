const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

async function init() {
  // Dynamically import the Google Generative AI SDK
  const { GoogleGenerativeAI } = await import("@google/generative-ai");

  const app = express();
  app.use(cors({ origin: "http://localhost:8080", credentials: true }));
  app.use(express.json());

  // Initialize AI
  const ai = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE",
  });

  // System instruction template
  const getSystemInstruction = (language = "English") => `
You are an AI assistant that answers only about:
1. Agriculture and farming in India
2. Indian government schemes
3. Weather in India
4. Mandi (market) prices

Rules:
- Always greet politely at the beginning in ${language}.
- Always respond in ${language}.
- If the user asks something outside these topics, politely reply in ${language}:
  "Sorry, I can only answer questions related to agriculture, government schemes, weather, and mandi prices."
`;

  // Store conversation
  const chatHistory = [];

  // Chat route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      chatHistory.push({
        role: "user",
        parts: [{ text: message }],
      });

      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent({
        contents: chatHistory,
        generationConfig: {
          // You can adjust tokens, temperature, etc.
          maxOutputTokens: 500,
        },
        systemInstruction: getSystemInstruction("English"),
      });

      const botText = result.response.text() || "Sorry, I could not generate a response.";

      chatHistory.push({
        role: "model",
        parts: [{ text: botText }],
      });

      res.json({ reply: botText });
    } catch (err) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  });

  // Clear chat history
  app.post("/api/chat/clear", (req, res) => {
    chatHistory.length = 0;
    res.json({ success: true });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Chatbot backend running on port", PORT);
  });
}

init();
