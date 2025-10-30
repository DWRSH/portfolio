const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyToken = require('../middleware/verifyToken');
const Project = require('../models/Project');
// Hamein 'getPublicIdFromUrl' ki zaroorat padegi
const { cloudinary, upload, cleanup, getPublicIdFromUrl } = require('../config/cloudinary');

// @route   GET /api/projects
// @desc    Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();
    return res.json(projects);
  } catch (err) {
    console.error('GET /api/projects error:', err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST /api/projects
// @desc    Create a new project (Protected)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  const { title, description, tags, repoUrl, demoUrl } = req.body;
  
  if (!title || !description) {
    if (req.file) cleanup(req.file.path);
    return res.status(400).json({ msg: 'Title and description are required' });
  }
  
  if (!req.file) {
    return res.status(400).json({ msg: 'Image is required' });
  }

  try {
    let techArray = [];
    if (tags) {
      try {
        techArray = JSON.parse(tags);
      } catch {
        techArray = tags.split(',').map(t => t.trim()).filter(t => t);
      }
    }

    let imageUrl;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'project-images',
        transformation: [{ width: 1200, height: 630, crop: 'fill' }]
      });
      imageUrl = result.secure_url;
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      throw new Error('Failed to upload image');
    } finally {
      cleanup(req.file.path);
    }

    const newProject = new Project({
      title,
      description,
      tags: techArray,
      repoUrl,
      demoUrl,
      imageUrl
    });
    
    const project = await newProject.save();
    return res.json(project);
  } catch (err) {
    console.error('POST /api/projects error:', err);
    if (req.file) cleanup(req.file.path); // Error hone par file clean karein
    return res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project (Protected)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  const { title, description, tags, repoUrl, demoUrl } = req.body;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const updatedFields = {
      title,
      description,
      repoUrl,
      demoUrl,
    };

    if (tags) {
      try {
        updatedFields.tags = JSON.parse(tags);
      } catch {
        updatedFields.tags = tags.split(',').map(t => t.trim()).filter(t => t);
      }
    }

    // Agar nayi image upload hui hai
    if (req.file) {
      try {
        // Purani image ko Cloudinary se delete karein
        if (project.imageUrl) {
          const publicId = getPublicIdFromUrl(project.imageUrl);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }

        // Nayi image upload karein
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'project-images',
          transformation: [{ width: 1200, height: 630, crop: 'fill' }]
        });
        updatedFields.imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary update error:', uploadError);
        throw new Error('Failed to update image');
      } finally {
        cleanup(req.file.path);
      }
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true } // Naya (updated) document return karein
    );

    return res.json(project);
  } catch (err) {
    console.error('PUT /api/projects/:id error:', err);
    if (req.file) cleanup(req.file.path); // Error hone par file clean karein
    return res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Image ko Cloudinary se delete karein
    if (project.imageUrl) {
      const publicId = getPublicIdFromUrl(project.imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err);
          // Agar image delete nahi bhi hoti hai, toh bhi DB se project delete karein
        }
      }
    }

    // Project ko MongoDB se delete karein
    await Project.findByIdAndDelete(req.params.id);

    return res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error('DELETE /api/projects/:id error:', err);
    return res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;
