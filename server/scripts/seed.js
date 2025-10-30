const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');

// Load env vars
dotenv.config();

// Test project data
const testProject = {
  title: "Test Project",
  description: "This is a test project to verify database connectivity",
  tags: ["Test", "Demo"],
  repoUrl: "https://github.com/test/project",
  demoUrl: "https://demo.test.com"
};

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      dbName: 'portfolio',
    });
    console.log('Connected to MongoDB');

    // Check if we have any projects
    const count = await Project.countDocuments();
    console.log('Current project count:', count);

    if (count === 0) {
      console.log('No projects found. Adding test project...');
      const project = new Project(testProject);
      await project.save();
      console.log('Test project added successfully');
    } else {
      console.log('Projects exist in database');
    }

    // List all projects
    const projects = await Project.find().lean();
    console.log('All projects:', JSON.stringify(projects, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();