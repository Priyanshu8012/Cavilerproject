const ImportantQuestion = require('../models/ImportantQuestion');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading important question controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/important-questions');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new important question
exports.uploadImportantQuestion = async (req, res, next) => {
  console.log('🎯 uploadImportantQuestion controller called');
  
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
    const existingQuestion = await ImportantQuestion.findOne({
      where: { course, year }
    });

    if (existingQuestion) {
      console.log('❌ Important question already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Important question for this course and year already exists' });
    }

    console.log('💾 Creating important question record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const question = await ImportantQuestion.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/important-questions/${req.file.filename}`
    });

    console.log('✅ Important question uploaded successfully:', question.id);
    res.status(201).json({ 
      success: true,
      message: 'Important question uploaded successfully', 
      data: question 
    });
  } catch (err) {
    console.error('❌ Error uploading important question:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload important question' 
    });
  }
};

// Get all important questions
exports.getAllImportantQuestions = async (req, res, next) => {
  console.log('🎯 getAllImportantQuestions controller called');
  try {
    console.log('📋 Fetching all important questions from database...');
    const questions = await ImportantQuestion.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${questions.length} important questions`);
    res.json(questions);
  } catch (err) {
    console.error('❌ Error fetching important questions:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch important questions' });
  }
};

// Get important questions by course
exports.getImportantQuestionsByCourse = async (req, res, next) => {
  console.log('🎯 getImportantQuestionsByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching important questions for course:', course);
    const questions = await ImportantQuestion.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${questions.length} important questions for course: ${course}`);
    res.json(questions);
  } catch (err) {
    console.error('❌ Error fetching important questions by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch important questions' });
  }
};

// Delete important question
exports.deleteImportantQuestion = async (req, res, next) => {
  console.log('🎯 deleteImportantQuestion controller called');
  console.log('🗑️ Deleting important question ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for important question with ID:', id);
    const question = await ImportantQuestion.findByPk(id);
    if (!question) {
      console.log('❌ Important question not found with ID:', id);
      return res.status(404).json({ error: 'Important question not found' });
    }

    console.log('✅ Important question found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(question.filePath)) {
      fs.unlinkSync(question.filePath);
      console.log('🗑️ File deleted from filesystem:', question.filePath);
    } else {
      console.log('⚠️ File not found at path:', question.filePath);
    }

    console.log('🗑️ Deleting important question record from database...');
    await question.destroy();
    console.log('✅ Important question deleted successfully');
    res.json({ 
      success: true,
      message: 'Important question deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting important question:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete important question' 
    });
  }
};

// Get single important question
exports.getImportantQuestion = async (req, res, next) => {
  console.log('🎯 getImportantQuestion controller called');
  console.log('📋 Fetching important question ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for important question with ID:', id);
    const question = await ImportantQuestion.findByPk(id);
    if (!question) {
      console.log('❌ Important question not found with ID:', id);
      return res.status(404).json({ error: 'Important question not found' });
    }

    console.log('✅ Important question found');
    res.json(question);
  } catch (err) {
    console.error('❌ Error fetching important question:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch important question' });
  }
};

console.log('✅ Important question controller loaded successfully');