import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received body:", req.body);

    const response = await fetch("https://script.google.com/macros/s/AKfycbw0wMiIlJiOZjBIdZzn-qSUI7V6C7Pqqum2Ziv-oZ15QsonRroOwL-MHejeZSlY_3XRcg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Google Script response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: "success", raw: text }; // fallback
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Proxy error:", err.message);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
