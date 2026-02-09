import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaBook,
  FaStar,
  FaClock,
  FaUsers,
  FaWhatsapp,
  FaShieldAlt
} from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const fallbackImage = "https://via.placeholder.com/300";

// ✅ CourseCard Component
const CourseCard = ({ image, name, price, description, duration, category }) => {
  const imageUrl = image ? `${API_BASE_URL}${image}` : fallbackImage;
  const [showFullDesc, setShowFullDesc] = useState(false);

  const isLongDescription = description && description.length > 120;
  const displayDescription = showFullDesc
    ? description
    : isLongDescription
      ? description.slice(0, 120) + "..."
      : description;

  const handleWhatsAppRedirect = () => {
    const message = `Jai Hind! I’m interested in enrolling for the course: ${name}. Please share more details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9595849800?text=${encodedMessage}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-cavalier-card-dark rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] border border-white/10 hover:border-cavalier-brand"
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = fallbackImage)}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-cavalier-brand text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {category || "Defence"}
          </span>
        </div>
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-cavalier-brand border border-cavalier-brand/50 px-3 py-1 rounded-full text-sm font-bold">
            ₹{price}
          </span>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
      </div>

      {/* Course Content */}
      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* ✅ Read More / Read Less Toggle */}
        <p className="text-gray-400 text-sm mb-2 leading-relaxed h-[60px] overflow-hidden">
          {displayDescription ||
            "Comprehensive tactical training with live classes, war-room strategies, and regular drills."}
        </p>

        {isLongDescription && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-cavalier-brand text-xs font-bold uppercase mb-4 hover:underline focus:outline-none"
          >
            {showFullDesc ? "Read Less" : "Read More"}
          </button>
        )}

        {/* Course Features */}
        <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
          {duration && (
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaClock className="text-cavalier-brand" />
              <span>{duration} Duration</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <FaUsers className="text-cavalier-brand" />
            <span>Live Tactical Sessions</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <FaBook className="text-cavalier-brand" />
            <span>Study Material & Mock Tests</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className="text-yellow-500 text-xs" />
          ))}
          <span className="text-xs text-gray-500 ml-2 font-bold uppercase tracking-wide">Top Rated</span>
        </div>

        {/* ✅ Enroll via WhatsApp */}
        <button
          onClick={handleWhatsAppRedirect}
          className="w-full bg-cavalier-brand hover:bg-white text-black font-bold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        >
          <FaWhatsapp className="text-lg" />
          Join the Ranks
        </button>
      </div>
    </motion.div>
  );
};

// ✅ Main CourseList Component
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/courses`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load strategy modules.");
      // Fallback data
      setCourses([
        {
          id: 1,
          name: "NDA Foundation Course",
          price: "15,999",
          description:
            "Intensive preparation for National Defence Academy with expert faculty and structured syllabus designed for rapid revision and strong conceptual clarity.",
          duration: "6 Months",
          category: "NDA",
          image: "/images/nda-course.jpg", // Mock path
        },
        {
          id: 2,
          name: "CDS OTA Special Batch",
          price: "12,999",
          description:
            "Complete Combined Defence Services preparation focusing on OTA specific syllabus, mock tests, and SSB guidance.",
          duration: "4 Months",
          category: "CDS",
          image: "/images/cds-course.jpg", // Mock path
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cavalier-bg py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <FaShieldAlt /> Training Programs
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Defence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Strategy Modules</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Specialized tactical courses designed by ex-defence officers to ensure your selection in the armed forces.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 max-w-xl mx-auto"
        >
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cavalier-brand" />
            <input
              type="text"
              placeholder="Search by course name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-cavalier-card-dark/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cavalier-brand focus:border-cavalier-brand transition-all duration-300 outline-none backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cavalier-brand mx-auto"></div>
            <p className="text-cavalier-brand mt-4 font-bold tracking-wider">Accessing Course Database...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-center"
          >
            <div className="bg-cavalier-card-dark p-8 rounded-2xl inline-block border border-red-500/30">
              <p className="text-red-500 font-bold mb-4">⚠️ {error}</p>
              <button
                onClick={fetchCourses}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </motion.div>
        )}

        {/* Courses Grid */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <FaBook className="text-4xl text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Modules Found
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm
                      ? `No results matching "${searchTerm}"`
                      : "No training modules currently listed."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 text-gray-500 font-bold uppercase tracking-widest text-xs"
          >
            Displaying {filteredCourses.length} Tactical Modules
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseList;

