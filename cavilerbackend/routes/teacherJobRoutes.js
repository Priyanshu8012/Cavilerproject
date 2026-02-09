const express = require('express');
const router = express.Router();
const teacherJobController = require('../controllers/teacherJobController');

console.log('🔁 Loading teacher job routes...');

// POST /api/teacherjobform - Create new teacher job application
router.post('/teacherjobform', (req, res, next) => {
  console.log('📍 POST /api/teacherjobform route hit', { body: req.body });
  teacherJobController.createTeacherJob(req, res, next);
});

// GET /api/teacherjobform - Get all teacher job applications (admin)
router.get('/teacherjobform', (req, res, next) => {
  console.log('📍 GET /api/teacherjobform route hit');
  teacherJobController.getTeacherJobs(req, res, next);
});

// GET /api/teacherjobform/:id - Get single teacher job application
router.get('/teacherjobform/:id', (req, res, next) => {
  console.log('📍 GET /api/teacherjobform/:id route hit', { id: req.params.id });
  teacherJobController.getTeacherJob(req, res, next);
});

// DELETE /api/teacherjobform/:id - Delete teacher job application
router.delete('/teacherjobform/:id', (req, res, next) => {
  console.log('📍 DELETE /api/teacherjobform/:id route hit', { id: req.params.id });
  teacherJobController.deleteTeacherJob(req, res, next);
});

// PUT /api/teacherjobform/:id - Update teacher job application
router.put('/teacherjobform/:id', (req, res, next) => {
  console.log('📍 PUT /api/teacherjobform/:id route hit', { id: req.params.id, body: req.body });
  teacherJobController.updateTeacherJob(req, res, next);
});

console.log('✅ Teacher job routes loaded successfully');
module.exports = router;