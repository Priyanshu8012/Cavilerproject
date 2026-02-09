const PreviousPaper = require('../models/PreviousPaper');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading previous paper controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/papers');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new paper
exports.uploadPaper = async (req, res, next) => {
  console.log('🎯 uploadPaper controller called');
  
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
    const existingPaper = await PreviousPaper.findOne({
      where: { course, year }
    });

    if (existingPaper) {
      console.log('❌ Paper already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Paper for this course and year already exists' });
    }

    console.log('💾 Creating paper record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const paper = await PreviousPaper.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/papers/${req.file.filename}`
    });

    console.log('✅ Paper uploaded successfully:', paper.id);
    res.status(201).json({ 
      success: true,
      message: 'Paper uploaded successfully', 
      data: paper 
    });
  } catch (err) {
    console.error('❌ Error uploading paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload paper' 
    });
  }
};

// Get all papers
exports.getAllPapers = async (req, res, next) => {
  console.log('🎯 getAllPapers controller called');
  try {
    console.log('📋 Fetching all papers from database...');
    const papers = await PreviousPaper.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${papers.length} papers`);
    res.json(papers);
  } catch (err) {
    console.error('❌ Error fetching papers:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
};

// Get papers by course
exports.getPapersByCourse = async (req, res, next) => {
  console.log('🎯 getPapersByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching papers for course:', course);
    const papers = await PreviousPaper.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${papers.length} papers for course: ${course}`);
    res.json(papers);
  } catch (err) {
    console.error('❌ Error fetching papers by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
};

// Delete paper
exports.deletePaper = async (req, res, next) => {
  console.log('🎯 deletePaper controller called');
  console.log('🗑️ Deleting paper ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for paper with ID:', id);
    const paper = await PreviousPaper.findByPk(id);
    if (!paper) {
      console.log('❌ Paper not found with ID:', id);
      return res.status(404).json({ error: 'Paper not found' });
    }

    console.log('✅ Paper found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(paper.filePath)) {
      fs.unlinkSync(paper.filePath);
      console.log('🗑️ File deleted from filesystem:', paper.filePath);
    } else {
      console.log('⚠️ File not found at path:', paper.filePath);
    }

    console.log('🗑️ Deleting paper record from database...');
    await paper.destroy();
    console.log('✅ Paper deleted successfully');
    res.json({ 
      success: true,
      message: 'Paper deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete paper' 
    });
  }
};

// Get single paper
exports.getPaper = async (req, res, next) => {
  console.log('🎯 getPaper controller called');
  console.log('📋 Fetching paper ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for paper with ID:', id);
    const paper = await PreviousPaper.findByPk(id);
    if (!paper) {
      console.log('❌ Paper not found with ID:', id);
      return res.status(404).json({ error: 'Paper not found' });
    }

    console.log('✅ Paper found');
    res.json(paper);
  } catch (err) {
    console.error('❌ Error fetching paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch paper' });
  }
};

console.log('✅ Previous paper controller loaded successfully');