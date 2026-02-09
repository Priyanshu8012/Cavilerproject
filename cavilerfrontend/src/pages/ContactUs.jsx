import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    subject: "General Enquiry"
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const subjects = [
    "General Enquiry",
    "Course Information",
    "Admission Process",
    "Fee Structure",
    "Technical Support",
    "Feedback",
    "Complaint",
    "Career Opportunity"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("loading");

    try {
      const response = await axios.post(`${API_URL}/api/messages`, formData);

      if (response.status === 201) {
        setStatus("success");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
          subject: "General Enquiry"
        });

        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            <FaShieldAlt className="text-sm" /> COMM LINE SECURE
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Headquarters</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Establish communication. Our tactical team is standing by to receive your transmission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {/* Grievance Redressal Card */}
            <motion.div
              variants={itemVariants}
              className="bg-cavalier-card-dark border border-cavalier-brand/30 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-cavalier-brand transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cavalier-brand/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide flex items-center gap-2">
                <span className="w-1 h-6 bg-cavalier-brand rounded-full"></span>
                Command Center
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400 font-light text-sm">
                For official correspondence regarding admissions, cadet welfare, or strategic partnerships.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-black/30 rounded-lg border border-white/5 group-hover:border-cavalier-brand/20 transition-colors">
                  <div className="mt-1 bg-cavalier-brand/20 p-2 rounded-full">
                    <FaEnvelope className="text-cavalier-brand text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Frequencies</span>
                    <a href="mailto:cavalierindiapune@gmail.com" className="block font-mono text-white hover:text-cavalier-brand transition-colors text-sm break-all">
                      Cavalierpune@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-black/30 rounded-lg border border-white/5 group-hover:border-cavalier-brand/20 transition-colors">
                  <div className="mt-1 bg-cavalier-brand/20 p-2 rounded-full">
                    <FaPhone className="text-cavalier-brand text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Direct Line</span>
                    <p className="font-mono text-white text-sm">+91 7020892704</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              className="bg-cavalier-card-dark border border-white/10 p-6 rounded-2xl shadow-lg hover:border-white/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <FaMapMarkerAlt className="text-cavalier-brand text-xl" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">Base Location</h3>
              </div>

              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-bold text-white mb-1 uppercase text-sm tracking-wider">Cavalier India Pune</p>
                  <p className="leading-relaxed font-light text-sm">
                    A Wing, 3rd Floor, Tilak Bhavan,<br />
                    Kesariwada, Near ABC Chowk,<br />
                    Narayan Peth, Pune
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="flex items-center gap-3 text-sm">
                    <FaPhone className="text-cavalier-brand" />
                    <span className="font-mono text-white">Toll Free: +91 7020892704</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Card */}
            <motion.div
              variants={itemVariants}
              className="bg-cavalier-card-dark border border-white/10 p-6 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cavalier-brand/5 to-transparent pointer-events-none"></div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">Rapid Response</h3>
              <div className="space-y-3 relative z-10">
                <button
                  onClick={() => window.location.href = 'tel:+917020892704'}
                  className="w-full bg-white/5 hover:bg-cavalier-brand hover:text-black border border-white/10 text-white py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FaPhone className="group-hover:text-black transition-colors" />
                  Initiate Call
                </button>
                <button
                  onClick={() => window.open('https://wa.me/+917020892704', '_blank')}
                  className="w-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <motion.div
              variants={itemVariants}
              className="bg-cavalier-card-dark border border-white/10 p-8 rounded-2xl shadow-2xl relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-cavalier-brand/10 border border-cavalier-brand/30 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-cavalier-brand text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Submit Report</h2>
                  <p className="text-gray-500 text-sm">Response provided within 2400 hours.</p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white placeholder-gray-600 transition-all duration-300 outline-none"
                        placeholder="ENTER FIRST NAME"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white placeholder-gray-600 transition-all duration-300 outline-none"
                        placeholder="ENTER LAST NAME"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white placeholder-gray-600 transition-all duration-300 outline-none"
                        placeholder="ENTER EMAIL"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white placeholder-gray-600 transition-all duration-300 outline-none"
                        placeholder="ENTER PHONE"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white transition-all duration-300 outline-none appearance-none"
                    required
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} className="bg-gray-900 text-white">{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cavalier-brand uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg bg-black/50 border border-white/10 focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand text-white placeholder-gray-600 transition-all duration-300 outline-none resize-none"
                    placeholder="ENTER YOUR MESSAGE DETAILS..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${loading
                    ? "bg-gray-700 cursor-not-allowed text-gray-400"
                    : "bg-cavalier-brand text-black hover:bg-white shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                    }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Transmission
                    </>
                  )}
                </motion.button>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                  >
                    <FaCheck className="text-green-500 text-xl" />
                    <div>
                      <p className="text-green-400 font-bold text-sm uppercase tracking-wide">Transmission Successful</p>
                      <p className="text-gray-400 text-xs">Stand by for response.</p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
                  >
                    <FaExclamationTriangle className="text-red-500 text-xl" />
                    <div>
                      <p className="text-red-400 font-bold text-sm uppercase tracking-wide">Transmission Failed</p>
                      <p className="text-gray-400 text-xs">Check connection and retry.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Google Map Section */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-cavalier-card-dark border border-white/10 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-500 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">Coordinates</h3>
                    <p className="text-gray-500 text-xs">Sector: Pune, Narayan Peth</p>
                  </div>
                </div>
              </div>

              <div className="h-80 w-full relative group">
                <div className="absolute inset-0 border-[3px] border-cavalier-brand/20 z-10 pointer-events-none group-hover:border-cavalier-brand/50 transition-colors"></div>
                <iframe
                  src="https://maps.google.com/maps?q=18.5161266,73.8494788&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(85%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cavalier India Pune Location"
                  className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                ></iframe>
              </div>

              <div className="p-4 bg-black/40 border-t border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs text-gray-500 font-mono">
                    <p>LAT: 18.5161 | LONG: 73.8495</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://www.google.com/maps/place/Cavalier+India+Pune+%5B+NDA+I+CDS+I+AFCAT+I+SSB+%5D/@18.5161266,73.8494788,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c1f43231550b:0xca914a5ef08d8f04!8m2!3d18.5161266!4d73.8494788!16s%2Fg%2F12637zswm?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D', '_blank')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                  >
                    <FaMapMarkerAlt />
                    Open Sats
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
