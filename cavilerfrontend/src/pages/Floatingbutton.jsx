// components/FloatingButtons.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes, FaUpwork, FaComment } from "react-icons/fa";
import ChatbotToggle from "./ChatbotToggle";

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpworkBar, setShowUpworkBar] = useState(true);

  const whatsappData = {
    phone: "919834301046",
    message: "Hello! I'm interested in Vidyarjan Science Academy courses. Can you provide more information?"
  };

  const upworkProfile = "https://www.upwork.com/freelancers/~01abc123def456ghi";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappData.phone}?text=${encodeURIComponent(whatsappData.message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* ✅ Upwork Top Bar */}
      <AnimatePresence>
        {showUpworkBar && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white z-50 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaUpwork className="text-white text-lg" />
                <span className="text-sm font-medium">
                  Hire us on Upwork for professional development services
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={upworkProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  View Profile
                </a>
                <button
                  onClick={() => setShowUpworkBar(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Floating Buttons Section */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">

        {/* ✨ Chatbot Toggle Button (Above WhatsApp) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="shadow-xl"
        >
          <ChatbotToggle />
        </motion.div>

        {/* Additional Options (Call + Email) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Call Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => window.open(`tel:${whatsappData.phone}`)}
                className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Call Us
                </span>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">📞</span>
                </div>
              </motion.button>

              {/* Email Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => window.open('mailto:info@vidyarjan.com')}
                className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Email Us
                </span>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">✉️</span>
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* ✅ Main WhatsApp Button */}
        <motion.button
          onClick={handleWhatsAppClick}
          className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsOpen(true)}
          onHoverEnd={() => setIsOpen(false)}
        >
          {/* Animated Ring */}
          <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Main Icon */}
          <div className="relative z-10">
            <FaWhatsapp size={28} />
          </div>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-xs font-bold text-white">!</span>
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
          </div>
        </motion.button>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden bg-gray-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaComment size={20} />
        </button>
      </div>

      {/* ✅ Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}} />
    </>
  );
};

export default FloatingButtons;

