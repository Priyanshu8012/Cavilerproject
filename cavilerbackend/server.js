// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const bannerRoutes = require('./routes/banner');
const testimonialRoutes = require('./routes/testimonialRoutes');
const studentRoutes = require('./routes/studentRoutes')
const storyRoutes = require('./routes/storyRoutes');
const courseRoutes = require('./routes/courseRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const teacherJobRoutes = require('./routes/teacherJobRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const previousPaperRoutes = require('./routes/previousPaperRoutes');
const importantQuestionRoutes = require('./routes/importantQuestionRoutes');
const ncrtSolutionRoutes = require('./routes/ncrtSolutionRoutes');
const samplePaperRoutes = require('./routes/samplePaperRoutes');
const ncrtBookRoutes = require('./routes/ncrtBookRoutes');
const revisionNoteRoutes = require('./routes/revisionNoteRoutes');
const counselorRoutes = require('./routes/counselorRoutes');
const contentRoutes = require('./routes/contentRoutes');
const blogRoutes = require('./routes/blogRoutes');
const examRoutes = require('./routes/examRoutes');
const timetableRoutes = require('./routes/timetableRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ✅ CORS setup for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // your frontend URL from env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// multer 
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add request logging middleware
app.use((req, res, next) => {
  console.log('📨 Incoming Request:', {
    method: req.method,
    url: req.url,
    path: req.path,
    originalUrl: req.originalUrl
  });
  next();
});

app.get('/', (req, res) => res.send('Auth backend is live'));

// ✅ FIX: Mount routes with /api prefix
app.use('/api', authRoutes);      // → /api/register, /api/login, etc.
app.use('/api', bannerRoutes);    // → /api/banners/...
app.use('/api', testimonialRoutes);    // → /api/testimonials
app.use('/api', studentRoutes);
app.use('/api', storyRoutes);
app.use('/api', courseRoutes);
app.use('/api', profileRoutes);
app.use('/api', messageRoutes);
app.use('/api', teacherJobRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', previousPaperRoutes);
app.use('/api', importantQuestionRoutes);
app.use('/api', ncrtSolutionRoutes);
app.use('/api', ncrtBookRoutes);
app.use('/api', samplePaperRoutes);
app.use('/api', revisionNoteRoutes);
app.use('/api', blogRoutes);
app.use('/api', contentRoutes);
app.use('/api', examRoutes);
app.use('/api', timetableRoutes);
app.use('/api', counselorRoutes);
app.use('/api', publicationRoutes);
// Add a test route to verify
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// error handling
app.use(errorHandler);

// connect DB and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    console.log('All models synced');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('📋 Available Testimonial Routes:');
      console.log('   GET    /api/testimonials');
      console.log('   POST   /api/testimonials');
      console.log('   DELETE /api/testimonials/:id');
      console.log('   PUT    /api/testimonials/:id');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();