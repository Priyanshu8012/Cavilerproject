import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaPlay, FaQuoteLeft, FaTrophy, FaGraduationCap } from "react-icons/fa";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const backendUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/testimonials`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          console.error("Invalid data format:", data);
          setError("Invalid data format from API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setError("Failed to load testimonials");
        setLoading(false);
      });
  }, [backendUrl]);

  // FIXED: Better YouTube video ID extraction
  const extractVideoId = (youtubeLink) => {
    if (!youtubeLink) return null;

    console.log("Processing YouTube URL:", youtubeLink);

    let videoId = '';

    // Handle different YouTube URL formats
    if (youtubeLink.includes('youtube.com/watch?v=')) {
      videoId = youtubeLink.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    }
    // Short URL format
    else if (youtubeLink.includes('youtu.be/')) {
      videoId = youtubeLink.split('youtu.be/')[1];
      const questionMarkPosition = videoId.indexOf('?');
      if (questionMarkPosition !== -1) {
        videoId = videoId.substring(0, questionMarkPosition);
      }
    }
    // Embed format
    else if (youtubeLink.includes('youtube.com/embed/')) {
      videoId = youtubeLink.split('embed/')[1];
    }

    console.log("Extracted Video ID:", videoId);
    return videoId;
  };

  // FIXED: Better thumbnail URL handling with fallbacks
  const getThumbnailUrl = (videoId) => {
    if (!videoId) return null;

    const thumbnails = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    ];

    return thumbnails;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cavalier-header-bg border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading success stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cavalier-header-bg text-cavalier-brand px-6 py-2 rounded-lg hover:bg-cavalier-card-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cavalier-bg via-white to-cavalier-bg py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cavalier-header-bg/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cavalier-card-dark/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-cavalier-header-bg/10 text-cavalier-header-bg px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaTrophy className="text-cavalier-brand" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark bg-clip-text text-transparent">Pride</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our successful students who achieved their dreams with Cavalier India Pune
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const videoId = extractVideoId(testimonial.youtubeLink);
            const thumbnailUrls = getThumbnailUrl(videoId);

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100"
                whileHover={{ y: -8 }}
              >
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden">
                  {videoId ? (
                    <>
                      <img
                        src={thumbnailUrls[0]}
                        alt={testimonial.candidateName}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Try fallback thumbnails
                          const img = e.target;
                          const currentSrc = img.src;
                          const currentIndex = thumbnailUrls.indexOf(currentSrc);

                          if (currentIndex < thumbnailUrls.length - 1) {
                            img.src = thumbnailUrls[currentIndex + 1];
                          } else {
                            // Last fallback - show placeholder
                            img.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                      {/* Fallback placeholder - hidden by default */}
                      <div className="w-full h-48 bg-gradient-to-br from-cavalier-header-bg/20 to-cavalier-card-dark/20 flex items-center justify-center hidden"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <FaPlay className="text-cavalier-header-bg text-3xl mx-auto mb-2" />
                          <p className="text-cavalier-header-bg font-semibold text-sm">Video Available</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-cavalier-header-bg rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <FaPlay className="text-cavalier-brand text-xl ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <FaGraduationCap className="text-gray-400 text-4xl" />
                    </div>
                  )}

                  {/* AIR Rank Badge */}
                  {testimonial.ranking && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <FaTrophy className="text-cavalier-brand" />
                      {testimonial.ranking.includes('AIR') ? testimonial.ranking : `AIR ${testimonial.ranking}`}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Candidate Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {testimonial.candidateName}
                      </h3>
                      <p className="text-cavalier-header-bg font-semibold text-sm">
                        {testimonial.year} Year Classroom
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-cavalier-header-bg/10 px-2 py-1 rounded-full">
                      <FaStar className="text-cavalier-brand text-sm" />
                      <span className="text-sm font-semibold text-gray-700">5.0</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative">
                    <FaQuoteLeft className="text-cavalier-header-bg/30 text-2xl mb-2" />
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                      {testimonial.description || "An inspiring journey of success and achievement with Cavalier India Pune."}
                    </p>
                  </div>

                  {/* Watch Video Button */}
                  {videoId && (
                    <motion.button
                      onClick={() => setSelectedVideo(videoId)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-4 bg-gradient-to-r from-cavalier-header-bg to-cavalier-card-dark text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <FaPlay className="text-cavalier-brand group-hover/btn:animate-pulse" />
                      Watch Success Story
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {testimonials.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-cavalier-header-bg/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGraduationCap className="text-cavalier-header-bg text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Testimonials Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Our success stories are being prepared. Check back soon to see our students' achievements!
            </p>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Student Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}} />
    </div>
  );
}
