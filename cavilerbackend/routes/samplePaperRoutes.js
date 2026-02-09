const express = require('express');
const multer = require('multer');
const path = require('path');
const samplePaperController = require('../controllers/samplePaperController');

console.log('🔁 Loading sample paper routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/sample-papers');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'sample-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/sample-papers - Upload new sample paper
router.post('/sample-papers', upload.single('file'), (req, res, next) => {
  console.log('📍 POST /api/sample-papers route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  samplePaperController.uploadSamplePaper(req, res, next);
});

// GET /api/sample-papers - Get all sample papers
router.get('/sample-papers', (req, res, next) => {
  console.log('📍 GET /api/sample-papers route hit');
  samplePaperController.getAllSamplePapers(req, res, next);
});

// GET /api/sample-papers/:id - Get single sample paper
router.get('/sample-papers/:id', (req, res, next) => {
  console.log('📍 GET /api/sample-papers/:id route hit', { id: req.params.id });
  samplePaperController.getSamplePaper(req, res, next);
});

// GET /api/sample-papers/course/:course - Get sample papers by course
router.get('/sample-papers/course/:course', (req, res, next) => {
  console.log('📍 GET /api/sample-papers/course/:course route hit', { course: req.params.course });
  samplePaperController.getSamplePapersByCourse(req, res, next);
});

// DELETE /api/sample-papers/:id - Delete sample paper
router.delete('/sample-papers/:id', (req, res, next) => {
  console.log('📍 DELETE /api/sample-papers/:id route hit', { id: req.params.id });
  samplePaperController.deleteSamplePaper(req, res, next);
});

console.log('✅ Sample paper routes loaded successfully');
module.exports = router;