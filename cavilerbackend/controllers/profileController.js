const Profile = require('../models/Profile');
const fs = require('fs');
const path = require('path');

console.log('🔁 Loading profile controller...');

// Get all profiles
exports.getProfiles = async (req, res, next) => {
  console.log('🎯 getProfiles controller called');
  try {
    const profiles = await Profile.findAll({
      order: [['createdAt', 'DESC']]
    });
    console.log(`✅ Successfully fetched ${profiles.length} profiles`);
    res.json(profiles);
  } catch (err) {
    console.error('❌ Error fetching profiles:', err);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};

// Create new profile
exports.createProfile = async (req, res, next) => {
  console.log('🎯 createProfile controller called');
  try {
    const { name, post, education, experience, specialization, achievements } = req.body;

    if (!name || !post || !education || !experience) {
      return res.status(400).json({ error: 'Name, post, education, and experience are required' });
    }

    const photoUrl = req.file ? '/uploads/profiles/' + req.file.filename : null;

    const profile = await Profile.create({
      name,
      post,
      education,
      experience,
      specialization,
      achievements,
      photo: photoUrl
    });

    console.log('✅ Profile created successfully:', profile.id);
    res.status(201).json(profile);
  } catch (err) {
    console.error('❌ Error creating profile:', err);
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

// Update profile
exports.updateProfile = async (req, res, next) => {
  console.log('🎯 updateProfile controller called');
  try {
    const { id } = req.params;
    const { name, post, education, experience, specialization, achievements } = req.body;

    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Delete old photo if new one is uploaded
    if (req.file && profile.photo) {
      const oldPhotoPath = path.join(__dirname, '..', profile.photo);
      fs.unlink(oldPhotoPath, (err) => {
        if (err) console.error('Error deleting old photo:', err);
      });
    }

    const photoUrl = req.file ? '/uploads/profiles/' + req.file.filename : profile.photo;

    await profile.update({
      name,
      post,
      education,
      experience,
      specialization,
      achievements,
      photo: photoUrl
    });

    console.log('✅ Profile updated successfully:', id);
    res.json(profile);
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Delete profile
exports.deleteProfile = async (req, res, next) => {
  console.log('🎯 deleteProfile controller called');
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Delete photo file
    if (profile.photo) {
      const photoPath = path.join(__dirname, '..', profile.photo);
      fs.unlink(photoPath, (err) => {
        if (err) console.error('Error deleting photo file:', err);
      });
    }

    await profile.destroy();
    console.log('✅ Profile deleted successfully');
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting profile:', err);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};

console.log('✅ Profile controller loaded successfully');