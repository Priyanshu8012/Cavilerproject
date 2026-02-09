const SamplePaper = require('../models/SamplePaper');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading sample paper controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/sample-papers');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new sample paper
exports.uploadSamplePaper = async (req, res, next) => {
  console.log('🎯 uploadSamplePaper controller called');
  
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
    const existingPaper = await SamplePaper.findOne({
      where: { course, year }
    });

    if (existingPaper) {
      console.log('❌ Sample paper already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Sample paper for this course and year already exists' });
    }

    console.log('💾 Creating sample paper record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const paper = await SamplePaper.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/sample-papers/${req.file.filename}`
    });

    console.log('✅ Sample paper uploaded successfully:', paper.id);
    res.status(201).json({ 
      success: true,
      message: 'Sample paper uploaded successfully', 
      data: paper 
    });
  } catch (err) {
    console.error('❌ Error uploading sample paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload sample paper' 
    });
  }
};

// Get all sample papers
exports.getAllSamplePapers = async (req, res, next) => {
  console.log('🎯 getAllSamplePapers controller called');
  try {
    console.log('📋 Fetching all sample papers from database...');
    const papers = await SamplePaper.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${papers.length} sample papers`);
    res.json(papers);
  } catch (err) {
    console.error('❌ Error fetching sample papers:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch sample papers' });
  }
};

// Get sample papers by course
exports.getSamplePapersByCourse = async (req, res, next) => {
  console.log('🎯 getSamplePapersByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching sample papers for course:', course);
    const papers = await SamplePaper.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${papers.length} sample papers for course: ${course}`);
    res.json(papers);
  } catch (err) {
    console.error('❌ Error fetching sample papers by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch sample papers' });
  }
};

// Delete sample paper
exports.deleteSamplePaper = async (req, res, next) => {
  console.log('🎯 deleteSamplePaper controller called');
  console.log('🗑️ Deleting sample paper ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for sample paper with ID:', id);
    const paper = await SamplePaper.findByPk(id);
    if (!paper) {
      console.log('❌ Sample paper not found with ID:', id);
      return res.status(404).json({ error: 'Sample paper not found' });
    }

    console.log('✅ Sample paper found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(paper.filePath)) {
      fs.unlinkSync(paper.filePath);
      console.log('🗑️ File deleted from filesystem:', paper.filePath);
    } else {
      console.log('⚠️ File not found at path:', paper.filePath);
    }

    console.log('🗑️ Deleting sample paper record from database...');
    await paper.destroy();
    console.log('✅ Sample paper deleted successfully');
    res.json({ 
      success: true,
      message: 'Sample paper deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting sample paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete sample paper' 
    });
  }
};

// Get single sample paper
exports.getSamplePaper = async (req, res, next) => {
  console.log('🎯 getSamplePaper controller called');
  console.log('📋 Fetching sample paper ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for sample paper with ID:', id);
    const paper = await SamplePaper.findByPk(id);
    if (!paper) {
      console.log('❌ Sample paper not found with ID:', id);
      return res.status(404).json({ error: 'Sample paper not found' });
    }

    console.log('✅ Sample paper found');
    res.json(paper);
  } catch (err) {
    console.error('❌ Error fetching sample paper:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch sample paper' });
  }
};

console.log('✅ Sample paper controller loaded successfully');