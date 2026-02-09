import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

const studyMaterials = [
  {
    category: "NCERT",
    icon: <FaBook className="text-orange-500 text-3xl" />, 
    links: [
      "NCERT Solutions", "NCERT Solutions for Class 12", "NCERT Solutions for Class 12 Maths",
      "NCERT Solutions for Class 12 Physics", "NCERT Solutions for Class 12 Chemistry",
      "NCERT Solutions for Class 12 Biology", "NCERT Solutions for Class 12 Business Studies",
      "NCERT Books", "NCERT Books Class 12", "NCERT Books Class 11",
      "NCERT Books Class 10", "NCERT Books Class 9", "NCERT Books Class 8",
    ],
  },
  {
    category: "Reference Books",
    icon: <FaChalkboardTeacher className="text-blue-500 text-3xl" />, 
    links: [
      "HC Verma Solutions", "RD Sharma Solutions", "RS Aggarwal Solutions",
      "NCERT Exemplar Solutions", "Lakhmir Singh Solutions", "DK Goel Solutions",
      "TS Grewal Solutions", "Sandeep Garg Solutions",
    ],
  },
  {
    category: "Competitive Exams",
    icon: <FaGraduationCap className="text-green-500 text-3xl" />, 
    links: [
      "JEE Main", "JEE Advanced", "NEET", "Olympiad Preparation", "NDA", "KVPY", "NTSE",
    ],
  },
];

const StudyMaterial = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Study <span className="text-orange-500">Materials</span>
      </motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {studyMaterials.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">{section.category}</h2>
            </div>
            <ul className="space-y-2">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;

