import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaArrowRight, 
  FaBook, 
  FaUserGraduate, 
  FaTrophy,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Icon mapping for backend data
const iconMap = {
  'FaBook': FaBook,
  'FaUserGraduate': FaUserGraduate,
  'FaTrophy': FaTrophy,
  'FaCalendarAlt': FaCalendarAlt
};

export default function EnhancedExamCardsPattern() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalExams: 0,
    upcomingExams: 0,
    highPriorityExams: 0,
    examCategories: 0
  });

  // Fetch exams from backend
  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/exams`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exams: ${response.status}`);
      }
      
      const data = await response.json();
      setExams(data);
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/exams/stats`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }
      
      const data = await response.json();
      setStats({
        totalExams: data.totalExams,
        upcomingExams: data.upcomingExams,
        highPriorityExams: data.highPriorityExams,
        examCategories: data.uniqueCategories
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      // If stats fail, calculate from local exams data
      setStats({
        totalExams: exams.length,
        upcomingExams: exams.filter(e => e.status === "Upcoming").length,
        highPriorityExams: exams.filter(e => e.priority === "High").length,
        examCategories: new Set(exams.map(e => e.category)).size
      });
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchExams();
  }, []);

  // Update stats when exams change
  useEffect(() => {
    if (exams.length > 0) {
      fetchStats();
    }
  }, [exams]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Approaching": return "bg-orange-100 text-orange-800";
      case "Registration Open": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Format days left display - FIXED: Use the daysLeft from API directly
  const formatDaysLeft = (daysLeft) => {
    if (!daysLeft) return 'Date not set';
    
    const days = parseInt(daysLeft);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day left';
    if (days > 1) return `${days} days left`;
    if (days === -1) return '1 day ago';
    if (days < -1) return `${Math.abs(days)} days ago`;
    
    return `${daysLeft} days left`;
  };

  // Handle view details click
  const handleViewDetails = (exam) => {
    if (exam.website) {
      window.open(exam.website, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback action if no website
      alert(`Details for ${exam.name}\n\nDate: ${formatDate(exam.date)}\nStatus: ${exam.status}\nStudents: ${exam.students}\nDays Left: ${exam.daysLeft}`);
    }
  };

  // Retry loading data
  const handleRetry = () => {
    fetchExams();
    fetchStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <FaExclamationTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Exams</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Make sure the backend server is running on {API_BASE_URL}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <FaCalendarAlt className="mr-2" />
            <span className="font-semibold">Exam Schedule</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-blue-600">Examinations</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive schedule of all major competitive and board examinations
          </p>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, index) => {
            const IconComponent = iconMap[exam.icon] || FaBook;
            // FIXED: Use daysLeft directly from API and format it properly
            const daysLeftDisplay = formatDaysLeft(exam.daysLeft);
            
            return (
              <motion.div
                key={exam.id || index}
                className={`bg-gradient-to-br ${exam.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleViewDetails(exam)}
              >
                {/* Priority Indicator */}
                <div className="flex justify-between items-start p-6 pb-4">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(exam.priority)}`}></div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>

                <div className="p-6 pt-0 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl opacity-80 group-hover:scale-110 transition-transform">
                      <IconComponent />
                    </span>
                    <div className="text-right">
                      <div className="text-sm opacity-80">Priority</div>
                      <div className="font-semibold">{exam.priority}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                  <p className="text-white text-opacity-90 text-sm mb-4">{exam.description}</p>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <FaClock className="mr-2 opacity-80" />
                        <span>{formatDate(exam.date)}</span>
                      </div>
                      <div className="bg-black bg-opacity-20 px-2 py-1 rounded text-xs font-semibold">
                        {daysLeftDisplay}
                      </div>
                    </div>
                    <div className="text-sm opacity-80">
                      {exam.students} • {exam.category}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="bg-white bg-opacity-10 p-4">
                  <button className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center group/btn">
                    View Detailed Schedule
                    <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {exams.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaCalendarAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams scheduled</h3>
            <p className="text-gray-600">Check back later for upcoming examinations.</p>
          </motion.div>
        )}

        {/* Footer Stats */}
        <motion.div 
          className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalExams}</div>
              <div className="text-gray-600">Total Exams</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.upcomingExams}</div>
              <div className="text-gray-600">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.highPriorityExams}</div>
              <div className="text-gray-600">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.examCategories}+</div>
              <div className="text-gray-600">Exam Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Refresh Button */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FaSpinner className={loading ? "animate-spin" : ""} />
            Refresh Date
          </button>
        </motion.div>
      </div>
    </div>
  );
}
