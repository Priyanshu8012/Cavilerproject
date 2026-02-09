const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');

console.log('🔁 Loading course controller...');

// Get all courses
exports.getCourses = async (req, res, next) => {
  console.log('🎯 getCourses controller called');
  try {
    const courses = await Course.findAll({
      order: [['createdAt', 'DESC']]
    });
    console.log(`✅ Successfully fetched ${courses.length} courses`);
    res.json(courses);
  } catch (err) {
    console.error('❌ Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Create new course
exports.createCourse = async (req, res, next) => {
  console.log('🎯 createCourse controller called');
  try {
    const { name, price, description, duration, category } = req.body;

    if (!name || !price || !description || !duration || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imageUrl = req.file ? '/uploads/courses/' + req.file.filename : null;

    const course = await Course.create({
      name,
      price,
      description,
      duration,
      category,
      image: imageUrl
    });

    console.log('✅ Course created successfully:', course.id);
    res.status(201).json(course);
  } catch (err) {
    console.error('❌ Error creating course:', err);
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Update course
exports.updateCourse = async (req, res, next) => {
  console.log('🎯 updateCourse controller called');
  try {
    const { id } = req.params;
    const { name, price, description, duration, category } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete old image if new one is uploaded
    if (req.file && course.image) {
      const oldImagePath = path.join(__dirname, '..', course.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    const imageUrl = req.file ? '/uploads/courses/' + req.file.filename : course.image;

    await course.update({
      name,
      price,
      description,
      duration,
      category,
      image: imageUrl
    });

    console.log('✅ Course updated successfully:', id);
    res.json(course);
  } catch (err) {
    console.error('❌ Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete course
exports.deleteCourse = async (req, res, next) => {
  console.log('🎯 deleteCourse controller called');
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete image file
    if (course.image) {
      const imagePath = path.join(__dirname, '..', course.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

    await course.destroy();
    console.log('✅ Course deleted successfully');
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

console.log('✅ Course controller loaded successfully');