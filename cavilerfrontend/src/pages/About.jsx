import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaUsers, FaChartLine, FaAward, FaLightbulb, FaHeart, FaStar, FaQuoteLeft, FaArrowRight, FaPersonRifle } from "react-icons/fa6";

const AboutUs = () => {
  const navigate = useNavigate();

  const coreValues = [
    {
      title: "Discipline & Integrity",
      desc: "Instilling the core values of the armed forces in every aspirant.",
      icon: <FaPersonRifle />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
    {
      title: "Officer Like Qualities",
      desc: "Developing OLQs through structured mentorship and personality development.",
      icon: <FaStar />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
    {
      title: "Excellence in Training",
      desc: "Rigorous academic and physical training by ex-defence officers.",
      icon: <FaAward />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
    {
      title: "Small Batch Learning",
      desc: "Personalized attention to ensure every student reaches their potential.",
      icon: <FaUsers />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
    {
      title: "Expert Faculty",
      desc: "Learn from highly skilled educators and veterans for top results.",
      icon: <FaLightbulb />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
    {
      title: "Proven Success",
      desc: "A legacy of producing officers serving in Army, Navy, and Air Force.",
      icon: <FaChartLine />,
      color: "from-cavalier-card-dark to-cavalier-bg"
    },
  ];

  const whyChooseUs = [
    {
      title: "Mentorship by Veterans",
      desc: "Direct guidance from retired Defence Officers.",
      icon: <FaStar />,
      stats: "Ex-Officers"
    },
    {
      title: "SSB Specialization",
      desc: "Comprehensive GTO ground and psychology testing facilities.",
      icon: <FaAward />,
      stats: "World Class"
    },
    {
      title: "Proven Track Record",
      desc: "Consistent high selection rate in NDA, CDS, and AFCAT.",
      icon: <FaChartLine />,
      stats: "Top Results"
    },
    {
      title: "Physical Training",
      desc: "Daily fitness sessions including obstacle courses and drills.",
      icon: <FaPersonRifle />,
      stats: "Combat Fit"
    },
    {
      title: "Personal Counselling",
      desc: "One-on-one guidance to support academic and career growth.",
      icon: <FaHeart />,
      stats: "1-on-1 Support"
    },
    {
      title: "Doubt Resolution",
      desc: "Dedicated sessions to clarify doubts and strengthen understanding.",
      icon: <FaLightbulb />,
      stats: "Instant Help"
    },
  ];


  const faculty = [
    {
      name: "Wg. Cdr. Alok Sahay",
      subject: "Psychologist",
      experience: "20+ Years Experience",
      rank: "A Kargil veteran",
      image: "/assets/teachernew/AlokSahay.jpg",
    },
    {
      name: "Col. Jagtap Sir",
      subject: "SSB Faculty",
      experience: "2+ Years Experience",
      rank: "IISC Bangalore",
      image: "/assets/teachernew/Jagtap.jpg",
    },
    {
      name: "Gp. Capt. Sanjay Pethkar (Retd.)",
      subject: "SSB Faculty",
      experience: "5+ Years Experience",
      rank: "Jamia Hamdard",
      image: "/assets/teachernew/SanjayPethkar.jpg",
    },
    {
      name: "Mr. Satij Sir",
      subject: "Physics Faculty",
      experience: "14+ Years Experience",
      rank: "IIS University",
      image: "/assets/teachernew/Satij.jpg",
    },
  ];
  const stats = [
    { number: "5000+", label: "Selections", icon: <FaAward /> },
    { number: "25+", label: "Years Legacy", icon: <FaChartLine /> },
    { number: "100+", label: "Expert Mentors", icon: <FaUsers /> },
    { number: "98%", label: "Success Rate", icon: <FaStar /> },
  ];

  return (
    <div className="min-h-screen bg-cavalier-bg text-gray-100 font-sans selection:bg-cavalier-brand selection:text-cavalier-bg overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cavalier-card-dark/30 backdrop-blur-sm z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cavalier-bg z-0"></div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Cavalier Defence Academy</span>
          </motion.h1>
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto hover:border-cavalier-brand/30 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaQuoteLeft className="text-cavalier-brand text-3xl mb-4 mx-auto" />
            <p className="text-xl md:text-2xl font-serif italic text-gray-200 mb-4">
              "Creating Officers, Defending the Nation"
            </p>
            <p className="text-cavalier-brand text-lg font-bold tracking-widest uppercase">
              The Premier Institute for Defence Aspirants
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-cavalier-card-dark/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-cavalier-brand/30 hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl text-cavalier-brand mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-1">{stat.number}</h3>
                <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">
            Forging <span className="text-cavalier-brand">Leaders</span> of Tomorrow
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            At <span className="text-cavalier-brand font-bold">Cavalier Defence Academy</span>, we don't just teach subjects; we instill the
            <span className="font-semibold text-white"> warrior ethos</span>. Whether it's
            <span className="font-semibold text-white"> NDA, CDS, AFCAT, or SSB Interview</span>, our mission is to transform young aspirants into
            <span className="font-semibold text-white"> commissioned officers</span> through relentless training, discipline, and expert mentorship.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-cavalier-card-dark/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-cavalier-brand/10 border border-cavalier-brand/20 text-cavalier-brand px-4 py-1.5 rounded-full mb-6 uppercase text-xs font-bold tracking-widest">
              <FaHeart className="mr-2" />
              <span>Our Ethos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Core <span className="text-cavalier-brand">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 border border-white/5 hover:border-cavalier-brand/30 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-cavalier-brand/10 flex items-center justify-center text-cavalier-brand text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-cavalier-brand/5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-cavalier-brand/10 border border-cavalier-brand/20 text-cavalier-brand px-4 py-1.5 rounded-full mb-6 uppercase text-xs font-bold tracking-widest">
              <FaGraduationCap className="mr-2" />
              <span>Mentors</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Train With The <span className="text-cavalier-brand">Experts</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Guided by a team of ex-defence officers and subject matter experts.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((teacher, index) => (
              <motion.div
                key={index}
                className="bg-cavalier-card-dark/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-cavalier-brand/40 transition-all duration-300 p-6 text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-cavalier-brand/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-cavalier-brand/20 shadow-2xl mx-auto group-hover:border-cavalier-brand transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">{teacher.name}</h3>
                <p className="text-cavalier-brand text-sm font-bold mt-1">{teacher.subject}</p>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{teacher.experience}</p>
                <div className="mt-2 inline-block px-2 py-1 bg-cavalier-brand/10 rounded text-[10px] text-cavalier-brand font-bold uppercase tracking-widest border border-cavalier-brand/20">
                  {teacher.rank}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark rounded-3xl p-8 md:p-16 text-center overflow-hidden border border-cavalier-brand/20 shadow-2xl"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cavalier-brand/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cavalier-brand/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Ready to Wear The <span className="text-cavalier-brand">Uniform?</span>
            </h2>
            <p className="relative z-10 text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Join <span className="font-bold text-white">Cavalier Defence Academy</span> and start your journey towards a glorious career in the Indian Armed Forces.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/enroll-now')}
                className="bg-cavalier-brand text-cavalier-bg px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button
                onClick={() => navigate('/contact-us')}
                className="px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide border border-white/20 hover:bg-white/5 text-white transition-all hover:border-cavalier-brand/50"
              >
                Book Free Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
