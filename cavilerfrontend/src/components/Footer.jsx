import React from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGraduationCap, FaBook, FaUsers, FaArrowRight } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChatbotToggle from "../pages/ChatbotToggle";

const Footer = () => {
  const navigate = useNavigate();
  const phoneNumber = "7020892704";

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-cavalier-header-bg text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 py-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Counseling Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-defence-olive/10 to-defence-navy/10 backdrop-blur-lg border border-defence-gold/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-defence-olive to-defence-navy rounded-xl flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">Free Career Guidance</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Get personalized counseling from our experts to choose the right path for your success.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = 'tel:9834301046'}
                className="w-full bg-gradient-to-r from-defence-olive to-defence-navy hover:from-defence-olive-light hover:to-defence-navy-light text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-defence-olive/25 hover:shadow-defence-olive/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiPhoneCall className="text-xl" />
                Speak to an Expert
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FaBuilding className="text-blue-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-white">Company</h3>
            </div>
            <ul className="space-y-3">
              {["About Us", "Contact us", "Blog", "Gallery"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-gray-300 hover:text-defence-gold transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-defence-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FaBook className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-white">Resources</h3>
            </div>
            <ul className="space-y-3">
              {[ "Teaching with Us", "Our Free Services"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-gray-300 hover:text-defence-gold transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-defence-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-purple-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-white">Courses</h3>
            </div>
            <ul className="space-y-3">
              {[
                "11th + 12th + NDA + JEE + SSB", "12th + NDA + JEE + SSB", "SSB Interview", "Crash Course – NDA", "Crash Course – CDS", "Crash Course – AFCAT", "SPI & GSPI"
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/courses"
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact & Social Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold bg-gradient-to-r from-defence-gold to-defence-khaki bg-clip-text text-transparent mb-2">
                📞 TOLL FREE: +91 7020892704
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-gray-300">
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <FaPhoneAlt className="text-defence-gold" />
                  +91 9511214558 (9 AM - 9:30 PM)
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <FaEnvelope className="text-defence-gold" />
                  Cavalierpune@gmail.com


                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <FaMapMarkerAlt className="text-defence-gold" />
                  Pune, Maharashtra
                </p>
              </div>
            </div>

            {/* Social/Contact Icons */}
            <div className="flex gap-4">
              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-800 p-4 rounded-2xl text-white text-xl cursor-pointer hover:bg-defence-olive transition-all duration-300 shadow-lg"
                onClick={() => window.open(`https://maps.google.com/?q=Cavalier+India+Pune+Pune`, "_blank")}
              >
                <FaBuilding />
              </motion.div>

              {/* Phone Call */}
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-orange-500 p-4 rounded-2xl text-white text-xl cursor-pointer hover:bg-orange-600 transition-all duration-300 shadow-lg"
                onClick={() => window.location.href = `tel:${phoneNumber}`}
              >
                <FiPhoneCall />
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 p-4 rounded-2xl text-white text-xl cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-lg"
                onClick={() => window.open(`https://wa.me/${phoneNumber}`, "_blank")}
              >
                <FaWhatsapp />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700 pt-6 mt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Cavalier India Pune. All rights reserved.
            {/* Developed by{' '} */}
            {/* <a 
              href="https://kumarsoft.in/" 
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              
            </a> */}
          </p>
         
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >

        <ChatbotToggle />


      </motion.div>
    </footer>
  );
};

export default Footer;
