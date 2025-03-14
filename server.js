import express, { json } from "express";
import cors from "cors";
import scrapper from "./scrapper.js";
import aiService from "./aiService.js";
const app = express();
app.use(cors());
app.use(json());

// Rota para buscar conteúdos do Google
app.post("/search", async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) return res.status(400).json({ error: "Palavra-chave obrigatória" });

  const results = await scrapper.scrapeGoogleResults(keyword);
  res.json(results);
});

// Rota para gerar conteúdo com IA
app.post("/generate", async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Tópico obrigatório" });

  const post = await aiService.generateContent(topic);
  res.json({ post });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
