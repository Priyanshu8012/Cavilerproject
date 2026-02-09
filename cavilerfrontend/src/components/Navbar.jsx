import React, { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Courses", path: "/courses", hasDropdown: true },
    { name: "Free Content", path: "/resources" },
    { name: "Exams", path: "/exams" },
    { name: "Teachers", path: "/teachers" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
    { name: "Our Publications", path: "/Our-publications" },
  ];

  return (
    <nav className="bg-cavalier-header-bg shadow-lg sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo */}
        <motion.div
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cavalier-brand rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-cavalier-header-bg font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-cavalier-brand">
                Cavalier India
              </span>
              <span className="text-xs text-cavalier-text-light/80 -mt-1">Pune - NDA Coaching</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1 relative">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {item.hasDropdown ? (
                <>
                  <motion.button
                    onMouseEnter={() => setCourseDropdown(true)}
                    onMouseLeave={() => setCourseDropdown(false)}
                    className="px-4 py-2 text-cavalier-text-light font-medium rounded-lg hover:text-cavalier-brand transition-all duration-300 flex items-center gap-1 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <FaChevronDown size={12} className="mt-0.5 text-cavalier-text-light/70 group-hover:text-cavalier-brand transition" />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {courseDropdown && (
                      <motion.div
                        onMouseEnter={() => setCourseDropdown(true)}
                        onMouseLeave={() => setCourseDropdown(false)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 bg-cavalier-card-dark rounded-xl shadow-lg border border-cavalier-header-bg/20 overflow-hidden z-50"
                      >
                        <motion.button
                          onClick={() => window.open("https://commz.courses.store/", "_blank")}
                          className="w-full text-left px-4 py-3 text-white hover:bg-cavalier-header-bg hover:text-cavalier-brand transition-all duration-200"
                        >
                          Online Courses
                        </motion.button>

                        <motion.button
                          onClick={() => handleNavClick("/courses")}
                          className="w-full text-left px-4 py-3 text-white hover:bg-cavalier-header-bg hover:text-cavalier-brand transition-all duration-200 border-t border-cavalier-header-bg/20"
                        >
                          Offline Courses
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.button
                  onClick={() => handleNavClick(item.path)}
                  className="px-4 py-2 text-cavalier-text-light font-medium rounded-lg hover:text-cavalier-brand transition-all duration-300 relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cavalier-brand group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <motion.div
            className="flex items-center gap-2 text-cavalier-header-bg bg-cavalier-brand px-4 py-2 rounded-full border border-yellow-600"
            whileHover={{ scale: 1.05 }}
          >
            <FaPhoneAlt className="text-cavalier-header-bg text-sm" />
            <span className="text-sm font-bold">+91 7020892704</span>
          </motion.div>

          <motion.button
            onClick={() => window.open("https://commz.courses.store/", "_blank")}
            className="flex items-center gap-2 text-cavalier-text-light hover:text-cavalier-brand transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
          >
            <FaShoppingCart size={20} />
            <span className="font-medium">Store</span>
          </motion.button>

          {/* <motion.button
            onClick={() => handleNavClick("/authpage")}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUser size={14} />
            Sign In
          </motion.button> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <motion.button
            onClick={() => handleNavClick("/store")}
            className="relative text-white p-2"
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cavalier-brand text-cavalier-header-bg text-xs rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </motion.button>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 bg-cavalier-brand text-cavalier-header-bg rounded-lg flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cavalier-header-bg border-t border-cavalier-brand/20 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <>
                      <motion.button
                        onClick={() => setCourseDropdown(!courseDropdown)}
                        className="w-full text-left px-4 py-3 text-cavalier-text-light font-medium rounded-lg hover:bg-cavalier-brand/20 hover:text-cavalier-brand transition-all duration-300 flex items-center justify-between"
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                        <FaChevronDown
                          className={`transition-transform duration-300 ${courseDropdown ? "rotate-180" : ""}`}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {courseDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="ml-6"
                          >
                            <button
                              onClick={() => window.open("https://commz.courses.store/", "_blank")}
                              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-cavalier-header-bg/20 hover:text-cavalier-brand rounded-lg transition-all duration-200"
                            >
                              Online Courses
                            </button>

                            <button
                              onClick={() => handleNavClick("/courses")}
                              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-cavalier-header-bg/20 hover:text-cavalier-brand rounded-lg transition-all duration-200"
                            >
                              Offline Courses
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left px-4 py-3 text-cavalier-text-light font-medium rounded-lg hover:bg-cavalier-brand/20 hover:text-cavalier-brand transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  )}
                </div>
              ))}

              {/* Mobile Sign In */}
              <motion.button
                onClick={() => handleNavClick("/authpage")}
                className="w-full mt-4 bg-cavalier-brand text-cavalier-header-bg py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <FaUser size={14} />
                Sign In
              </motion.button>

              {/* Mobile Phone */}
              <div className="flex items-center justify-center gap-2 text-gray-300 mt-4 pt-4 border-t border-cavalier-brand/20">
                <FaPhoneAlt className="text-cavalier-brand" />
                <span className="font-medium">+91 9834301046</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

