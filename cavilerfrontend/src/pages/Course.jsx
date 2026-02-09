import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaPlane, FaShip, FaPersonRifle, FaSchool, FaStethoscope } from "react-icons/fa6";

const categories = [
  {
    title: "Officer Entry",
    subtitle: "Commissioned Ranks",
    exams: ["NDA", "CDS", "AFCAT", "INET"],
    icon: <FaUserShield />,
    color: "from-yellow-400 to-yellow-600"
  },
  {
    title: "JCO / Other Ranks",
    subtitle: "Non-Commissioned",
    exams: ["Airforce X & Y", "Navy SSR/AA", "Army GD/Clerk"],
    icon: <FaPersonRifle />,
    color: "from-green-400 to-green-600"
  },
  {
    title: "Interview Stage",
    subtitle: "Personality Test",
    exams: ["SSB Interview", "PABT / CPSS", "Medical"],
    icon: <FaPersonRifle />, // Using generic military person icon temporarily if others not available
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "School Level",
    subtitle: "Foundation",
    exams: ["Sainik School", "RMS", "RIMC"],
    icon: <FaSchool />,
    color: "from-orange-400 to-orange-600"
  },
  {
    title: "Medical Services",
    subtitle: "Nursing & Doctor",
    exams: ["MNS (Nursing)", "AFMC (MBBS)", "Army Dental"],
    icon: <FaStethoscope />,
    color: "from-red-400 to-red-600"
  },
  {
    title: "Para Military",
    subtitle: "Central Forces",
    exams: ["CAPF (AC)", "Assam Rifles", "Coast Guard"],
    icon: <FaShip />,
    color: "from-cyan-400 to-cyan-600"
  },
];

const ExamCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cavalier-bg relative overflow-hidden py-20 px-4 sm:px-6">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase">
              Chart Your Path to Glory
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Exam Categories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Cavalier prepares you for 35+ prestigious defence exam categories.
            Select your target and start your journey to the uniform.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-cavalier-card-dark/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-300 group-hover:bg-cavalier-card-dark/60 group-hover:border-cavalier-brand/30 hover:shadow-[0_0_30px_rgba(255,215,0,0.05)] overflow-hidden">

                {/* Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-cavalier-bg border border-white/10 flex items-center justify-center text-3xl text-cavalier-brand mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cavalier-brand transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-medium">
                    {category.subtitle}
                  </p>

                  <div className="space-y-3 mb-8">
                    {category.exams.map((exam, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cavalier-brand mr-3"></span>
                        {exam}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/courses')}
                    className="w-full py-3 rounded-lg border border-cavalier-brand/30 text-cavalier-brand font-bold uppercase tracking-wider hover:bg-cavalier-brand hover:text-cavalier-bg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Explore
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamCategories;

