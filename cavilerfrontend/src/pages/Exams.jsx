import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaLightbulb,
  FaTrophy,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import {
  FaShieldHalved,
  FaPersonRifle
} from "react-icons/fa6";

const exams = [
  {
    name: "NDA & NA (I) 2025",
    date: "21 April 2025",
    daysLeft: "72 days",
    icon: <FaShieldHalved />,
    category: "Officer Entry",
    status: "Applications Closed",
    description: "National Defence Academy Examination"
  },
  {
    name: "CDS (I) 2025",
    date: "21 April 2025",
    daysLeft: "72 days",
    icon: <FaPersonRifle />,
    category: "Officer Entry",
    status: "Applications Closed",
    description: "Combined Defence Services Examination"
  },
  {
    name: "AFCAT (II) 2025",
    date: "August 2025",
    daysLeft: "190 days",
    icon: <FaShieldHalved />,
    category: "Air Force",
    status: "Upcoming",
    description: "Air Force Common Admission Test"
  },
  {
    name: "NDA & NA (II) 2025",
    date: "September 2025",
    daysLeft: "220 days",
    icon: <FaShieldHalved />,
    category: "Officer Entry",
    status: "Upcoming",
    description: "National Defence Academy Examination"
  },
  {
    name: "CAPF (AC) 2025",
    date: "August 2025",
    daysLeft: "185 days",
    icon: <FaPersonRifle />,
    category: "Paramilitary",
    status: "Upcoming",
    description: "Central Armed Police Forces (Assistant Commandant)"
  },
];

const features = [
  {
    title: "Exam Patterns & Syllabus",
    description: "Detailed breakdown of latest patterns for NDA, CDS, and AFCAT exams.",
    icon: <FaFileAlt />,
  },
  {
    title: "Previous Year Papers",
    description: "Access last 10 years' solved papers with detailed explanations.",
    icon: <FaBookOpen />,
  },
  {
    title: "GTO Ground Access",
    description: "Exclusive access to our obstacle ground for physical training.",
    icon: <FaPersonRifle />,
  },
  {
    title: "SSB Interview Guidance",
    description: "Mock interviews by ex-assessors and psychology dossier analysis.",
    icon: <FaUsers />,
  },
  {
    title: "Rankers' Strategy",
    description: "Learn time management and attempting strategy from successful cadets.",
    icon: <FaTrophy />,
  },
  {
    title: "Doubt Counter",
    description: "1-on-1 doubt clearing sessions with subject matter experts.",
    icon: <FaLightbulb />,
  },
];

const stats = [
  { number: "1500+", label: "Officers Made", icon: <FaTrophy /> },
  { number: "25+", label: "Years Legacy", icon: <FaClock /> },
  { number: "100%", label: "GTO Ground", icon: <FaPersonRifle /> },
  { number: "50+", label: "Expert Mentors", icon: <FaChalkboardTeacher /> },
];

export default function ExamsPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cavalier-bg text-gray-100 font-sans selection:bg-cavalier-brand selection:text-cavalier-bg overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-cavalier-header-bg/50 py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <FaCalendarAlt /> Exam Schedule
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Locked</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
              Your strategic roadmap to cracking NDA, CDS, and AFCAT. Stay updated with upcoming dates and deadlines.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/enroll-now')}
              className="bg-cavalier-brand text-cavalier-bg px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Start Preparation <FaArrowRight />
            </button>
            <button
              onClick={() => navigate('/contact-us')}
              className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300"
            >
              Get Syllabus
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-cavalier-card-dark/30 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl text-cavalier-brand mb-3 flex justify-center opacity-80">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-1">{stat.number}</h3>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exams Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Upcoming <span className="text-cavalier-brand">Battles</span>
            </h2>
            <p className="text-gray-400">Mark your calendar. The countdown has begun.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <motion.div
                key={index}
                className="bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cavalier-brand/40 group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="text-6xl text-cavalier-brand">{exam.icon}</div>
                </div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${exam.status === 'Upcoming'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {exam.status}
                  </span>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Days Left</span>
                    <span className="text-lg font-bold text-white">{exam.daysLeft}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cavalier-brand transition-colors relative z-10">
                  {exam.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6 relative z-10">{exam.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-300 border-t border-white/5 pt-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-cavalier-brand" /> {exam.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cavalier-header-bg/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Strategic <span className="text-cavalier-brand">Advantage</span>
            </h2>
            <p className="text-gray-400">Why Cavalier Defence aspirants always have the upper hand.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-cavalier-card-dark rounded-2xl p-8 border border-white/5 hover:border-cavalier-brand/40 group transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-cavalier-brand/10 rounded-xl flex items-center justify-center mb-6 text-2xl text-cavalier-brand group-hover:scale-110 transition-transform duration-300 border border-cavalier-brand/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
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
              Ready to <span className="text-cavalier-brand">Serve?</span>
            </h2>
            <p className="relative z-10 text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
              Join the league of extraordinary gentlemen. Start your training for the upcoming defence exams today.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/enroll-now")}
                className="bg-cavalier-brand text-cavalier-bg px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
              >
                Enroll Now <FaArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
