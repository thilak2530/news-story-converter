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
      contents: `convert this into a short story only give story no formalities give in the that can to understand for every one simply \n\n${newsText}`,
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


