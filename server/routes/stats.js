const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Project = require('../models/Project');
const Blog = require('../models/Blog');

/**
 * @route   GET /api/stats/dashboard
 * @desc    Admin dashboard ke liye stats (count) fetch karein
 * @access  Protected
 */
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    // Dono counts ko ek saath (parallel) fetch karein
    const [projectCount, blogCount] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments()
    ]);

    // JSON response mein dono count bhejein
    res.json({
      projectCount,
      blogCount
    });

  } catch (err) {
    console.error('Stats fetch error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
