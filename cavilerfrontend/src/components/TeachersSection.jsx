import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChalkboardUser, FaAward, FaMedal } from "react-icons/fa6";

const teachers = [
  {
    name: "Wg. Cdr. Alok Sahay",
    subject: "Psychologist",
    experience: "20+ Years Experience",
    rank: "A Kargil veteran",
    image: "/assets/teachernew/AlokSahay.jpg",
  },
  {
    name: "Col. Jagtap Sir",
    subject: "SSB Faculty",
    experience: "2+ Years Experience",
    rank: "IISC Bangalore",
    image: "/assets/teachernew/Jagtap.jpg",
  },
  {
    name: "Gp. Capt. Sanjay Pethkar (Retd.)",
    subject: "SSB Faculty",
    experience: "5+ Years Experience",
    rank: "Jamia Hamdard",
    image: "/assets/teachernew/SanjayPethkar.jpg",
  },
  {
    name: "Mr. Satij Sir",
    subject: "Physics Faculty",
    experience: "14+ Years Experience",
    rank: "IIS University",
    image: "/assets/teachernew/Satij.jpg",
  },
];

const TeachersSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-cavalier-bg overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cavalier-header-bg/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase">
              The Guiding Force
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Mentors Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Forge Officers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
          >
            Learn from veterans and experts who have dedicated their lives to shaping the future of India's defence forces.
          </motion.p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-cavalier-card-dark/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-cavalier-brand/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300">

                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cavalier-card-dark/90 z-10"></div>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-top"
                  />
                  {/* Floating Rank */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-cavalier-brand text-cavalier-bg text-xs font-bold uppercase tracking-wider rounded-md mb-1 inline-block">
                      {teacher.rank}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cavalier-brand transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-cavalier-brand/80 text-sm font-medium mb-4 uppercase tracking-wide">
                    {teacher.subject}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-gray-400 text-sm">
                    <FaAward className="text-cavalier-brand text-lg" />
                    <span>{teacher.experience}</span>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-cavalier-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;

