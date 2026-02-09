import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Clock, ArrowRight, X, Shield, Star } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const VidyarjanBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // ✅ Fixed API Endpoint
      const response = await axios.get(`${API_BASE_URL}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to retrieve tactical dispatches.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle read more click
  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  // Group blogs by category
  const blogsByCategory = blogs.reduce((acc, blog) => {
    if (blog.status === 'published') {
      const category = blog.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(blog);
    }
    return acc;
  }, {});

  // Categories to display
  const displayCategories = [
    'Strategy',
    'SSB',
    'NDA',
    'CDS',
    'Fitness',
    'Motivation',
    'General'
  ];

  // Get latest 4 blogs for the "Recent Dispatches" section
  const latestBlogs = blogs
    .filter(blog => blog.status === 'published')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cavalier-brand mx-auto mb-4"></div>
          <p className="text-cavalier-brand font-bold tracking-widest uppercase">Deciphering Messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center">
        <div className="bg-cavalier-card-dark p-8 rounded-2xl border border-red-500/30 text-center">
          <div className="text-red-500 text-lg mb-4 font-bold">⚠️ {error}</div>
          <button
            onClick={fetchBlogs}
            className="bg-cavalier-brand text-black px-6 py-2 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/10 text-cavalier-brand text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            <Shield className="w-4 h-4" /> Tactical Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Cavalier <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Tac-Intel Blog</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Latest strategies, exam updates, and tactical guides from the command center.
          </p>
        </div>

        {/* Latest Section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
              <span className="w-1 h-6 bg-cavalier-brand rounded-full"></span>
              Recent Dispatches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map(blog => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-cavalier-card-dark rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-cavalier-brand transition-all duration-300 group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={getImageUrl(blog.image_url) || 'https://via.placeholder.com/400x250?text=Top+Secret'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x250?text=Top+Secret'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-cavalier-brand text-black px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {blog.category || "Intel"}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-cavalier-brand" /> {formatDate(blog.date)}</span>
                    {blog.read_time && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cavalier-brand" /> {blog.read_time}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-3 line-clamp-2 leading-tight group-hover:text-cavalier-brand transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.description}</p>
                  <button
                    onClick={() => handleReadMore(blog)}
                    className="text-cavalier-brand font-bold text-xs uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1"
                  >
                    Read Briefing <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {latestBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg uppercase tracking-wider">No active dispatches</div>
            </div>
          )}
        </section>

        {/* Category Sections */}
        {displayCategories.map(category => {
          const categoryBlogs = blogsByCategory[category] || [];
          // Also check lowercase match just in case
          const altCategoryBlogs = blogsByCategory[category.toLowerCase()] || [];
          const allCategoryBlogs = [...categoryBlogs, ...altCategoryBlogs];

          if (allCategoryBlogs.length === 0) return null;

          return (
            <section key={category} className="mt-16">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                  <span className="w-1 h-6 bg-cavalier-brand rounded-full"></span>
                  {category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allCategoryBlogs.slice(0, 4).map(blog => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-cavalier-card-dark rounded-2xl overflow-hidden shadow-md border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div className="h-40 relative overflow-hidden">
                      <img
                        src={getImageUrl(blog.image_url) || 'https://via.placeholder.com/400x250?text=Restricted'}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/400x250?text=Restricted'}
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-white mb-2 line-clamp-2 leading-tight">{blog.title}</h3>
                      <div className="flex justify-between items-center mt-3 border-t border-white/10 pt-3">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">{formatDate(blog.date)}</span>
                        <button
                          onClick={() => handleReadMore(blog)}
                          className="text-cavalier-brand font-bold text-[10px] uppercase tracking-wider hover:text-white transition-colors"
                        >
                          Access
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cavalier-card-dark rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl relative custom-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-72">
                <img
                  src={getImageUrl(selectedBlog.image_url) || 'https://via.placeholder.com/800x400?text=Top+Secret'}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Top+Secret'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cavalier-card-dark via-transparent to-transparent"></div>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-cavalier-brand hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-cavalier-brand text-black px-3 py-1 rounded-sm text-xs font-black uppercase tracking-widest shadow-lg mb-2 inline-block">
                    {selectedBlog.category || 'Intel'}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-gray-300 font-mono mt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(selectedBlog.date)}</span>
                    {selectedBlog.read_time && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedBlog.read_time}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedBlog.title}</h2>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line font-light">
                    {selectedBlog.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="bg-cavalier-brand text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Close Briefing
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VidyarjanBlog;
