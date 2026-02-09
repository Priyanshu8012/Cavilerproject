const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/blogs');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'blog-' + uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Blog routes
router.post('/blogs', upload.single('image'), blogController.createBlog);
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
router.get('/blogs/category/:category', blogController.getBlogsByCategory);

module.exports = router;