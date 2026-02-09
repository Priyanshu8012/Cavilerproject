import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaUpload, FaRupeeSign, FaBook, FaSave, FaHistory, FaFilter, FaShieldAlt, FaClock, FaTrophy } from "react-icons/fa";
import { Shield, Rocket, Terminal, Target, Briefcase, Zap } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const CourseUpdate = () => {
  const [course, setCourse] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    category: "",
    image: null,
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    "NDA",
    "CDS",
    "AFCAT",
    "Foundation",
    "JEE",
    "NEET",
    "MHT-CET",
    "Crash Courses",
    "Test Series",
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setCourse({ ...course, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", course.name);
    formData.append("price", course.price);
    formData.append("description", course.description);
    formData.append("duration", course.duration);
    formData.append("category", course.category);
    if (course.image) {
      formData.append("image", course.image);
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/courses/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/api/courses`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchCourses();
      alert("Deployment Successful!");
    } catch (error) {
      console.error("Error saving course:", error.response?.data || error.message);
      alert("Failed to save course. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setCourse({
      name: course.name,
      price: course.price,
      description: course.description,
      duration: course.duration,
      category: course.category,
      image: null,
    });
    setEditingId(course.id);
    setPreview(course.image ? `${API_URL}${course.image}` : null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to decommission this program?")) return;

    try {
      await axios.delete(`${API_URL}/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete program.");
    }
  };

  const resetForm = () => {
    setCourse({
      name: "",
      price: "",
      description: "",
      duration: "",
      category: "",
      image: null,
    });
    setEditingId(null);
    setPreview(null);
    setIsAdding(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-cavalier-brand mb-2">
                <Shield className="w-6 h-6 animate-pulse" />
                <span className="text-sm font-black uppercase tracking-[0.3em]">Command Center</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                Course <span className="text-cavalier-brand">Commissioning</span>
              </h1>
              <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
                <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                  <Terminal className="w-3 h-3 text-cavalier-brand" />
                  Active Modules: {courses.length}
                </span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>Elite Defence Training Framework</span>
              </div>
            </div>

            {!isAdding && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAdding(true)}
                className="bg-cavalier-brand text-cavalier-bg px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 border-b-4 border-cavalier-brand/50"
              >
                <FaPlus />
                Commission Program
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Form Side - Animated Presence */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="lg:col-span-5"
              >
                <div className="bg-cavalier-card-dark border border-cavalier-header-bg p-8 rounded-3xl shadow-2xl relative overflow-hidden sticky top-32">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cavalier-brand opacity-[0.03] rotate-45 transform translate-x-16 -translate-y-16"></div>

                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-cavalier-brand uppercase tracking-tighter flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-cavalier-brand" />
                      {editingId ? "Update Intel" : "Deploy Program"}
                    </h2>
                    <button onClick={resetForm} className="text-gray-500 hover:text-white font-black">X</button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Protocol */}
                    <div className="group relative w-full aspect-video rounded-2xl border-2 border-dashed border-cavalier-header-bg overflow-hidden flex flex-col items-center justify-center bg-cavalier-bg/50 hover:border-cavalier-brand/50 transition-all cursor-pointer">
                      {preview ? (
                        <img src={preview} alt="Intel" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <FaUpload className="text-4xl text-gray-700 mx-auto mb-3 group-hover:text-cavalier-brand transition-colors" />
                          <p className="text-xs font-black text-gray-600 uppercase tracking-widest">Program Identity Patch</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">Nomenclature (Name)</label>
                        <input
                          type="text"
                          name="name"
                          value={course.name}
                          onChange={handleChange}
                          className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-bold"
                          placeholder="e.g. NDA ALPHA SQUADRON"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">Budget (Price)</label>
                          <div className="relative">
                            <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-cavalier-brand/50" />
                            <input
                              type="number"
                              name="price"
                              value={course.price}
                              onChange={handleChange}
                              className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 pl-10 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-bold"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">Deployment Cycle</label>
                          <input
                            type="text"
                            name="duration"
                            value={course.duration}
                            onChange={handleChange}
                            className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-bold text-sm"
                            placeholder="e.g. 6 MONTHS"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">Unit Classification</label>
                        <div className="relative">
                          <select
                            name="category"
                            value={course.category}
                            onChange={handleChange}
                            className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white appearance-none focus:outline-none focus:border-cavalier-brand font-bold uppercase text-xs tracking-widest"
                            required
                          >
                            <option value="" className="bg-cavalier-card-dark">Select Unit</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat} className="bg-cavalier-card-dark">{cat}</option>
                            ))}
                          </select>
                          <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-cavalier-brand/30" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">Operational Brief</label>
                        <textarea
                          name="description"
                          value={course.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-medium text-sm resize-none"
                          placeholder="Mission objectives and program details..."
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 py-4 px-6 bg-cavalier-header-bg/20 border border-white/5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all"
                      >
                        Abort
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 px-6 bg-cavalier-brand text-cavalier-bg rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-cavalier-brand/20 transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-cavalier-bg/30 border-t-cavalier-bg rounded-full animate-spin" />
                        ) : (
                          <>
                            <FaSave className="text-sm" />
                            Deploy
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List Side */}
          <div className={`${isAdding ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <div className="space-y-6">
              {courses.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-cavalier-card-dark/20 rounded-3xl border-2 border-dashed border-cavalier-header-bg">
                  <Target className="w-20 h-20 text-gray-800 mb-6" />
                  <h3 className="text-2xl font-black text-gray-700 uppercase tracking-widest">No Active Missions</h3>
                  <p className="text-gray-600 font-bold uppercase text-[10px] mt-2">Standing by for primary deployment...</p>
                </div>
              ) : (
                <div className={`grid gap-6 ${isAdding ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                  {courses.map((courseItem) => (
                    <motion.div
                      layout
                      key={courseItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group bg-cavalier-card-dark/60 border border-cavalier-header-bg/50 p-5 rounded-2xl flex flex-col gap-4 transition-all hover:bg-cavalier-card-dark hover:border-cavalier-brand/30 shadow-2xl relative overflow-hidden"
                    >
                      {/* Course Image */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-cavalier-bg">
                        <img
                          src={courseItem.image ? `${API_URL}${courseItem.image}` : '/api/placeholder/400/225'}
                          alt={courseItem.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-3 py-1 bg-cavalier-brand text-cavalier-bg text-[10px] font-black uppercase tracking-widest rounded shadow-lg">
                            {courseItem.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-cavalier-bg to-transparent opacity-60"></div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div className="flex items-center gap-1.5 text-white font-black text-lg">
                            <FaRupeeSign className="text-sm text-cavalier-brand" />
                            {courseItem.price}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(courseItem)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-cavalier-brand hover:text-cavalier-bg transition-all backdrop-blur-md border border-white/10"
                            >
                              <FaEdit className="text-xs" />
                            </button>
                            <button
                              onClick={() => handleDelete(courseItem.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white transition-all backdrop-blur-md border border-red-900/30"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight line-clamp-1 group-hover:text-cavalier-brand transition-colors mb-2">
                          {courseItem.name}
                        </h3>

                        <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                          <div className="flex items-center gap-1.5">
                            <FaClock className="text-cavalier-brand/50" />
                            {courseItem.duration}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-3 h-3 text-cavalier-brand/50" />
                            Active Status
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-2">
                          {courseItem.description}
                        </p>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cavalier-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Audit/History Section */}
        <div className="mt-20 pt-10 border-t border-cavalier-header-bg/30">
          <div className="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <FaShieldAlt /> System Validated
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <FaTrophy /> Performance Monitoring
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <FaHistory /> Deployment Logs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseUpdate;

