import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaGraduationCap, FaAward } from "react-icons/fa";
import Counselors from "../components/Counselors";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/profiles`)
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load teacher profiles.");
        setLoading(false);
      });
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cavalier-bg">
        <p className="text-lg text-cavalier-brand font-medium animate-pulse">
          Loading faculty profiles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cavalier-bg">
        <p className="text-lg text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-cavalier-bg py-20 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cavalier-header-bg/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
          <FaChalkboardTeacher /> Faculty
        </div>
        <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Command Team</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          Learn from veterans, ex-defence officers, and subject matter experts dedicated to forging the next generation of leaders.
        </p>
      </motion.div>

      {/* Teachers Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10 mb-20">
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 hover:border-cavalier-brand/50 hover:shadow-2xl transition-all duration-300"
          >
            {/* Profile Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cavalier-brand/30 group-hover:border-cavalier-brand transition-colors shadow-lg mb-6">
              <img
                src={
                  teacher.photo
                    ? `${backendUrl}${teacher.photo}`
                    : "/assets/placeholder.png"
                }
                alt={teacher.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/placeholder.png";
                }}
              />
            </div>

            {/* Name + Post */}
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors">
              {teacher.name}
            </h2>
            <p className="text-cavalier-brand text-xs font-bold uppercase tracking-widest mb-4">
              {teacher.post}
            </p>

            {/* Info Container */}
            <div className="w-full pt-4 border-t border-white/5 space-y-2 text-sm text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <FaGraduationCap className="text-cavalier-brand/70" />
                <span>{teacher.education}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaAward className="text-cavalier-brand/70" />
                <span>{teacher.experience} Years Service</span>
              </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cavalier-brand/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-10">
        <Counselors />
      </div>
    </section>
  );
};

export default Teachers;

