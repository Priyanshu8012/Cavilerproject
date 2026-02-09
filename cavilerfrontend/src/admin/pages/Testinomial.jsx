import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaUserEdit, FaTrash, FaPlus, FaAward, FaTerminal, FaShieldAlt, FaComments } from 'react-icons/fa';
import { Activity, ShieldCheck, Video, Quote, X, MessageSquareQuote } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TestimonialUpdate() {
    const [testimonial, setTestimonial] = useState({
        youtubeLink: "",
        candidateName: "",
        ranking: "",
        year: "",
        description: ""
    });

    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching force feedback:', error.message || error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestimonial(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/testimonials`, testimonial);
            setTestimonial({ youtubeLink: "", candidateName: "", ranking: "", year: "", description: "" });
            fetchTestimonials();
            setIsAdding(false);
        } catch (error) {
            console.error('Error submitting testimony:', error.message || error);
            alert('Mission Failure: Failed to archive testimony.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Confirm permanent deletion of this cadet testimony?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/testimonials/${id}`);
            fetchTestimonials();
        } catch (error) {
            console.error('Error terminating testimony:', error.message || error);
            alert('Mission Failure: Termination protocol failed.');
        }
    };

    const getEmbedUrl = (link) => {
        if (!link) return "";
        let videoId = '';
        if (link.includes('youtube.com/watch?v=')) {
            videoId = link.split('v=')[1];
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition);
        }
        else if (link.includes('youtu.be/')) {
            videoId = link.split('youtu.be/')[1];
            const questionMarkPosition = videoId.indexOf('?');
            if (questionMarkPosition !== -1) videoId = videoId.substring(0, questionMarkPosition);
        }
        else if (link.includes('youtube.com/embed/')) {
            videoId = link.split('embed/')[1];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    };

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
                            <FaComments className="w-5 h-5 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Mission Debrief Monitoring</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
                            Cadet <span className="text-cavalier-brand">Testimonies</span>
                        </h1>
                        <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                            <FaTerminal className="text-cavalier-brand" />
                            Force Feedback & Strategic Performance Reviews
                        </p>
                    </div>

                    {!isAdding && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsAdding(true)}
                            className="group flex items-center gap-3 bg-cavalier-brand text-black px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all"
                        >
                            <FaPlus className="w-5 h-5" />
                            Authorize Testimony
                        </motion.button>
                    )}
                </motion.div>

                {/* Insertion Modal */}
                <AnimatePresence>
                    {isAdding && (
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
                                            Archive Force Feedback
                                        </h2>
                                    </div>
                                    <button onClick={() => setIsAdding(false)} className="p-2 text-gray-500 hover:text-cavalier-brand transition-colors">
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Intelligence Visual Source (YouTube Link)</label>
                                                <div className="relative">
                                                    <FaYoutube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xl" />
                                                    <input
                                                        type="text"
                                                        name="youtubeLink"
                                                        value={testimonial.youtubeLink}
                                                        onChange={handleChange}
                                                        placeholder="HTTPS://YOUTUBE.COM/WATCH?V=..."
                                                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Personnel Designation</label>
                                                    <input
                                                        type="text"
                                                        name="candidateName"
                                                        value={testimonial.candidateName}
                                                        onChange={handleChange}
                                                        placeholder="FULL NAME"
                                                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none font-bold uppercase"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Deployment Batch</label>
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        value={testimonial.year}
                                                        onChange={handleChange}
                                                        placeholder="E.G. CLASS OF 2024"
                                                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none font-bold uppercase"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Combat Merit / Score Card</label>
                                                <input
                                                    type="text"
                                                    name="ranking"
                                                    value={testimonial.ranking}
                                                    onChange={handleChange}
                                                    placeholder="AIR 123 / SCORE 98%"
                                                    className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none font-bold uppercase"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2 h-full flex flex-col">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Mission Memoir (Description)</label>
                                                <textarea
                                                    name="description"
                                                    value={testimonial.description}
                                                    onChange={handleChange}
                                                    placeholder="ENTER DETAILED PERSONNEL FEEDBACK..."
                                                    className="w-full flex-grow bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none resize-none transition-all font-bold"
                                                    rows="6"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center gap-3 bg-cavalier-brand text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-cavalier-brand/20 transition-all border-b-4 border-yellow-800"
                                        >
                                            {isLoading ? <Activity className="animate-spin w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                            Commit Testimony
                                        </motion.button>
                                        <button
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                                        >
                                            Abort Mission
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Testimonies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <AnimatePresence>
                        {testimonials.map((item, idx) => {
                            const embedUrl = getEmbedUrl(item.youtubeLink);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative bg-cavalier-card-dark border border-white/5 rounded-[40px] p-8 shadow-2xl hover:border-cavalier-brand/30 transition-all duration-500 flex flex-col"
                                >
                                    {/* Action Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-cavalier-brand/10 border border-cavalier-brand/20 text-cavalier-brand px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <FaAward />
                                            Record #{idx + 1}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-3 bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/10"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>

                                    {/* Video Section */}
                                    {embedUrl ? (
                                        <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-lg group-hover:border-cavalier-brand/20 transition-all">
                                            <iframe
                                                className="absolute inset-0 w-full h-full"
                                                src={embedUrl}
                                                title={item.candidateName}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-cavalier-header-bg/30 rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center mb-6">
                                            <Video className="text-gray-700 w-12 h-12 mb-2" />
                                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Visual Data Missing</p>
                                        </div>
                                    )}

                                    {/* Personnel Info */}
                                    <div className="space-y-6 flex-grow">
                                        <div className="flex items-end justify-between border-b border-white/5 pb-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{item.candidateName}</h3>
                                                <p className="text-cavalier-brand text-[10px] font-black uppercase tracking-widest mt-2">{item.year}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Merit Status</span>
                                                <span className="bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">{item.ranking}</span>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <MessageSquareQuote className="absolute -left-2 -top-2 w-8 h-8 text-white/5" />
                                            <p className="text-gray-400 text-sm font-medium leading-relaxed italic pl-6 relative z-10">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Verification Footer */}
                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Verified Integrity</span>
                                        </div>
                                        <ShieldCheck className="text-cavalier-brand w-4 h-4" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {testimonials.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 bg-cavalier-card-dark border-2 border-dashed border-white/5 rounded-[40px]"
                    >
                        <Quote className="text-6xl text-gray-700 mb-6 mx-auto opacity-20" />
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">No Memoirs Found</h3>
                        <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">Awaiting personnel mission debriefs...</p>
                    </motion.div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
                `
            }} />
        </div>
    );
}
