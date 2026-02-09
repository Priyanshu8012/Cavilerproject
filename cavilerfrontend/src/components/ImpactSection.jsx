import React from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaMedal, FaUserShield, FaTrophy, FaHandshake } from "react-icons/fa6";

const stats = [
  {
    icon: <FaMedal />,
    value: 5000,
    suffix: "+",
    label: "Total Selections",
    description: "Officers Commissioned"
  },
  {
    icon: <FaUserShield />,
    value: 25,
    suffix: "+",
    label: "Years of Legacy",
    description: "Serving the Nation"
  },
  {
    icon: <FaHandshake />,
    value: 10000,
    suffix: "+",
    label: "Students Mentored",
    description: "Future Warriors"
  },
  {
    icon: <FaTrophy />,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "In Written Exams"
  },
];

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-cavalier-bg overflow-hidden" ref={ref}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase">
              Our Legacy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">History</span> Every Year
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative group p-8 rounded-2xl bg-cavalier-card-dark/40 backdrop-blur-md border border-white/5 hover:border-cavalier-brand/30 transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cavalier-brand to-yellow-600 p-[1px] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-cavalier-bg flex items-center justify-center text-2xl text-cavalier-brand">
                  {item.icon}
                </div>
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {isInView && (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2.5}
                    separator=","
                    suffix={item.suffix}
                  />
                )}
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold text-cavalier-brand uppercase tracking-wider mb-2">
                {item.label}
              </h3>

              <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                {item.description}
              </p>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cavalier-brand/10 rounded-br-2xl group-hover:border-cavalier-brand/40 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

