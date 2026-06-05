const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─── YOUR MONGOOSE MODELS INTEGRATION ────────────────────────────────────
// Note: Apne models ke exact names aur paths ke hisaab se ise adjust kar lena.
// Agar abhi tak models generate nahi kiye hain, toh niche diye gaye fallbacks kaam karenge.
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// Initialize Google Gemini AI (Make sure GEMINI_API_KEY is in your backend .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ text: "Message is required.", actions: [] });
    }

    // ─── STEP 1: RETRIEVE LIVE DATA FROM MONGODB (RAG) ───────────────────
    let databaseProjects = [];
    let databaseBlogs = [];

    try {
      // Database se specific required fields fetch kar rahe hain optimize karne ke liye
      databaseProjects = await Project.find({}).select('title description techStack githubLink liveLink').lean();
      databaseBlogs = await Blog.find({}).select('title desc slug').lean();
    } catch (dbError) {
      console.error("Database fetch failed for chatbot context, using hardcoded profile only:", dbError);
      // Agar DB query fail ho toh crash na ho, khali arrays ke saath flow chalta rahega
    }

    // ─── STEP 2: DEFINE THE WATERTIGHT SYSTEM PROMPT ──────────────────────
    const systemPrompt = `
      You are "Darsh's AI", a highly sophisticated, professional, and polite digital assistant for Darsh Prajapati's portfolio website.
      Your sole mission is to assist recruiters, clients, and visitors by providing 100% accurate, factual information about Darsh.

      CRITICAL SECURITY RULE: Do NOT invent, hallucinate, or assume any facts, projects, experiences, or achievements. If a piece of information is not explicitly mentioned below in the data blocks, politely state that you do not have that information. Never mention any research papers or publications like "AFS-CNN" as it is NOT his.

      DARSH'S PROFESSIONAL PROFILE DATA:
      - Full Name: Darsh Prajapati
      - Professional Titles: Full Stack Developer, MERN Stack Specialist, Android App Developer.
      - Core Tech Stack: MongoDB, Express.js, React.js, Node.js (MERN), Python, FastAPI, React Native, Expo.
      - Education: Currently in his 6th semester pursuing a B.Sc. in Computer Applications and Information Technology (CA & IT) at Ganpat University, Gujarat, India.
      - Cyber Security Focus: Deeply interested in ethical hacking and digital forensics. Preparing for CUET PG 2026 exam to pursue an M.Sc. in Cyber Security.
      - Notable Experience: Successfully completed a Cyber Security job simulation for Deloitte Australia (January 2026), where he analyzed web activity logs to support a client during a breach.
      - Primary Contact Email: contact@darshprajapati.dev
      - Key Core Systems: He is establishing a digital services and web development startup called "AllVora" and has engineered "StockWatcher" (a real-time stock price alert and portfolio tracking system).

      LIVE PROJECTS FROM MONGODB DATABASE:
      ${JSON.stringify(databaseProjects)}

      LIVE BLOGS FROM MONGODB DATABASE:
      ${JSON.stringify(databaseBlogs)}

      STRICT OUTPUT FORMAT RULES:
      1. You must respond in valid JSON format ONLY. 
      2. Do NOT wrap your response in markdown text blocks like \`\`\`json ... \`\`\`. Just return the raw JSON object string.
      3. The JSON object must contain exactly two fields:
         - "text": A string containing your natural, helpful response. You can use standard HTML anchor tags (e.g., <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>) for emails or external links to make them clickable.
         - "actions": An array of objects representing interactive context buttons for the frontend. Each object must have a "label" (string) and a "path" (string).
      4. Button Routing Rules for "actions":
         - If user wants to see projects or work, add: {"label": "Browse Projects", "path": "/projects"}
         - If user wants to read articles or blogs, add: {"label": "Read My Blog", "path": "/blog"}
         - If user wants to know about education or timeline, add: {"label": "About Me", "path": "/about"}
         - If user wants contact information, add: {"label": "Get in Touch", "path": "contact"}
         - If not relevant, keep "actions": []

      Example Output JSON layout structure:
      {
        "text": "Darsh is a Full Stack Developer. You can check his live projects or email him at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>.",
        "actions": [{"label": "Browse Projects", "path": "/projects"}, {"label": "Get in Touch", "path": "contact"}]
      }
    `;

    // ─── STEP 3: EXECUTE GEMINI API GENERATION ────────────────────────────
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${systemPrompt}\n\nUser's Question: "${message}"\nJSON Output:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // ─── STEP 4: CLEAN AND PARSE THE AI OUTPUT ────────────────────────────
    // AI kabhi kabhi output ke aage-piche \`\`\`json ya spaces laga deta hai, use robustly strip kar rahe hain.
    let cleanedJsonString = responseText
      .replace(/```json/gi, '')
      .replace(/```/gi, '')
      .trim();

    // Find first '{' and last '}' to isolate pure JSON just in case any extra text exists
    const firstBraceIdx = cleanedJsonString.indexOf('{');
    const lastBraceIdx = cleanedJsonString.lastIndexOf('}');
    
    if (firstBraceIdx !== -1 && lastBraceIdx !== -1) {
      cleanedJsonString = cleanedJsonString.substring(firstBraceIdx, lastBraceIdx + 1);
    }

    const parsedAIResponse = JSON.parse(cleanedJsonString);

    // Send the structured data directly to the frontend
    return res.status(200).json(parsedAIResponse);

  } catch (error) {
    console.error("AI Chatbot System Error:", error);
    
    // Graceful production fallback payload so the frontend UI never breaks
    return res.status(500).json({
      text: "I ran into a temporary configuration glitch while querying my database. However, you can directly reach out to Darsh via email at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>!",
      actions: [{ label: "Get in Touch", path: "contact" }]
    });
  }
});

module.exports = router;
