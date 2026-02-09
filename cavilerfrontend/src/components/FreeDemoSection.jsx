import React, { useState, useMemo, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import pic from "../banner/img1.jpg";

export default function FreeDemoSection() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-100 py-4 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between rounded-3xl shadow-lg">
      {/* Left Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
          Book your{" "}
          <span className="text-orange-500 relative">
            Free Demo
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 opacity-80"
            ></motion.span>
          </span>{" "}
          Session
        </h2>
        <p className="text-gray-700 mt-3 text-lg">
          Get a free academic counseling session with our expert mentors.
        </p>

        {/* Key Features */}
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2 text-gray-800">
            <FaCheckCircle className="text-green-500" /> Personalized guidance
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <FaCheckCircle className="text-green-500" /> Learn from top educators
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <FaCheckCircle className="text-green-500" /> Free doubt-solving session
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all shadow-lg"
        >
          Book a Free Demo
        </motion.button>
      </div>

      {/* Right Image Content */}
      <div className="relative mt-8 md:mt-0 flex justify-center">
        {/* Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-md shadow-xl p-8 md:p-10 rounded-full relative"
        >
          <img
            src={pic} // Replace with actual image
            alt="Free Demo"
            className="w-80 md:w-96 h-auto rounded-full shadow-lg"
          />
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-2 left-2 text-orange-400 text-3xl"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
}

