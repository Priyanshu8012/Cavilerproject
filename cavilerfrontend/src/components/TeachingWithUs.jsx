import React from "react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMedal, FaBookOpen } from 'react-icons/fa6';

const TeachingWithUs = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-gray-100 font-sans selection:bg-cavalier-brand selection:text-cavalier-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.span variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Join The Legacy
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            Shape The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Future Warriors</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Become a mentor at Cavalier Defence Academy and contribute to the noble cause of guiding the next generation of potential officers for the Indian Armed Forces.
          </motion.p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* Why Teach With Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-cavalier-card-dark/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-cavalier-brand/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cavalier-brand/10 rounded-xl text-cavalier-brand">
                <FaMedal size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Why Mentor With Us?</h2>
            </div>

            <ul className="space-y-4">
              {[
                "Prestigious opportunity to serve the nation",
                "World-class infrastructure & smart classrooms",
                "Engage with disciplined & motivated aspirants",
                "Competitive remuneration & benefits",
                "Professional growth alongside ex-defence officers",
                "Flexible teaching hours & modules"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-cavalier-brand shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What You Can Teach */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-cavalier-card-dark/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-cavalier-brand/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cavalier-brand/10 rounded-xl text-cavalier-brand">
                <FaBookOpen size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Areas of Expertise</h2>
            </div>

            <ul className="space-y-4">
              {[
                "NDA & CDS Written Exam Coaching (Maths/GAT)",
                "SSB Interview Psychology & Technique",
                "AFCAT Reasoning & Numerical Ability",
                "Current Affairs & General Studies",
                "Physical Fitness Training Specialists",
                "Communication Skills & Personality Dev"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-cavalier-brand shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark rounded-3xl p-8 md:p-12 text-center overflow-hidden border border-cavalier-brand/20 shadow-2xl"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cavalier-brand/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <h2 className="relative z-10 text-3xl font-black text-white mb-4 uppercase">Ready to Inspire?</h2>
          <p className="relative z-10 text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Join our elite team of educators and experts. Help us mold the defenders of tomorrow with your knowledge and experience.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jobform')}
            className="relative z-10 bg-cavalier-brand text-cavalier-bg px-10 py-4 rounded-xl font-bold text-lg tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all uppercase"
          >
            Apply As Instructor
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default TeachingWithUs;

