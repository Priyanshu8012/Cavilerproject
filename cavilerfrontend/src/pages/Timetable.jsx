// src/components/ExamTimetable.jsx
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, BookOpen, Search, Filter } from 'lucide-react';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';

const ExamTimetable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample exam data
  const examData = [
    {
      id: 1,
      subject: 'Mathematics',
      code: 'MATH101',
      date: '2024-12-15',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      venue: 'Hall A',
      type: 'Theory',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Physics',
      code: 'PHY201',
      date: '2024-12-16',
      time: '02:00 PM - 04:00 PM',
      duration: '2 hours',
      venue: 'Lab Building',
      type: 'Practical',
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'Computer Science',
      code: 'CS301',
      date: '2024-12-17',
      time: '10:00 AM - 01:00 PM',
      duration: '3 hours',
      venue: 'Computer Lab 1',
      type: 'Theory',
      status: 'upcoming'
    },
    {
      id: 4,
      subject: 'English Literature',
      code: 'ENG101',
      date: '2024-12-18',
      time: '09:00 AM - 11:00 AM',
      duration: '2 hours',
      venue: 'Hall B',
      type: 'Theory',
      status: 'upcoming'
    },
    {
      id: 5,
      subject: 'Chemistry',
      code: 'CHEM201',
      date: '2024-12-19',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      venue: 'Chemistry Lab',
      type: 'Practical',
      status: 'upcoming'
    }
  ];

  // Filter exams based on search and status
  const filteredExams = examData.filter(exam => {
    const matchesSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Format date display
  const formatDateDisplay = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM dd, yyyy');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Timetable</h1>
          <p className="text-gray-600">Winter Semester 2024-25</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by subject or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-4 w-4" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Exams</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{exam.subject}</h3>
                    <p className="text-blue-100 text-sm">{exam.code}</p>
                  </div>
                  <span className="bg-blue-400 text-xs px-2 py-1 rounded-full">
                    {exam.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDateDisplay(exam.date)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">{exam.time}</p>
                    <p className="text-xs text-gray-500">Duration: {exam.duration}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-medium text-gray-900">{exam.venue}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    exam.status === 'upcoming' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                  
                  <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamTimetable;
