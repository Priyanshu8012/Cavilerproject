const Banner = require('../models/Banner');
const path = require('path');

exports.getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.findAll({ order: [['createdAt', 'DESC']] });
    res.json(banners);
  } catch (err) {
    next(err);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image required' });

    const imageUrl = '/uploads/' + req.file.filename;

    const banner = await Banner.create({ text, image_url: imageUrl });
    res.status(201).json({ message: 'Banner created', banner });
  } catch (err) {
    next(err);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ error: 'Banner not found' });

    // Optional: delete image file from server
    const fs = require('fs');
    const filePath = path.join(__dirname, '..', banner.image_url);
    fs.unlink(filePath, (err) => console.log(err));

    await banner.destroy();
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    next(err);
  }
};
