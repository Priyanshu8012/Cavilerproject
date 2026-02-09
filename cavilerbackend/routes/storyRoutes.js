const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/stories');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'story-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

console.log('🔁 Loading story routes...');

// GET /api/stories - Get all stories
router.get('/stories', (req, res, next) => {
  console.log('📍 GET /api/stories route hit');
  storyController.getStories(req, res, next);
});

// POST /api/stories - Create new story
router.post('/stories', upload.single('image'), (req, res, next) => {
  console.log('📍 POST /api/stories route hit', { body: req.body, file: req.file });
  storyController.createStory(req, res, next);
});

// DELETE /api/stories/:id - Delete story
router.delete('/stories/:id', (req, res, next) => {
  console.log('📍 DELETE /api/stories/:id route hit', { id: req.params.id });
  storyController.deleteStory(req, res, next);
});

console.log('✅ Story routes loaded successfully');
module.exports = router;