// routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

console.log('🔁 Loading testimonial routes...');

// GET /api/testimonials - Get all testimonials
router.get('/testimonials', (req, res, next) => {
  console.log('📍 GET /api/testimonials route hit');
  testimonialController.getTestimonials(req, res, next);
});

// POST /api/testimonials - Create new testimonial
router.post('/testimonials', (req, res, next) => {
  console.log('📍 POST /api/testimonials route hit', { body: req.body });
  testimonialController.createTestimonial(req, res, next);
});

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/testimonials/:id', (req, res, next) => {
  console.log('📍 DELETE /api/testimonials/:id route hit', { id: req.params.id });
  testimonialController.deleteTestimonial(req, res, next);
});

// PUT /api/testimonials/:id - Update testimonial (optional)
router.put('/testimonials/:id', (req, res, next) => {
  console.log('📍 PUT /api/testimonials/:id route hit', { id: req.params.id, body: req.body });
  testimonialController.updateTestimonial(req, res, next);
});

console.log('✅ Testimonial routes loaded successfully');
module.exports = router;