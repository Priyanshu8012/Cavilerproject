const Enrollment = require('../models/Enrollment');

console.log('🔁 Loading enrollment controller...');

// Create new enrollment
exports.createEnrollment = async (req, res, next) => {
  console.log('🎯 createEnrollment controller called');
  console.log('📦 Request body:', req.body);
  
  try {
    const { fullName, email, phone, course, enrollmentDate, notes } = req.body;

    console.log('🔍 Validating fields...');
    // Validation
    if (!fullName || !email || !phone || !course || !enrollmentDate) {
      console.log('❌ Validation failed - missing fields');
      console.log('📋 Fields received:', { fullName, email, phone, course, enrollmentDate, notes });
      return res.status(400).json({ error: 'All fields except notes are required' });
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

    console.log('🔍 Validating enrollment date...');
    // Validate enrollment date is not in the past
    const selectedDate = new Date(enrollmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      console.log('❌ Enrollment date is in the past:', enrollmentDate);
      return res.status(400).json({ error: 'Enrollment date cannot be in the past' });
    }

    console.log('💾 Creating enrollment in database...');
    const enrollment = await Enrollment.create({
      fullName,
      email,
      phone: cleanPhone,
      course,
      enrollmentDate: selectedDate,
      notes: notes || ''
    });

    console.log('✅ Enrollment created successfully:', enrollment.id);
    res.status(201).json({ 
      success: true,
      message: 'Enrollment submitted successfully! We will contact you soon.', 
      enrollment 
    });
  } catch (err) {
    console.error('❌ Error creating enrollment:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to submit enrollment. Please try again.' 
    });
  }
};

// Get all enrollments
exports.getEnrollments = async (req, res, next) => {
  console.log('🎯 getEnrollments controller called');
  try {
    console.log('📋 Fetching all enrollments from database...');
    const enrollments = await Enrollment.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${enrollments.length} enrollments`);
    res.json(enrollments);
  } catch (err) {
    console.error('❌ Error fetching enrollments:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
};

// Get single enrollment
exports.getEnrollment = async (req, res, next) => {
  console.log('🎯 getEnrollment controller called');
  console.log('📋 Fetching enrollment ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for enrollment with ID:', id);
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      console.log('❌ Enrollment not found with ID:', id);
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    console.log('✅ Enrollment found');
    res.json(enrollment);
  } catch (err) {
    console.error('❌ Error fetching enrollment:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
};

// Delete enrollment
exports.deleteEnrollment = async (req, res, next) => {
  console.log('🎯 deleteEnrollment controller called');
  console.log('🗑️ Deleting enrollment ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for enrollment with ID:', id);
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      console.log('❌ Enrollment not found with ID:', id);
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    console.log('✅ Enrollment found, proceeding with deletion...');
    await enrollment.destroy();
    console.log('✅ Enrollment deleted successfully');
    res.json({ message: 'Enrollment deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting enrollment:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to delete enrollment' });
  }
};

// Update enrollment status
exports.updateEnrollment = async (req, res, next) => {
  console.log('🎯 updateEnrollment controller called');
  console.log('✏️ Updating enrollment ID:', req.params.id);
  console.log('📦 Update data:', req.body);
  
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    console.log('🔍 Looking for enrollment with ID:', id);
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      console.log('❌ Enrollment not found with ID:', id);
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    console.log('✅ Enrollment found, proceeding with update...');
    // Update fields
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    await enrollment.update(updateData);

    console.log('✅ Enrollment updated successfully');
    res.json({ 
      message: 'Enrollment updated successfully', 
      enrollment 
    });
  } catch (err) {
    console.error('❌ Error updating enrollment:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to update enrollment' });
  }
};

console.log('✅ Enrollment controller loaded successfully');