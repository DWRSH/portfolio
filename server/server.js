const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Sahi path se .env load karein

// --- API Routes Import ---
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blogs');
const statsRoutes = require('./routes/stats'); // Naya stats route import karein

const app = express();

// --- Middleware ---
// CORS (Cross-Origin Resource Sharing) ko enable karein
app.use(cors());

// JSON data ko parse karne ke liye middleware
app.use(express.json());

// URL-encoded data ko parse karne ke liye
app.use(express.urlencoded({ extended: true }));

// --- API Routes ko Register Karein ---
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/stats', statsRoutes); // Naya stats route register karein

// --- Database Connection ---
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('FATAL ERROR: MONGO_URI not found in .env file.');
    process.exit(1); // Server ko band kar dein agar URI nahi hai
  }

  try {
    // Mongoose connection options
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME || 'portfolio' // DB ka naam .env se ya default
    };

    console.log(`Attempting to connect to MongoDB...`);
    const conn = await mongoose.connect(mongoUri, mongooseOptions);

    console.log(`MongoDB Connected Successfully to host: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);
    console.log(`Connection state: ${mongoose.connection.readyState}`);

  } catch (err) {
    console.error('MongoDB Connection FAILED:', err.message);
    process.exit(1); // Failure par server band kar dein
  }
};

// Database se connect karein
connectDB();

// --- Server Start ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

