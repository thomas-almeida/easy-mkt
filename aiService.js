import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

async function generateContent(topic) {
  const apiKey = process.env.GEMINI_API_KEY;
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${apiKey}`,
    {
      prompt: `Crie um post criativo para redes sociais sobre o tema: ${topic}`
    }
  );

  return response.data.candidates[0].output;
}

export default { generateContent };
