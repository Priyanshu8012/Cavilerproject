const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const multer = require('multer');

// Multer config for publication images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/publications');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/publications → relative path should be '/'
router.post('/publications', upload.single('image'), publicationController.createPublication);
router.get('/publications', publicationController.getPublications);
router.get('/publications/:id', publicationController.getPublicationById);
router.put('/publications/:id', upload.single('image'), publicationController.updatePublication);
router.delete('/publications/:id', publicationController.deletePublication);

module.exports = router;