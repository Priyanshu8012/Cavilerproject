const Exam = require('../models/Exam');
const { Op } = require('sequelize');

exports.getExams = async (req, res, next) => {
  try {
    const { search, category, status, priority, sortBy } = req.query;
    
    // Build where clause
    let whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (category && category !== 'All') {
      whereClause.category = category;
    }
    
    if (status && status !== 'All') {
      whereClause.status = status;
    }
    
    if (priority && priority !== 'All') {
      whereClause.priority = priority;
    }
    
    // Build order clause
    let orderClause = [];
    switch (sortBy) {
      case 'name':
        orderClause = [['name', 'ASC']];
        break;
      case 'date':
        orderClause = [['date', 'ASC']];
        break;
      case 'priority':
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        // This is a simplified approach - for complex sorting you might need raw queries
        orderClause = [['priority', 'ASC']];
        break;
      case 'students':
        // Extract number from students string for sorting
        orderClause = [['students', 'DESC']];
        break;
      default:
        orderClause = [['date', 'ASC']];
    }
    
    const exams = await Exam.findAll({ 
      where: whereClause,
      order: orderClause
    });
    
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

exports.createExam = async (req, res, next) => {
  try {
    const {
      name,
      date,
      description,
      category,
      status,
      priority,
      students,
      registrationDeadline,
      syllabus,
      fee,
      website
    } = req.body;

    // Calculate days left
    const examDate = new Date(date);
    const today = new Date();
    const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)).toString();

    // Generate random gradient color
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-yellow-500 to-amber-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-blue-500",
      "from-red-500 to-pink-500"
    ];
    const color = gradients[Math.floor(Math.random() * gradients.length)];

    const exam = await Exam.create({
      name,
      date,
      daysLeft,
      icon: 'FaBook',
      color,
      status,
      description,
      students,
      priority,
      category,
      registrationDeadline,
      syllabus,
      fee,
      website
    });

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (err) {
    next(err);
  }
};

exports.updateExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      date,
      description,
      category,
      status,
      priority,
      students,
      registrationDeadline,
      syllabus,
      fee,
      website
    } = req.body;

    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Recalculate days left if date changed
    let daysLeft = exam.daysLeft;
    if (date && date !== exam.date) {
      const examDate = new Date(date);
      const today = new Date();
      daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)).toString();
    }

    await exam.update({
      name,
      date,
      daysLeft,
      description,
      category,
      status,
      priority,
      students,
      registrationDeadline,
      syllabus,
      fee,
      website
    });

    res.json({ message: 'Exam updated successfully', exam });
  } catch (err) {
    next(err);
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);
    
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    await exam.destroy();
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getExamStats = async (req, res, next) => {
  try {
    const totalExams = await Exam.count();
    const upcomingExams = await Exam.count({ where: { status: 'Upcoming' } });
    const highPriorityExams = await Exam.count({ where: { priority: 'High' } });
    
    // Get unique categories count
    const categories = await Exam.findAll({
      attributes: ['category'],
      group: ['category']
    });
    const uniqueCategories = categories.length;

    res.json({
      totalExams,
      upcomingExams,
      highPriorityExams,
      uniqueCategories
    });
  } catch (err) {
    next(err);
  }
};