const express = require('express');
const router = express.Router();
const counselorController = require('../controllers/counselorController');
const multer = require('multer');

// Multer config for counselor images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/counselors');
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

// POST /api/counselors → relative path should be '/'
router.post('/counselors', upload.single('photo'), counselorController.createCounselor);
router.get('/counselors', counselorController.getCounselors);
router.get('/counselors/:id', counselorController.getCounselorById);
router.put('/counselors/:id', upload.single('photo'), counselorController.updateCounselor);
router.delete('/counselors/:id', counselorController.deleteCounselor);

module.exports = router;