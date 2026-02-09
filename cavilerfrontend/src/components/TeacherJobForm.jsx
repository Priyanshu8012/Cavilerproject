import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUserTie, FaBuildingShield } from 'react-icons/fa6';

const TeacherJobForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    degree: '',
    subject: '',
    experience: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacherjobform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          degree: '',
          subject: '',
          experience: '',
          message: ''
        });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-gray-100 font-sans selection:bg-cavalier-brand selection:text-cavalier-bg overflow-hidden relative py-20 px-4">

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto bg-cavalier-card-dark/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto bg-cavalier-brand/10 rounded-full flex items-center justify-center text-cavalier-brand text-2xl mb-4 border border-cavalier-brand/20"
          >
            <FaUserTie />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Join <span className="text-cavalier-brand">Cavalier Defence Academy</span>
          </h1>
          <p className="text-gray-400">
            Submit your details below to apply for a faculty position.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Ex. Major Vikram Singh"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="vikram@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Qualification</label>
              <input
                type="text"
                name="degree"
                placeholder="Highest Degree (e.g., M.Sc Mathematics, Ph.D)"
                value={formData.degree}
                onChange={handleChange}
                className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Subject Expertise</label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-cavalier-card-dark text-gray-500">Select Subject Expertise</option>
                  <option value="NDA Maths" className="bg-cavalier-card-dark">NDA Mathematics</option>
                  <option value="CDS GAT" className="bg-cavalier-card-dark">CDS/NDA GAT (General Ability)</option>
                  <option value="AFCAT Reasoning" className="bg-cavalier-card-dark">AFCAT Reasoning & Aptitude</option>
                  <option value="SSB Psychology" className="bg-cavalier-card-dark">SSB Psychology</option>
                  <option value="English" className="bg-cavalier-card-dark">English & Communication</option>
                  <option value="Current Affairs" className="bg-cavalier-card-dark">Current Affairs & GK</option>
                  <option value="Physical Training" className="bg-cavalier-card-dark">Physical Training Instructor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-cavalier-brand">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Teaching Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="Years (e.g. 5 Years)"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Why do you want to join us?</label>
            <textarea
              name="message"
              placeholder="Briefly describe your motivation and teaching philosophy..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-cavalier-bg/50 border border-cavalier-brand/20 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand transition-all h-32 align-top"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cavalier-brand to-yellow-600 text-cavalier-bg h-14 rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <FaPaperPlane /> Submit Application
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default TeacherJobForm;

