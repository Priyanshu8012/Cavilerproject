import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUserShield, FaShieldAlt } from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const url = isLogin
        ? `${import.meta.env.VITE_BASE_URL}/api/login`
        : `${import.meta.env.VITE_BASE_URL}/api/register`;

      const data = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, data);

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        setMessage("Authentication Verified... Initializing Uplink");
        setTimeout(() => (window.location.href = "/daaasshboard5296"), 1200);
      } else {
        setMessage("Commander profile created. Awaiting clearance.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Access Denied");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-cavalier-bg text-white font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Left Side – Brand Info */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-1 flex-col justify-center items-center bg-black/40 relative overflow-hidden border-r border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]"></div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="z-10 text-center px-10"
        >
          <div className="inline-block p-6 rounded-full bg-cavalier-brand/10 border border-cavalier-brand/30 mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <FaShieldAlt className="text-6xl text-cavalier-brand drop-shadow-xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
            Cavalier <span className="text-cavalier-brand">Command Center</span>
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg mx-auto tracking-wide">
            Centralized control for academy operations, cadet management, and strategic resources.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-16 bg-cavalier-brand rounded-full"></div>
            <div className="h-1 w-4 bg-gray-600 rounded-full"></div>
            <div className="h-1 w-4 bg-gray-600 rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side – Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-1 justify-center items-center relative p-6 md:p-10 z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none"></div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative z-10 w-full max-w-md bg-cavalier-card-dark backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 border border-cavalier-brand/20 hover:border-cavalier-brand/40 transition-colors duration-300"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
              {isLogin ? "Welcome, Commander" : "New Clearance"}
            </h2>
            <p className="text-cavalier-brand/80 text-sm font-mono uppercase tracking-widest">
              {isLogin ? "Authenticate to Access Network" : "Initialize Secured Protocol"}
            </p>
          </div>

          {message && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <p className="text-green-400 text-xs font-bold uppercase tracking-wider">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <p className="text-red-400 text-xs font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Rank / Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ENTER FULL NAME"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand outline-none transition-all duration-300"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Authorized Email</label>
              <input
                type="email"
                name="email"
                placeholder="ENTER EMAIL ID"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Secure Passkey</label>
              <input
                type="password"
                name="password"
                placeholder="ENTER PASSWORD"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand outline-none transition-all duration-300"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className={`w-full bg-cavalier-brand text-black py-4 rounded-lg text-sm font-black uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:bg-white transition-all duration-300 mt-6 ${loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "VERIFYING CREDENTIALS..." : isLogin ? "ACCESS COMMAND CENTER" : "REQUEST CLEARANCE"}
            </motion.button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">
              {isLogin ? "Missing Credentials?" : "Already Authorized?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cavalier-brand text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              {isLogin ? "INITIATE REGISTRATION PROTOCOL" : "RETURN TO LOGIN"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
