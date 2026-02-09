import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, ArrowRight, Star, Zap, BookOpen } from "lucide-react";

// Convert course name to slug (e.g., "IIT JEE" => "iit-jee")
const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

const offerings = [
  {
    title: "NCERT Solutions",
    image: "assets/Explore_All_Our_Offerings/ncert-solutions.webp",
    route: "ncert-solutions",
    bgColor: "from-amber-400 to-yellow-400",
    borderColor: "border-yellow-200",
    classes: ["BOARD", "FOUNDATION", "MHT CET"],
    icon: "📚",
    description: "Step-by-step solutions for all NCERT problems"
  },
  {
    title: "Previous Year Papers",
    image: "assets/Explore_All_Our_Offerings/previous-year-question-papers.webp",
    route: "previous-year-papers",
    bgColor: "from-purple-500 to-indigo-500",
    borderColor: "border-purple-200",
    classes: ["IIT JEE", "NEET", "BOARD"],
    icon: "📅",
    description: "Past papers with detailed solutions"
  },
  {
    title: "Sample Papers",
    image: "assets/Explore_All_Our_Offerings/sample-question-papers.webp",
    route: "sample-papers",
    bgColor: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-200",
    classes: ["FOUNDATION", "BOARD"],
    icon: "📝",
    description: "Practice papers for exam simulation"
  },
  {
    title: "NCERT Books",
    image: "assets/Explore_All_Our_Offerings/ncert-books.webp",
    route: "ncert-books",
    bgColor: "from-emerald-500 to-green-500",
    borderColor: "border-green-200",
    classes: ["BOARD", "FOUNDATION"],
    icon: "📖",
    description: "Digital NCERT textbooks and guides"
  },
  {
    title: "Important Questions",
    image: "assets/Explore_All_Our_Offerings/important-question-papers.webp",
    route: "important-questions",
    bgColor: "from-violet-500 to-purple-500",
    borderColor: "border-violet-200",
    classes: ["NEET", "BOARD"],
    icon: "⭐",
    description: "Curated high-weightage questions"
  },
  {
    title: "Revision Notes",
    image: "assets/Explore_All_Our_Offerings/revision-notes.webp",
    route: "revision-notes",
    bgColor: "from-rose-500 to-pink-500",
    borderColor: "border-pink-200",
    classes: ["FOUNDATION", "BOARD"],
    icon: "📒",
    description: "Concise notes for quick revision"
  },
];

export default function ExploreOfferings() {

  const [selectedClass, setSelectedClass] = useState("IIT JEE");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const filteredOfferings = offerings.filter((offer) =>
    offer.classes.includes(selectedClass)
  );

  const courses = [
    { name: "IIT JEE", icon: "⚡", color: "from-red-500 to-orange-500" },
    { name: "NEET", icon: "🧬", color: "from-green-500 to-emerald-500" },
    { name: "FOUNDATION", icon: "🏗️", color: "from-blue-500 to-cyan-500" },
    { name: "BOARD", icon: "📋", color: "from-purple-500 to-indigo-500" },
    { name: "MHT CET", icon: "🎯", color: "from-amber-500 to-yellow-500" },
  ];

  const handleNavigation = (route, selectedClass) => {
    const courseSlug = slugify(selectedClass);
    navigate(`/our-offerings/${route}/${courseSlug}`);
  };

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        {/* <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-sm mb-6">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">Premium Resources</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore Our{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Offerings
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-sm"></div>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover powerful resources crafted by experts to accelerate your exam preparation journey
          </p>
        </div> */}

        {/* Course Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {courses.map((course) => (
            <button
              key={course.name}
              onClick={() => setSelectedClass(course.name)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedClass === course.name
                  ? `text-white shadow-2xl scale-105 bg-gradient-to-r ${course.color}`
                  : "bg-white/80 text-gray-700 border border-gray-200/80 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:border-gray-300"
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{course.icon}</span>
                {course.name}
              </span>

              {selectedClass === course.name && (
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOfferings.length > 0 ? (
            filteredOfferings.map((offer, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleNavigation(offer.route, selectedClass)}
                className="group relative cursor-pointer"
              >
                <div className={`relative bg-white rounded-3xl border-2 ${offer.borderColor} overflow-hidden transition-all duration-500 transform h-full flex flex-col shadow-sm hover:shadow-2xl ${hoveredCard === index ? 'scale-105 -translate-y-2' : 'scale-100'
                  }`}>

                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${offer.bgColor} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl">
                          {offer.icon}
                        </div>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {offer.title}
                      </h3>

                      <p className="text-white/90 text-sm leading-relaxed">
                        {offer.description}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Class Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {offer.classes.map((cls) => (
                        <span
                          key={cls}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 transition-colors group-hover:bg-gray-50"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span>Free PDF Downloads</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span>Expert Curated</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        <span>Explore Now</span>
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === index ? 'translate-x-1' : ''
                          }`} />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${offer.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-gray-200/50 max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No offerings available
                </h3>
                <p className="text-gray-500">
                  No resources found for{" "}
                  <span className="font-semibold text-gray-700">{selectedClass}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-8 text-white max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Ready to Boost Your Preparation?
            </h3>
            <p className="text-gray-300 mb-6">
              Access all premium resources and take your exam preparation to the next level
            </p>
            <button
              onClick={() => navigate("/Our-publications")}
              className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
