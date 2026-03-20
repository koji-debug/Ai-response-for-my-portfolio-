import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_OPENAI_API_KEY"; // 🔴 PUT YOUR KEY HERE

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional AI assistant representing a developer portfolio. Be helpful, smart, and persuasive."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));