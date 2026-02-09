const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/banners → relative path should be '/'
router.post('/banners', upload.single('images'), bannerController.createBanner);
router.get('/banners', bannerController.getBanners);
router.delete('/banners/:id', bannerController.deleteBanner);

module.exports = router;
