import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaTrash, FaSearch, FaRedo, FaEnvelope, FaPhone, FaBook, FaCalendarAlt, FaTerminal, FaShieldAlt } from 'react-icons/fa';
import { Activity, ShieldCheck, UserPlus, FileText, X, ChevronRight, Search, Inbox } from 'lucide-react';

const ReceivedMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacherjobform`);
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch intelligence intake:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm permanent deletion of this personnel intake record?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacherjobform/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        setSelectedMessage(null);
      } else {
        alert('Mission Failure: Failed to terminate intake record.');
      }
    } catch (err) {
      console.error('Termination failed:', err);
      alert('Mission Failure: Termination protocol malfunction.');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMessages();
  }, []);

  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${status === 'new' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' :
        status === 'reviewed' ? 'bg-purple-500/10 border-purple-500/30 text-purple-500' :
          status === 'contacted' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
            'bg-gray-500/10 border-gray-500/30 text-gray-500'
      }`}>
      {status || 'UNIDENTIFIED'}
    </span>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center p-6">
        <div className="text-center">
          <Activity className="w-16 h-16 text-cyan-500 animate-spin mx-auto mb-6" />
          <p className="text-cyan-500 font-black uppercase tracking-[0.3em] font-mono animate-pulse">Synchronizing Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 selection:bg-cyan-500 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
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
            <div className="flex items-center gap-2 text-cyan-500 mb-3">
              <UserPlus className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Force Recruitment Link</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Intelligence <span className="text-cyan-500">Intake</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
              <FaTerminal className="text-cyan-500" />
              Processing External Personnel Protocols & Assets
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchMessages}
            className="group flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all"
          >
            <FaRedo className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Recalibrate Intake
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls & Search */}
          <div className="lg:col-span-12 flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
              <input
                type="text"
                placeholder="PROSPECT DESIGNATION, EMAIL, OR SPECIALTY..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-cavalier-card-dark/50 border border-cyan-500/20 rounded-[20px] pl-16 pr-8 py-5 text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition-all font-bold uppercase ring-0 focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>
            <div className="bg-cavalier-card-dark border border-white/5 rounded-[20px] px-8 py-5 flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Intake:</span>
              <span className="text-2xl font-black text-white italic leading-none">{messages.length}</span>
            </div>
          </div>

          {/* Intake List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <AnimatePresence>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedMessage(msg)}
                    className={`group relative bg-cavalier-card-dark border-r-4 transition-all duration-300 cursor-pointer p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${selectedMessage?.id === msg.id
                        ? 'border-cyan-500 bg-cyan-900/10 shadow-[0_4px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                        : 'border-white/5 hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${selectedMessage?.id === msg.id ? 'bg-cyan-500 text-black' : 'bg-cavalier-header-bg/50 text-cyan-500 border border-cyan-500/20'
                        }`}>
                        <FaUserGraduate size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-cyan-500 transition-colors">
                          {msg.name}
                        </h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          {msg.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={msg.status} />
                      <div className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/5">
                        {msg.subject}
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${selectedMessage?.id === msg.id ? 'translate-x-1 text-cyan-500' : 'text-gray-700'}`} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-cavalier-card-dark border-2 border-dashed border-white/5 rounded-[40px]">
                  <Inbox className="w-16 h-16 text-gray-700 mx-auto mb-6 opacity-20" />
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Null Sector</h3>
                  <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">No personnel profiles detected in this frequency range.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Detail */}
          <div className="lg:col-span-5 xl:col-span-4">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-cavalier-card-dark border border-cyan-500/30 rounded-[32px] p-8 shadow-2xl sticky top-6 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck size={120} />
                  </div>

                  <div className="text-center mb-10 relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-cyan-500/20 -rotate-3 border-b-4 border-cyan-900 overflow-hidden">
                      <FaUserGraduate size={40} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{selectedMessage.name}</h3>
                    <p className="text-cyan-500 font-black uppercase tracking-widest text-[10px] mt-2">Clearance Status: {selectedMessage.status?.toUpperCase() || 'NEW'}</p>
                  </div>

                  <div className="space-y-6">
                    <ProfileField icon={<FaEnvelope />} label="Intelligence Link" value={selectedMessage.email} />
                    <ProfileField icon={<FaPhone />} label="Communication Frequency" value={selectedMessage.phone} />
                    <ProfileField icon={<FaBook />} label="Operational Specialty" value={selectedMessage.subject} />
                    <ProfileField icon={<ShieldCheck />} label="Merit Designation" value={selectedMessage.degree} />

                    <div className="pt-4">
                      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 italic">
                        <FileText size={12} className="text-cyan-500" />
                        Mission Manifesto
                      </label>
                      <div className="bg-cavalier-header-bg/50 rounded-2xl p-5 text-gray-300 text-sm font-medium border border-white/5 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar italic">
                        "{selectedMessage.message}"
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 opacity-50">
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Logged On</span>
                      <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="flex-1 bg-red-950/20 border border-red-500/20 text-red-500 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-900/10"
                    >
                      Terminate
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-1 bg-cyan-500 text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-all text-center flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 border-b-4 border-cyan-900"
                    >
                      <FaEnvelope size={12} />
                      Establish Link
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-cavalier-card-dark border border-white/5 rounded-[32px] p-8 flex flex-col items-center justify-center text-center opacity-40">
                  <ShieldCheck size={80} className="text-gray-700 mb-6" />
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Personnel Selection</h3>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-[200px]">Highlight a specific prospect to decrypt mission parameters.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.4); }
        `
      }} />
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="bg-cavalier-header-bg/30 border border-white/5 rounded-2xl p-4 group hover:border-cyan-500/20 transition-all">
    <div className="flex items-center gap-3 mb-1">
      <span className="text-cyan-500 text-xs">{icon}</span>
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-white font-black uppercase text-xs tracking-wider line-clamp-1">{value || 'NOT_DECLARED'}</div>
  </div>
);

export default ReceivedMessages;
