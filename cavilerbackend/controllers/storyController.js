const Story = require('../models/Story');
const fs = require('fs');
const path = require('path');

console.log('🔁 Loading story controller...');

// Get all stories
exports.getStories = async (req, res, next) => {
  console.log('🎯 getStories controller called');
  try {
    console.log('📋 Fetching all stories from database...');
    const stories = await Story.findAll({
      order: [['createdAt', 'DESC']]
    });

    console.log(`✅ Successfully fetched ${stories.length} stories`);
    res.json(stories);
  } catch (err) {
    console.error('❌ Error fetching stories:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};

// Create new story
exports.createStory = async (req, res, next) => {
  console.log('🎯 createStory controller called');
  console.log('📦 Request body:', req.body);
  console.log('📁 Uploaded file:', req.file);

  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ error: 'Title and description are required' });
    }

    if (!req.file) {
      console.log('❌ Validation failed - no image uploaded');
      return res.status(400).json({ error: 'Story image is required' });
    }

    const imageUrl = '/uploads/stories/' + req.file.filename;

    console.log('💾 Creating story in database...');
    const story = await Story.create({
      title,
      description,
      image: imageUrl
    });

    console.log('✅ Story created successfully:', story.id);
    res.status(201).json({
      message: 'Story created successfully',
      story
    });
  } catch (err) {
    console.error('❌ Error creating story:', err);
    console.error('🔍 Error details:', err.message);

    // Delete uploaded file if story creation fails
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }

    res.status(500).json({ error: 'Failed to create story' });
  }
};

// Delete story
exports.deleteStory = async (req, res, next) => {
  console.log('🎯 deleteStory controller called');
  console.log('🗑️ Deleting story ID:', req.params.id);

  try {
    const { id } = req.params;

    console.log('🔍 Looking for story with ID:', id);
    const story = await Story.findByPk(id);
    if (!story) {
      console.log('❌ Story not found with ID:', id);
      return res.status(404).json({ error: 'Story not found' });
    }

    // Delete image file from server
    const imagePath = path.join(__dirname, '..', story.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting image file:', err);
    });

    console.log('✅ Story found, proceeding with deletion...');
    await story.destroy();
    console.log('✅ Story deleted successfully');
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting story:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to delete story' });
  }
};

console.log('✅ Story controller loaded successfully');