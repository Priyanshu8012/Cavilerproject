const Testimonial = require('../models/Testimonial');

console.log('🔁 Loading testimonial controller...');

// Get all testimonials
exports.getTestimonials = async (req, res, next) => {
  console.log('🎯 getTestimonials controller called');
  try {
    console.log('📋 Fetching all testimonials from database...');
    const testimonials = await Testimonial.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    
    console.log(`✅ Successfully fetched ${testimonials.length} testimonials`);
    res.json(testimonials);
  } catch (err) {
    console.error('❌ Error fetching testimonials:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// Create new testimonial
exports.createTestimonial = async (req, res, next) => {
  console.log('🎯 createTestimonial controller called');
  console.log('📦 Request body:', req.body);
  
  try {
    const { youtubeLink, candidateName, ranking, year, description } = req.body;

    console.log('🔍 Validating fields...');
    // Validation
    if (!youtubeLink || !candidateName || !ranking || !year || !description) {
      console.log('❌ Validation failed - missing fields');
      console.log('📋 Fields received:', { youtubeLink, candidateName, ranking, year, description });
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('🔍 Validating YouTube URL...');
    // Validate YouTube URL format
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(youtubeLink)) {
      console.log('❌ Invalid YouTube URL:', youtubeLink);
      return res.status(400).json({ error: 'Invalid YouTube URL format' });
    }

    console.log('💾 Creating testimonial in database...');
    const testimonial = await Testimonial.create({
      youtubeLink,
      candidateName,
      ranking,
      year,
      description
    });

    console.log('✅ Testimonial created successfully:', testimonial.id);
    res.status(201).json({ 
      message: 'Testimonial created successfully', 
      testimonial 
    });
  } catch (err) {
    console.error('❌ Error creating testimonial:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res, next) => {
  console.log('🎯 deleteTestimonial controller called');
  console.log('🗑️ Deleting testimonial ID:', req.params.id);
  
  try {
    const { id } = req.params;

    console.log('🔍 Looking for testimonial with ID:', id);
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      console.log('❌ Testimonial not found with ID:', id);
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    console.log('✅ Testimonial found, proceeding with deletion...');
    await testimonial.destroy();
    console.log('✅ Testimonial deleted successfully');
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting testimonial:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};

// Update testimonial
exports.updateTestimonial = async (req, res, next) => {
  console.log('🎯 updateTestimonial controller called');
  console.log('✏️ Updating testimonial ID:', req.params.id);
  console.log('📦 Update data:', req.body);
  
  try {
    const { id } = req.params;
    const { youtubeLink, candidateName, ranking, year, description } = req.body;

    console.log('🔍 Looking for testimonial with ID:', id);
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      console.log('❌ Testimonial not found with ID:', id);
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    console.log('✅ Testimonial found, proceeding with update...');
    // Update fields
    await testimonial.update({
      youtubeLink: youtubeLink || testimonial.youtubeLink,
      candidateName: candidateName || testimonial.candidateName,
      ranking: ranking || testimonial.ranking,
      year: year || testimonial.year,
      description: description || testimonial.description
    });

    console.log('✅ Testimonial updated successfully');
    res.json({ 
      message: 'Testimonial updated successfully', 
      testimonial 
    });
  } catch (err) {
    console.error('❌ Error updating testimonial:', err);
    console.error('🔍 Error details:', err.message);
    console.error('📊 Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

console.log('✅ Testimonial controller loaded successfully');