import React from "react";

export default function HelpSection() {
  return (
    <div className="relative mt-12 bg-gradient-to-r from-orange-500 to-orange-600 p-10 md:p-16 rounded-3xl shadow-xl overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <svg className="w-full h-full text-orange-400 opacity-30" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,128L48,112C96,96,192,64,288,58.7C384,53,480,75,576,106.7C672,139,768,181,864,165.3C960,149,1056,75,1152,74.7C1248,75,1344,149,1392,186.7L1440,224L1440,320L0,320Z"></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Text */}
        <div className="text-white md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            We're Here to Help!
          </h2>
          <p className="mt-2 text-xl font-semibold italic text-gray-200">
            "Guiding Your Dreams, One Step at a Time!"
          </p>
          <p className="mt-4 text-lg opacity-90">
            Need guidance? Our expert academic counselors are available to provide all the details you need. 
          </p>
          <button className="mt-6 bg-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 hover:bg-gray-900 shadow-md">
            Speak to an Expert
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="relative md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/your-image.png"
            alt="Experts"
            className="w-full max-w-sm rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

