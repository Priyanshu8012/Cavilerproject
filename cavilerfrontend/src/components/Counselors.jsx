import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaGraduationCap, FaAward } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const Counselors = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/counselors`);
      if (!response.ok) {
        throw new Error("Failed to fetch counselors");
      }

      const data = await response.json();
      setCounselors(data);
    } catch (err) {
      console.error("Error fetching counselors:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-screen bg-cavalier-bg py-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cavalier-brand mx-auto"></div>
          <p className="text-cavalier-brand mt-4 font-bold tracking-wider">Retrieving Officer Files...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cavalier-bg">
        <div className="bg-cavalier-card-dark p-8 rounded-2xl shadow-2xl text-center border border-red-500/30">
          <p className="text-red-500 font-bold mb-4">⚠️ {error}</p>
          <button
            onClick={fetchCounselors}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-cavalier-bg py-20 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
          <FaUserTie /> Career Strategy
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
          Guidance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Cell</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          Expert mentorship for SSB interviews, physical fitness, and psychological conditioning.
        </p>
      </motion.div>

      {/* Counselors Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {counselors.map((counselor, index) => (
          <motion.div
            key={counselor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 hover:border-cavalier-brand/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            {/* Profile Image */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cavalier-brand/30 group-hover:border-cavalier-brand shadow-lg mb-6 transition-colors">
              <img
                src={
                  counselor.photo
                    ? `${API_BASE_URL}${counselor.photo}`
                    : "/assets/placeholder.png"
                }
                alt={counselor.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/assets/placeholder.png")}
              />
            </div>

            {/* Info */}
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors">
              {counselor.name}
            </h2>
            <p className="text-cavalier-brand text-xs font-bold uppercase tracking-widest mb-4">
              {counselor.designation}
            </p>

            {/* Qualification */}
            <div className="w-full pt-4 border-t border-white/5 space-y-2 text-sm text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <FaGraduationCap className="text-cavalier-brand/70" />
                <span>{counselor.qualification}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaAward className="text-cavalier-brand/70" />
                <span>{counselor.experience} Years Exp.</span>
              </div>
            </div>

            {/* Contact Info */}
            {(counselor.email || counselor.phone) && (
              <div className="mt-4 pt-3 border-t border-dashed border-white/10 w-full text-xs text-gray-500 space-y-1">
                {counselor.email && <div>{counselor.email}</div>}
                {counselor.phone && <div>{counselor.phone}</div>}
              </div>
            )}

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cavalier-brand/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {counselors.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-12 max-w-2xl mx-auto border border-white/10">
            <FaUserTie className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Counselors Deployed
            </h3>
            <p className="text-gray-400">
              Officer profiles are currently being updated by HQ. Please check back later.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Counselors;

