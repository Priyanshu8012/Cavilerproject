const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profiles');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
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

console.log('🔁 Loading profile routes...');

// GET /api/profiles - Get all profiles
router.get('/profiles', (req, res, next) => {
  console.log('📍 GET /api/profiles route hit');
  profileController.getProfiles(req, res, next);
});

// POST /api/profiles - Create new profile
router.post('/profiles', upload.single('photo'), (req, res, next) => {
  console.log('📍 POST /api/profiles route hit', { body: req.body, file: req.file });
  profileController.createProfile(req, res, next);
});

// PUT /api/profiles/:id - Update profile
router.put('/profiles/:id', upload.single('photo'), (req, res, next) => {
  console.log('📍 PUT /api/profiles/:id route hit', { id: req.params.id, body: req.body, file: req.file });
  profileController.updateProfile(req, res, next);
});

// DELETE /api/profiles/:id - Delete profile
router.delete('/profiles/:id', (req, res, next) => {
  console.log('📍 DELETE /api/profiles/:id route hit', { id: req.params.id });
  profileController.deleteProfile(req, res, next);
});

console.log('✅ Profile routes loaded successfully');
module.exports = router;