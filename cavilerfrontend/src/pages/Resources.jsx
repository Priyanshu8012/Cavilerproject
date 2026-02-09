import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, PlayCircle, ArrowRight, BookOpen, Video, HelpCircle, Mail, FileText, Star, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaYoutube, FaGraduationCap } from "react-icons/fa6";

const resources = [
  {
    title: "NDA Mathematics Formulae",
    type: "PDF",
    link: "#",
    category: "NDA",
    size: "2.4 MB",
    icon: <FaFilePdf />
  },
  {
    title: "GAT - English Grammar Notes",
    type: "PDF",
    link: "#",
    category: "NDA/CDS",
    size: "3.1 MB",
    icon: <FaFilePdf />
  },
  {
    title: "SSB Psychology Dossier",
    type: "PDF",
    link: "#",
    category: "SSB",
    size: "1.8 MB",
    icon: <FaFilePdf />
  },
  {
    title: "AFCAT Reasoning Shortcuts",
    type: "PDF",
    link: "#",
    category: "AFCAT",
    size: "4.2 MB",
    icon: <FaFilePdf />
  },
  {
    title: "Current Affairs - Defence Special",
    type: "PDF",
    link: "#",
    category: "ALL",
    size: "2.7 MB",
    icon: <FaFilePdf />
  },
  {
    title: "Map Reading for CDS/NDA",
    type: "PDF",
    link: "#",
    category: "GEOGRAPHY",
    size: "5.5 MB",
    icon: <FaFilePdf />
  },
];

const videoLectures = [
  {
    title: "NDA Maths: Matrices Tricks",
    link: "https://youtu.be/example1",
    duration: "45:12",
    views: "25K",
    thumbnail: "/assets/video-thumb-1.jpg"
  },
  {
    title: "SSB Interview: PPDT Guide",
    link: "https://youtu.be/example2",
    duration: "38:45",
    views: "18.5K",
    thumbnail: "/assets/video-thumb-2.jpg"
  },
  {
    title: "CDS General Knowledge: Polity",
    link: "https://youtu.be/example3",
    duration: "52:30",
    views: "30.2K",
    thumbnail: "/assets/video-thumb-3.jpg"
  },
];

const faqs = [
  { question: "Are these resources sufficient for NDA?", answer: "These resources cover the core concepts. We recommend joining our classroom program for comprehensive training." },
  { question: "How to access the Mock Tests?", answer: "Mock tests are available in the 'Student Portal' for enrolled students. Basic sample papers are listed below." },
  { question: "Is physical training guidance included?", answer: "Yes, we have specific PDFs and videos for GTO tasks and physical fitness standards." },
  { question: "Do you provide SSB interview notes?", answer: "Absolutely. We have dedicated dossiers for Psychology, GTO, and Interview techniques." },
];

const Resources = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ALL");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredResources = activeTab === "ALL"
    ? resources
    : resources.filter(resource => resource.category.includes(activeTab));

  return (
    <div className="min-h-screen bg-cavalier-bg text-gray-100 font-sans selection:bg-cavalier-brand selection:text-cavalier-bg overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cavalier-card-dark/30 backdrop-blur-sm z-0"></div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <FaGraduationCap /> KNOWLEDGE BASE
          </div>
          <motion.h1
            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">For Aspirants</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Curated study material, previous year papers, and strategy guides for Defence Exams.
          </motion.p>
        </motion.div>
      </section>

      {/* Study Materials Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            <span className="text-cavalier-brand">Mission</span> Critical Resources
          </h2>
          <p className="text-gray-400">Download free PDFs to accelerate your preparation.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {["ALL", "NDA", "CDS", "AFCAT", "SSB"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border ${activeTab === tab
                  ? "bg-cavalier-brand text-cavalier-bg border-cavalier-brand shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  : "bg-cavalier-card-dark text-gray-400 border-white/10 hover:border-cavalier-brand/50 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item, index) => (
            <motion.div
              key={index}
              className="bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cavalier-brand/40 group transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-lg bg-cavalier-brand/10 text-cavalier-brand text-2xl">
                  {item.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-400 border border-white/10">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6">{item.size} • {item.type}</p>

              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-cavalier-brand hover:text-cavalier-bg text-gray-300 font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn">
                <Download size={16} />
                Download Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Lectures Section */}
      <section className="relative z-10 bg-cavalier-header-bg/30 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Visual <span className="text-cavalier-brand">Learning</span>
            </h2>
            <p className="text-gray-400">Master complex strategies with our video series.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoLectures.map((video, index) => (
              <motion.div
                key={index}
                className="bg-cavalier-card-dark rounded-2xl overflow-hidden border border-white/10 group hover:border-cavalier-brand/40 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-video bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cavalier-brand/90 flex items-center justify-center pl-1 text-cavalier-bg shadow-[0_0_30px_rgba(255,215,0,0.4)] group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cavalier-brand transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><FaYoutube className="text-red-500" /> {video.views} views</span>
                    <button className="text-cavalier-brand font-semibold hover:underline">Watch Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Common <span className="text-cavalier-brand">Thinking Points</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-cavalier-card-dark/40 border border-white/5 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <h3 className="text-lg font-bold text-gray-200">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={20} className="text-cavalier-brand" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedFaq === index ? 'auto' : 0,
                  opacity: expandedFaq === index ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-cavalier-brand/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cavalier-brand/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Get The <span className="text-cavalier-brand">Winning Edge</span>
            </h2>
            <p className="relative z-10 text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
              Don't rely on random materials. Join our structured programs to access the full library of premium defence resources.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => navigate("/contact-us")}
                className="bg-cavalier-brand text-cavalier-bg px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Get Full Access
              </motion.button>
              <button
                onClick={() => navigate("/courses")}
                className="px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide border border-white/20 hover:bg-white/5 text-white transition-all hover:border-cavalier-brand/50"
              >
                View Courses
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Resources;
