const Publication = require('../models/Publication');
const path = require('path');
const fs = require('fs');

// Get all publications
exports.getPublications = async (req, res, next) => {
  try {
    const publications = await Publication.findAll({ 
      where: { is_active: true },
      order: [['order_index', 'ASC'], ['createdAt', 'DESC']] 
    });
    res.json(publications);
  } catch (err) {
    next(err);
  }
};

// Get publication by ID
exports.getPublicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByPk(id);
    
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json(publication);
  } catch (err) {
    next(err);
  }
};

// Create new publication
exports.createPublication = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      price, 
      originalPrice, 
      type, 
      features, 
      gradient, 
      bgGradient, 
      popular,
      order_index 
    } = req.body;
    
    // Basic validation
    if (!title || !description || !price || !type || !gradient || !bgGradient) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/publications/' + req.file.filename;
    }

    const publication = await Publication.create({
      title,
      description,
      price,
      originalPrice: originalPrice || null,
      type,
      features: Array.isArray(features) ? features : JSON.parse(features),
      gradient,
      bgGradient,
      popular: popular === 'true',
      image: imageUrl,
      order_index: order_index || 0
    });
    
    res.status(201).json({ message: 'Publication created successfully', publication });
  } catch (err) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => console.log('Error deleting file:', err));
    }
    next(err);
  }
};

// Update publication
exports.updatePublication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      price, 
      originalPrice, 
      type, 
      features, 
      gradient, 
      bgGradient, 
      popular,
      order_index 
    } = req.body;

    const publication = await Publication.findByPk(id);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    let imageUrl = publication.image;
    
    // If new image uploaded, delete old one and update with new
    if (req.file) {
      // Delete old image if exists
      if (publication.image) {
        const oldImagePath = path.join(__dirname, '..', publication.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log('Error deleting old image:', err);
        });
      }
      imageUrl = '/uploads/publications/' + req.file.filename;
    }

    await publication.update({
      title,
      description,
      price,
      originalPrice: originalPrice || null,
      type,
      features: Array.isArray(features) ? features : JSON.parse(features),
      gradient,
      bgGradient,
      popular: popular === 'true',
      image: imageUrl,
      order_index: order_index || publication.order_index
    });

    res.json({ message: 'Publication updated successfully', publication });
  } catch (err) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => console.log('Error deleting file:', err));
    }
    next(err);
  }
};

// Delete publication (soft delete)
exports.deletePublication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByPk(id);
    
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    // Soft delete by setting is_active to false
    await publication.update({ is_active: false });

    res.json({ message: 'Publication deleted successfully' });
  } catch (err) {
    next(err);
  }
};