const express = require('express');
const multer = require('multer');
const path = require('path');
const ncrtSolutionController = require('../controllers/ncrtSolutionController');

console.log('🔁 Loading NCERT solution routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/ncrt-solutions');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ncrt-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/ncrt-solutions/upload - Upload new NCERT solution
router.post('/ncrt-solutions/upload', upload.single('pdf'), (req, res, next) => {
  console.log('📍 POST /api/ncrt-solutions/upload route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  ncrtSolutionController.uploadNCRTSolution(req, res, next);
});

// GET /api/ncrt-solutions - Get all NCERT solutions
router.get('/ncrt-solutions', (req, res, next) => {
  console.log('📍 GET /api/ncrt-solutions route hit');
  ncrtSolutionController.getAllNCRTSolutions(req, res, next);
});

// GET /api/ncrt-solutions/:id - Get single NCERT solution
router.get('/ncrt-solutions/:id', (req, res, next) => {
  console.log('📍 GET /api/ncrt-solutions/:id route hit', { id: req.params.id });
  ncrtSolutionController.getNCRTSolution(req, res, next);
});

// GET /api/ncrt-solutions/course/:course - Get NCERT solutions by course
router.get('/ncrt-solutions/course/:course', (req, res, next) => {
  console.log('📍 GET /api/ncrt-solutions/course/:course route hit', { course: req.params.course });
  ncrtSolutionController.getNCRTSolutionsByCourse(req, res, next);
});

// DELETE /api/ncrt-solutions/:id - Delete NCERT solution
router.delete('/ncrt-solutions/:id', (req, res, next) => {
  console.log('📍 DELETE /api/ncrt-solutions/:id route hit', { id: req.params.id });
  ncrtSolutionController.deleteNCRTSolution(req, res, next);
});

console.log('✅ NCERT solution routes loaded successfully');
module.exports = router;