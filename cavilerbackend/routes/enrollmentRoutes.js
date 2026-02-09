const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

console.log('🔁 Loading enrollment routes...');

// POST /api/enrollments - Create new enrollment
router.post('/enrollments', (req, res, next) => {
  console.log('📍 POST /api/enrollments route hit', { body: req.body });
  enrollmentController.createEnrollment(req, res, next);
});

// GET /api/enrollments - Get all enrollments (admin)
router.get('/enrollments', (req, res, next) => {
  console.log('📍 GET /api/enrollments route hit');
  enrollmentController.getEnrollments(req, res, next);
});

// GET /api/enrollments/:id - Get single enrollment
router.get('/enrollments/:id', (req, res, next) => {
  console.log('📍 GET /api/enrollments/:id route hit', { id: req.params.id });
  enrollmentController.getEnrollment(req, res, next);
});

// DELETE /api/enrollments/:id - Delete enrollment
router.delete('/enrollments/:id', (req, res, next) => {
  console.log('📍 DELETE /api/enrollments/:id route hit', { id: req.params.id });
  enrollmentController.deleteEnrollment(req, res, next);
});

// PUT /api/enrollments/:id - Update enrollment
router.put('/enrollments/:id', (req, res, next) => {
  console.log('📍 PUT /api/enrollments/:id route hit', { id: req.params.id, body: req.body });
  enrollmentController.updateEnrollment(req, res, next);
});

console.log('✅ Enrollment routes loaded successfully');
module.exports = router;