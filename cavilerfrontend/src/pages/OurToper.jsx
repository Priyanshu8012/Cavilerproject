import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaStar, FaAward, FaMedal, FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function TopPerformers() {
  const navigate = useNavigate();
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchToppers();
  }, []);
  const fetchToppers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/stories`);
      setToppers(response.data);
    } catch (error) {
      console.error("Error fetching toppers:", error);
      setError("Failed to load top performers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-cavalier-bg via-cavalier-card-dark to-cavalier-bg">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchToppers}
            className="bg-cavalier-header-bg text-cavalier-brand px-6 py-2 rounded-lg hover:bg-cavalier-card-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cavalier-bg via-cavalier-card-dark to-cavalier-bg py-16 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cavalier-header-bg/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cavalier-card-dark/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-3 bg-cavalier-card-dark/80 backdrop-blur-sm border border-cavalier-header-bg/20 px-6 py-3 rounded-full mb-6 shadow-lg"
          >
            <FaTrophy className="text-cavalier-brand text-xl" />
            <span className="text-lg font-semibold text-cavalier-brand">Academic Excellence</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Our <span className="bg-gradient-to-r from-cavalier-brand to-white bg-clip-text text-transparent">Alumni</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the exceptional achievements of our brightest students who have set new benchmarks of excellence
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: "200+", label: "AIR Under 1000", icon: <FaStar className="text-yellow-400" /> },
            { number: "98%", label: "Selection Rate", icon: <FaMedal className="text-blue-400" /> },
            { number: "50+", label: "State Rankers", icon: <FaAward className="text-emerald-400" /> },
            { number: "15+", label: "Years Legacy", icon: <FaGraduationCap className="text-purple-400" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 border border-white/10">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Toppers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-cavalier-header-bg/10 rounded-2xl p-6 shadow-lg animate-pulse"
              >
                <div className="w-full h-64 bg-cavalier-header-bg/20 rounded-xl mb-4"></div>
                <div className="h-4 bg-cavalier-header-bg/20 rounded mb-2"></div>
                <div className="h-4 bg-cavalier-header-bg/20 rounded mb-2"></div>
                <div className="h-3 bg-cavalier-header-bg/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {toppers.map((topper, index) => (
                <motion.div
                  key={topper.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="group relative bg-cavalier-card-dark/90 backdrop-blur-lg border border-cavalier-header-bg/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-cavalier-brand to-cavalier-header-bg rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">#{index + 1}</span>
                    </div>
                  </div>

                  {/* Student Image */}
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-cavalier-header-bg/20 to-cavalier-bg">
                    <img
                      src={topper.image?.startsWith("http") ? topper.image : `${API_URL}${topper.image}`}
                      alt={topper.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback */}
                    <div className="hidden w-full h-full items-center justify-center">
                      <FaGraduationCap className="text-6xl text-cavalier-header-bg/50" />
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {topper.name}
                    </h3>

                    <div className="bg-gradient-to-r from-cavalier-header-bg/30 to-cavalier-bg/50 border border-cavalier-header-bg/20 rounded-xl p-3 mb-3">
                      <div className="flex items-center justify-center gap-2 text-cavalier-brand">
                        <FaTrophy className="text-sm" />
                        <span className="font-bold text-sm">{topper.achievement}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold"></span>
                        <span>{topper.course}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold"></span>
                        <span>{topper.year}</span>
                      </div>
                      {topper.rank && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-semibold">AIR:</span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                            {topper.rank}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {topper.description && (
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-2">
                        {topper.description}
                      </p>
                    )}
                  </div>

                  {/* Hover Effect */}
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cavalier-brand/5 to-cavalier-header-bg/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )
        }

        {/* Empty State */}
        {
          !loading && toppers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-cavalier-header-bg/10 rounded-3xl flex items-center justify-center border border-cavalier-header-bg/20">
                <FaTrophy className="text-6xl text-cavalier-header-bg/50" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 mb-4">No Top Performers Yet</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Our achievers' success stories are being prepared. Check back soon to see our star performers!
              </p>
            </motion.div>
          )
        }

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-cavalier-card-dark/80 backdrop-blur-md border border-cavalier-brand/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Be Our Next <span className="text-cavalier-brand">Success Story</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Join our legacy of excellence and become the next top performer with our expert guidance and comprehensive training.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/courses")}
              className="bg-cavalier-brand text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cavalier-brand/25 hover:bg-white transition-all duration-300"
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div >

      {/* Custom Styles */}
      < style dangerouslySetInnerHTML={{
        __html: `
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}} />
    </div >
  );
}
