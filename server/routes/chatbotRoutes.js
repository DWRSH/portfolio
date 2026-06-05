const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// ─── 1. MONGOOSE MODELS ───────────────────────────────────────────────────
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// Initialize new Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── HELPER: Sleep for ms milliseconds ───────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── HELPER: Call one model with up to `maxRetries` retries on 429/503 ──
async function tryModelWithRetry(modelName, prompt, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text; // success
    } catch (err) {
      const errBody = typeof err.message === 'string' ? err.message : JSON.stringify(err);
      const isRateLimited = errBody.includes('429') || errBody.includes('RESOURCE_EXHAUSTED');
      const isOverloaded  = errBody.includes('503') || errBody.includes('UNAVAILABLE');
      const isQuotaZero   = errBody.includes('limit: 0'); // retired / zeroed quota

      // Retired model with zero quota — don't waste retries
      if (isQuotaZero) {
        throw new Error(`Model ${modelName} has zero quota (retired). Skipping.`);
      }

      if ((isRateLimited || isOverloaded) && attempt < maxRetries) {
        const waitMs = attempt * 8000; // 8s, then 16s
        console.warn(`Model ${modelName} hit ${isRateLimited ? '429' : '503'} on attempt ${attempt}. Waiting ${waitMs / 1000}s before retry...`);
        await sleep(waitMs);
        continue;
      }

      // Non-retryable error or last attempt
      throw err;
    }
  }
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ text: 'Message is required.', actions: [] });
    }

    // ─── 2. RETRIEVE LIVE DATA FROM MONGODB ────────────────────────────
    let databaseProjects = [];
    let databaseBlogs = [];

    try {
      databaseProjects = await Project.find({})
        .select('title description tags repoUrl demoUrl')
        .lean();

      databaseBlogs = await Blog.find({})
        .select('title slug')
        .lean();
    } catch (dbError) {
      console.error('Database fetch failed for chatbot context:', dbError);
    }

    // ─── 3. SYSTEM PROMPT ──────────────────────────────────────────────
    const systemPrompt = `
      You are "Darsh's AI", a highly sophisticated, professional, and polite digital assistant for Darsh Prajapati's portfolio website.
      Your sole mission is to assist recruiters, clients, and visitors by providing 100% accurate, factual information about Darsh.

      CRITICAL SECURITY RULE: Do NOT invent, hallucinate, or assume any facts, projects, experiences, or achievements. If a piece of information is not explicitly mentioned below in the data blocks, politely state that you do not have that information.

      DARSH'S PROFESSIONAL PROFILE DATA:
      - Full Name: Darsh Prajapati
      - Professional Titles: Full Stack Developer, MERN Stack Specialist, Android App Developer.
      - Core Tech Stack: MongoDB, Express.js, React.js, Node.js (MERN), Python, FastAPI, React Native, Expo.
      - Education: Currently in his 6th semester pursuing a B.Sc. in Computer Applications and Information Technology (CA & IT) at Ganpat University, Gujarat, India.
      - Cyber Security Focus: Deeply interested in ethical hacking and digital forensics. Preparing for CUET PG 2026 exam to pursue an M.Sc. in Cyber Security.
      - Notable Experience: Successfully completed a Cyber Security job simulation for Deloitte Australia (January 2026), analyzing web activity logs to support a client during a breach.
      - Primary Contact Email: contact@darshprajapati.dev
      - Current Endeavors: Establishing a digital services startup called "AllVora".

      LIVE PROJECTS DATA (From Database):
      ${JSON.stringify(databaseProjects)}

      LIVE BLOGS DATA (From Database):
      ${JSON.stringify(databaseBlogs)}

      STRICT OUTPUT FORMAT RULES:
      1. You must respond in valid JSON format ONLY.
      2. Do NOT wrap your response in markdown text blocks like \`\`\`json ... \`\`\`. Just return the raw JSON object string.
      3. The JSON object must contain exactly two fields:
         - "text": A string containing your natural, helpful response. You can use standard HTML anchor tags (e.g., <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>) for emails, or use the exact 'repoUrl' or 'demoUrl' from the projects data if the user asks for links.
         - "actions": An array of objects representing interactive context buttons for the frontend. Each object must have a "label" (string) and a "path" (string).
      4. Button Routing Rules for "actions":
         - If user wants to see projects, add: {"label": "Browse Projects", "path": "/projects"}
         - If user wants to read articles/blogs, add: {"label": "Read My Blog", "path": "/blog"}
         - If user wants to know about education/about, add: {"label": "About Me", "path": "/about"}
         - If user wants contact information, add: {"label": "Get in Touch", "path": "contact"}
         - If not relevant, keep "actions": []

      Example Output:
      {
        "text": "Darsh is a Full Stack Developer. You can email him at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>.",
        "actions": [{"label": "Browse Projects", "path": "/projects"}, {"label": "Get in Touch", "path": "contact"}]
      }
    `;

    const fullPrompt = `${systemPrompt}\n\nUser's Question: "${message}"\nJSON Output:`;

    // ─── 4. FALLBACK MODEL CHAIN (current free-tier models, best first) ─
   
    const fallbackModels = [
      'gemini-2.5-flash',       // Best quality, generous free tier
      'gemini-2.5-flash-lite',  // Higher RPM fallback (15 RPM)
      'gemini-3.5-flash',       // Newest model, 1500 RPD free tier
    ];

    let responseText = null;
    let lastError = null;

    for (const modelName of fallbackModels) {
      try {
        console.log(`Trying model: ${modelName}...`);
        responseText = await tryModelWithRetry(modelName, fullPrompt, 2);
        console.log(`✅ Success with model: ${modelName}`);
        break;
      } catch (err) {
        console.warn(`❌ Model ${modelName} failed: ${err.message}`);
        lastError = err;
      }
    }

    if (!responseText) {
      throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
    }

    // ─── 5. CLEAN AND PARSE AI OUTPUT ─────────────────────────────────
    let cleanedJson = responseText
      .replace(/```json/gi, '')
      .replace(/```/gi, '')
      .trim();

    const firstBrace = cleanedJson.indexOf('{');
    const lastBrace  = cleanedJson.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
    }

    const parsedAIResponse = JSON.parse(cleanedJson);

    return res.status(200).json(parsedAIResponse);

  } catch (error) {
    console.error('AI Chatbot System Error:', error);

    return res.status(500).json({
      text: "I ran into a temporary glitch. You can directly reach Darsh via email at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>!",
      actions: [{ label: 'Get in Touch', path: 'contact' }],
    });
  }
});

module.exports = router;
