import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaImage, FaUsers, FaBook, FaStar, FaGraduationCap, FaQuoteLeft, FaBlog, FaChalkboardTeacher, FaFileAlt, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SiteCustomization = () => {
  const sections = [
    {
      title: "Banner Comms",
      description: "Update homepage visual directives",
      link: "/update-banner",
      icon: <FaImage className="text-cavalier-brand" size={24} />,
      color: "border-cavalier-brand/30 hover:border-cavalier-brand"
    },
    {
      title: "Gallery Intel",
      description: "Manage visual reconnaissance data",
      link: "/popular-courses",
      icon: <FaStar className="text-yellow-500" size={24} />,
      color: "border-yellow-500/30 hover:border-yellow-500"
    },
    {
      title: "Officer Roster",
      description: "Update instructor profiles",
      link: "/book-free-demo",
      icon: <FaChalkboardTeacher className="text-blue-500" size={24} />,
      color: "border-blue-500/30 hover:border-blue-500"
    },
    {
      title: "Cadet Corps",
      description: "Highlight successful operatives",
      link: "/our-students",
      icon: <FaUsers className="text-green-500" size={24} />,
      color: "border-green-500/30 hover:border-green-500"
    },
    {
      title: "Visual Reports",
      description: "Manage inspirational mission logs",
      link: "/stories-that-inspire",
      icon: <FaQuoteLeft className="text-purple-500" size={24} />,
      color: "border-purple-500/30 hover:border-purple-500"
    },
    {
      title: "Transmission Log",
      description: "Update blog operational details",
      link: "/blog-update",
      icon: <FaBlog className="text-orange-500" size={24} />,
      color: "border-orange-500/30 hover:border-orange-500"
    },
    {
      title: "Field Reports",
      description: "Update cadet testimonials",
      link: "/testimonial-update",
      icon: <FaQuoteLeft className="text-red-500" size={24} />,
      color: "border-red-500/30 hover:border-red-500"
    },
    {
      title: "Recruitment Forms",
      description: "Manage staff applications",
      link: "/Teacher-job-Forms",
      icon: <FaFileAlt className="text-teal-500" size={24} />,
      color: "border-teal-500/30 hover:border-teal-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white px-6 py-12 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/5 text-cavalier-brand text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            <FaGlobe /> System Configuration
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Base <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Protocols</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Modify operational parameters and public-facing intel from this central console.
          </p>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5
              }}
              className="relative group"
            >
              <Link to={section.link} className='block h-full'>
                <div className={`
                  bg-cavalier-card-dark rounded-xl border ${section.color} p-6 shadow-lg
                  transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] h-full flex flex-col
                  relative overflow-hidden
                `}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none"></div>

                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 backdrop-blur-sm group-hover:border-current transition-colors">
                      {section.icon}
                    </div>
                    <FaShieldAlt className="text-gray-700/50 text-4xl absolute top-4 right-4 group-hover:text-cavalier-brand/10 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-cavalier-brand transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-500 mb-8 text-sm leading-relaxed font-mono min-h-[40px]">
                    {section.description}
                  </p>

                  {/* Edit Button */}
                  <div className="mt-auto">
                    <div className="w-full px-4 py-3 bg-white/5 hover:bg-cavalier-brand hover:text-black text-white rounded-lg 
                                  flex items-center justify-center gap-3 border border-white/10 hover:border-cavalier-brand
                                  transition-all duration-300 font-bold uppercase text-xs tracking-wider">
                      <FaEdit />
                      <span>Configure</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-white/5"
        >
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
            Authorized Personnel Only | Secure Connection Active
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteCustomization;
