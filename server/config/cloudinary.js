const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cloudinary config
// Yeh aapke .env file se keys ko padhega
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config (temp storage)
// Yeh file ko server par upload hone se pehle temporarily store karega
const upload = multer({
  dest: path.join(__dirname, '..', 'uploads'), // 'server/uploads/' folder
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif' && ext !== '.webp') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

// Temp file cleanup helper
// Upload hone ke baad temp file ko delete kar deta hai
const cleanup = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error('Failed to delete temp file:', filePath, err);
  });
};

// --- YEH NAYA HELPER FUNCTION HAI ---
// Cloudinary URL se public_id nikalne ke liye
// e.g., "http://.../project-images/abc123xyz.jpg" -> "project-images/abc123xyz"
const getPublicIdFromUrl = (url) => {
  try {
    // URL ka aakhri hissa (e.g., /project-images/image_id.jpg) nikal lein
    const parts = url.split('/');
    // file extension (.jpg) ko hata dein
    const lastPart = parts[parts.length - 1];
    const publicIdWithFolder = `${parts[parts.length - 2]}/${lastPart.split('.')[0]}`;
    return publicIdWithFolder;
  } catch (err) {
    console.error('Could not get public_id from url:', url, err);
    return null;
  }
};

module.exports = {
  cloudinary,
  upload,
  cleanup,
  getPublicIdFromUrl, // Ise export karein taaki projects.js iska use kar sake
};
