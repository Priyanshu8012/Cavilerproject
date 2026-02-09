const Blog = require('../models/Blog');
const path = require('path');
const fs = require('fs');

// Get all blogs with filtering and search
exports.getBlogs = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    
    let whereClause = {};
    
    // Search filter
    if (search) {
      whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ]
      };
    }
    
    // Category filter
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    
    // Status filter
    if (status) {
      whereClause.status = status;
    }
    
    const blogs = await Blog.findAll({ 
      where: whereClause,
      order: [['createdAt', 'DESC']] 
    });
    
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Create new blog
exports.createBlog = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      category, 
      date, 
      read_time, 
      status, 
      tags 
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !date) {
      return res.status(400).json({ 
        error: 'Title, description, category, and date are required' 
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/blogs/' + req.file.filename;
    }

    // Parse tags if provided
    let tagsArray = [];
    if (tags) {
      tagsArray = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : tags;
    }

    const blog = await Blog.create({
      title,
      description,
      category,
      image_url: imageUrl,
      date,
      read_time,
      status: status || 'draft',
      tags: tagsArray
    });

    res.status(201).json({ 
      message: 'Blog created successfully', 
      blog 
    });
  } catch (err) {
    next(err);
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      category, 
      date, 
      read_time, 
      status, 
      tags 
    } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Handle image update
    let imageUrl = blog.image_url;
    if (req.file) {
      // Delete old image if exists
      if (blog.image_url) {
        const oldImagePath = path.join(__dirname, '..', blog.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = '/uploads/blogs/' + req.file.filename;
    }

    // Parse tags if provided
    let tagsArray = blog.tags;
    if (tags) {
      tagsArray = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : tags;
    }

    await blog.update({
      title: title || blog.title,
      description: description || blog.description,
      category: category || blog.category,
      image_url: imageUrl,
      date: date || blog.date,
      read_time: read_time || blog.read_time,
      status: status || blog.status,
      tags: tagsArray
    });

    res.json({ 
      message: 'Blog updated successfully', 
      blog 
    });
  } catch (err) {
    next(err);
  }
};

// Delete blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete associated image file
    if (blog.image_url) {
      const imagePath = path.join(__dirname, '..', blog.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await blog.destroy();
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Get blogs by category
exports.getBlogsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { limit } = req.query;

    let queryOptions = {
      where: { category, status: 'published' },
      order: [['createdAt', 'DESC']]
    };

    if (limit) {
      queryOptions.limit = parseInt(limit);
    }

    const blogs = await Blog.findAll(queryOptions);
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};