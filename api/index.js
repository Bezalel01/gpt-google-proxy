import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbw0wMillJiOZjBldZzn-qSUI7V6C7Pqqum2Ziv-oZ15QsonRroOwL-MHejeZSlY_3XRcg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default app;
