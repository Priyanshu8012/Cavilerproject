const NCRTSolution = require('../models/NCRTSolution');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading NCERT solution controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/ncrt-solutions');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new NCERT solution
exports.uploadNCRTSolution = async (req, res, next) => {
  console.log('🎯 uploadNCRTSolution controller called');
  
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
    const existingSolution = await NCRTSolution.findOne({
      where: { course, year }
    });

    if (existingSolution) {
      console.log('❌ NCERT solution already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'NCERT solution for this course and year already exists' });
    }

    console.log('💾 Creating NCERT solution record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const solution = await NCRTSolution.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/ncrt-solutions/${req.file.filename}`
    });

    console.log('✅ NCERT solution uploaded successfully:', solution.id);
    res.status(201).json({ 
      success: true,
      message: 'NCERT solution uploaded successfully', 
      data: solution 
    });
  } catch (err) {
    console.error('❌ Error uploading NCERT solution:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload NCERT solution' 
    });
  }
};

// Get all NCERT solutions
exports.getAllNCRTSolutions = async (req, res, next) => {
  console.log('🎯 getAllNCRTSolutions controller called');
  try {
    console.log('📋 Fetching all NCERT solutions from database...');
    const solutions = await NCRTSolution.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${solutions.length} NCERT solutions`);
    res.json(solutions);
  } catch (err) {
    console.error('❌ Error fetching NCERT solutions:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT solutions' });
  }
};

// Get NCERT solutions by course
exports.getNCRTSolutionsByCourse = async (req, res, next) => {
  console.log('🎯 getNCRTSolutionsByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching NCERT solutions for course:', course);
    const solutions = await NCRTSolution.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${solutions.length} NCERT solutions for course: ${course}`);
    res.json(solutions);
  } catch (err) {
    console.error('❌ Error fetching NCERT solutions by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT solutions' });
  }
};

// Delete NCERT solution
exports.deleteNCRTSolution = async (req, res, next) => {
  console.log('🎯 deleteNCRTSolution controller called');
  console.log('🗑️ Deleting NCERT solution ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for NCERT solution with ID:', id);
    const solution = await NCRTSolution.findByPk(id);
    if (!solution) {
      console.log('❌ NCERT solution not found with ID:', id);
      return res.status(404).json({ error: 'NCERT solution not found' });
    }

    console.log('✅ NCERT solution found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(solution.filePath)) {
      fs.unlinkSync(solution.filePath);
      console.log('🗑️ File deleted from filesystem:', solution.filePath);
    } else {
      console.log('⚠️ File not found at path:', solution.filePath);
    }

    console.log('🗑️ Deleting NCERT solution record from database...');
    await solution.destroy();
    console.log('✅ NCERT solution deleted successfully');
    res.json({ 
      success: true,
      message: 'NCERT solution deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting NCERT solution:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete NCERT solution' 
    });
  }
};

// Get single NCERT solution
exports.getNCRTSolution = async (req, res, next) => {
  console.log('🎯 getNCRTSolution controller called');
  console.log('📋 Fetching NCERT solution ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for NCERT solution with ID:', id);
    const solution = await NCRTSolution.findByPk(id);
    if (!solution) {
      console.log('❌ NCERT solution not found with ID:', id);
      return res.status(404).json({ error: 'NCERT solution not found' });
    }

    console.log('✅ NCERT solution found');
    res.json(solution);
  } catch (err) {
    console.error('❌ Error fetching NCERT solution:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch NCERT solution' });
  }
};

console.log('✅ NCERT solution controller loaded successfully');