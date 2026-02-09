import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ExploreCourses() {
  const courses = [
    {
      title: "Competitive Exams",
      classRange: "Class 3 - 13",
      buttons: ["JEE", "NEET", "Foundation", "EAMCET", "Olympiad", "JEE Books", "NEET Books"],
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      gradient: "bg-gradient-to-br from-blue-100 to-blue-300",
    },
    {
      title: "School Tuition",
      classRange: "Class 3 - 12",
      buttons: ["CBSE Board", "ICSE Board"],
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      gradient: "bg-gradient-to-br from-purple-100 to-purple-300",
    },
    {
      title: "Courses for Kids",
      classRange: "Class 1 - 5",
      buttons: ["Spoken English", "Learn English", "Learn Math", "Learn Coding"],
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      gradient: "bg-gradient-to-br from-yellow-100 to-yellow-300",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Explore Courses <span className="text-gray-500 text-lg">(Class 3 - 13)</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CourseCard {...course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CourseCard({ title, classRange, buttons, image, gradient }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${gradient} flex flex-col items-center text-center`}>
      <p className="text-blue-800 font-semibold text-sm">{classRange}</p>
      <h3 className="text-2xl font-bold mt-2 text-gray-900">{title}</h3>
      <img src={image} alt={title} className="w-28 h-28 mt-4 rounded-full border-4 border-white shadow-md" />
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition shadow-md"
            onClick={() => alert(`Clicked on ${btn}`)}
          >
            {btn}
          </button>
        ))}
      </div>
      <button className="mt-6 bg-orange-500 text-white px-5 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition shadow-lg">
        Explore Courses
      </button>
    </div>
  );
}

