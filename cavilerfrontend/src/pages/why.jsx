import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaTrophy, FaPersonChalkboard, FaBullseye, FaPersonRunning, FaUserShield } from "react-icons/fa6";

const features = [
  {
    icon: <FaPersonChalkboard />,
    title: "Defence Expert Faculty",
    subtitle: "Learn from Ex-Officers & Subject Matter Experts"
  },
  {
    icon: <FaTrophy />,
    title: "Highest Selections",
    subtitle: "Consistent Top Rankers in NDA, CDS & AFCAT"
  },
  {
    icon: <FaUserShield />,
    title: "SSB Interview Guidance",
    subtitle: "Comprehensive 5-Day SSB Procedure Training"
  },
  {
    icon: <FaPersonRunning />,
    title: "Physical Conditioning",
    subtitle: "GTO Ground Training & Morning Drills"
  },
  {
    icon: <FaBookOpen />,
    title: "Strategic Material",
    subtitle: "Curated Content focused on Defence Exams"
  },
  {
    icon: <FaBullseye />,
    title: "Tactical Test Series",
    subtitle: "Weekly Mock Tests tailored to Exam Patterns"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 px-4 sm:px-6 bg-cavalier-bg relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-collg:flex-row items-center gap-16">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 text-center lg:text-left"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase">
              The Cavalier Edge
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 uppercase">
            Why Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Cavalier?</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We don't just teach; we train you to think, act, and lead like an officer. Join the league of warriors.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:inline-flex items-center gap-2 px-8 py-4 bg-cavalier-brand text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-cavalier-brand/20"
          >
            Join The Legacy
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex items-start space-x-5 p-6 bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl border border-white/5 hover:border-cavalier-brand/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cavalier-brand/20 to-cavalier-header-bg/20 text-cavalier-brand text-2xl group-hover:scale-110 group-hover:bg-cavalier-brand group-hover:text-black transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="lg:hidden w-full text-center mt-8"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-cavalier-brand text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all duration-300 shadow-lg">
            Join The Legacy
          </button>
        </motion.div>

      </div>
    </section>
  );
}

