import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import BestSellingProducts from "../components/BestSellingProducts";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const VidyarjanStore = () => {
  const location = useLocation();
  const product = location.state || null;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <motion.h1 
        className="text-4xl font-bold text-orange-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vidyarjan Store
      </motion.h1>
      {product ? (
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl md:w-96 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-square rounded-lg"
          />
          <h3 className="text-xl font-semibold mt-4 text-gray-800 text-center md:text-left">{product.title}</h3>
          <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
            📚 Live Class | 🎁 Free Content | 📝 Tests
          </p>
          <div className="flex flex-col md:flex-row items-center mt-4 text-gray-700 space-y-2 md:space-y-0 md:space-x-3">
            <span className="text-3xl font-bold text-orange-600">₹{product.price}</span>
            <span className="text-gray-400 line-through text-lg">₹{product.oldPrice}</span>
            <span className="px-3 py-1 text-green-700 bg-green-100 rounded-full text-sm">
              {product.discount} OFF
            </span>
          </div>
          <button className="mt-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 rounded-lg font-semibold hover:from-red-500 hover:to-orange-600 transition">
            🚀 Buy this Course
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/empty-store.svg"
            alt="Empty Store"
            className="w-72 opacity-80"
          />
          <p className="text-xl text-gray-500">Oops! No products available right now.</p>
          <p className="text-gray-400">Check back later for amazing courses and deals!</p>
        </motion.div>
      )}
    </div>
  );
};

export default VidyarjanStore;
