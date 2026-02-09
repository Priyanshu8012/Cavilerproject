const NCRTBook = require('../models/NCRTBook');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading NCERT book controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/ncrt-books');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new NCERT book
exports.uploadNCRTBook = async (req, res, next) => {
  console.log('🎯 uploadNCRTBook controller called');
  
  try {
    console.log('📦 Request body:', req.body);
    console.log('📁 Uploaded file:', req.file);

    const { course, year } = req.body;

    console.log('🔍 Validating fields...');
    // Validation
    if (!course || !year) {
      console.log('❌ Validation failed - missing fields');
      console.log('📋 Fields received:', { course, year });
      return res.status(400).json({ error: 'Course and year are required' });
    }

    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ error: 'PDF file is required' });
    }

    console.log('🔍 Validating file type...');
    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      console.log('❌ Invalid file type:', req.file.mimetype);
      // Remove uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    console.log('🔍 Validating year...');
    // Validate year
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > currentYear) {
      console.log('❌ Invalid year:', year);
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Please enter a valid year' });
    }

    console.log('🔍 Checking for duplicate...');
    // Check for duplicate
    const existingBook = await NCRTBook.findOne({
      where: { course, year }
    });

    if (existingBook) {
      console.log('❌ NCERT book already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'NCERT book for this course and year already exists' });
    }

    console.log('💾 Creating NCERT book record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const book = await NCRTBook.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/ncrt-books/${req.file.filename}`
    });

    console.log('✅ NCERT book uploaded successfully:', book.id);
    res.status(201).json({ 
      success: true,
      message: 'NCERT book uploaded successfully', 
      data: book 
    });
  } catch (err) {
    console.error('❌ Error uploading NCERT book:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload NCERT book' 
    });
  }
};

// Get all NCERT books
exports.getAllNCRTBooks = async (req, res, next) => {
  console.log('🎯 getAllNCRTBooks controller called');
  try {
    console.log('📋 Fetching all NCERT books from database...');
    const books = await NCRTBook.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${books.length} NCERT books`);
    res.json(books);
  } catch (err) {
    console.error('❌ Error fetching NCERT books:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT books' });
  }
};

// Get NCERT books by course
exports.getNCRTBooksByCourse = async (req, res, next) => {
  console.log('🎯 getNCRTBooksByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching NCERT books for course:', course);
    const books = await NCRTBook.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${books.length} NCERT books for course: ${course}`);
    res.json(books);
  } catch (err) {
    console.error('❌ Error fetching NCERT books by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT books' });
  }
};

// Delete NCERT book
exports.deleteNCRTBook = async (req, res, next) => {
  console.log('🎯 deleteNCRTBook controller called');
  console.log('🗑️ Deleting NCERT book ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for NCERT book with ID:', id);
    const book = await NCRTBook.findByPk(id);
    if (!book) {
      console.log('❌ NCERT book not found with ID:', id);
      return res.status(404).json({ error: 'NCERT book not found' });
    }

    console.log('✅ NCERT book found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(book.filePath)) {
      fs.unlinkSync(book.filePath);
      console.log('🗑️ File deleted from filesystem:', book.filePath);
    } else {
      console.log('⚠️ File not found at path:', book.filePath);
    }

    console.log('🗑️ Deleting NCERT book record from database...');
    await book.destroy();
    console.log('✅ NCERT book deleted successfully');
    res.json({ 
      success: true,
      message: 'NCERT book deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting NCERT book:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete NCERT book' 
    });
  }
};

// Get single NCERT book
exports.getNCRTBook = async (req, res, next) => {
  console.log('🎯 getNCRTBook controller called');
  console.log('📋 Fetching NCERT book ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for NCERT book with ID:', id);
    const book = await NCRTBook.findByPk(id);
    if (!book) {
      console.log('❌ NCERT book not found with ID:', id);
      return res.status(404).json({ error: 'NCERT book not found' });
    }

    console.log('✅ NCERT book found');
    res.json(book);
  } catch (err) {
    console.error('❌ Error fetching NCERT book:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT book' });
  }
};

console.log('✅ NCERT book controller loaded successfully');