const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Blog = require('../models/Blog');
// Hamein 'cloudinary' config se sabhi helpers ki zaroorat hai
const { cloudinary, upload, cleanup, getPublicIdFromUrl } = require('../config/cloudinary');

// @route   GET /api/blogs
// @desc    Get all blog posts (Public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('GET /api/blogs error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET /api/blogs/slug/:slug
// @desc    Get a single blog post by its slug (Public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('GET /api/blogs/slug/:slug error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post (Protected)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  const { title, content, slug } = req.body;

  // Validation
  if (!title || !content || !slug) {
    if (req.file) cleanup(req.file.path);
    return res.status(400).json({ msg: 'Title, content and slug are required' });
  }
  if (!req.file) {
    return res.status(400).json({ msg: 'Featured image is required' });
  }

  try {
    // Cloudinary par image upload karein
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blog-images',
      transformation: [{ width: 1200, height: 630, crop: 'fill' }]
    });
    const featuredImage = result.secure_url;
    
    cleanup(req.file.path); // Server se temp file delete karein

    // Naya blog post banayein
    const newBlog = new Blog({
      title,
      content,
      slug,
      featuredImage
    });

    const blog = await newBlog.save();
    return res.json(blog);

  } catch (err) {
    console.error('POST /api/blogs error:', err);
    if (req.file) cleanup(req.file.path); // Error hone par bhi temp file delete karein

    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).json({ msg: 'A blog with that slug already exists' });
    }
    return res.status(500).json({ msg: 'Server Error creating blog post', error: err.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post (Protected)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  const { title, content, slug } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog post not found' });

    const updatedFields = { title, content, slug };

    // Agar nayi image upload hui hai
    if (req.file) {
      try {
        // Purani image ko Cloudinary se delete karein
        if (blog.featuredImage) {
          const publicId = getPublicIdFromUrl(blog.featuredImage);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }
        // Nayi image upload karein
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blog-images',
          transformation: [{ width: 1200, height: 630, crop: 'fill' }]
        });
        updatedFields.featuredImage = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary update error:', uploadError);
        throw new Error('Failed to update image');
      } finally {
        cleanup(req.file.path); // Temp file delete karein
      }
    }

    // Database mein post ko update karein
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    return res.json(blog);
  } catch (err) {
    console.error('PUT /api/blogs/:id error:', err);
    if (req.file) cleanup(req.file.path); // Error par temp file delete karein
    
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).json({ msg: 'A blog with that slug already exists' });
    }
    return res.status(500).json({ msg: 'Server Error updating post', error: err.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog post not found' });

    // Cloudinary se image delete karein
    if (blog.featuredImage) {
      const publicId = getPublicIdFromUrl(blog.featuredImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err);
          // Yahan error throw na karein, bas log karein, taaki DB se delete na ruke
        }
      }
    }

    // Database se post delete karein
    await Blog.findByIdAndDelete(req.params.id);

    return res.json({ msg: 'Blog post removed' });
  } catch (err) {
    console.error('DELETE /api/blogs/:id error:', err);
    return res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;

