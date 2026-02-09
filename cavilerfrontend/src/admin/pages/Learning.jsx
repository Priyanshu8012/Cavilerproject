import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const learningPaths = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and more.",
    progress: 80,
    modules: ["HTML Basics", "CSS Styling", "JavaScript Fundamentals", "React Basics"],
  },
  {
    id: 2,
    title: "Data Science",
    description: "Explore Python, Machine Learning, and Data Visualization.",
    progress: 60,
    modules: ["Python Programming", "Data Analysis with Pandas", "Machine Learning Basics"],
  },
  {
    id: 3,
    title: "Cyber Security",
    description: "Master Ethical Hacking, Networking, and Security Tools.",
    progress: 40,
    modules: ["Networking Basics", "Cyber Threats", "Ethical Hacking Introduction"],
  },
];

const LearningPathPage = () => {
  const [expandedPath, setExpandedPath] = useState(null);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <motion.div
        className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg mb-6">
          📚 Learning Path
        </h1>

        {learningPaths.map((path) => (
          <motion.div
            key={path.id}
            className="bg-gray-900/80 p-6 rounded-xl mb-4 border border-gray-700 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}>
              <div>
                <h2 className="text-2xl font-bold">{path.title}</h2>
                <p className="text-gray-400">{path.description}</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className={`h-2 bg-blue-500 rounded-full`} style={{ width: `${path.progress}%` }}></div>
                </div>
                <p className="text-sm mt-2">Progress: {path.progress}%</p>
              </div>
              {expandedPath === path.id ? <FaChevronUp className="text-blue-400 text-2xl" /> : <FaChevronDown className="text-blue-400 text-2xl" />}
            </div>

            {expandedPath === path.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <h3 className="text-lg font-semibold text-blue-300">Modules:</h3>
                <ul className="list-disc pl-6 mt-2">
                  {path.modules.map((module, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <FaCheckCircle className="text-green-400" /> {module}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LearningPathPage;

