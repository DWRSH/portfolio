// Yeh script admin user ka password zabardasti 'admin@123' par reset kar degi.

// --- FIX ---
// Humne path hata diya hai. Ab yeh default roop se current folder (server folder) 
// mein .env file ko dhoondhega.
require('dotenv').config(); 
// --- END FIX ---

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Hardcoded default password
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin@123';

const forceResetAdminPassword = async () => {
  console.log('Attempting to connect to MongoDB...');
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    console.error('ERROR: MONGO_URI not found in .env file.');
    console.log('Please ensure .env file is in the (E:/Darsh-port/server) folder.');
    return;
  } else {
    console.log('MONGO_URI found successfully.'); // Success message
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully.');

    // Admin user ko dhoondhein
    let adminUser = await User.findOne({ username: ADMIN_USERNAME });

    if (!adminUser) {
      console.log(`User '${ADMIN_USERNAME}' not found. Creating a new one...`);
      adminUser = new User({ username: ADMIN_USERNAME });
    } else {
      console.log(`User '${ADMIN_USERNAME}' found. Forcing password reset...`);
    }

    // Naya password hash karein
    console.log(`Hashing password: '${ADMIN_PASSWORD}'...`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Password ko update karein
    adminUser.password = hashedPassword;
    
    // User ko save karein
    await adminUser.save();
    
    console.log('\n--- SUCCESS ---');
    console.log(`Admin user '${ADMIN_USERNAME}' password has been successfully reset to '${ADMIN_PASSWORD}'.`);
    console.log('New Stored Hash:', hashedPassword);
    console.log('You can now start your server (`npm run dev`) and log in.');

  } catch (err) {
    console.error('\n--- SCRIPT FAILED ---');
    console.error('Error during admin password reset:', err.message);
  } finally {
    // Connection band karein
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected.');
  }
};

// Script ko chalayein
forceResetAdminPassword();

