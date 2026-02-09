const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const ensureUploadsDir = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  const contentDir = path.join(uploadsDir, 'content');
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
};

// Create directories on startup
ensureUploadsDir();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    ensureUploadsDir();
    cb(null, './uploads/content');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    cb(null, 'content-' + uniqueSuffix + '-' + originalName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Content routes
router.post('/content', upload.single('file'), contentController.createContent);
router.get('/content', contentController.getAllContent);
router.get('/content/:id', contentController.getContentById);
router.get('/content/category/:category', contentController.getContentByCategory);
router.put('/content/:id', upload.single('file'), contentController.updateContent);
router.delete('/content/:id', contentController.deleteContent);
router.put('/content/:id/progress', contentController.updateUploadProgress);

module.exports = router;