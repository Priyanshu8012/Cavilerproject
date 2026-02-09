import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Video } from "lucide-react";

const VideoLecturesSection = () => {
  // 🎥 Your YouTube videos data
  const videoLectures = [
    {
      title: "JEE Physics – Motion in One Dimension",
      duration: "12:45",
      views: "15K",
      link: "https://youtu.be/Pv18nm9mo2w?si=qlYubVzLnCIZo1mT",
    },
    {
      title: "NEET Biology – Cell Structure & Functions",
      duration: "10:20",
      views: "18K",
      link: "https://youtu.be/J4lII06U3P8?si=z43H4XOQ_I9ysUTv",
    },
    {
      title: "Chemistry – Atomic Structure Basics",
      duration: "14:05",
      views: "22K",
      link: "https://youtu.be/2xiXpVlO33s?si=_cDll-edqfJ_X-Bb",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔹 Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
            <Video size={20} className="mr-2" />
            <span className="font-semibold">Video Lectures</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Learn from <span className="text-red-400">Expert</span> Educators
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive video lectures to master complex concepts
          </p>
        </motion.div>

        {/* 🔹 Video Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoLectures.map((video, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                {/* 🎬 YouTube Thumbnail */}
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.link.split("youtu.be/")[1].split("?")[0]}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle size={48} className="text-white" />
                  </div>
                </a>

                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
                <div className="flex justify-between items-center text-gray-400">
                  <span>👁️ {video.views} views</span>
                  <motion.a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center group/watch"
                    whileHover={{ scale: 1.05 }}
                  >
                    Watch <PlayCircle size={16} className="ml-2 group-hover/watch:animate-pulse" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoLecturesSection;

