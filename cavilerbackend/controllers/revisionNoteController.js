const RevisionNote = require('../models/RevisionNote');
const path = require('path');
const fs = require('fs');

console.log('🔁 Loading revision note controller...');

// Configure upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads/revision-notes');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOAD_DIR);
}

// Upload new revision note
exports.uploadRevisionNote = async (req, res, next) => {
  console.log('🎯 uploadRevisionNote controller called');
  
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
    const existingNote = await RevisionNote.findOne({
      where: { course, year }
    });

    if (existingNote) {
      console.log('❌ Revision note already exists for this course and year');
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Revision note for this course and year already exists' });
    }

    console.log('💾 Creating revision note record in database...');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const note = await RevisionNote.create({
      course,
      year,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      url: `${baseUrl}/uploads/revision-notes/${req.file.filename}`
    });

    console.log('✅ Revision note uploaded successfully:', note.id);
    res.status(201).json({ 
      success: true,
      message: 'Revision note uploaded successfully', 
      data: note 
    });
  } catch (err) {
    console.error('❌ Error uploading revision note:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload revision note' 
    });
  }
};

// Get all revision notes
exports.getAllRevisionNotes = async (req, res, next) => {
  console.log('🎯 getAllRevisionNotes controller called');
  try {
    console.log('📋 Fetching all revision notes from database...');
    const notes = await RevisionNote.findAll({ 
      order: [['course', 'ASC'], ['year', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${notes.length} revision notes`);
    res.json(notes);
  } catch (err) {
    console.error('❌ Error fetching revision notes:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch revision notes' });
  }
};

// Get revision notes by course
exports.getRevisionNotesByCourse = async (req, res, next) => {
  console.log('🎯 getRevisionNotesByCourse controller called');
  console.log('📋 Course:', req.params.course);
  
  try {
    const { course } = req.params;

    console.log('🔍 Fetching revision notes for course:', course);
    const notes = await RevisionNote.findAll({
      where: { course },
      order: [['year', 'DESC']]
    });
    
    console.log(`✅ Found ${notes.length} revision notes for course: ${course}`);
    res.json(notes);
  } catch (err) {
    console.error('❌ Error fetching revision notes by course:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch revision notes' });
  }
};

// Delete revision note
exports.deleteRevisionNote = async (req, res, next) => {
  console.log('🎯 deleteRevisionNote controller called');
  console.log('🗑️ Deleting revision note ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for revision note with ID:', id);
    const note = await RevisionNote.findByPk(id);
    if (!note) {
      console.log('❌ Revision note not found with ID:', id);
      return res.status(404).json({ error: 'Revision note not found' });
    }

    console.log('✅ Revision note found, checking file existence...');
    // Delete file from filesystem
    if (fs.existsSync(note.filePath)) {
      fs.unlinkSync(note.filePath);
      console.log('🗑️ File deleted from filesystem:', note.filePath);
    } else {
      console.log('⚠️ File not found at path:', note.filePath);
    }

    console.log('🗑️ Deleting revision note record from database...');
    await note.destroy();
    console.log('✅ Revision note deleted successfully');
    res.json({ 
      success: true,
      message: 'Revision note deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Error deleting revision note:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete revision note' 
    });
  }
};

// Get single revision note
exports.getRevisionNote = async (req, res, next) => {
  console.log('🎯 getRevisionNote controller called');
  console.log('📋 Fetching revision note ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for revision note with ID:', id);
    const note = await RevisionNote.findByPk(id);
    if (!note) {
      console.log('❌ Revision note not found with ID:', id);
      return res.status(404).json({ error: 'Revision note not found' });
    }

    console.log('✅ Revision note found');
    res.json(note);
  } catch (err) {
    console.error('❌ Error fetching revision note:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch revision note' });
  }
};

console.log('✅ Revision note controller loaded successfully');