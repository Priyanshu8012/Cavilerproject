import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  BarChart3,
  Crown,
  MessageCircle,
  Phone,
  CheckCircle,
  Zap,
  Clock,
  Users,
  Award,
  AlertCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const PublicationsSection = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = [
    { icon: Users, value: '5,000+', label: 'Officers Made' },
    { icon: Award, value: 'Top 10', label: 'All India Ranks' },
    { icon: Clock, value: '24/7', label: 'Tactical Support' },
    { icon: Zap, value: '100+', label: 'Defence Manuals' }
  ];

  // Helper function to safely parse features
  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If JSON parsing fails, return as single item if non-empty, or split by comma
        return features.includes(',') ? features.split(',').map(s => s.trim()) : [features];
      }
    }
    return [];
  };

  // Fetch publications from backend
  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError(null);

      // FIX: Added /api prefix to match backend routes
      const response = await fetch(`${API_BASE_URL}/api/publications`);

      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }

      const data = await response.json();

      // Process features for each publication
      const processedData = data.map(pub => ({
        ...pub,
        features: parseFeatures(pub.features)
      }));

      setPublications(processedData);
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleWhatsAppRedirect = (productName) => {
    const message = `Jai Hind! I'm interested in the ${productName} for my defence preparation. Please provide details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919834301046?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const getTypeIcon = (type) => {
    const IconComponent =
      type === 'formula' ? BookOpen :
        type === 'notes' ? FileText :
          type === 'test' ? BarChart3 : Crown;

    return (
      <div className="w-14 h-14 rounded-xl bg-cavalier-brand/10 border border-cavalier-brand/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <IconComponent className="w-7 h-7 text-cavalier-brand" />
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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

  // Loading state
  if (loading) {
    return (
      <section className="py-20 min-h-screen bg-cavalier-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]"></div>
        <div className="text-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-4 border-cavalier-brand border-t-transparent mx-auto mb-4"
          />
          <p className="text-cavalier-brand text-lg font-medium tracking-wider animate-pulse">Scanning Archives...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 min-h-screen bg-cavalier-bg flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-cavalier-card-dark border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connection Interrupted</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchPublications}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-bold uppercase tracking-wider"
            >
              Retry Comms
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-cavalier-bg relative overflow-hidden min-h-screen">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center bg-cavalier-brand/10 px-6 py-2 rounded-full border border-cavalier-brand/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Crown className="w-4 h-4 text-cavalier-brand mr-2" />
            <span className="font-bold text-cavalier-brand text-xs uppercase tracking-[0.2em]">Cavalier Arsenal</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Defence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Manuals</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive strategical resources, past papers, and tactical guides customized for
            <span className="font-bold text-cavalier-brand ms-1">NDA, CDS, AFCAT & SSB</span> preparation.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-cavalier-card-dark/60 backdrop-blur-md rounded-xl p-6 text-center border border-white/10 hover:border-cavalier-brand/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-cavalier-brand/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cavalier-brand/20 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-cavalier-brand" />
              </div>
              <div className="text-2xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Publications Grid */}
        {publications.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {publications.map((publication, index) => (
              <motion.div
                key={publication.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(publication.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group cursor-pointer ${publication.popular ? 'md:transform md:-translate-y-4' : ''
                  }`}
              >
                {/* Popular Badge */}
                {publication.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-cavalier-brand to-yellow-600 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                      <Zap className="w-3 h-3" fill="currentColor" />
                      Elite Pick
                    </div>
                  </div>
                )}

                <div className={`h-full bg-cavalier-card-dark rounded-3xl overflow-hidden border transition-all duration-500 ${hoveredCard === publication.id
                    ? 'border-cavalier-brand shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                    : 'border-white/10 shadow-xl'
                  }`}>

                  {/* Card Header */}
                  <div className="p-8 relative overflow-hidden bg-white/5 border-b border-white/5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cavalier-brand/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        {getTypeIcon(publication.type)}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                        {publication.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {publication.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="px-8 py-6 border-b border-white/5 bg-black/20">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-cavalier-brand">{publication.price}</span>
                      {publication.originalPrice && (
                        <span className="text-sm text-gray-500 line-through decoration-gray-500/50">{publication.originalPrice}</span>
                      )}
                    </div>
                    {publication.originalPrice && (
                      <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Cadet Discount Applied
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-cavalier-brand" />
                      Intel Inside:
                    </h4>
                    <ul className="space-y-3">
                      {publication.features && publication.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                          <div className="mt-1 mr-3 min-w-[4px] h-[4px] rounded-full bg-cavalier-brand" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="p-8 pt-0 mt-auto">
                    <motion.button
                      onClick={() => handleWhatsAppRedirect(publication.title)}
                      className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${publication.popular
                          ? 'bg-cavalier-brand text-black hover:bg-white'
                          : 'bg-white/10 text-white hover:bg-cavalier-brand hover:text-black'
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Request Manual
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-cavalier-card-dark/60 backdrop-blur-md rounded-2xl p-12 max-w-2xl mx-auto border border-white/10">
              <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Library Status: Updating</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Central command is currently restocking our tactical study resources. New manuals for the upcoming cycle will be listed shortly.
              </p>
              <div className="space-y-3 text-sm text-gray-500">
                <p className="font-bold text-cavalier-brand uppercase tracking-wider mb-2">Emergency Contacts</p>
                <p className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> +91 98343 01046</p>
                <p className="flex items-center justify-center gap-2">support@cavalier.com</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          className="bg-gradient-to-r from-cavalier-card-dark to-black rounded-3xl p-10 md:p-14 text-center border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cavalier-brand/10 rounded-full blur-3xl"></div>

          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            Need a custom <span className="text-cavalier-brand">Study Plan?</span>
          </h3>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Our strategic counselors can help you assemble the perfect kit of books and notes for your specific target rank.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="https://wa.me/919834301046"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cavalier-brand text-cavalier-bg font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp HQ
            </motion.a>

            <div className="flex items-center gap-3 text-gray-300 bg-white/5 px-8 py-4 rounded-xl border border-white/10">
              <Phone className="w-5 h-5 text-cavalier-brand" />
              <span className="font-bold tracking-wider">+91 98343 01046</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicationsSection;
