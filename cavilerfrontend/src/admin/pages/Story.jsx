import React, { useState, useEffect } from "react";
import { FaUserGraduate, FaPlus, FaTrash, FaTrophy, FaStar, FaAward, FaUpload, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const OurStudents = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [course, setCourse] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Course options with proper formatting
  const courseOptions = [
    "IIT JEE",
    "NEET", 
    "10th Board",
    "12th Board",
    "Foundation Course (6-10)",
    "JEE Main",
    "JEE Advanced",
    "NEET UG",
    "KVPY",
    "Olympiads",
    "NTSE",
    "MHT-CET",
    "CUET",
    "Other"
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/students`);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCourseSelect = (selectedCourse) => {
    setCourse(selectedCourse);
    setIsDropdownOpen(false);
  };

  const handleAddStudent = async () => {
    if (!name || !achievement || !photo || !course) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("achievement", achievement);
    formData.append("course", course);
    formData.append("photo", photo);

    try {
      const res = await axios.post(`${API_URL}/api/students`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStudents([res.data, ...students]);
      resetForm();
    } catch (err) {
      console.error("Add student error:", err);
      alert("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setAchievement("");
    setCourse("");
    setPhoto(null);
    setPreview(null);
    setIsAdding(false);
    setIsDropdownOpen(false);
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    
    try {
      await axios.delete(`${API_URL}/api/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student.");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <FaTrophy className="text-yellow-400 text-xl" />
            <span className="text-lg font-semibold text-cyan-300">Star Achievers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Achieving</span> Students
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the remarkable achievements and success stories of our brilliant students 
            who have excelled in their academic journeys.
          </p>
        </motion.div>

        {/* Add Student Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {!isAdding ? (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAdding(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <FaPlus className="text-xl" />
                Add New Student Achievement
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-300">Add Student Achievement</h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  {preview ? (
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-cyan-400 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-4 border-dashed border-cyan-400/50 flex items-center justify-center bg-white/5">
                      <FaUserGraduate className="text-4xl text-cyan-400/50" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer mt-4 inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 transition-all px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
                  <FaUpload />
                  <span>{preview ? "Change Photo" : "Upload Photo"}</span>
                  <input 
                    type="file" 
                    onChange={handlePhotoChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <input
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 placeholder-gray-400"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <input
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 placeholder-gray-400"
                  placeholder="Achievement (e.g., AIR 256, 98.5%, Gold Medal)"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />

                {/* Course Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full p-4 rounded-xl bg-white/5 border ${
                      course ? 'border-cyan-400' : 'border-white/10'
                    } focus:bg-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-left flex items-center justify-between ${
                      !course ? 'text-gray-400' : 'text-white'
                    }`}
                  >
                    {course || "Select Course"}
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-sm" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 max-h-60 overflow-y-auto"
                      >
                        {courseOptions.map((courseOption, index) => (
                          <motion.button
                            key={courseOption}
                            type="button"
                            onClick={() => handleCourseSelect(courseOption)}
                            className={`w-full p-4 text-left hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 ${
                              course === courseOption 
                                ? 'bg-cyan-500/20 text-cyan-300' 
                                : 'text-gray-300 hover:text-white'
                            }`}
                            whileHover={{ x: 4 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {courseOption}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetForm}
                  className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  disabled={loading || !course}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading || !course
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Student
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Students Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {students.map((student) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteStudent(student.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-red-500/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                >
                  <FaTrash className="text-xs" />
                </motion.button>

                {/* Student Photo */}
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <img
                      src={`${API_URL}${student.photo}`}
                      alt={student.name}
                      className="w-full h-full rounded-2xl object-cover border-4 border-cyan-400 shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full rounded-2xl border-4 border-cyan-400 bg-gradient-to-br from-cyan-400 to-blue-500 hidden items-center justify-center">
                      <FaUserGraduate className="text-2xl text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-slate-900">
                      <FaStar className="text-xs text-slate-900" />
                    </div>
                  </div>

                  {/* Student Info */}
                  <h3 className="text-xl font-bold text-center text-white mb-2">
                    {student.name}
                  </h3>
                  
                  <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 border border-yellow-400/30 rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-2 text-yellow-300">
                      <FaAward className="text-sm" />
                      <span className="font-bold text-sm">{student.achievement}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-cyan-300 font-semibold text-sm mb-1">Course</p>
                    <p className="text-gray-300 text-sm">{student.course}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {students.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center border border-cyan-400/20">
              <FaUserGraduate className="text-6xl text-cyan-400/50" />
            </div>
            <h3 className="text-3xl font-bold text-gray-300 mb-4">No Students Added Yet</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Start by adding your first student achievement to showcase their success stories.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OurStudents;
