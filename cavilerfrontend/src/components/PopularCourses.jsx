import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaJetFighter, FaBuildingColumns, FaUserShield, FaPlane, FaPersonChalkboard, FaArrowRight } from "react-icons/fa6";

const courses = [
  {
    id: 1,
    name: "NDA Foundation",
    description: "Build a strong base for your defence career starting early.",
    icon: <FaGraduationCap />,
    link: "/courses"
  },
  {
    id: 2,
    name: "NDA + CDS",
    description: "Comprehensive coaching for combined defence services.",
    icon: <FaUserShield />,
    link: "/courses"
  },
  {
    id: 3,
    name: "Offline Centres",
    description: "Experience our world-class campus learning environment.",
    icon: <FaBuildingColumns />,
    link: "/courses"
  },
  {
    id: 4,
    name: "AFCAT Coaching",
    description: "Specialized training for Air Force Common Admission Test.",
    icon: <FaPlane />,
    link: "/courses"
  },
  {
    id: 5,
    name: "SSB Interview",
    description: "Master the psychology and personality tests of SSB.",
    icon: <FaPersonChalkboard />,
    link: "/courses"
  },
  {
    id: 6,
    name: "One to One",
    description: "Personalized mentorship and doubt clearing sessions.",
    icon: <FaJetFighter />,
    link: "/courses"
  },
];

const Card = ({ course, index, onClick }) => {
  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        onClick={onClick}
        className="h-full bg-cavalier-card-dark/60 backdrop-blur-md border border-cavalier-brand/20 rounded-2xl p-6 cursor-pointer overflow-hidden relative transition-all duration-300 hover:border-cavalier-brand/60 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] group-hover:-translate-y-2"
      >
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cavalier-brand/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-cavalier-brand/20"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cavalier-header-bg to-cavalier-bg flex items-center justify-center text-cavalier-brand text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-cavalier-brand/10">
            {course.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors">
            {course.name}
          </h3>

          <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center text-cavalier-brand font-semibold text-sm tracking-wide group/btn">
            <span>EXPLORE PROGRAM</span>
            <FaArrowRight className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PopularCourses = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cavalier-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cavalier-header-bg/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="py-1 px-3 rounded-full bg-cavalier-brand/10 border border-cavalier-brand/30 text-cavalier-brand text-xs font-bold tracking-widest uppercase mb-4 inline-block">
              Elite Training Programs
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Train With The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Best</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Comprehensive defence coaching designed by ex-officers to help you earn your uniform.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {courses.map((course, index) => (
            <Card
              key={course.id}
              course={course}
              index={index}
              onClick={() => navigate(course.link)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate("/courses")}
            className="group relative px-8 py-4 bg-cavalier-brand text-cavalier-bg font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              VIEW ALL COURSES <FaArrowRight />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCourses;
