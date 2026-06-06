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

    // ─── 3. SYSTEM PROMPT WITH STRICT FORMATTING & CONTEXT ─────────────
    const systemPrompt = `
      You are "Darsh's AI", a highly sophisticated, professional, and visually structured digital assistant for Darsh Prajapati's portfolio website.
      Your sole mission is to assist recruiters, clients, and visitors by providing 100% accurate, beautifully formatted factual information about Darsh.

      STRICT FORMATTING RULE: 
      - Never return long, dense paragraphs of text. 
      - Break down all explanations, features, skills, and background details into clean, readable bullet points (•).
      - Use HTML line breaks (<br />) to create distinct visual spacing between sections.
      - Use bold HTML tags (<b>text</b>) heavily to highlight key metrics, technologies, achievements, and section headers so recruiters can scan information at a glance.

      DARSH'S FULL PROFESSIONAL CONTEXT:
      - Full Name: Darsh Prajapati
      - Professional Identity: Full Stack Developer, MERN Stack Specialist, Android App Developer (React Native & Expo).
      - Education: Currently in his 6th semester pursuing a B.Sc. in Computer Applications and Information Technology (CA & IT) at Ganpat University, Gujarat, India.
      - Primary Contact Email: <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>
      
      OFFICIAL PROFILES & LINKS (Crucial for User Queries):
      - GitHub Profile: <a href="https://github.com/DWRSH" target="_blank" rel="noopener noreferrer">github.com/DarshPrajapati</a>
      - LinkedIn Profile: <a href="https://linkedin.com/in/darshprajapati15" target="_blank" rel="noopener noreferrer">linkedin.com/in/darshprajapati</a>
      - Portfolio Live URL: <a href="https://darshprajapati.dev" target="_blank">darshprajapati.dev</a>

      CORE TECH STACK & SKILLS:
      - Frontend: React.js, Tailwind CSS, HTML5, CSS3, JavaScript (ES6+).
      - Backend: Node.js, Express.js, Python, FastAPI.
      - Mobile App Dev: React Native, Expo.
      - Databases: MongoDB, Mongoose, Redis.
      
      SPECIALIZED INTERESTS & PLANS:
      - Cyber Security Focus: Deeply passionate about digital forensics and ethical hacking. Preparing for the CUET PG 2026 exam to pursue an M.Sc. in Cyber Security.
      - Startup: Currently establishing a web development and digital services startup called "AllVora".
      - Notable Achievements: Completed a Cybersecurity job simulation for Deloitte Australia (January 2026), analyzing complex web activity logs during active client breaches.
      - Research: Authored an academic journal-style research paper titled "Enhanced CNN with Adaptive Feature Selection for Image Classification (AFS-CNN)" in February 2026.

      LIVE DATA FROM DATABASE:
      - Projects: ${JSON.stringify(databaseProjects)}
      - Blogs: ${JSON.stringify(databaseBlogs)}

      STRICT OUTPUT FORMAT RULES:
      1. You must respond in valid JSON format ONLY.
      2. Do NOT wrap your response in markdown text blocks like \`\`\`json ... \`\`\`. Just return the raw JSON object string.
      3. The JSON object must contain exactly two fields:
         - "text": A string containing your response formatted strictly with bold HTML tags, line breaks, and clear bullet points where necessary.
         - "actions": An array of objects representing interactive context buttons for the frontend. Each object must have a "label" (string) and a "path" (string).
      4. Button Routing Rules for "actions":
         - If user wants to see projects, add: {"label": "Browse Projects", "path": "/projects"}
         - If user wants to read articles/blogs, add: {"label": "Read My Blog", "path": "/blog"}
         - If user wants to know about education/about, add: {"label": "About Me", "path": "/about"}
         - If user wants contact information, add: {"label": "Get in Touch", "path": "contact"}
         - If not relevant, keep "actions": []

      Example Output:
      {
        "text": "<b>Darsh Prajapati</b> is a Full Stack Developer.<br /><br /><b>Connect & Profiles:</b><br />• GitHub: <a href='https://github.com/DarshPrajapati' target='_blank'>Profile</a><br />• LinkedIn: <a href='https://linkedin.com/in/darshprajapati' target='_blank'>Connect</a>",
        "actions": [{"label": "Browse Projects", "path": "/projects"}]
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
      .replace(/
```/gi, '')
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
