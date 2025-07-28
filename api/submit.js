import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbw0wMillJiOZjBldZzn-qSUI7V6C7Pqqum2Ziv-oZ15QsonRroOwL-MHejeZSlY_3XRcg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

