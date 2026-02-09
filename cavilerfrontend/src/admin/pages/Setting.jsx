import React, { useState } from "react";
import { FaMoon, FaSun, FaBell, FaLock, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";

const PlatformSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [profilePic, setProfilePic] = useState(null);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 transition-all duration-500 relative overflow-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      }`}
    >
      {/* Floating Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(0,0,0,0.2) 10%, transparent 90%)" }}
      />

      <motion.div
        className="w-full max-w-3xl bg-gradient-to-br from-gray-800 to-gray-900 text-white p-10 rounded-3xl shadow-3xl border border-blue-400 backdrop-blur-lg relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-400 drop-shadow-lg">
          Platform Settings
        </h1>

        {/* Profile Picture Upload */}
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="profilePic" className="relative cursor-pointer">
            <motion.img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <FaCamera className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full text-lg" />
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Profile Settings */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-300 mb-3">Profile Settings</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleProfileChange}
            className="w-full p-4 mb-3 rounded-xl bg-gray-700 border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg shadow-inner"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full p-4 mb-3 rounded-xl bg-gray-700 border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg shadow-inner"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={profile.password}
            onChange={handleProfileChange}
            className="w-full p-4 mb-3 rounded-xl bg-gray-700 border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg shadow-inner"
          />
          <motion.button
            onClick={handleSaveProfile}
            className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition duration-300 shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </div>

        {/* Theme Settings */}
        <div className="mb-6 flex justify-between items-center border-b border-gray-600 pb-4">
          <h2 className="text-xl font-semibold text-blue-300">Theme</h2>
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-4 rounded-xl bg-gray-700 border border-blue-400 hover:bg-blue-500 transition shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            {darkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-white text-2xl" />}
          </motion.button>
        </div>

        {/* Notification Settings */}
        <div className="mb-6 flex justify-between items-center border-b border-gray-600 pb-4">
          <h2 className="text-xl font-semibold text-blue-300">Notifications</h2>
          <motion.button
            onClick={() => setNotifications(!notifications)}
            className={`p-4 rounded-xl border border-blue-400 text-2xl transition shadow-lg ${
              notifications ? "bg-green-500" : "bg-gray-500"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <FaBell className="text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlatformSettings;

