const TeacherJob = require('../models/TeacherJob');

console.log('🔁 Loading teacher job controller...');

// Create new teacher job application
exports.createTeacherJob = async (req, res, next) => {
  console.log('🎯 createTeacherJob controller called');
  console.log('📦 Request body:', req.body);
  
  try {
    const { name, email, phone, degree, subject, experience, message } = req.body;

    console.log('🔍 Validating fields...');
    // Validation
    if (!name || !email || !phone || !degree || !subject || !experience || !message) {
      console.log('❌ Validation failed - missing fields');
      console.log('📋 Fields received:', { name, email, phone, degree, subject, experience, message });
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('🔍 Validating email format...');
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log('🔍 Validating phone number...');
    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      console.log('❌ Invalid phone number:', phone);
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    console.log('💾 Creating teacher job application in database...');
    const teacherJob = await TeacherJob.create({
      name,
      email,
      phone: cleanPhone,
      degree,
      subject,
      experience,
      message
    });

    console.log('✅ Teacher job application created successfully:', teacherJob.id);
    res.status(201).json({ 
      success: true,
      message: 'Application submitted successfully! We will contact you soon.', 
      application: teacherJob 
    });
  } catch (err) {
    console.error('❌ Error creating teacher job application:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to submit application. Please try again.' 
    });
  }
};

// Get all teacher job applications (for admin)
exports.getTeacherJobs = async (req, res, next) => {
  console.log('🎯 getTeacherJobs controller called');
  try {
    console.log('📋 Fetching all teacher job applications from database...');
    const applications = await TeacherJob.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${applications.length} applications`);
    res.json(applications);
  } catch (err) {
    console.error('❌ Error fetching teacher job applications:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Get single teacher job application
exports.getTeacherJob = async (req, res, next) => {
  console.log('🎯 getTeacherJob controller called');
  console.log('📋 Fetching teacher job application ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for application with ID:', id);
    const application = await TeacherJob.findByPk(id);
    if (!application) {
      console.log('❌ Application not found with ID:', id);
      return res.status(404).json({ error: 'Application not found' });
    }

    console.log('✅ Application found');
    res.json(application);
  } catch (err) {
    console.error('❌ Error fetching teacher job application:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

// Delete teacher job application
exports.deleteTeacherJob = async (req, res, next) => {
  console.log('🎯 deleteTeacherJob controller called');
  console.log('🗑️ Deleting teacher job application ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for application with ID:', id);
    const application = await TeacherJob.findByPk(id);
    if (!application) {
      console.log('❌ Application not found with ID:', id);
      return res.status(404).json({ error: 'Application not found' });
    }

    console.log('✅ Application found, proceeding with deletion...');
    await application.destroy();
    console.log('✅ Application deleted successfully');
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting teacher job application:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};

// Update teacher job application status
exports.updateTeacherJob = async (req, res, next) => {
  console.log('🎯 updateTeacherJob controller called');
  console.log('✏️ Updating teacher job application ID:', req.params.id);
  console.log('📦 Update data:', req.body);
  
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    console.log('🔍 Looking for application with ID:', id);
    const application = await TeacherJob.findByPk(id);
    if (!application) {
      console.log('❌ Application not found with ID:', id);
      return res.status(404).json({ error: 'Application not found' });
    }

    console.log('✅ Application found, proceeding with update...');
    // Update fields
    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;

    await application.update(updateData);

    console.log('✅ Application updated successfully');
    res.json({ 
      message: 'Application updated successfully', 
      application 
    });
  } catch (err) {
    console.error('❌ Error updating teacher job application:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

console.log('✅ Teacher job controller loaded successfully');