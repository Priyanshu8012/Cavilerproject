const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// POST /api/exams → relative path should be '/'
router.post('/exams', examController.createExam);
router.get('/exams', examController.getExams);
router.put('/exams/:id', examController.updateExam);
router.delete('/exams/:id', examController.deleteExam);
router.get('/exams/stats', examController.getExamStats);

module.exports = router;