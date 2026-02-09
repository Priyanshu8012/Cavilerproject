const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// POST /api/timetables → relative path should be '/'
router.post('/timetables', timetableController.createTimetable);
router.get('/timetables', timetableController.getTimetables);
router.put('/timetables/:id', timetableController.updateTimetable);
router.delete('/timetables/:id', timetableController.deleteTimetable);

module.exports = router;