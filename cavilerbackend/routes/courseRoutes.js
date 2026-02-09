const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/courses');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'course-' + uniqueSuffix + path.extname(file.originalname));
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

console.log('🔁 Loading course routes...');

// GET /api/courses - Get all courses
router.get('/courses', (req, res, next) => {
  console.log('📍 GET /api/courses route hit');
  courseController.getCourses(req, res, next);
});

// POST /api/courses - Create new course
router.post('/courses', upload.single('image'), (req, res, next) => {
  console.log('📍 POST /api/courses route hit', { body: req.body, file: req.file });
  courseController.createCourse(req, res, next);
});

// PUT /api/courses/:id - Update course
router.put('/courses/:id', upload.single('image'), (req, res, next) => {
  console.log('📍 PUT /api/courses/:id route hit', { id: req.params.id, body: req.body, file: req.file });
  courseController.updateCourse(req, res, next);
});

// DELETE /api/courses/:id - Delete course
router.delete('/courses/:id', (req, res, next) => {
  console.log('📍 DELETE /api/courses/:id route hit', { id: req.params.id });
  courseController.deleteCourse(req, res, next);
});

console.log('✅ Course routes loaded successfully');
module.exports = router;