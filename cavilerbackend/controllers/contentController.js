const Content = require('../models/Content');
const path = require('path');
const fs = require('fs');

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoId ? `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg` : null;
};

// Validate YouTube URL
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

// Get all content with filtering
exports.getAllContent = async (req, res, next) => {
  try {
    const { category, type, status } = req.query;
    
    let whereClause = {};
    
    if (category) {
      whereClause.category = category;
    }
    
    if (type) {
      whereClause.content_type = type;
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    const content = await Content.findAll({ 
      where: whereClause,
      order: [['createdAt', 'DESC']] 
    });
    
    res.json(content);
  } catch (err) {
    next(err);
  }
};

// Get single content by ID
exports.getContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json(content);
  } catch (err) {
    next(err);
  }
};

// Create new content
exports.createContent = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      category, 
      youtube_url,
      content_type 
    } = req.body;

    // Validate required fields
    if (!title || !category || !content_type) {
      return res.status(400).json({ 
        error: 'Title, category, and content_type are required' 
      });
    }

    let fileUrl = null;
    let fileName = null;
    let fileSize = null;
    let thumbnailUrl = null;

    // Handle file upload
    if (req.file) {
      fileUrl = '/uploads/content/' + req.file.filename;
      fileName = req.file.originalname;
      fileSize = req.file.size;
      
      // For images, use the file as thumbnail
      if (req.file.mimetype.startsWith('image/')) {
        thumbnailUrl = fileUrl;
      }
    }

    // Handle YouTube URL
    if (youtube_url) {
      if (!isValidYouTubeUrl(youtube_url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }
      thumbnailUrl = getYouTubeThumbnail(youtube_url);
    }

    const content = await Content.create({
      title,
      description,
      category,
      file_url: fileUrl,
      youtube_url: youtube_url || null,
      content_type,
      file_size: fileSize,
      file_name: fileName,
      thumbnail_url: thumbnailUrl,
      status: req.file ? 'processing' : 'completed',
      upload_progress: req.file ? 0 : 100
    });

    res.status(201).json({ 
      message: 'Content created successfully', 
      content 
    });
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

// Update content
exports.updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      category, 
      youtube_url,
      content_type,
      status 
    } = req.body;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    let fileUrl = content.file_url;
    let fileName = content.file_name;
    let fileSize = content.file_size;
    let thumbnailUrl = content.thumbnail_url;

    // Handle file update
    if (req.file) {
      // Delete old file if exists
      if (content.file_url) {
        const oldFilePath = path.join(__dirname, '..', content.file_url);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      fileUrl = '/uploads/content/' + req.file.filename;
      fileName = req.file.originalname;
      fileSize = req.file.size;
      
      // For images, use the file as thumbnail
      if (req.file.mimetype.startsWith('image/')) {
        thumbnailUrl = fileUrl;
      }
    }

    // Handle YouTube URL update
    if (youtube_url !== undefined) {
      if (youtube_url && !isValidYouTubeUrl(youtube_url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }
      thumbnailUrl = youtube_url ? getYouTubeThumbnail(youtube_url) : null;
    }

    await content.update({
      title: title || content.title,
      description: description !== undefined ? description : content.description,
      category: category || content.category,
      file_url: fileUrl,
      youtube_url: youtube_url !== undefined ? youtube_url : content.youtube_url,
      content_type: content_type || content.content_type,
      file_size: fileSize,
      file_name: fileName,
      thumbnail_url: thumbnailUrl,
      status: status || content.status
    });

    res.json({ 
      message: 'Content updated successfully', 
      content 
    });
  } catch (err) {
    console.error('Error updating content:', err);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

// Delete content
exports.deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Delete associated file
    if (content.file_url) {
      const filePath = path.join(__dirname, '..', content.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await content.destroy();
    
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Error deleting content:', err);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

// Get content by category
exports.getContentByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { limit } = req.query;

    let queryOptions = {
      where: { category },
      order: [['createdAt', 'DESC']]
    };

    if (limit) {
      queryOptions.limit = parseInt(limit);
    }

    const content = await Content.findAll(queryOptions);
    res.json(content);
  } catch (err) {
    next(err);
  }
};

// Update upload progress
exports.updateUploadProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress, status } = req.body;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await content.update({
      upload_progress: progress,
      status: status || content.status
    });

    res.json({ 
      message: 'Upload progress updated successfully', 
      content 
    });
  } catch (err) {
    console.error('Error updating upload progress:', err);
    res.status(500).json({ error: 'Failed to update upload progress' });
  }
};