const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─── 1. EXACT MONGOOSE MODELS IMPORT ─────────────────────────────────────
// Tumhare structure ke hisaab se paths '../models/Project' hi honge
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// Initialize Google Gemini AI (Backend .env mein GEMINI_API_KEY honi chahiye)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ text: "Message is required.", actions: [] });
    }

    // ─── 2. RETRIEVE LIVE DATA FROM MONGODB ──────────────────────────────
    let databaseProjects = [];
    let databaseBlogs = [];

    try {
      // Tumhare schema keys: title, description, tags, repoUrl, demoUrl
      databaseProjects = await Project.find({})
        .select('title description tags repoUrl demoUrl')
        .lean();
        
      // Tumhare schema keys: title, content, slug, featuredImage
      // Note: Hum 'content' fetch nahi kar rahe taaki AI ka token limit overload na ho. 
      // Sirf title aur slug sufficient hai bot ke knowledge ke liye.
      databaseBlogs = await Blog.find({})
        .select('title slug')
        .lean();
    } catch (dbError) {
      console.error("Database fetch failed for chatbot context:", dbError);
    }

    // ─── 3. DEFINE THE SYSTEM PROMPT & CONTEXT ───────────────────────────
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

      Example Output JSON layout structure:
      {
        "text": "Darsh is a Full Stack Developer. He has built some amazing projects which you can check out, or email him at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>.",
        "actions": [{"label": "Browse Projects", "path": "/projects"}, {"label": "Get in Touch", "path": "contact"}]
      }
    `;

    // ─── 4. EXECUTE GEMINI API GENERATION ─────────────────────────────────
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${systemPrompt}\n\nUser's Question: "${message}"\nJSON Output:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // ─── 5. CLEAN AND PARSE THE AI OUTPUT ─────────────────────────────────
    let cleanedJsonString = responseText
      .replace(/```json/gi, '')
      .replace(/```/gi, '')
      .trim();

    // Extract exact JSON block securely
    const firstBraceIdx = cleanedJsonString.indexOf('{');
    const lastBraceIdx = cleanedJsonString.lastIndexOf('}');
    
    if (firstBraceIdx !== -1 && lastBraceIdx !== -1) {
      cleanedJsonString = cleanedJsonString.substring(firstBraceIdx, lastBraceIdx + 1);
    }

    const parsedAIResponse = JSON.parse(cleanedJsonString);

    return res.status(200).json(parsedAIResponse);

  } catch (error) {
    console.error("AI Chatbot System Error:", error);
    
    // Graceful production fallback
    return res.status(500).json({
      text: "I ran into a temporary configuration glitch while querying my database. However, you can directly reach out to Darsh via email at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>!",
      actions: [{ label: "Get in Touch", path: "contact" }]
    });
  }
});

module.exports = router;
