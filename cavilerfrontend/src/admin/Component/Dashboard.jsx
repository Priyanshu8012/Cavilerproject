import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSignOutAlt,
  FaHome,
  FaUserGraduate,
  FaBook,
  FaChartLine,
  FaCogs,
  FaChalkboardTeacher,
  FaBullhorn,
  FaEdit,
  FaEnvelope,
  FaMoneyBillWave,
  FaFolderOpen,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaGlobeAsia,
  FaSatellite
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    messages: 0,
    revenue: 0
  });

  // Mock stats - replace with actual API calls if needed
  useEffect(() => {
    setStats({
      students: 1247,
      courses: 48,
      messages: 23,
      revenue: 12450
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const mainMenuItems = [
    { label: "Command Center", icon: <FaHome />, path: "/daaasshboard5296" },
    { label: "Cadet Roster", icon: <FaUserGraduate />, path: "/users" },
    { label: "Training Modules", icon: <FaBook />, path: "/courses-update" },
    { label: "Intel Resources", icon: <FaFolderOpen />, path: "/resources-update" },
    { label: "Comms & Signals", icon: <FaEnvelope />, path: "/messages" },
    // { label: "Mission Analytics", icon: <FaChartLine />, path: "/reports" },
    // { label: "War Chest", icon: <FaMoneyBillWave />, path: "/payment" }
  ];

  const quickAccessItems = [
    {
      label: "Exam Directives",
      icon: <FaBook className="text-cavalier-brand" size={32} />,
      path: "/Exam-update",
      description: "Manage standardized test protocols",
      color: "border-cavalier-brand/20 hover:border-cavalier-brand"
    },
    {
      label: "Live Operations",
      icon: <FaChalkboardTeacher className="text-green-500" size={32} />,
      path: "/live-classes",
      description: "Coordinate real-time training sessions",
      color: "border-green-500/20 hover:border-green-500"
    },
    {
      label: "Staff Officers",
      icon: <FaShieldAlt className="text-orange-500" size={32} />,
      path: "/study-material-update",
      description: "Update counselor and officer profiles",
      color: "border-orange-500/20 hover:border-orange-500"
    },
    {
      label: "Field Manuals",
      icon: <FaCogs className="text-purple-500" size={32} />,
      path: "/assignmentss",
      description: "Manage publications and doctrines",
      color: "border-purple-500/20 hover:border-purple-500"
    },
    {
      label: "Deployment Schedules",
      icon: <FaBullhorn className="text-red-500" size={32} />,
      path: "/announcements",
      description: "Broadcast tactical updates and timetables",
      color: "border-red-500/20 hover:border-red-500"
    },
    {
      label: "Base Customization",
      icon: <FaEdit className="text-yellow-500" size={32} />,
      path: "/site-customization",
      description: "Modify platform interface protocols",
      color: "border-yellow-500/20 hover:border-yellow-500"
    }
  ];

  return (
    <div className="flex h-screen w-screen bg-cavalier-bg text-white overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-cavalier-brand text-black rounded-lg shadow-lg shadow-cavalier-brand/20"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-72 bg-black/80 backdrop-blur-xl p-6 flex flex-col h-full fixed left-0 top-0 bottom-0 z-40 border-r border-white/10"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10 mt-2"
            >
              <div className="flex justify-center mb-2">
                <FaShieldAlt className="text-4xl text-cavalier-brand" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-white">
                Cavalier <span className="text-cavalier-brand">Admin</span>
              </h2>
              <p className="text-gray-500 text-xs font-mono tracking-widest mt-1">TACTICAL OPS CENTER</p>
            </motion.div>

            {/* Admin Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-8 p-4 bg-cavalier-brand/5 border border-cavalier-brand/20 rounded-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-cavalier-brand/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="w-10 h-10 bg-cavalier-brand rounded-md flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-cavalier-brand/20">
                C
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-white uppercase tracking-wide">Commander</p>
                <p className="text-[10px] text-cavalier-brand font-mono">STATUS: ONLINE</p>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
              {mainMenuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 text-sm font-bold uppercase tracking-wide group ${location.pathname === item.path
                      ? "bg-cavalier-brand text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={location.pathname === item.path ? "text-black" : "text-cavalier-brand group-hover:text-white transition-colors"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  {location.pathname === item.path && (
                    <FaChevronRight className="text-xs" />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-900/20 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold uppercase tracking-wider mt-4"
            >
              <FaSignOutAlt /> Abort Mission
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'ml-0'} w-full relative z-10`}>
        {/* Header Stats / Status Bar */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-cavalier-brand">
            <FaSatellite className="animate-pulse" />
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <div className="text-xs font-mono text-gray-500">
            SECURE CONNECTION ESTABLISHED
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/5 text-cavalier-brand text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              <FaGlobeAsia /> Global Command
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Overview</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Coordinate all tactical units, manage resources, and monitor academy performance from this central hub.
            </p>
          </motion.div>

          {/* Quick Access Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {quickAccessItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{
                  scale: 1.02,
                  y: -5
                }}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer bg-cavalier-card-dark p-6 rounded-xl border ${item.color} shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none"></div>

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="p-3 bg-black/40 rounded-lg border border-white/5 group-hover:border-white/20 transition-colors">
                    {item.icon}
                  </div>
                  <FaChevronRight className="text-gray-600 group-hover:text-cavalier-brand transition-colors mt-2" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide relative z-10">{item.label}</h3>
                <p className="text-gray-500 text-sm font-mono relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-6 border-t border-white/5 bg-black/20"
        >
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
            © 2025 Cavalier Defence Academy | Restricted Access
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Dashboard;