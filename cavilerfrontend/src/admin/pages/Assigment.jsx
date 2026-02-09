import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Book,
  Trophy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  Eye,
  Shield,
  Target,
  Zap,
  ChevronRight,
  ClipboardList,
  AlertTriangle,
  Info
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const categories = ["NDA", "CDS", "AFCAT", "Engineering", "Medical", "Board", "Scholarship"];
const statuses = ["Upcoming", "Approaching", "Registration Open", "Completed"];
const priorities = ["High", "Medium", "Low"];

export default function ExamDashboard() {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    status: "All",
    priority: "All"
  });
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalExams: 0,
    upcomingExams: 0,
    highPriorityExams: 0,
    uniqueCategories: 0
  });

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    category: "NDA",
    status: "Upcoming",
    priority: "Medium",
    students: "",
    registrationDeadline: "",
    syllabus: "",
    fee: "",
    website: ""
  });

  const fetchExams = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (filters.category !== 'All') params.append('category', filters.category);
      if (filters.status !== 'All') params.append('status', filters.status);
      if (filters.priority !== 'All') params.append('priority', filters.priority);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await fetch(`${API_BASE_URL}/api/exams?${params}`);
      if (!response.ok) throw new Error('Failed to fetch exams');

      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/exams/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchStats();
  }, [searchTerm, filters, sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExam = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add exam');

      await fetchExams();
      setIsAddingNew(false);
      resetForm();
      fetchStats();
      alert('Mission Logged Successfully!');
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('Deployment Failed. Check Signal.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateExam = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/exams/${editingExam.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update exam');

      await fetchExams();
      setEditingExam(null);
      resetForm();
      alert('Mission Parameters Updated.');
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Update Aborted.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to decommission this mission?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/exams/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete mission');

      setExams(prev => prev.filter(exam => exam.id !== id));
      fetchStats();
      alert('Mission Decommissioned.');
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      date: exam.date.split('T')[0],
      description: exam.description,
      category: exam.category,
      status: exam.status,
      priority: exam.priority,
      students: exam.students,
      registrationDeadline: exam.registrationDeadline.split('T')[0],
      syllabus: exam.syllabus,
      fee: exam.fee,
      website: exam.website
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      description: "",
      category: "NDA",
      status: "Upcoming",
      priority: "Medium",
      students: "",
      registrationDeadline: "",
      syllabus: "",
      fee: "",
      website: ""
    });
    setEditingExam(null);
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High": return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
      case "Medium": return { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" };
      case "Low": return { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
      default: return { color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      "Upcoming": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Approaching": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "Registration Open": "bg-green-500/10 text-green-500 border-green-500/20",
      "Completed": "bg-gray-500/10 text-gray-500 border-gray-500/20"
    };
    return (
      <span className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase tracking-widest ${config[status] || ""}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-6 pt-28">
      <div className="max-w-7xl mx-auto">

        {/* Tactical Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-cavalier-brand mb-2">
                <Shield className="w-6 h-6 animate-pulse" />
                <span className="text-sm font-black uppercase tracking-[0.3em]">Operational Logistics</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                Exam <span className="text-cavalier-brand">Intelligence</span>
              </h1>
              <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
                <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                  <Target className="w-3 h-3 text-cavalier-brand" />
                  Total Objectives: {stats.totalExams}
                </span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>Tier 1 Tactical Planning</span>
              </div>
            </div>

            {!isAddingNew && !editingExam && (
              <button
                onClick={() => setIsAddingNew(true)}
                className="bg-cavalier-brand text-cavalier-bg px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 border-b-4 border-cavalier-brand/50"
              >
                <Plus className="w-5 h-5" />
                Initiate Mission
              </button>
            )}
          </div>
        </motion.div>

        {/* Intelligence Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="SCAN MISSION DATABASE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-cavalier-card-dark border border-cavalier-header-bg p-4 rounded-xl text-xs font-black tracking-widest text-white placeholder-gray-700 focus:outline-none focus:border-cavalier-brand/50 pl-12"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-cavalier-card-dark border border-cavalier-header-bg p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none"
              >
                <option value="All">All Sectors</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cavalier-card-dark border border-cavalier-header-bg p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none"
              >
                <option value="date">Sort by Timeline</option>
                <option value="name">Sort by Designation</option>
                <option value="priority">Sort by Threat</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="bg-cavalier-card-dark/40 border border-cavalier-header-bg/30 p-4 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Upcoming</span>
              <span className="text-2xl font-black text-blue-500">{stats.upcomingExams}</span>
            </div>
            <div className="bg-cavalier-card-dark/40 border border-cavalier-header-bg/30 p-4 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">High Threat</span>
              <span className="text-2xl font-black text-red-500">{stats.highPriorityExams}</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <AnimatePresence>
          {(isAddingNew || editingExam) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <div className="bg-cavalier-card-dark border border-cavalier-header-bg p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-cavalier-brand uppercase tracking-tighter flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    {editingExam ? "Mission Modification" : "Mission Deployment"}
                  </h2>
                  <button onClick={resetForm} className="text-gray-500 hover:text-white font-black">CANCEL PROTOCOL</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField label="Operational Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. NDA PHASE 1" />
                  <InputField label="Mission Date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
                  <InputField label="Cadet Loadout" name="students" value={formData.students} onChange={handleInputChange} placeholder="e.g. 15,000+" />

                  <SelectField label="Mission Sector" name="category" value={formData.category} onChange={handleInputChange} options={categories} />
                  <SelectField label="Status Protocol" name="status" value={formData.status} onChange={handleInputChange} options={statuses} />
                  <SelectField label="Threat Level" name="priority" value={formData.priority} onChange={handleInputChange} options={priorities} />

                  <InputField label="Deadline Alpha" name="registrationDeadline" type="date" value={formData.registrationDeadline} onChange={handleInputChange} />
                  <InputField label="Logistics Fee" name="fee" value={formData.fee} onChange={handleInputChange} placeholder="₹ 0.00" />
                  <InputField label="Direct Intel Link" name="website" type="url" value={formData.website} onChange={handleInputChange} placeholder="https://..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <TextAreaField label="Mission Parameters" name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief objective of this examination..." />
                  <TextAreaField label="Operational Syllabus" name="syllabus" value={formData.syllabus} onChange={handleInputChange} placeholder="Covered tactical domains..." />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={editingExam ? handleUpdateExam : handleAddExam}
                    disabled={submitting}
                    className="bg-cavalier-brand text-cavalier-bg px-12 py-4 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-3"
                  >
                    {submitting ? "Processing..." : "Commit Mission"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam, index) => {
            const priority = getPriorityConfig(exam.priority);
            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-cavalier-card-dark/60 border border-cavalier-header-bg/50 rounded-2xl p-6 group hover:bg-cavalier-card-dark transition-all relative overflow-hidden"
              >
                {/* Threat Indicator */}
                <div className={`absolute top-0 right-0 w-16 h-16 ${priority.bg} opacity-10 rotate-45 transform translate-x-8 -translate-y-8`}></div>

                <div className="flex justify-between items-start mb-6">
                  <div className={`px-2 py-1 rounded ${priority.bg} ${priority.color} border ${priority.border} text-[8px] font-black uppercase tracking-[0.2em]`}>
                    {exam.priority} Priority
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditExam(exam)} className="p-2 bg-cavalier-header-bg/20 rounded-lg text-gray-500 hover:text-cavalier-brand transition-colors"><Edit size={14} /></button>
                    <button onClick={() => handleDeleteExam(exam.id)} className="p-2 bg-red-900/10 rounded-lg text-gray-700 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-cavalier-brand transition-colors">{exam.name}</h3>
                <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-1.5"><Calendar size={12} className="text-cavalier-brand/50" /> {formatDate(exam.date)}</div>
                  <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                  <div className="flex items-center gap-1.5"><Shield size={12} className="text-cavalier-brand/50" /> {exam.category}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Enlisted Cadets</span>
                    <span className="text-xs font-black text-white">{exam.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Status Protocol</span>
                    {getStatusBadge(exam.status)}
                  </div>
                </div>

                <button
                  onClick={() => window.open(exam.website, '_blank')}
                  className="w-full bg-white/5 border border-white/5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-cavalier-brand hover:text-cavalier-bg transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Intel Report <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Intelligence */}
        {exams.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-32 bg-cavalier-card-dark/20 rounded-3xl border-2 border-dashed border-cavalier-header-bg">
            <ClipboardList className="w-20 h-20 text-gray-800 mb-6" />
            <h3 className="text-2xl font-black text-gray-700 uppercase tracking-widest">No Missions Logged</h3>
            <p className="text-gray-600 font-bold uppercase text-[10px] mt-2">ยืนยัน standing by for primary deployment...</p>
          </div>
        )}

      </div>
    </div>
  );
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">{label}</label>
    <input
      {...props}
      className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-bold text-sm"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">{label}</label>
    <select
      {...props}
      className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-bold text-xs tracking-widest uppercase"
    >
      {options.map(opt => <option key={opt} value={opt} className="bg-cavalier-card-dark">{opt}</option>)}
    </select>
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 block">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full bg-cavalier-bg/30 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand font-medium text-sm resize-none"
    />
  </div>
);
