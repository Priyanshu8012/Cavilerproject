import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, BookOpen, Search, Filter, RefreshCw, AlertCircle, Download, Share2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const TimeTableUpdate = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch exams from backend
  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/timetables`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch timetable data');
      }
      
      const data = await response.json();
      setExams(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError(err.message || 'Failed to load timetable');
      
      // Fallback to localStorage
      const savedExams = localStorage.getItem('examTimetable');
      if (savedExams) {
        setExams(JSON.parse(savedExams));
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filter exams based on search and status
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Format date display
  const formatDateDisplay = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) return 'Today';
      if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid Date';
    }
  };

  // Get days until exam
  const getDaysUntilExam = (dateString) => {
    try {
      const examDate = new Date(dateString);
      const today = new Date();
      const timeDiff = examDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff === 0) return 'Today';
      if (daysDiff === 1) return 'Tomorrow';
      if (daysDiff > 1) return `In ${daysDiff} days`;
      if (daysDiff < 0) return 'Completed';
      
      return '';
    } catch (err) {
      return '';
    }
  };

  // Export timetable as JSON
  const exportTimetable = () => {
    const dataStr = JSON.stringify(exams, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-exam-timetable.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Share timetable
  const shareTimetable = async () => {
    const timetableText = exams.map(exam => 
      `${exam.subject} (${exam.code}): ${formatDateDisplay(exam.date)} at ${exam.time} - ${exam.venue}`
    ).join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Exam Timetable',
          text: timetableText,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(timetableText).then(() => {
        alert('Timetable copied to clipboard!');
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg">Loading your timetable...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your exam schedule</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && exams.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Timetable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchExams}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Exam Timetable
            </h1>
            <p className="text-gray-600 text-lg mb-4">Winter Semester 2024-25</p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Total: {exams.length} exams
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Upcoming: {exams.filter(e => e.status === 'upcoming').length}
              </div>
              {lastUpdated && (
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by subject name or code..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Controls Group */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Filter */}
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200">
                <Filter className="text-gray-500 h-4 w-4" />
                <select
                  className="bg-transparent border-none focus:ring-0 text-gray-700"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Exams</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* <button
                  onClick={exportTimetable}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  title="Export Timetable"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button> */}
                
                <button
                  onClick={shareTimetable}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  title="Share Timetable"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                
                <button
                  onClick={fetchExams}
                  className="p-2 bg-white hover:bg-gray-50 text-gray-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                  title="Refresh Timetable"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredExams.map((exam) => {
            const daysUntil = getDaysUntilExam(exam.date);
            const isToday = daysUntil === 'Today';
            const isTomorrow = daysUntil === 'Tomorrow';
            
            return (
              <div
                key={exam.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                  isToday ? 'border-red-200 bg-red-50/30' : 
                  isTomorrow ? 'border-orange-200 bg-orange-50/30' : 
                  'border-gray-200'
                }`}
              >
                {/* Header with gradient */}
                <div className={`rounded-t-2xl p-5 text-white ${
                  isToday ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  isTomorrow ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1">{exam.subject}</h3>
                      <p className="text-blue-100 opacity-90">{exam.code}</p>
                    </div>
                    <span className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {exam.type}
                    </span>
                  </div>
                  
                  {/* Days until badge */}
                  {daysUntil && (
                    <div className="flex justify-between items-center">
                      <span className="bg-white/20 text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        {daysUntil}
                      </span>
                      <span className={`text-sm font-medium ${
                        exam.status === 'completed' ? 'text-green-200' : 'text-white'
                      }`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900 text-lg">
                        {formatDateDisplay(exam.date)}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time & Duration</p>
                      <p className="font-semibold text-gray-900">{exam.time}</p>
                      <p className="text-sm text-gray-500">{exam.duration}</p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-semibold text-gray-900">{exam.venue}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                    
                    <div className="flex gap-2">
                      <button 
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        title="Add to Calendar"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                        title="Set Reminder"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-2xl mx-auto shadow-lg border border-white/20">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {exams.length === 0 ? 'No Exams Scheduled' : 'No Matching Exams Found'}
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                {exams.length === 0 
                  ? 'Your exam timetable is currently empty. Check back later for updates.' 
                  : 'Try adjusting your search terms or filters to find what you\'re looking for.'}
              </p>
              {exams.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-gray-500">Contact your department for schedule updates</p>
                  <button
                    onClick={fetchExams}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 inline" />
                    Check for Updates
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setFilterStatus('all')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Show All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        {filteredExams.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <p className="text-gray-600">
                Showing {filteredExams.length} of {exams.length} exams
                {lastUpdated && ` • Last updated: ${lastUpdated.toLocaleString()}`}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For any discrepancies, please contact the examination department
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTableUpdate;
