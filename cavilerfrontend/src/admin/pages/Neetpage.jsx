import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  const sections = [
    { name: "Update Banner ", link: "/neetpageupdatebanner" },
    { name: "Update Address Details", link: "/Neet-Update-Address-Details" },
    { name: "Title Update", link: "/Neet-Title-update" },
    { name: "Price Update", link: "/Neet-Price-Update" },
  ];

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-96 h-96 bg-orange-500 opacity-40 rounded-full blur-3xl absolute top-10 left-20 animate-pulse"></div>
        <div className="w-80 h-80 bg-gray-500 opacity-40 rounded-full blur-3xl absolute bottom-10 right-20 animate-pulse delay-200"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-gray-600">
        NEET Page Update
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {sections.map((section, index) => (
            <a
              key={index}
              href={section.link}
              className="relative group flex flex-col items-center justify-center p-6 bg-opacity-10 bg-gray-800 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Neon Border Animation */}
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-orange-500 transition duration-300"></div>

              <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                {section.name}
              </h2>
              <p className="text-sm text-gray-400 group-hover:text-gray-200 transition">
                Manage {section.name.toLowerCase()}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

