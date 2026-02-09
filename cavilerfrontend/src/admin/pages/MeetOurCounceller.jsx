import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserTie,
  FaGraduationCap,
  FaAward,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTerminal,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
  FaInfoCircle
} from "react-icons/fa";
import {
  Activity,
  ShieldCheck,
  UserPlus,
  FileText,
  X,
  ChevronRight,
  Search,
  Users,
  Briefcase,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const Counselors = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    qualification: "",
    experience: "",
    bio: "",
    email: "",
    phone: "",
    specialties: "",
    photo: null,
  });

  const parseSpecialties = (specialties) => {
    if (!specialties) return [];
    try {
      const parsed = JSON.parse(specialties);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return specialties.split(",").map((s) => s.trim());
    }
  };

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/counselors`);
      const data = await res.json();

      setCounselors(
        data.map((c) => ({
          ...c,
          id: c.id || c.counselor_id || c._id,
          specialties: parseSpecialties(c.specialties),
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, photo: e.target.files[0] });

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      qualification: "",
      experience: "",
      bio: "",
      email: "",
      phone: "",
      specialties: "",
      photo: null,
    });
    setEditingCounselor(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "specialties") {
          fd.append(
            key,
            JSON.stringify(value.split(",").map((s) => s.trim()))
          );
        } else if (value) fd.append(key, value);
      });

      const url = editingCounselor
        ? `${API_BASE_URL}/api/counselors/${editingCounselor.id}`
        : `${API_BASE_URL}/api/counselors`;

      const method = editingCounselor ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Mission Failure: Failed to update specialist profile.");

      await fetchCounselors();
      resetForm();
      alert(`Advisor profile ${editingCounselor ? "updated" : "deployed"} successfully!`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (c) => {
    setEditingCounselor(c);
    setFormData({
      name: c.name,
      designation: c.designation,
      qualification: c.qualification,
      experience: c.experience?.toString() || "",
      bio: c.bio || "",
      email: c.email || "",
      phone: c.phone || "",
      specialties: Array.isArray(c.specialties)
        ? c.specialties.join(", ")
        : "",
      photo: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("Error: Invalid advisor ID");
    if (!window.confirm("Confirm permanent termination of this specialist profile?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/counselors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Mission Failure: Termination directive rejected.");

      await fetchCounselors();
      alert("Advisor profile decommissioned successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "https://via.placeholder.com/300x300/111827/10b981?text=PERSONNEL";
    if (photoPath.startsWith("http")) return photoPath;
    return `${API_BASE_URL}${photoPath.startsWith('/') ? photoPath : '/' + photoPath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cavalier-bg flex items-center justify-center p-6">
        <div className="text-center">
          <Activity className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-6" />
          <p className="text-emerald-500 font-black uppercase tracking-[0.3em] font-mono animate-pulse">Requesting Advisor Intel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 selection:bg-emerald-500 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]"></div>
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
            <div className="flex items-center gap-2 text-emerald-500 mb-3">
              <Users className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Specialist Personnel Link</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Operational <span className="text-emerald-500">Advisors</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
              <FaTerminal className="text-emerald-500" />
              Strategic Deployment of Human Capital & Psych-Intel Assets
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.4)] transition-all"
          >
            <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Enlist Advisor
          </motion.button>
        </motion.div>

        {/* Modal Form */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetForm}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-cavalier-card-dark border border-emerald-500/30 rounded-[32px] p-8 md:p-10 w-full max-w-3xl shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck size={120} className="text-emerald-500" />
                </div>

                <div className="flex justify-between items-center mb-10 relative">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                      {editingCounselor ? 'Modify Specialist Intel' : 'New Personnel Deployment'}
                    </h2>
                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Classification Level: Top Secret</p>
                  </div>
                  <button onClick={resetForm} className="text-gray-500 hover:text-emerald-500 p-2 transition-colors">
                    <X size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <FormInput label="Personnel Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="E.G. COL. STEVE ROGERS" />
                  <FormInput label="Tactical Designation" name="designation" value={formData.designation} onChange={handleInputChange} placeholder="E.G. SENIOR ADVISOR" />
                  <FormInput label="Merit Credentials" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="E.G. PHD TACTICAL PSYCH" />
                  <FormInput label="Combat Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleInputChange} placeholder="00" />
                  <FormInput label="Intelligence Link (Email)" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="COMMAND@DOMAIN.COM" />
                  <FormInput label="Secure Freq (Phone)" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXXXXXXX" />

                  <div className="md:col-span-2">
                    <FormInput label="Service Specialties (Comma Separated)" name="specialties" value={formData.specialties} onChange={handleInputChange} placeholder="TACTICS, STRATEGY, INTEL..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic mb-2 block">Personnel Narrative (Bio)</label>
                    <textarea
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="ENTER MISSION BACKGROUND..."
                      className="w-full bg-cavalier-header-bg/30 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all font-bold placeholder-gray-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic mb-2 block">Operational Visual Capture (Photo)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full bg-cavalier-header-bg/30 border border-white/5 rounded-2xl px-5 py-4 text-white file:bg-emerald-500 file:border-none file:text-black file:font-black file:uppercase file:px-4 file:py-1 file:rounded-lg file:mr-4 file:cursor-pointer"
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-500 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 border-b-4 border-emerald-900"
                    >
                      {editingCounselor ? 'Update Record' : 'Deploy Advisor'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                    >
                      Abort Protocol
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {counselors.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-cavalier-card-dark border border-white/5 rounded-[32px] p-6 hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20 group-hover:rotate-3 transition-transform">
                    <img
                      src={getImageUrl(c.photo)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt={c.name}
                    />
                  </div>
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-emerald-500 text-black px-3 py-1 rounded-lg border-4 border-cavalier-card-dark shadow-xl">
                    <FaShieldAlt size={12} />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-emerald-500 transition-colors">{c.name}</h3>
                  <p className="text-emerald-500/80 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{c.designation}</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-4 line-clamp-1">{c.qualification}</p>
                </div>

                <div className="flex items-center justify-between mt-6 px-4">
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                    <FaAward className="text-emerald-500 text-[10px]" />
                    <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest leading-none">{c.experience}Y EXP</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-emerald-500/50 hover:text-white hover:bg-emerald-500 transition-all border border-white/5"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-900/10 text-red-500/30 hover:text-white hover:bg-red-500 transition-all border border-red-900/10"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>

                {/* Specialties Chips */}
                {c.specialties && c.specialties.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                    {c.specialties.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="text-[7px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-400">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {counselors.length === 0 && !loading && (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
            <Users size={80} className="mx-auto mb-6 text-gray-700" />
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Null Asset Base</h3>
            <p className="text-gray-600 font-bold uppercase text-xs tracking-[0.3em]">Operational Consultants standby for enlistment.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.4); }
        `
      }} />
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-cavalier-header-bg/30 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all font-bold placeholder-gray-700 ring-0 focus:ring-4 focus:ring-emerald-500/10"
    />
  </div>
);

export default Counselors;

