import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaAtom,
  FaHeartbeat,
  FaLightbulb,
  FaBookOpen,
  FaLaptopCode,
  FaFilePdf,
  FaStickyNote,
  FaBook,
  FaDownload
} from "react-icons/fa";
import { motion } from "framer-motion";

const resources = [
  { label: "Previous Year Papers", icon: <FaFilePdf size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/iit-jee" },
  { label: "Important Questions", icon: <FaLightbulb size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/neet" },
  { label: "NCERT Solutions", icon: <FaStickyNote size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/foundation" },
  { label: "Sample Paper", icon: <FaBookOpen size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/board" },
  { label: "NCERT Books", icon: <FaBook size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/mht-cet" },
  { label: "Revision Notes", icon: <FaDownload size={40} className="text-cavalier-brand" />, path: "/our-offerings/resources/revisonnotes" },
];

const ResourcesUpdate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-6 pt-28">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-cavalier-brand mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide uppercase">
          Cavalier Defence Academy
        </h1>
        <p className="text-xl text-gray-300 font-medium tracking-widest">RESOURCES MANAGEMENT</p>
        <div className="mt-4 w-40 h-1 mx-auto bg-cavalier-brand rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {resources.map(({ label, icon, path }) => (
          <motion.div
            key={label}
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(75, 95, 51, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(path)}
            className="cursor-pointer group bg-cavalier-card-dark border border-cavalier-header-bg hover:border-cavalier-brand transition-all duration-300 rounded-xl shadow-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-cavalier-brand opacity-5 rotate-45 transform translate-x-8 -translate-y-8"></div>

            <div className="p-4 rounded-full bg-cavalier-header-bg/30 mb-4 group-hover:bg-cavalier-brand/20 transition-colors duration-300">
              {icon}
            </div>

            <p className="text-xl font-bold text-center group-hover:text-cavalier-brand transition duration-300 tracking-wide">
              {label}
            </p>

            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-bold text-cavalier-brand uppercase tracking-tighter border border-cavalier-brand/50 px-3 py-1 rounded">Update Files</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesUpdate;

