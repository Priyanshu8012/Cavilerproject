import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus,
  Edit,
  Trash2,
  X,
  Shield,
  Target,
  FileArchive,
  Terminal,
  Activity
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const PublicationsSection = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    type: 'formula',
    features: '',
    gradient: 'from-cavalier-brand to-yellow-600',
    bgGradient: 'from-cavalier-brand/10 to-transparent',
    popular: false,
    order_index: 0,
    image: null
  });

  const stats = [
    { icon: Users, value: '5,000+', label: 'Cadets Trained' },
    { icon: Award, value: '94%', label: 'Selection Rate' },
    { icon: Clock, value: '24/7', label: 'Tactical Support' },
    { icon: Zap, value: '200+', label: 'Field Manuals' }
  ];

  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return features.split(',').map(f => f.trim()).filter(f => f);
      }
    }
    return [];
  };

  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/publications`);
      if (!response.ok) throw new Error('Failed to synchronize archives');
      const data = await response.json();
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      type: 'formula',
      features: '',
      gradient: 'from-cavalier-brand to-yellow-600',
      bgGradient: 'from-cavalier-brand/10 to-transparent',
      popular: false,
      order_index: 0,
      image: null
    });
    setEditingPublication(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('originalPrice', formData.originalPrice);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim())));
      formDataToSend.append('gradient', formData.gradient);
      formDataToSend.append('bgGradient', formData.bgGradient);
      formDataToSend.append('popular', formData.popular.toString());
      formDataToSend.append('order_index', formData.order_index.toString());

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = editingPublication
        ? `${API_BASE_URL}/api/publications/${editingPublication.id}`
        : `${API_BASE_URL}/api/publications`;

      const method = editingPublication ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to authorize archive entry');

      await fetchPublications();
      resetForm();
    } catch (err) {
      console.error('Error saving publication:', err);
      alert('Archive authorization failed. Status: Access Denied.');
    }
  };

  const handleEdit = (publication) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title,
      description: publication.description,
      price: publication.price,
      originalPrice: publication.originalPrice || '',
      type: publication.type,
      features: Array.isArray(publication.features) ? publication.features.join(', ') : '',
      gradient: publication.gradient,
      bgGradient: publication.bgGradient,
      popular: publication.popular || false,
      order_index: publication.order_index || 0,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm permanent deletion of this field manual?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/publications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to terminate record');
      await fetchPublications();
    } catch (err) {
      console.error('Error deleting publication:', err);
      alert('Termination protocol failed.');
    }
  };

  const handleWhatsAppRedirect = (productName) => {
    const message = `Command, I request the deployment of ${productName} (Field Manual) for my tactical training at Cavalier Defence Academy.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919834301046?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const getTypeIcon = (type, gradient) => {
    const IconComponent =
      type === 'formula' ? BookOpen :
        type === 'notes' ? FileText :
          type === 'test' ? BarChart3 : Crown;

    return (
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]`}>
        <IconComponent className="w-8 h-8 text-black" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex flex-col items-center justify-center">
        <Activity className="w-16 h-16 text-cavalier-brand animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Synchronizing Archives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 selection:bg-cavalier-brand selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
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
            <div className="flex items-center gap-2 text-cavalier-brand mb-3">
              <FileArchive className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Doctrine Repository Control</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Doctrine <span className="text-cavalier-brand">Archives</span>
            </h1>
            <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
              <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                <Terminal className="w-3 h-3 text-cavalier-brand" />
                Active Manuals: {publications.length}
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Authorization Level: Command</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-3 bg-cavalier-brand text-cavalier-bg px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] transition-all"
          >
            <Plus className="w-5 h-5" />
            Initialize Manual
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-cavalier-card-dark/40 border border-white/5 rounded-2xl p-6 text-center hover:border-cavalier-brand/30 transition-all group">
              <div className="w-12 h-12 bg-cavalier-header-bg/50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:border-cavalier-brand/50 transition-colors">
                <stat.icon className="w-6 h-6 text-cavalier-brand" />
              </div>
              <div className="text-2xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Archives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <AnimatePresence>
            {publications.map((pub, idx) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative bg-cavalier-card-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-cavalier-brand/30 transition-all duration-500 ${pub.popular ? 'ring-2 ring-cavalier-brand/50' : ''
                  }`}
              >
                {pub.popular && (
                  <div className="absolute top-0 right-0 bg-cavalier-brand text-cavalier-bg px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest z-20 shadow-lg">
                    Critical Recon
                  </div>
                )}

                <div className={`p-8 bg-gradient-to-br ${pub.gradient} opacity-[0.9] relative overflow-hidden group-hover:opacity-100 transition-opacity`}>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-black/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      {getTypeIcon(pub.type, pub.gradient)}
                    </div>
                    <h3 className="text-2xl font-black text-black uppercase tracking-tight italic line-clamp-2 leading-none mb-3">
                      {pub.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8 space-y-6 bg-cavalier-bg/50">
                  <div className="pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-black text-white tracking-tighter italic">{pub.price}</span>
                      {pub.originalPrice && (
                        <span className="text-sm text-gray-500 line-through font-bold opacity-50">{pub.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed italic">{pub.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[9px] font-black text-cavalier-brand uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Target className="w-3 h-3" /> Mission Parameters
                    </h4>
                    {parseFeatures(pub.features).map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-cavalier-brand shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleWhatsAppRedirect(pub.title)}
                      className="w-full flex items-center justify-center gap-3 bg-cavalier-brand text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-cavalier-brand/20 transition-all border-b-4 border-yellow-800"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Deploy Request
                    </motion.button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(pub)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                      >
                        <Edit className="w-3 h-3" /> Modify
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-950/20 border border-red-900/30 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                      >
                        <Trash2 className="w-3 h-3" /> Terminate
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tactical Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cavalier-card-dark p-12 rounded-[40px] border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cavalier-brand/5 to-transparent"></div>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-4 relative z-10">Strategic Counseling Active</h3>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto font-medium relative z-10 italic">
            Commanders are on standby to direct your resource selection based on mission objectives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
            <motion.a
              href="https://wa.me/919834301046"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-green-600 rounded-2xl flex items-center gap-3 font-black uppercase text-xs tracking-widest shadow-xl shadow-green-600/20 hover:bg-green-500 transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Mission Comms (WA)
            </motion.a>
            <div className="flex flex-col items-start px-8 py-4 bg-black/40 border border-white/10 rounded-2xl">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Direct Secure Line</span>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cavalier-brand" />
                <span className="text-lg font-black tracking-tight">+91 98343 01046</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Entry Protocol Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cavalier-card-dark border border-cavalier-brand/30 rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-cavalier-header-bg/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-cavalier-brand rounded-full"></div>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                    {editingPublication ? 'Modify Archive Entry' : 'Manual Authorization'}
                  </h2>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-500 hover:text-cavalier-brand transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Designation Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="E.G. PHYSICS TACTICAL GUIDE"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Doctrine Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold cursor-pointer uppercase appearance-none"
                    >
                      <option value="formula" className="bg-gray-900 italic">FORMULA RECON ARCHIVE</option>
                      <option value="notes" className="bg-gray-900 italic">TACTICAL BRIEFING NOTES</option>
                      <option value="test" className="bg-gray-900 italic">SIMULATION TEST SERIES</option>
                      <option value="premium" className="bg-gray-900 italic">ELITE COMMAND PACKAGE</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operation Summary (Description)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="ENTER MISSION OBJECTIVES AND CONTENT OVERVIEW..."
                    className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none resize-none transition-all font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Mission Cost (Price)</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="₹499"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Original Deployment Cost</label>
                    <input
                      type="text"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="₹799"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Visual Chroma (Gradient)</label>
                    <select
                      name="gradient"
                      value={formData.gradient}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold appearance-none"
                    >
                      <option value="from-cavalier-brand to-yellow-600" className="bg-gray-900">COMMAND GOLD</option>
                      <option value="from-gray-700 to-black" className="bg-gray-900">TACTICAL CHARCOAL</option>
                      <option value="from-green-600 to-emerald-900" className="bg-gray-900">OPERATIONAL GREEN</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Mission Highlights (Comma Separated)</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      required
                      placeholder="ALL SUBJECTS, QUICK RECON, EXAM FOCUS"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="popular"
                      name="popular"
                      checked={formData.popular}
                      onChange={handleInputChange}
                      className="w-6 h-6 rounded border-white/10 bg-cavalier-header-bg/30 text-cavalier-brand focus:ring-cavalier-brand transition-all cursor-pointer"
                    />
                    <label htmlFor="popular" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer group-hover:text-cavalier-brand transition-colors">
                      Mark as Critical Intelligence (Popular)
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Manual Visual Archive (Image)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full h-32 bg-cavalier-header-bg/30 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cavalier-brand/50 transition-all hover:bg-cavalier-header-bg/40"
                    >
                      <Shield className="w-8 h-8 text-cavalier-brand mb-2 opacity-50" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {formData.image ? formData.image.name : 'Upload Tactical Visual'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-3 bg-cavalier-brand text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-cavalier-brand/20 transition-all border-b-4 border-yellow-800"
                  >
                    <Terminal className="w-4 h-4" />
                    {editingPublication ? 'Confirm Archive Modification' : 'Authorize Archive Entry'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                  >
                    Abort
                  </button>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
      `}} />
    </div>
  );
};

export default PublicationsSection;
