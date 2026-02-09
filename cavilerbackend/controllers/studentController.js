const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

console.log('🔁 Loading student controller...');

// Get all students
exports.getStudents = async (req, res, next) => {
  console.log('🎯 getStudents controller called');
  try {
    console.log('📋 Fetching all students from database...');
    const students = await Student.findAll({
      order: [['createdAt', 'DESC']]
    });

    console.log(`✅ Successfully fetched ${students.length} students`);
    res.json(students);
  } catch (err) {
    console.error('❌ Error fetching students:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Create new student
exports.createStudent = async (req, res, next) => {
  console.log('🎯 createStudent controller called');
  console.log('📦 Request body:', req.body);
  console.log('📁 Uploaded file:', req.file);

  try {
    const { name, achievement, course } = req.body;

    // Validation
    if (!name || !achievement || !course) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!req.file) {
      console.log('❌ Validation failed - no photo uploaded');
      return res.status(400).json({ error: 'Student photo is required' });
    }

    const photoUrl = '/uploads/students/' + req.file.filename;

    console.log('💾 Creating student in database...');
    const student = await Student.create({
      name,
      achievement,
      course,
      photo: photoUrl
    });

    console.log('✅ Student created successfully:', student.id);
    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (err) {
    console.error('❌ Error creating student:', err);
    console.error('🔍 Error details:', err.message);

    // Delete uploaded file if student creation fails
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }

    res.status(500).json({ error: 'Failed to add student' });
  }
};

// Delete student
exports.deleteStudent = async (req, res, next) => {
  console.log('🎯 deleteStudent controller called');
  console.log('🗑️ Deleting student ID:', req.params.id);

  try {
    const { id } = req.params;

    console.log('🔍 Looking for student with ID:', id);
    const student = await Student.findByPk(id);
    if (!student) {
      console.log('❌ Student not found with ID:', id);
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete photo file from server
    const photoPath = path.join(__dirname, '..', student.photo);
    fs.unlink(photoPath, (err) => {
      if (err) console.error('Error deleting photo file:', err);
    });

    console.log('✅ Student found, proceeding with deletion...');
    await student.destroy();
    console.log('✅ Student deleted successfully');
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting student:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

console.log('✅ Student controller loaded successfully');