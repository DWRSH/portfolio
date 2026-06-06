const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const nodemailer = require('nodemailer');

// ─── 1. MONGOOSE MODELS ───────────────────────────────────────────────────
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// Initialize new Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── 2. NODEMAILER SETUP ──────────────────────────────────────────────────
// Background email bhejne ke liye robust transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,           // SSL connection ke liye explicit port
  secure: false,        // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { 
    rejectUnauthorized: false // Render jaisi hosting par connection drop hone se bachata hai
  }
});

// ─── HELPER: Sleep for ms milliseconds ───────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── HELPER: Call one model with up to `maxRetries` retries ──────────────
async function tryModelWithRetry(modelName, contents, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
      });
      return response.text; 
    } catch (err) {
      const errBody = typeof err.message === 'string' ? err.message : JSON.stringify(err);
      const isRateLimited = errBody.includes('429') || errBody.includes('RESOURCE_EXHAUSTED');
      const isOverloaded  = errBody.includes('503') || errBody.includes('UNAVAILABLE');
      const isQuotaZero   = errBody.includes('limit: 0'); 

      if (isQuotaZero) {
        throw new Error(`Model ${modelName} has zero quota (retired). Skipping.`);
      }

      if ((isRateLimited || isOverloaded) && attempt < maxRetries) {
        const waitMs = attempt * 8000; 
        console.warn(`Model ${modelName} hit ${isRateLimited ? '429' : '503'} on attempt ${attempt}. Waiting...`);
        await sleep(waitMs);
        continue;
      }
      throw err;
    }
  }
}

router.post('/', async (req, res) => {
  try {
    // 1. Receive current message AND chat history from frontend
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ text: 'Message is required.', actions: [] });
    }

    // 2. Database Fetching
    let databaseProjects = [];
    let databaseBlogs = [];

    try {
      databaseProjects = await Project.find({}).select('title description tags repoUrl demoUrl').lean();
      databaseBlogs = await Blog.find({}).select('title slug').lean();
    } catch (dbError) {
      console.error('Database fetch failed:', dbError);
    }

    // 3. SMARTER SYSTEM PROMPT (Ask & Extract Contact)
    const systemPrompt = `
      You are "Darsh's AI", a highly sophisticated, professional, and visually structured digital assistant for Darsh Prajapati's portfolio website.
      Your sole mission is to assist recruiters, clients, and visitors by providing 100% accurate, beautifully formatted factual information about Darsh.

      STRICT FORMATTING RULE: 
      - Break down explanations into clean, readable bullet points (•).
      - Use HTML line breaks (<br />) to create distinct visual spacing.
      - Use bold HTML tags (<b>text</b>) heavily to highlight key metrics and achievements.

      DARSH'S FULL PROFESSIONAL CONTEXT:
      - Full Name: Darsh Prajapati
      - Professional Identity: Full Stack Developer, MERN Stack Specialist, Android App Developer.
      - Education: 6th semester B.Sc. CA & IT at Ganpat University, Gujarat.
      - Primary Contact: <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>
      - GitHub: <a href="https://github.com/DWRSH" target="_blank">github.com/DWRSH</a>
      - LinkedIn: <a href="https://linkedin.com/in/darshprajapati15" target="_blank">linkedin.com/in/darshprajapati15</a>
      
      SPECIALIZED INTERESTS & PLANS:
      - Cyber Security Focus: Preparing for CUET PG 2026 (M.Sc. Cyber Security).
      - Startup: Establishing digital services startup "AllVora".
      - Notable Achievements: Deloitte Australia Cyber Security simulation (Jan 2026).
      - Research: Authored paper "Enhanced CNN with Adaptive Feature Selection (AFS-CNN)" in Feb 2026.

      LIVE DATA FROM DATABASE:
      - Projects: ${JSON.stringify(databaseProjects)}
      - Blogs: ${JSON.stringify(databaseBlogs)}

      STRICT OUTPUT FORMAT:
      Return ONLY a valid JSON object. No markdown blocks like \`\`\`json.
      {
        "text": "Your formatted HTML string here",
        "actions": [{"label": "Button Name", "path": "/path"}],
        "sendEmailAlert": boolean,
        "clientContact": "Extracted email/phone or null"
      }

      SECRET RECEPTIONIST RULES:
      1. If the user expresses intent to hire, schedule a meeting, or do business, politely ask them for their email address or phone number in your "text" response so Darsh can contact them. Set "sendEmailAlert" to true.
      2. If the user provides an email address, phone number, or social link in their message, extract it and put it exactly in the "clientContact" field. Otherwise, set "clientContact" to null.
    `;

    // 4. MAP CHAT HISTORY FOR GEMINI API
    const chatContents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: typeof msg.text === 'string' ? msg.text : "User clicked an action button." }]
    }));

    // Append the NEW message along with the system rules to ensure it never forgets how to format
    const currentTurn = `
      [SYSTEM CONTEXT & RULES]
      ${systemPrompt}
      [END SYSTEM RULES]

      User's Current Message: "${message}"
      Remember to output in JSON format only!
    `;

    chatContents.push({ role: 'user', parts: [{ text: currentTurn }] });

    // 5. EXECUTE AI MODEL
    const fallbackModels = [
      'gemini-2.5-flash',       
      'gemini-2.5-flash-lite',  
      'gemini-3.5-flash',       
    ];

    let responseText = null;
    let lastError = null;

    for (const modelName of fallbackModels) {
      try {
        console.log(`Trying model: ${modelName}...`);
        responseText = await tryModelWithRetry(modelName, chatContents, 2);
        console.log(`✅ Success with model: ${modelName}`);
        break;
      } catch (err) {
        console.warn(`❌ Model ${modelName} failed: ${err.message}`);
        lastError = err;
      }
    }

    if (!responseText) throw new Error(`All models failed. Last error: ${lastError?.message}`);

    // 6. JSON PARSING
    let cleanedJson = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    const firstBrace = cleanedJson.indexOf('{');
    const lastBrace  = cleanedJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
    }
    const parsedAIResponse = JSON.parse(cleanedJson);

    // 7. 🔥 ENHANCED EMAIL ALERT (WITH CONTACT INFO)
    if (parsedAIResponse.sendEmailAlert || parsedAIResponse.clientContact) {
      console.log("🚨 Lead or Contact Detected! Sending background email alert...");
      
      const contactInfo = parsedAIResponse.clientContact 
        ? `<span style="color: #d93025; font-weight: bold; font-size: 16px;">Contact Detail Provided: ${parsedAIResponse.clientContact}</span>` 
        : `<span style="color: #f29900;">AI is currently asking the user for their email/phone.</span>`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sends back to your personal email
        subject: '🚀 New Client Lead from Portfolio Bot!',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #00d4b4;">New Lead Alert!</h2>
            <p>Someone is interested in working with you via your AI Chatbot.</p>
            
            <div style="background-color: #f4f4f4; padding: 15px; border-left: 4px solid #00d4b4; margin: 20px 0;">
              <strong>Client's Latest Message:</strong><br/>
              "${message}"
            </div>

            <div style="padding: 10px; border: 1px dashed #ccc; background-color: #fafafa;">
              ${contactInfo}
            </div>
            
            <p style="font-size: 12px; color: #666; margin-top: 20px;">*Check your chatbot conversation or wait for the user to reply with their email.*</p>
          </div>
        `
      };

      // Send email asynchronously so it doesn't block the chatbot response
      transporter.sendMail(mailOptions).catch(err => console.error("Email sending failed:", err));
    }

    // 8. SEND RESPONSE TO FRONTEND
    return res.status(200).json({
      text: parsedAIResponse.text,
      actions: parsedAIResponse.actions
    });

  } catch (error) {
    console.error('AI System Error:', error);
    return res.status(500).json({
      text: "I ran into a temporary glitch. You can directly reach Darsh via email at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>!",
      actions: [{ label: 'Get in Touch', path: 'contact' }],
    });
  }
});

module.exports = router;
