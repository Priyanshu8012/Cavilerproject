import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus, FaSearch, FaFilter, FaTrashAlt, FaEdit, FaEye,
  FaCloudUploadAlt, FaTimes, FaGlobe, FaShieldAlt, FaNewspaper
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const CavalierBlogAdmin = () => {
  const categories = [
    "NDA Intelligence", "CDS Briefing", "AFCAT Ops", "SSB Strategy",
    "Tactical Prep", "General Orders", "Cadet Motivation"
  ];

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General Orders",
    image: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "",
    status: "draft",
    tags: ""
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'image' && uploadMethod === 'url') setImagePreview(value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) return;
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    setFormData({
      title: "",
      description: "",
      category: "General Orders",
      image: "",
      date: new Date().toISOString().split('T')[0],
      readTime: "",
      status: "draft",
      tags: ""
    });
    setImagePreview("");
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setFormData({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      image: blog.image_url || "",
      date: blog.date,
      readTime: blog.read_time || "",
      status: blog.status,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : ""
    });
    setImagePreview(blog.image_url ? `${API_BASE_URL}${blog.image_url}` : "");
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Confirm deletion of this mission report?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && uploadMethod === 'url') return;
        formDataToSend.append(key, formData[key]);
      });
      if (uploadMethod === 'url' && formData.image) {
        formDataToSend.append('image_url', formData.image);
      }

      if (editingBlog) {
        await axios.put(`${API_BASE_URL}/api/blogs/${editingBlog.id}`, formDataToSend);
      } else {
        await axios.post(`${API_BASE_URL}/api/blogs`, formDataToSend);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white font-sans selection:bg-cavalier-brand selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cavalier-brand/20 bg-cavalier-brand/5 text-cavalier-brand text-[10px] font-bold tracking-widest uppercase mb-3">
              <FaShieldAlt /> Tactical Network
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white italic">
              Transmission <span className="text-cavalier-brand">Logs</span>
            </h1>
            <p className="text-gray-400 mt-2 font-light">Broadcast mission intel and training doctrines to the academy.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddBlog}
            className="flex items-center gap-3 px-8 py-4 bg-cavalier-brand text-black rounded-xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] transition-all"
          >
            <FaPlus /> New Mission Intel
          </motion.button>
        </motion.div>

        {/* Dashboard Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-cavalier-card-dark border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search intel reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cavalier-brand focus:ring-1 focus:ring-cavalier-brand outline-none transition-all"
                />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-10 text-white focus:border-cavalier-brand outline-none appearance-none transition-all cursor-pointer"
                >
                  <option value="all">All Channels</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-cavalier-brand rounded-2xl p-6 flex items-center justify-between text-black shadow-lg">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Intelligence</p>
              <p className="text-4xl font-black">{blogs.length}</p>
            </div>
            <FaNewspaper className="text-4xl opacity-20" />
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 xl:max-w-7xl mx-auto gap-6">
          <div className="bg-cavalier-card-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Mission Report</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Designation</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredBlogs.map((blog, idx) => (
                    <motion.tr
                      key={blog.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex-shrink-0">
                            {blog.image_url ? (
                              <img src={`${API_BASE_URL}${blog.image_url}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-cavalier-brand font-black">
                                <FaGlobe />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-cavalier-brand transition-colors line-clamp-1 truncate max-w-[200px]">{blog.title}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">{blog.read_time || '5 MIN READ'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-black uppercase tracking-wider text-gray-400">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${blog.status === 'published' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-orange-500'}`}></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{blog.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-gray-500">
                        {new Date(blog.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEditBlog(blog)} className="p-2 hover:bg-cavalier-brand hover:text-black rounded-lg transition-all text-gray-400"><FaEdit /></button>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all text-gray-400"><FaTrashAlt /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredBlogs.length === 0 && (
              <div className="py-20 text-center">
                <FaNewspaper className="text-6xl text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-black uppercase tracking-[0.2em]">Zero intel reports found on this channel.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-cavalier-card-dark border border-cavalier-brand/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <form onSubmit={handleSaveBlog} className="flex flex-col h-[85vh]">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-xl font-black uppercase tracking-tight italic">
                    {editingBlog ? 'Update Protocol' : 'Initialize Reporting'}
                  </h2>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors "><FaTimes size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Visuals */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="relative aspect-square rounded-2xl bg-black/40 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group">
                        {imagePreview ? (
                          <React.Fragment>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => { setImagePreview(""); setFormData(p => ({ ...p, image: '' })) }} className="bg-red-500 p-2 rounded-lg"><FaTrashAlt /></button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div className="text-center p-6">
                            <FaCloudUploadAlt className="text-4xl text-gray-700 mx-auto mb-3" />
                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-wider">Mission Visuals Pending</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setUploadMethod('url')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${uploadMethod === 'url' ? 'bg-cavalier-brand text-black border-cavalier-brand' : 'bg-white/5 border-white/10 text-gray-500'}`}>Link</button>
                          <button type="button" onClick={() => setUploadMethod('file')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${uploadMethod === 'file' ? 'bg-cavalier-brand text-black border-cavalier-brand' : 'bg-white/5 border-white/10 text-gray-500'}`}>Upload</button>
                        </div>
                        {uploadMethod === 'url' ? (
                          <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="IMAGE URL DIRECT LINK" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cavalier-brand outline-none" />
                        ) : (
                          <input type="file" onChange={handleFileUpload} className="text-xs text-gray-500 w-full" />
                        )}
                      </div>
                    </div>

                    {/* Intelligence Data */}
                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Operation Title</label>
                        <input name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none text-xl font-bold" placeholder="ENTER MISSION TITLE" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Intel Designation</label>
                          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cavalier-brand">
                            {categories.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Mission Status</label>
                          <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cavalier-brand">
                            <option value="draft" className="bg-gray-900">CLASSIFIED (DRAFT)</option>
                            <option value="published" className="bg-gray-900">PUBLIC DEPLOYMENT</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Briefing / Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-gray-300 focus:border-cavalier-brand outline-none resize-none" placeholder="ENTER DETAILED BRIEFING..." />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Deployment Date</label>
                          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cavalier-brand" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 italic">Intel Read Time</label>
                          <input name="readTime" value={formData.readTime} onChange={handleInputChange} placeholder="E.G. 10 MINS" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cavalier-brand" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black/40 border-t border-white/10 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">Abort</button>
                  <button type="submit" className="px-10 py-3 bg-cavalier-brand text-black rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-cavalier-brand/20 hover:bg-white transition-all">Submit Intel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default CavalierBlogAdmin;
