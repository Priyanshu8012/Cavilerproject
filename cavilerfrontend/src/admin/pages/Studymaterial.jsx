import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaFilePdf, FaEye, FaTerminal, FaShieldAlt, FaBookOpen } from 'react-icons/fa';
import { Activity, ShieldCheck, FileText, Upload, X, ChevronRight, HardDrive } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function StudyMaterialUpload() {
    const [file, setFile] = useState(null);
    const [pdfList, setPdfList] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchPDFs();
    }, []);

    const fetchPDFs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/study-materials`);
            setPdfList(response.data.map(pdf => ({
                ...pdf,
                file_path: pdf.file_path.startsWith('/') ? pdf.file_path : `/${pdf.file_path}`
            })));
        } catch (error) {
            console.error('Error fetching intelligence dossiers:', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setMessage('');
        } else {
            setMessage('PROTOCOL ERROR: Invalid file format detected. Requires .PDF dossier.');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title.trim()) {
            setMessage('INTELLIGENCE GAP: Title and PDF dossier are mandatory for archival.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/study-material-upload`, formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setMessage(`ARCHIVING DATA... ${percentage}%`);
                    }
                },
            });

            setPdfList([...pdfList, { title, file_path: response.data.file_path }]);
            setMessage('ARCHIVE SUCCESS: Intelligence dossier committed to repository.');
            setFile(null);
            setTitle('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'MISSION FAILURE: Archival protocol interrupted.');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const openPDF = (url) => {
        if (!url) {
            setMessage('ERROR: Invalid dossier link.');
            return;
        }
        const fullPath = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
        window.open(fullPath, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 selection:bg-purple-500 selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
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
                        <div className="flex items-center gap-2 text-purple-500 mb-3">
                            <HardDrive className="w-5 h-5 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Archive Access Terminal</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
                            Intelligence <span className="text-purple-500">Dossiers</span>
                        </h1>
                        <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                            <FaTerminal className="text-purple-500" />
                            Archiving Field Manuals & Operational Training Assets
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Archival Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-12 xl:col-span-5"
                    >
                        <div className="bg-cavalier-card-dark border border-purple-500/30 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Upload size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-10 relative">
                                <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                    Commit New Dossier
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8 relative">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Archive Designation (Title)</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="E.G. TACTICAL PHYSICS MODULE 01"
                                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-purple-500 outline-none transition-all font-bold uppercase ring-0 focus:ring-4 focus:ring-purple-500/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Intelligence Asset (PDF Only)</label>
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className={`w-full aspect-[16/6] bg-cavalier-header-bg/30 border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10' : 'border-white/10 hover:border-purple-500/50'
                                            }`}
                                    >
                                        <FaCloudUploadAlt className={`text-4xl mb-2 ${file ? 'text-purple-500' : 'text-gray-700'}`} />
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-4">
                                            {file ? file.name : "Establish Dossier Link (Drag & Drop)"}
                                        </p>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-600/20 transition-all border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-3"
                                >
                                    {loading ? <Activity className="animate-spin w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                    Archive Dossier
                                </button>
                            </form>

                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mt-8 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border ${message.includes('SUCCESS')
                                                ? 'bg-green-500/10 border-green-500/30 text-green-500'
                                                : 'bg-red-500/10 border-red-500/30 text-red-500'
                                            }`}
                                    >
                                        {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Asset Repository List */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="bg-cavalier-card-dark border border-white/5 rounded-[32px] p-8 shadow-2xl h-full flex flex-col">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                        Asset Repository
                                    </h2>
                                </div>
                                <div className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/5">
                                    Archives: {pdfList.length}
                                </div>
                            </div>

                            <div className="flex-grow max-h-[600px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                <AnimatePresence>
                                    {pdfList.length === 0 ? (
                                        <div className="text-center py-20 opacity-40">
                                            <HardDrive size={60} className="mx-auto mb-4 text-gray-700" />
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">No Intelligence Records Stored.</p>
                                        </div>
                                    ) : (
                                        pdfList.map((pdf, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="group relative bg-cavalier-header-bg/20 border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all hover:border-purple-500/20"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-black transition-all">
                                                        <FaFilePdf size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-purple-500 transition-colors">
                                                            {pdf.title}
                                                        </h4>
                                                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-1">
                                                            SECURE_DOSSIER_ID: {index + 101}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => openPDF(pdf.file_path)}
                                                    className="flex items-center gap-2 bg-white/5 hover:bg-purple-500 hover:text-black px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border border-white/5 group-hover:border-purple-500/30"
                                                >
                                                    <FaEye />
                                                    Decrypt PDF
                                                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-30">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Secure Link Active</span>
                                </div>
                                <ShieldCheck size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.4); }
                `
            }} />
        </div>
    );
}

