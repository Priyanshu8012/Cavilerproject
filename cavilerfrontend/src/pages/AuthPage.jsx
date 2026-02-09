import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    try {
      const response = await axios.post(url, formData);
      setMessage(response.data.message);

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4">
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Side - Branding Section */}
        <motion.div 
          className="w-full md:w-1/2 p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex flex-col justify-center items-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome to VSA Pune Best Offline & Online Platform</h2>
          <p className="text-base md:text-lg">India's most trusted education platform</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-white text-orange-500 p-2 rounded-full">🏫</span>
              <p className="text-sm md:text-lg">1 Offline Centres</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-orange-500 p-2 rounded-full">🎓</span>
              <p className="text-sm md:text-lg">10k+ Happy Students</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-orange-500 p-2 rounded-full">📺</span>
              <p className="text-sm md:text-lg">Daily Interactive Classes</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-orange-500 p-2 rounded-full">⏳</span>
              <p className="text-sm md:text-lg">24x7 Doubt Solving</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Authentication Form */}
        <motion.div 
          className="w-full md:w-1/2 p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? "Login to Vidyarjan Science Academy" : "Join Vidyarjan Science Academy"}
          </motion.h2>
          
          {message && <p className="text-center text-red-500">{message}</p>}

          <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </motion.div>
            )}
            {!isLogin && (
              <motion.input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            )}
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            <motion.input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.button
              type="submit"
              className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? "Login" : "Register"}
            </motion.button>
          </form>
          
          <motion.p 
            className="text-center mt-4 md:mt-5 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isLogin ? "New to Vidyarajan?" : "Already have an account?"}{" "}
            <button
              className="text-orange-500 font-semibold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

