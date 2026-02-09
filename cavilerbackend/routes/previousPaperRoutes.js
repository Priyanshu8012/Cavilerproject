const express = require('express');
const multer = require('multer');
const path = require('path');
const previousPaperController = require('../controllers/previousPaperController');

console.log('🔁 Loading previous paper routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/papers');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'paper-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/upload - Upload new paper
router.post('/upload', upload.single('pdf'), (req, res, next) => {
  console.log('📍 POST /api/upload route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  previousPaperController.uploadPaper(req, res, next);
});

// GET /api/papers - Get all papers
router.get('/papers', (req, res, next) => {
  console.log('📍 GET /api/papers route hit');
  previousPaperController.getAllPapers(req, res, next);
});

// GET /api/papers/:id - Get single paper
router.get('/papers/:id', (req, res, next) => {
  console.log('📍 GET /api/papers/:id route hit', { id: req.params.id });
  previousPaperController.getPaper(req, res, next);
});

// GET /api/papers/course/:course - Get papers by course
router.get('/papers/course/:course', (req, res, next) => {
  console.log('📍 GET /api/papers/course/:course route hit', { course: req.params.course });
  previousPaperController.getPapersByCourse(req, res, next);
});

// DELETE /api/papers/:id - Delete paper
router.delete('/papers/:id', (req, res, next) => {
  console.log('📍 DELETE /api/papers/:id route hit', { id: req.params.id });
  previousPaperController.deletePaper(req, res, next);
});

console.log('✅ Previous paper routes loaded successfully');
module.exports = router;