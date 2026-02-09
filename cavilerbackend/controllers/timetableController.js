const Timetable = require('../models/Timetable');

exports.getTimetables = async (req, res, next) => {
  try {
    const timetables = await Timetable.findAll({ 
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ] 
    });
    res.json(timetables);
  } catch (err) {
    next(err);
  }
};

exports.createTimetable = async (req, res, next) => {
  try {
    const { subject, code, date, time, duration, venue, type, status } = req.body;
    
    if (!subject || !code || !date || !time || !duration || !venue) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const timetable = await Timetable.create({
      subject,
      code,
      date,
      time,
      duration,
      venue,
      type: type || 'Theory',
      status: status || 'upcoming'
    });
    
    res.status(201).json({ message: 'Timetable created', timetable });
  } catch (err) {
    next(err);
  }
};

exports.updateTimetable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, code, date, time, duration, venue, type, status } = req.body;

    const timetable = await Timetable.findByPk(id);
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    await timetable.update({
      subject,
      code,
      date,
      time,
      duration,
      venue,
      type,
      status
    });

    res.json({ message: 'Timetable updated', timetable });
  } catch (err) {
    next(err);
  }
};

exports.deleteTimetable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findByPk(id);
    
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    await timetable.destroy();
    res.json({ message: 'Timetable deleted' });
  } catch (err) {
    next(err);
  }
};