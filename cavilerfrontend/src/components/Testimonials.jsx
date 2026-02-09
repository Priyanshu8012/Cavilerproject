import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Rhythm Sabharwal",
    rank: "AIR 2973 | NEET 2021",
    quote:
      "After I joined the Eklavya batch, I cracked KVPY and WBJEE and discovered my true potential.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
  },
  {
    name: "Chandvi Taneja",
    rank: "NEET Score 575",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Arya Verma",
    rank: "98.4% CBSE XII",
    quote:
      "I had a great experience at vidyarajan. All my concepts were clear and I felt confident while appearing for the board exams.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Akshat Kumar",
    rank: "98.2% CBSE XII",
    quote:
      "The LIVE interactive classes with visual explanations helped me learn and retain all the topics better.",
    image: "https://via.placeholder.com/150",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < testimonials.length ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="bg-white text-black py-12 px-6 md:px-16">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center"
      >
        Stories that <span className="text-orange-500 underline">Inspire</span>
      </motion.h2>

      {/* Main Testimonial Card */}
      <div className="mt-8 flex flex-col md:flex-row items-center bg-white  p-6 md:p-8 rounded-xl shadow-lg">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3">
          <motion.img
            key={currentIndex}
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg w-full"
          />
          {/* Play Button */}
          <div className="absolute inset-0 flex justify-center items-center">
            <button className="bg-black p-3 rounded-full shadow-md hover:scale-110 transition">
              <FaPlay className="text-orange-500" />
            </button>
          </div>
        </div>

        {/* Testimonial Text */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 md:mt-0 md:ml-8 text-center md:text-left"
        >
          <p className="text-lg md:text-xl text-black ">
            {testimonials[currentIndex].quote}
          </p>
          <p className="font-bold mt-4 text-orange-400 text-lg">
            {testimonials[currentIndex].name}
          </p>
          <p className="text-black ">{testimonials[currentIndex].rank}</p>
        </motion.div>
      </div>

      {/* Small Testimonial Thumbnails */}
      <div className="flex justify-center space-x-6 mt-8">
        {testimonials.slice(1).map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setCurrentIndex(index + 1)}
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-orange-500">
              <img src={item.image} alt={item.name} className="w-full h-full" />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
                <button className="bg-white p-2 rounded-full shadow-md">
                  <FaPlay className="text-orange-500" size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm font-semibold mt-2 text-black ">
              {item.name}
            </p>
            <p className="text-xs text-gray-900">{item.rank}</p>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-md hover:scale-110 transition"
      >
        <FaChevronRight size={22} />
      </button>
    </div>
  );
}

