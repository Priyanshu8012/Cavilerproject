import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaMedal, FaStar, FaGraduationCap, FaArrowRight, FaFire, FaShieldAlt } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const InspiringStories = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          const updatedStudents = data.map(student => ({
            ...student,
            photo: student.photo
              ? `${API_BASE_URL}${student.photo}`
              : "https://via.placeholder.com/150?text=Cadet",
          }));
          setStudents(updatedStudents);
        } else {
          throw new Error("Invalid data format from server.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-cavalier-card-dark p-8 rounded-2xl border border-red-500/30 max-w-md"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Comms Failure</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cavalier-brand text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            Reconnect
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 bg-cavalier-brand/10 border border-cavalier-brand/30 px-6 py-2 rounded-full mb-6"
          >
            <FaTrophy className="text-cavalier-brand text-lg" />
            <span className="text-sm font-bold text-cavalier-brand uppercase tracking-[0.2em]">Tactical Victories</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-tight">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Fame</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Saluting the cadets who conquered the battlefield of examinations with unwavering discipline and strategy.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/courselist")}
              className="bg-cavalier-brand text-black px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-3"
            >
              Start Your Training
              <FaArrowRight className="text-sm" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-8 mb-16 text-center relative overflow-hidden group hover:border-cavalier-brand transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cavalier-brand to-transparent opacity-50"></div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 bg-cavalier-brand text-black px-4 py-1 rounded-sm text-xs font-black uppercase tracking-widest mb-4"
          >
            <FaFire /> 2025 Mission Report
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">
            One in <span className="text-cavalier-brand">Two</span> Cadets Secured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Top Ranks</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Join the elite squadron that transforms potential into kinetic success.
          </p>
        </motion.div>

        {/* Students Grid - No Filters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence>
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-cavalier-card-dark rounded-2xl p-6 border border-white/5 animate-pulse"
                >
                  <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-6 bg-white/10 rounded mb-3 w-1/2 mx-auto"></div>
                </motion.div>
              ))
            ) : students.length > 0 ? (
              students.map((student, index) => (
                <motion.div
                  key={student.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(student.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 shadow-lg hover:border-cavalier-brand transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cavalier-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Student Photo */}
                  <div className="relative z-10 flex justify-center mb-6">
                    <div className="relative">
                      <motion.div
                        className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-cavalier-brand to-yellow-600"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-full h-full rounded-full object-cover border-4 border-black"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full rounded-full bg-cavalier-card-light hidden items-center justify-center border-4 border-black">
                          <FaGraduationCap className="text-3xl text-cavalier-brand" />
                        </div>
                      </motion.div>

                      {/* Rank/Star Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-cavalier-brand text-black rounded-full flex items-center justify-center border-4 border-black shadow-lg z-20"
                      >
                        <FaStar className="text-xs" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight uppercase tracking-wide">
                      {student.name}
                    </h3>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 mb-4 group-hover:border-cavalier-brand/30 transition-colors">
                      <div className="flex items-center justify-center gap-2 text-cavalier-brand">
                        <FaMedal className="text-sm" />
                        <span className="font-bold text-sm tracking-wide">{student.achievement || "Outstanding Cadet"}</span>
                      </div>
                    </div>

                    <div className="text-center border-t border-white/5 pt-3">
                      <p className="text-cavalier-brand/70 font-bold text-[10px] uppercase tracking-widest mb-1">Discipline</p>
                      <p className="text-gray-300 text-sm font-medium">{student.course || "General Service"}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaShieldAlt className="text-4xl text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2 uppercase tracking-widest">No Records Found</h3>
                <p className="text-gray-500">
                  The archives communicate silence.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cavalier-brand/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            <h3 className="text-2xl md:text-4xl font-black mb-4 text-white uppercase tracking-tight relative z-10">
              Your Name Belongs on the <span className="text-cavalier-brand">Honor Roll</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light relative z-10">
              We provide the strategy, the discipline, and the training. You provide the resolve.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact-us")}
              className="bg-cavalier-brand text-black px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 relative z-10"
            >
              Enlist Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InspiringStories;
