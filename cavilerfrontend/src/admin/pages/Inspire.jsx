import React, { useState, useEffect, useRef } from "react";
import { FaUpload, FaSave, FaTrash, FaPlus, FaQuoteLeft, FaTerminal, FaShieldAlt, FaHistory, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Trophy, X, Zap } from 'lucide-react';
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const StoriesThatInspire = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [storyImage, setStoryImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/stories`);
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching valor chronicles:", err);
      setError("Intelligence Link Failure: Failed to synchronize valor archives.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Format Error: Please select an image-based visual file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Payload Error: Visual file exceeds 5MB limit.');
        return;
      }
      setStoryImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!storyTitle || !storyDescription || !storyImage) {
      alert("Intelligence Incomplete: Title, Narrative, and Visual record are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", storyTitle);
    formData.append("description", storyDescription);
    formData.append("image", storyImage);

    try {
      const res = await axios.post(`${API_URL}/api/stories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStories([res.data, ...stories]);
      resetForm();
      setError(null);
    } catch (err) {
      console.error("Error chronicling valor:", err);
      setError("Mission Failure: Failed to archive valor chronicle.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStoryTitle("");
    setStoryDescription("");
    setStoryImage(null);
    setPreview(null);
    setIsAdding(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm permanent deletion of this valor record?")) return;

    try {
      await axios.delete(`${API_URL}/api/stories/${id}`);
      setStories(stories.filter((story) => story.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error terminating record:", err);
      setError("Mission Failure: Termination protocol failed.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 selection:bg-pink-500 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Protocol */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 text-pink-500 mb-3">
              <FaHistory className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Archive of Excellence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Valor <span className="text-pink-500">Chronicles</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
              <FaTerminal className="text-pink-500" />
              Distinguished Service Records & Hall of Honor
            </p>
          </div>

          {!isAdding && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-700 text-white px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all"
            >
              <FaPlus className="w-5 h-5" />
              Archive New Record
            </motion.button>
          )}
        </motion.div>

        {/* Deployment Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-8 right-8 z-[150] bg-red-950/90 border border-red-500 p-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md backdrop-blur-xl"
          >
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
              <FaTimes className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1 italic text-left">Internal Error Contact Admin</p>
              <p className="text-sm font-bold text-gray-200">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Addition Modal */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-cavalier-card-dark border border-pink-500/30 rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.2)]"
              >
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-pink-900/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-pink-500 rounded-full"></div>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      Chronicle Valor Record
                    </h2>
                  </div>
                  <button onClick={resetForm} className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operation Designation (Title)</label>
                        <input
                          type="text"
                          value={storyTitle}
                          onChange={(e) => setStoryTitle(e.target.value)}
                          placeholder="E.G. THE NEST OF EAGLES"
                          className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-pink-500 outline-none transition-all font-bold uppercase"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Valor Narrative (Description)</label>
                        <textarea
                          value={storyDescription}
                          onChange={(e) => setStoryDescription(e.target.value)}
                          placeholder="CHRONICLE THE NARRATIVE OF DISTINGUISHED ACHIEVEMENT..."
                          rows="8"
                          className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-pink-500 outline-none resize-none transition-all font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operational Visual Capture</label>
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="w-full h-full min-h-[300px] bg-cavalier-header-bg/30 border-2 border-dashed border-pink-500/30 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/60 transition-all overflow-hidden relative group"
                      >
                        {preview ? (
                          <>
                            <img src={preview} alt="Capture" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <FaUpload className="text-4xl text-pink-500" />
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-8">
                            <FaUpload className="text-6xl text-gray-700 mb-4 mx-auto" />
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Deploy Visual Intelligence</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      disabled={loading || !storyTitle || !storyDescription || !storyImage}
                      className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-pink-600/20 transition-all border-b-4 border-pink-900"
                    >
                      {loading ? <Activity className="animate-spin w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                      Authorize Archive
                    </motion.button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                    >
                      Abort Mission
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Chronicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {stories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredCard(story.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-cavalier-card-dark border border-white/5 rounded-[40px] overflow-hidden shadow-2xl hover:border-pink-500/30 transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={story.image?.startsWith("http") ? story.image : `${API_URL}${story.image}`}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://www.transparenttextures.com/patterns/carbon-fibre.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cavalier-bg via-transparent to-transparent opacity-60"></div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-white/5 opacity-0 group-hover:opacity-100"
                  >
                    <FaTrash size={14} />
                  </button>

                  <div className="absolute top-6 left-6">
                    <div className="bg-pink-500 text-black p-2 rounded-xl shadow-lg">
                      <Trophy size={18} />
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-pink-500" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Valor Report #{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none group-hover:text-pink-500 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-4 italic border-l-2 border-pink-500/20 pl-4 mb-6">
                    {story.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Cavalier Defence Academy</span>
                    <div className="flex items-center gap-1 text-pink-500">
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Verified Record</span>
                      <ShieldCheck size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Intelligence Alert */}
        {stories.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-cavalier-card-dark border-2 border-dashed border-white/5 rounded-[40px]"
          >
            <FaQuoteLeft className="text-6xl text-gray-700 mb-6 mx-auto opacity-20" />
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">No Chronicles Found</h3>
            <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">Awaiting excellence to be chronicled...</p>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(236,72,153,0.4); }
        `
      }} />
    </div>
  );
};

export default StoriesThatInspire;
