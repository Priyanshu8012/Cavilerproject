import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserShield, FaGraduationCap, FaMedal, FaUpload, FaSave, FaTrash, FaEdit, FaAward, FaTerminal, FaShieldAlt, FaChevronRight } from "react-icons/fa";
import { Activity, ShieldCheck, UserPlus, X } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function ProfileUpdate() {
  const [profile, setProfile] = useState({
    name: "",
    post: "",
    education: "",
    experience: "",
    achievements: "",
    specialization: "",
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/profiles`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching staff roster:", error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
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
      setProfile({ ...profile, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!profile.name || !profile.post || !profile.education || !profile.experience) {
      alert("Intelligence Incomplete: Required fields are missing.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("post", profile.post);
    formData.append("education", profile.education);
    formData.append("experience", profile.experience);
    formData.append("achievements", profile.achievements);
    formData.append("specialization", profile.specialization);
    if (profile.photo) {
      formData.append("photo", profile.photo);
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/profiles/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/api/profiles`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchProfiles();
    } catch (error) {
      console.error("Error committing profile:", error);
      alert("Mission Failure: Failed to update staff roster.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (profileData) => {
    setProfile({
      name: profileData.name,
      post: profileData.post,
      education: profileData.education,
      experience: profileData.experience,
      achievements: profileData.achievements || "",
      specialization: profileData.specialization || "",
      photo: null
    });
    setEditingId(profileData.id);
    setPreview(profileData.photo ? `${API_URL}${profileData.photo}` : null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProfile = async (id) => {
    if (!window.confirm("Confirm decommissioning of this staff officer?")) return;

    try {
      await axios.delete(`${API_URL}/api/profiles/${id}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error decommissioning profile:", error);
      alert("Mission Failure: Decommissioning protocol failed.");
    }
  };

  const resetForm = () => {
    setProfile({
      name: "",
      post: "",
      education: "",
      experience: "",
      achievements: "",
      specialization: "",
      photo: null
    });
    setPreview(null);
    setEditingId(null);
    setIsAdding(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 font-sans selection:bg-cavalier-brand selection:text-black">
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
              <FaShieldAlt className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Operations Personnel Control</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Officer <span className="text-cavalier-brand">Roster</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
              <FaTerminal className="text-cavalier-brand" />
              Strategic Command Profile Management Interface
            </p>
          </div>

          {!isAdding && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(true)}
              className="group flex items-center gap-3 bg-cavalier-brand text-cavalier-bg px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] transition-all"
            >
              <UserPlus className="w-5 h-5 text-black" />
              Commission Officer
            </motion.button>
          )}
        </motion.div>

        {/* Commissioning Form Modal */}
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
                      {editingId ? 'Modify Commission' : 'New Personnel Authorization'}
                    </h2>
                  </div>
                  <button onClick={resetForm} className="p-2 text-gray-500 hover:text-cavalier-brand transition-colors">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                  {/* Visual ID Upload */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[24px] border-2 border-dashed border-cavalier-brand/30 bg-cavalier-header-bg/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-cavalier-brand/60">
                        {preview ? (
                          <img src={preview} alt="Visual ID" className="w-full h-full object-cover" />
                        ) : (
                          <FaUserShield className="text-4xl text-gray-700" />
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer">
                            <FaUpload className="text-2xl text-cavalier-brand" />
                            <input ref={fileInputRef} type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </div>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mt-3 text-center">Visual ID Identification</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Officer Designation</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="ENTER FULL NAME"
                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Rank / Position</label>
                      <input
                        type="text"
                        name="post"
                        value={profile.post}
                        onChange={handleChange}
                        placeholder="E.G. CHIEF OF ACADEMICS"
                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Educational Qualifications</label>
                      <input
                        type="text"
                        name="education"
                        value={profile.education}
                        onChange={handleChange}
                        placeholder="E.G. PHD TACTICAL OPERATIONS"
                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Field Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={profile.experience}
                        onChange={handleChange}
                        placeholder="E.G. 15+ YEARS IN DEFENCE"
                        className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Strategic Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={profile.specialization}
                      onChange={handleChange}
                      placeholder="E.G. QUANTUM PHYSICS / BALLISTICS"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operational Merits / Achievements</label>
                    <textarea
                      name="achievements"
                      value={profile.achievements}
                      onChange={handleChange}
                      placeholder="ENTER DISTINGUISHED SERVICE RECORDS AND AWARDS..."
                      rows="3"
                      className="w-full bg-cavalier-header-bg/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cavalier-brand outline-none resize-none transition-all font-bold"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-3 bg-cavalier-brand text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-cavalier-brand/20 transition-all border-b-4 border-yellow-800"
                    >
                      {loading ? <Activity className="animate-spin w-4 h-4" /> : <SaveIcon className="w-4 h-4" />}
                      {editingId ? 'Modify Commission' : 'Authorize Officer'}
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

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {profiles.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-cavalier-card-dark border border-white/5 rounded-[40px] overflow-hidden shadow-2xl hover:border-cavalier-brand/30 transition-all duration-500"
              >
                {/* Tactical Backdrop */}
                <div className="h-32 bg-gradient-to-br from-cavalier-brand/20 to-transparent"></div>

                {/* Admin Actions */}
                <div className="absolute top-6 right-6 flex gap-2 z-20">
                  <button onClick={() => handleEdit(p)} className="p-3 bg-black/40 backdrop-blur-md rounded-xl text-cavalier-brand hover:bg-cavalier-brand hover:text-black transition-all border border-white/5">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => handleDeleteProfile(p.id)} className="p-3 bg-black/40 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-white/5">
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className="px-8 pb-10 -mt-16 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 rounded-[32px] border-4 border-cavalier-bg overflow-hidden bg-cavalier-header-bg shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <img
                        src={p.photo ? `${API_URL}${p.photo}` : 'https://www.transparenttextures.com/patterns/carbon-fibre.png'}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-cavalier-brand text-black p-2 rounded-xl shadow-lg">
                      <ShieldCheck size={18} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1 leading-none">{p.name}</h3>
                  <div className="inline-block px-3 py-1 bg-cavalier-brand/10 border border-cavalier-brand/20 rounded-lg mb-6">
                    <span className="text-[10px] font-black text-cavalier-brand uppercase tracking-widest italic">{p.post}</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-left bg-black/20 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-cavalier-header-bg/30 flex items-center justify-center shrink-0">
                        <FaGraduationCap className="text-cavalier-brand" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Education</p>
                        <p className="text-xs font-bold text-gray-300 uppercase truncate">{p.education}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-left bg-black/20 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-cavalier-header-bg/30 flex items-center justify-center shrink-0">
                        <FaMedal className="text-yellow-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Deployment Record</p>
                        <p className="text-xs font-bold text-gray-300 uppercase truncate">{p.experience} Experience</p>
                      </div>
                    </div>
                  </div>

                  {p.specialization && (
                    <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-cavalier-header-bg/30 border border-white/5 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest italic">
                        {p.specialization}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Intelligence Alert */}
        {profiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-cavalier-card-dark border-2 border-dashed border-white/5 rounded-[40px]"
          >
            <div className="w-24 h-24 bg-cavalier-header-bg/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUserShield className="text-4xl text-gray-700" />
            </div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">No Commissioned Personnel</h3>
            <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">Awaiting officer commissioning directives...</p>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
      `}} />
    </div>
  );
}

const SaveIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
