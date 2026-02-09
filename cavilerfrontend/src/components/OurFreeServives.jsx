import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Target,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  Award,
  Heart,
  Shield,
  Dumbbell,
  BrainCircuit,
  Medal
} from 'lucide-react';

const FreeServices = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const freeServices = [
    {
      id: 1,
      number: "01",
      title: "SSB Guidance",
      description: "Expert mentorship for Service Selection Board interviews by ex-officers",
      icon: Users,
      features: ["Mock Interviews", "PIQ Form Analysis", "GTO Tasks", "Psych Support"],
    },
    {
      id: 2,
      number: "02",
      title: "Tactical Manuals",
      description: "Access to defense-specific study resources and past year papers",
      icon: BookOpen,
      features: ["NDA/CDS Notes", "Map Reading", "Current Affairs", "Strategy Guides"],
    },
    {
      id: 3,
      number: "03",
      title: "Physical Training",
      description: "Fitness routines and diet plans to meet armed forces standards",
      icon: Dumbbell,
      features: ["Endurance Plans", "Obstacle Course Tips", "Diet Charts", "Daily Drills"],
    },
    {
      id: 4,
      number: "04",
      title: "Officer Mindset",
      description: "Psychological conditioning to develop Officer Like Qualities (OLQs)",
      icon: BrainCircuit,
      features: ["Leadership Talks", "Stress Management", "Decision Making", "Personality Dev"],
    },
    {
      id: 5,
      number: "05",
      title: "Exam Strategy",
      description: "Tactical planning for written exams like NDA, CDS, and AFCAT",
      icon: Target,
      features: ["Time Management", "Topic Weightage", "Cut-off Analysis", "Mock Tests"],
    },
    {
      id: 6,
      number: "06",
      title: "Medal Worthy Support",
      description: "24/7 doubts clearing and mentorship from recommended candidates",
      icon: Medal,
      features: ["WhatsApp Support", "Live Q&A", "Motivation Sessions", "Group Discussions"],
    }
  ];

  const stats = [
    { icon: Users, value: "5000+", label: "Cadets Guided" },
    { icon: Award, value: "98%", label: "Selection Rate" },
    { icon: Clock, value: "24/7", label: "Frontline Support" },
    { icon: Star, value: "100%", label: "Pro Bona Services" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Veteran Faculty",
      description: "Learn strategies directly from retired defence officers"
    },
    {
      icon: Heart,
      title: "Cadet-Centric",
      description: "Every module is designed to forge future leaders"
    },
    {
      icon: Target,
      title: "Mission-Oriented",
      description: "Laser focus on clearing written exams and SSB"
    },
    {
      icon: BookOpen,
      title: "Battle-Read Material",
      description: "Concise, high-yield content for rapid revision"
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center bg-cavalier-brand/10 px-6 py-2 rounded-full border border-cavalier-brand/30 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-red-500 mr-2" />
              <span className="font-bold text-cavalier-brand text-xs uppercase tracking-[0.2em]">100% Free For Cadets</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">
                Cavalier
              </span>
              <br />
              <span className="text-white">Defence Academy</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Empowering the next generation of officers with <span className="font-bold text-cavalier-brand">premium tactical training</span>
              at zero cost.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
                className="bg-cavalier-brand text-black hover:bg-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Access Armory
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => window.location.href = '/contact-us'}
                className="border border-white/20 hover:border-cavalier-brand text-gray-300 hover:text-cavalier-brand px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 flex items-center gap-2 backdrop-blur-sm bg-white/5"
              >
                <Phone className="w-5 h-5" />
                Contact HQ
              </button>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Free Services Section */}
      <section id="services-grid" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Free Arsenal</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              Comprehensive support system designed to help you earn your uniform without financial barriers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {freeServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group cursor-pointer"
              >
                <div className={`h-full bg-cavalier-card-dark rounded-2xl shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden border border-white/10 ${hoveredService === service.id ? 'transform -translate-y-2 border-cavalier-brand/50' : ''
                  }`}>

                  {/* Service Header */}
                  <div className="p-8 relative overflow-hidden bg-white/5 border-b border-white/5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cavalier-brand/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-4xl font-black text-white/10">{service.number}</div>
                        <div className="w-12 h-12 bg-cavalier-brand/10 border border-cavalier-brand/20 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-cavalier-brand" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-8">
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-cavalier-brand mr-3 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Free Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-cavalier-brand text-black px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg">
                      PRO BONO
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cavalier-card-dark border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Why Choose <span className="text-cavalier-brand">Cavalier?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group p-6 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-20 h-20 bg-cavalier-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cavalier-brand/20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-cavalier-brand" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-cavalier-brand/5"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Ready to Earn Your <span className="text-cavalier-brand">Stars?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              Join thousands of successful officers who started their journey with our free guidance program.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="https://wa.me/917020892704"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cavalier-brand text-black hover:bg-white px-10 py-5 rounded-xl font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                Start Training
              </motion.a>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl border border-white/10">
                  <Phone className="w-5 h-5 text-cavalier-brand" />
                  <span className="font-bold tracking-wider"> +91 7020892704</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl border border-white/10">
                  <Mail className="w-5 h-5 text-cavalier-brand" />
                  <span className="font-bold tracking-wider">cavalier@defence.com</span>
                </div>
              </div>
            </div>

            <motion.p
              className="text-cavalier-brand/70 mt-8 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Heart className="w-3 h-3" fill="currentColor" />
              Service Before Self
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FreeServices;
