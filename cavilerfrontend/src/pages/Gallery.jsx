import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { X, Play, Image, Star, Award, Users, BookOpen, Calendar, Clock, Search, Filter, Shield, Target, Medal, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Modern Media Card Component
const MediaCard = ({ item, onOpen }) => {
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  const getThumbnailUrl = (item) => {
    if (item.content_type === 'youtube' && item.thumbnail_url) {
      return item.thumbnail_url;
    }
    if (item.thumbnail_url) {
      return getImageUrl(item.thumbnail_url);
    }
    if (item.file_url) {
      return getImageUrl(item.file_url);
    }
    return 'https://via.placeholder.com/500?text=Cavalier+Defence';
  };

  const mediaType = (item.content_type === 'youtube' || item.content_type === 'video') ? 'video' : 'photo';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-cavalier-card-dark rounded-2xl shadow-lg overflow-hidden border border-white/10 hover:border-cavalier-brand transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
      onClick={() => onOpen(item)}
    >
      {/* Featured Badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10 bg-cavalier-brand text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3" fill="black" />
          Elite
        </div>
      )}

      <div className="relative overflow-hidden h-52">
        <img
          src={getThumbnailUrl(item)}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500?text=Restricted+Area';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Play Icon / Image Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-cavalier-brand/20 backdrop-blur-sm border border-cavalier-brand/50 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            {mediaType === 'video' ? (
              <Play className="w-8 h-8 text-cavalier-brand ml-1" fill="currentColor" />
            ) : (
              <Eye className="w-8 h-8 text-cavalier-brand" />
            )}
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
          {mediaType === 'video' ? 'Footage' : 'Intel'}
        </div>
      </div>

      <div className="p-5 relative">
        <h3 className="font-bold text-white mb-2 line-clamp-1 text-lg leading-tight group-hover:text-cavalier-brand transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
          {item.description || "Classified tactical record."}
        </p>

        <div className="flex justify-between items-center border-t border-white/10 pt-3">
          <span className="text-cavalier-brand text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {item.category || "General"}
          </span>
          <span className="text-gray-500 text-xs flex items-center gap-1 font-mono">
            <Calendar className="w-3 h-3" />
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Modern Filter Tabs Component
const FilterTabs = ({ activeTab, onTabChange, categories, mediaCounts, searchQuery, onSearchChange }) => {
  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cavalier-brand w-5 h-5" />
          <input
            type="text"
            placeholder="Search tactical records..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-cavalier-card-dark/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cavalier-brand focus:border-cavalier-brand transition-all duration-300 outline-none backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(category => (
          <button
            key={category.id || category}
            onClick={() => onTabChange(category.id || category)}
            className={`px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-2 border ${activeTab === (category.id || category)
                ? 'bg-cavalier-brand text-black border-cavalier-brand shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-cavalier-brand hover:text-cavalier-brand'
              }`}
          >
            {category.icon}
            {category.name}
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === (category.id || category) ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
              }`}>
              {mediaCounts[category.id || category] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Gallery Component
const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaData, setMediaData] = useState({ videos: [], photos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Intel', icon: <Shield className="w-3 h-3" /> },
    { id: 'featured', name: 'Mission Critical', icon: <Star className="w-3 h-3" /> },
    { id: 'training', name: 'Training Drills', icon: <Target className="w-3 h-3" /> },
    { id: 'ceremonies', name: 'Ceremonies', icon: <Medal className="w-3 h-3" /> },
    { id: 'campus', name: 'Base Camp', icon: <Award className="w-3 h-3" /> },
    { id: 'events', name: 'Operations', icon: <Calendar className="w-3 h-3" /> },
    { id: 'sports', name: 'PT / Sports', icon: <Award className="w-3 h-3" /> },
    { id: 'achievements', name: 'Hall of Fame', icon: <Award className="w-3 h-3" /> }
  ];

  // Fetch media from backend
  const fetchMedia = async () => {
    try {
      setLoading(true);
      // ✅ Fixed API Endpoint
      const response = await axios.get(`${API_BASE_URL}/api/content`);
      const allContent = response.data;

      // Separate videos and photos
      const videos = allContent.filter(item =>
        item.content_type === 'video' || item.content_type === 'youtube'
      );
      const photos = allContent.filter(item =>
        item.content_type === 'image'
      );

      setMediaData({ videos, photos });
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to establish secure connection to archives.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Calculate media counts for each category
  const mediaCounts = useMemo(() => {
    const allMedia = [...mediaData.videos, ...mediaData.photos];
    const counts = { all: allMedia.length };

    categories.forEach(category => {
      const categoryId = category.id || category;
      if (categoryId !== 'all') {
        if (categoryId === 'featured') {
          counts[categoryId] = allMedia.filter(item => item.featured).length;
        } else {
          counts[categoryId] = allMedia.filter(item => item.category === categoryId).length;
        }
      }
    });

    return counts;
  }, [mediaData, categories]);

  // Filter media based on active tab and search query
  const filteredMedia = useMemo(() => {
    let allMedia = [...mediaData.videos, ...mediaData.photos];

    // Apply category filter
    if (activeTab === 'featured') {
      allMedia = allMedia.filter(item => item.featured);
    } else if (activeTab !== 'all') {
      allMedia = allMedia.filter(item => item.category === activeTab);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      allMedia = allMedia.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.category?.toLowerCase().includes(query)
      );
    }

    return allMedia.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [activeTab, searchQuery, mediaData]);

  const openMedia = (item) => {
    setSelectedMedia(item);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cavalier-brand mx-auto mb-4"></div>
          <p className="text-cavalier-brand text-lg font-bold tracking-widest uppercase">Decrypting Archives...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center">
        <div className="text-center bg-cavalier-card-dark p-8 rounded-2xl border border-red-500/30">
          <div className="text-red-500 text-lg mb-4 font-bold">⚠️ {error}</div>
          <button
            onClick={fetchMedia}
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
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-cavalier-brand/10 border border-cavalier-brand/30 px-6 py-2 rounded-full shadow-lg mb-6"
          >
            <Shield className="w-5 h-5 text-cavalier-brand" />
            <span className="text-sm font-bold text-cavalier-brand uppercase tracking-[0.2em]">Cavalier Defence Academy</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Media Archives</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Visual intelligence of our training modules, campus life, and passing out parades.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 text-center hover:border-cavalier-brand transition-colors">
            <div className="text-3xl font-black text-white mb-2">{mediaData.videos.length}</div>
            <div className="text-cavalier-brand text-xs font-bold uppercase tracking-wider">Video Intel</div>
          </div>
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 text-center hover:border-cavalier-brand transition-colors">
            <div className="text-3xl font-black text-white mb-2">{mediaData.photos.length}</div>
            <div className="text-cavalier-brand text-xs font-bold uppercase tracking-wider">Photo Intel</div>
          </div>
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 text-center hover:border-cavalier-brand transition-colors">
            <div className="text-3xl font-black text-white mb-2">{categories.length - 1}</div>
            <div className="text-cavalier-brand text-xs font-bold uppercase tracking-wider">Classifications</div>
          </div>
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 text-center hover:border-cavalier-brand transition-colors">
            <div className="text-3xl font-black text-white mb-2">
              {mediaData.videos.length + mediaData.photos.length}
            </div>
            <div className="text-cavalier-brand text-xs font-bold uppercase tracking-wider">Total Records</div>
          </div>
        </div>

        {/* Filter Tabs with Search */}
        <FilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          categories={categories}
          mediaCounts={mediaCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Media Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredMedia.map(item => (
              <MediaCard
                key={`${item.content_type}-${item.id}`}
                item={item}
                onOpen={openMedia}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-cavalier-card-dark rounded-3xl p-12 border border-white/10 max-w-2xl mx-auto">
              <Shield className="w-24 h-24 text-gray-700 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-white mb-4">No Intel Found</h3>
              <p className="text-gray-400 text-lg mb-6">
                {searchQuery ? `No records matching "${searchQuery}"` : 'Restricted access or no data available.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="bg-cavalier-brand text-black px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal for Media View */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-cavalier-card-dark rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-white/10 relative">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-5 h-5 text-cavalier-brand" />
                {selectedMedia.title}
              </h3>
              <button
                onClick={closeMedia}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {(selectedMedia.content_type === 'video' || selectedMedia.content_type === 'video') ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ paddingBottom: '56.25%' }}>
                  {/* Handle YouTube and Local Video */}
                  <video
                    controls
                    autoPlay
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    poster={getImageUrl(selectedMedia.thumbnail_url)}
                  >
                    <source src={getImageUrl(selectedMedia.file_url)} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              ) : selectedMedia.content_type === 'youtube' ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={getYouTubeEmbedUrl(selectedMedia.youtube_url)}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    allowFullScreen
                    title={selectedMedia.title}
                  />
                </div>
              ) : (
                <img
                  src={getImageUrl(selectedMedia.file_url || selectedMedia.thumbnail_url)}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-2xl mx-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800?text=Restricted+Image';
                  }}
                />
              )}

              <div className="mt-8 p-6 bg-black/30 rounded-2xl border border-white/5">
                <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-cavalier-brand/20 border border-cavalier-brand/50 text-cavalier-brand px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider">
                      {selectedMedia.category || "Unclassified"}
                    </span>
                    {selectedMedia.featured && (
                      <span className="bg-yellow-500/20 border border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 uppercase">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs font-mono flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedMedia.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedMedia.description}</p>

                {/* Additional Info */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>ID: {selectedMedia.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
