import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Mail, User, Phone, MessageSquare, Calendar, Search, FileText, Shield, Terminal } from "lucide-react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch messages
  const fetchMessages = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setFilteredMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const filtered = messages.filter(msg =>
      msg.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  // Safe date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return "Date Error";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Time";
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Time formatting error:', error);
      return "Time Error";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date/Time";
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('DateTime formatting error:', error);
      return "Date/Time Error";
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to terminate this communication record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }
      } else {
        console.error("Failed to delete message");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-4 md:p-6 pt-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-cavalier-brand mb-2">
              <Shield className="w-6 h-6 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Secure Comm Link</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Communications <span className="text-cavalier-brand">Log</span>
            </h1>
            <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
              <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                <Terminal className="w-3 h-3 text-cavalier-brand" />
                Active Intel: {filteredMessages.length}
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Academy Defence Network</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-cavalier-brand transition-colors" />
            <input
              type="text"
              placeholder="Search incoming intel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-cavalier-card-dark/50 border border-cavalier-header-bg rounded-xl focus:outline-none focus:border-cavalier-brand transition-all font-bold placeholder:text-gray-600 shadow-2xl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
              <div className="w-1 h-1 bg-cavalier-brand rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-cavalier-brand/60 rounded-full animate-ping delay-100"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto rounded-2xl border border-cavalier-header-bg shadow-2xl overflow-hidden bg-cavalier-card-dark/30 backdrop-blur-sm"
      >
        <div className="overflow-auto max-h-[70vh] custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-cavalier-card-dark/95 backdrop-blur-md z-20 border-b border-cavalier-header-bg">
              <tr>
                <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cavalier-brand" />
                    Originator
                  </div>
                </th>
                <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cavalier-brand" />
                    Comm Address
                  </div>
                </th>
                <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-cavalier-brand" />
                    Intel Summary
                  </div>
                </th>
                <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cavalier-brand" />
                    Timestamp
                  </div>
                </th>
                <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cavalier-header-bg/30">
              <AnimatePresence>
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg, index) => (
                    <motion.tr
                      key={msg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      onClick={() => openMessageModal(msg)}
                      className="group hover:bg-cavalier-brand/[0.03] cursor-pointer transition-all duration-200"
                    >
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-cavalier-brand/10 border border-cavalier-brand/20 rounded-xl flex items-center justify-center font-black text-cavalier-brand text-lg group-hover:bg-cavalier-brand group-hover:text-cavalier-bg transition-all duration-300">
                            {msg.first_name?.[0]}{msg.last_name?.[0]}
                          </div>
                          <div>
                            <div className="font-black text-white uppercase tracking-tight group-hover:text-cavalier-brand transition-colors">
                              {msg.first_name} {msg.last_name}
                            </div>
                            {msg.phone && (
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase mt-0.5">
                                <Phone className="w-2.5 h-2.5" />
                                {msg.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-8 hidden lg:table-cell">
                        <div className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{msg.email}</div>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-black text-cavalier-brand uppercase tracking-tighter truncate max-w-[200px]">
                            {msg.subject || "NO CLASSIFIED SUBJECT"}
                          </span>
                          <span className="text-sm text-gray-500 font-medium line-clamp-1 max-w-[300px]">
                            {msg.message}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-8 hidden md:table-cell">
                        <div className="text-xs font-black text-white uppercase">{formatDate(msg.createdAt)}</div>
                        <div className="text-[10px] font-bold text-gray-600 uppercase mt-0.5 tracking-tighter">{formatTime(msg.createdAt)}</div>
                      </td>
                      <td className="py-5 px-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-cavalier-header-bg/20 text-cavalier-brand/50 hover:text-cavalier-brand hover:bg-cavalier-brand/10 transition-all border border-white/5">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(msg.id, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-900/10 text-red-500/30 hover:text-red-500 hover:bg-red-500/20 transition-all border border-red-900/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-32 text-center">
                      <div className="flex flex-col items-center justify-center opacity-20">
                        <Shield className="w-24 h-24 mb-6 text-gray-500" />
                        <h4 className="text-2xl font-black uppercase tracking-widest text-gray-400">No Intelligence Data</h4>
                        <p className="font-bold text-gray-500 mt-2">Standing by for incoming communications...</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cavalier-bg/90 backdrop-blur-md flex items-center justify-center p-4 z-[999]"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cavalier-card-dark border border-cavalier-header-bg max-w-2xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pattern Overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cavalier-brand opacity-[0.03] rotate-45 transform translate-x-32 -translate-y-32"></div>

              {/* Modal Header */}
              <div className="p-8 border-b border-cavalier-header-bg bg-cavalier-header-bg/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-cavalier-brand rounded-2xl flex items-center justify-center font-black text-cavalier-bg text-3xl shadow-lg border-b-4 border-cavalier-brand/50">
                    {selectedMessage.first_name?.[0]}{selectedMessage.last_name?.[0]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                      {selectedMessage.first_name} <span className="text-cavalier-brand">{selectedMessage.last_name}</span>
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-cavalier-brand" />
                        {selectedMessage.email}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 self-start md:self-center"
                >
                  <span className="font-bold">ESC</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cavalier-bg/50 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-cavalier-brand uppercase tracking-widest block mb-1">Signal Origin</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {selectedMessage.phone || "STATIONARY LINE"}
                    </div>
                  </div>
                  <div className="bg-cavalier-bg/50 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-cavalier-brand uppercase tracking-widest block mb-1">Interception Time</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {formatDateTime(selectedMessage.createdAt)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-cavalier-brand rounded-full"></div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Classification / Subject</h3>
                  </div>
                  <div className="bg-cavalier-bg/80 border-l-4 border-cavalier-brand p-5 rounded-r-2xl">
                    <p className="text-lg font-black text-white uppercase tracking-tight">
                      {selectedMessage.subject || "NO SUBJECT CLASSIFIED"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-cavalier-brand rounded-full"></div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Intel Transcript</h3>
                  </div>
                  <div className="bg-cavalier-bg/80 p-6 rounded-2xl border border-white/5 shadow-inner">
                    <p className="text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-cavalier-header-bg bg-cavalier-header-bg/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Record Authenticated
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleDelete(selectedMessage.id, e)}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 border-b-4 border-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                  Terminate Intel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBA24B;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #A07D35;
        }
      `}} />
    </div>
  );
};

export default MessagesPage;

