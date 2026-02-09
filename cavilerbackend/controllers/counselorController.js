const Counselor = require('../models/Counselor');
const path = require('path');
const fs = require('fs');

// Get all counselors
exports.getCounselors = async (req, res, next) => {
  try {
    const counselors = await Counselor.findAll({ 
      where: { is_active: true },
      order: [['experience', 'DESC']] 
    });
    res.json(counselors);
  } catch (err) {
    next(err);
  }
};

// Get counselor by ID
exports.getCounselorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const counselor = await Counselor.findByPk(id);
    
    if (!counselor) {
      return res.status(404).json({ error: 'Counselor not found' });
    }
    
    res.json(counselor);
  } catch (err) {
    next(err);
  }
};

// Create new counselor
exports.createCounselor = async (req, res, next) => {
  try {
    const { name, designation, qualification, experience, bio, email, phone, specialties } = req.body;
    
    // Basic validation
    if (!name || !designation || !qualification || !experience) {
      return res.status(400).json({ error: 'Name, designation, qualification, and experience are required' });
    }

    let photoUrl = null;
    if (req.file) {
      photoUrl = '/uploads/counselors/' + req.file.filename;
    }

    const counselor = await Counselor.create({
      name,
      designation,
      qualification,
      experience: parseInt(experience),
      photo: photoUrl,
      bio,
      email,
      phone,
      specialties: specialties ? JSON.parse(specialties) : null
    });
    
    res.status(201).json({ message: 'Counselor created successfully', counselor });
  } catch (err) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => console.log('Error deleting file:', err));
    }
    next(err);
  }
};

// Update counselor
exports.updateCounselor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, designation, qualification, experience, bio, email, phone, specialties } = req.body;

    const counselor = await Counselor.findByPk(id);
    if (!counselor) {
      return res.status(404).json({ error: 'Counselor not found' });
    }

    let photoUrl = counselor.photo;
    
    // If new photo uploaded, delete old one and update with new
    if (req.file) {
      // Delete old photo if exists
      if (counselor.photo) {
        const oldPhotoPath = path.join(__dirname, '..', counselor.photo);
        fs.unlink(oldPhotoPath, (err) => {
          if (err) console.log('Error deleting old photo:', err);
        });
      }
      photoUrl = '/uploads/counselors/' + req.file.filename;
    }

    await counselor.update({
      name,
      designation,
      qualification,
      experience: experience ? parseInt(experience) : counselor.experience,
      photo: photoUrl,
      bio,
      email,
      phone,
      specialties: specialties ? JSON.parse(specialties) : counselor.specialties
    });

    res.json({ message: 'Counselor updated successfully', counselor });
  } catch (err) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => console.log('Error deleting file:', err));
    }
    next(err);
  }
};

// Delete counselor (soft delete)
exports.deleteCounselor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const counselor = await Counselor.findByPk(id);
    
    if (!counselor) {
      return res.status(404).json({ error: 'Counselor not found' });
    }

    // Soft delete by setting is_active to false
    await counselor.update({ is_active: false });

    res.json({ message: 'Counselor deleted successfully' });
  } catch (err) {
    next(err);
  }
};