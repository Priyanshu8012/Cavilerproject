const express = require('express');
const multer = require('multer');
const path = require('path');
const importantQuestionController = require('../controllers/importantQuestionController');

console.log('🔁 Loading important question routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/important-questions');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'important-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// POST /api/important-questions/upload - Upload new important question
router.post('/important-questions/upload', upload.single('pdf'), (req, res, next) => {
  console.log('📍 POST /api/important-questions/upload route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  importantQuestionController.uploadImportantQuestion(req, res, next);
});

// GET /api/important-questions - Get all important questions
router.get('/important-questions', (req, res, next) => {
  console.log('📍 GET /api/important-questions route hit');
  importantQuestionController.getAllImportantQuestions(req, res, next);
});

// GET /api/important-questions/:id - Get single important question
router.get('/important-questions/:id', (req, res, next) => {
  console.log('📍 GET /api/important-questions/:id route hit', { id: req.params.id });
  importantQuestionController.getImportantQuestion(req, res, next);
});

// GET /api/important-questions/course/:course - Get important questions by course
router.get('/important-questions/course/:course', (req, res, next) => {
  console.log('📍 GET /api/important-questions/course/:course route hit', { course: req.params.course });
  importantQuestionController.getImportantQuestionsByCourse(req, res, next);
});

// DELETE /api/important-questions/:id - Delete important question
router.delete('/important-questions/:id', (req, res, next) => {
  console.log('📍 DELETE /api/important-questions/:id route hit', { id: req.params.id });
  importantQuestionController.deleteImportantQuestion(req, res, next);
});

console.log('✅ Important question routes loaded successfully');
module.exports = router;