const express = require('express');
const multer = require('multer');
const path = require('path');
const revisionNoteController = require('../controllers/revisionNoteController');

console.log('🔁 Loading revision note routes...');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/revision-notes');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'revision-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/revision-notes - Upload new revision note
router.post('/revision-notes', upload.single('pdf'), (req, res, next) => {
  console.log('📍 POST /api/revision-notes route hit', { 
    body: req.body,
    file: req.file ? {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size
    } : 'No file'
  });
  revisionNoteController.uploadRevisionNote(req, res, next);
});

// GET /api/revision-notes - Get all revision notes
router.get('/revision-notes', (req, res, next) => {
  console.log('📍 GET /api/revision-notes route hit');
  revisionNoteController.getAllRevisionNotes(req, res, next);
});

// GET /api/revision-notes/:id - Get single revision note
router.get('/revision-notes/:id', (req, res, next) => {
  console.log('📍 GET /api/revision-notes/:id route hit', { id: req.params.id });
  revisionNoteController.getRevisionNote(req, res, next);
});

// GET /api/revision-notes/course/:course - Get revision notes by course
router.get('/revision-notes/course/:course', (req, res, next) => {
  console.log('📍 GET /api/revision-notes/course/:course route hit', { course: req.params.course });
  revisionNoteController.getRevisionNotesByCourse(req, res, next);
});

// DELETE /api/revision-notes/:id - Delete revision note
router.delete('/revision-notes/:id', (req, res, next) => {
  console.log('📍 DELETE /api/revision-notes/:id route hit', { id: req.params.id });
  revisionNoteController.deleteRevisionNote(req, res, next);
});

console.log('✅ Revision note routes loaded successfully');
module.exports = router;