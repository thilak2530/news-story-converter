import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

app.post("/news-story", async (req, res) => {
  try {
    const { newsText} = req.body;
      if (!newsText || newsText.trim() === "") {
        return res
          .status(400)
          .json({ message: "Please enter a news article before converting!" });
      }
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `You are a skilled storyteller and journalist. Your job is to turn any short news snippet into a clear, creative, and factual story. The story must be easy to read and understand for everyone, even young readers. 
      Use simple English and short sentences. Make the story interesting and full of life, but do not add fake or imaginary facts. You can use creative language, examples, or feelings to help readers imagine what happened, but everything must stay true and accurate. 
      If the snippet does not include enough background, explain it in an easy way so the reader fully understands what, why, and how it happened. Start with a strong and engaging opening. Then explain the event step by step — who was involved, where it happened, and why it matters. End the story by explaining what it means or what might happen next. 
      Do not use bullet points or lists. Write in smooth, natural paragraphs like a short article. The goal is to make real news sound beautiful, interesting, and easy to understand — while keeping it completely factual.
      Input:  ${newsText}`,
    });
    const story = response.text|| "No story generated.";
    res.json({ story });
  }
   catch (err) {
    console.error("Gemini Full Error:", err);
    res.status(500).json({ error: err.message });
  }
});



app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));


