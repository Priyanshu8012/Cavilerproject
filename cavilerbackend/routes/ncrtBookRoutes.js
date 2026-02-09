const express = require('express');
const multer = require('multer');
const path = require('path');
const ncrtBookController = require('../controllers/ncrtBookController');

console.log('🔁 Loading NCERT book routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/ncrt-books');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ncrt-book-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/ncrt-books - Upload new NCERT book
router.post('/ncrt-books', upload.single('file'), (req, res, next) => {
  console.log('📍 POST /api/ncrt-books route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  ncrtBookController.uploadNCRTBook(req, res, next);
});

// GET /api/ncrt-books - Get all NCERT books
router.get('/ncrt-books', (req, res, next) => {
  console.log('📍 GET /api/ncrt-books route hit');
  ncrtBookController.getAllNCRTBooks(req, res, next);
});

// GET /api/ncrt-books/:id - Get single NCERT book
router.get('/ncrt-books/:id', (req, res, next) => {
  console.log('📍 GET /api/ncrt-books/:id route hit', { id: req.params.id });
  ncrtBookController.getNCRTBook(req, res, next);
});

// GET /api/ncrt-books/course/:course - Get NCERT books by course
router.get('/ncrt-books/course/:course', (req, res, next) => {
  console.log('📍 GET /api/ncrt-books/course/:course route hit', { course: req.params.course });
  ncrtBookController.getNCRTBooksByCourse(req, res, next);
});

// DELETE /api/ncrt-books/:id - Delete NCERT book
router.delete('/ncrt-books/:id', (req, res, next) => {
  console.log('📍 DELETE /api/ncrt-books/:id route hit', { id: req.params.id });
  ncrtBookController.deleteNCRTBook(req, res, next);
});

console.log('✅ NCERT book routes loaded successfully');
module.exports = router;