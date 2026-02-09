const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/students');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'student-' + uniqueSuffix + path.extname(file.originalname));
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

console.log('🔁 Loading student routes...');

// GET /api/students - Get all students
router.get('/students', (req, res, next) => {
  console.log('📍 GET /api/students route hit');
  studentController.getStudents(req, res, next);
});

// POST /api/students - Create new student
router.post('/students', upload.single('photo'), (req, res, next) => {
  console.log('📍 POST /api/students route hit', { body: req.body, file: req.file });
  studentController.createStudent(req, res, next);
});

// DELETE /api/students/:id - Delete student
router.delete('/students/:id', (req, res, next) => {
  console.log('📍 DELETE /api/students/:id route hit', { id: req.params.id });
  studentController.deleteStudent(req, res, next);
});

console.log('✅ Student routes loaded successfully');
module.exports = router;