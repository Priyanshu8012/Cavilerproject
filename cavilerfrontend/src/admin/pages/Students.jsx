import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileSpreadsheet,
  ShieldCheck,
  Calendar,
  ClipboardList,
  User,
  Mail,
  Phone,
  BookOpen,
  Trash2,
  ChevronRight,
  Database,
  Shield,
  Fingerprint
} from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";

// Fetch the API URL from the environment variable
const API_URL = import.meta.env.VITE_BASE_URL;

const EnrollmentDetailsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/enrollments`);
        setEnrollments(response.data);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter((enrollment) =>
    enrollment.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enrollment.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enrollment.course?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadExcel = () => {
    const dataToExport = filteredEnrollments.map(enrollment => ({
      "Cadet Name": enrollment.fullName,
      "Email Address": enrollment.email,
      "Phone Number": enrollment.phone,
      "Assigned Program": enrollment.course,
      "Enrollment Date": new Date(enrollment.enrollmentDate).toLocaleDateString(),
      "Mission Status": enrollment.status,
      "Personnel Notes": enrollment.notes,
      "Record Created": new Date(enrollment.createdAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personnel_Roster");
    XLSX.writeFile(workbook, "Cavalier_Personnel_Roster.xlsx");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "PENDING REVIEW" },
      confirmed: { color: "bg-green-500/10 text-green-500 border-green-500/20", label: "ACTIVE DUTY" },
      rejected: { color: "bg-red-500/10 text-red-500 border-red-500/20", label: "DECOMMISSIONED" }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded border text-[10px] font-black uppercase tracking-widest ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to purge this record from central intelligence?")) return;

    try {
      await axios.delete(`${API_URL}/api/enrollments/${id}`);
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      setSelectedEnrollment(null);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to purge personnel record.");
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-cavalier-bg text-cavalier-brand">
        <ShieldCheck className="w-16 h-16 animate-pulse mb-4" />
        <div className="font-black uppercase tracking-[0.4em] text-sm">Synchronizing Roster...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-6 pt-28">
      <div className="max-w-7xl mx-auto">

        {/* Header Protocol */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 text-cavalier-brand mb-2">
              <Database className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Personnel Management</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Cadet <span className="text-cavalier-brand">Personnel Roster</span>
            </h1>
            <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
              <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                <User className="w-3 h-3 text-cavalier-brand" />
                Total Operatives: {enrollments.length}
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Security Level: Command Authorization Required</span>
            </div>
          </div>

          <button
            onClick={downloadExcel}
            className="group flex items-center gap-2 bg-cavalier-brand text-cavalier-bg px-6 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Extract Personnel Data
          </button>
        </motion.div>

        {/* Global Intelligence Search */}
        <div className="relative mb-10 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="FILTER PERSONNEL BY NAME, EMAIL, OR MISSION ASSIGNMENT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cavalier-card-dark border border-cavalier-header-bg p-5 rounded-2xl text-xs font-black tracking-widest text-cavalier-brand placeholder-gray-700 focus:outline-none focus:border-cavalier-brand/50 pl-14 transition-all"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] text-gray-800 font-black">
            <Fingerprint className="w-3 h-3" />
            ACTIVE AUTH
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Personnel Feed */}
          <div className="lg:col-span-8">
            <div className="bg-cavalier-card-dark/40 border border-cavalier-header-bg/50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-cavalier-header-bg/20 border-b border-cavalier-header-bg/50 flex items-center justify-between">
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <ClipboardList className="w-3 h-3" />
                  Verified Operatives List
                </h2>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                </div>
              </div>

              <div className="max-h-[700px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredEnrollments.length > 0 ? (
                    filteredEnrollments.map((enrollment, index) => (
                      <motion.div
                        key={enrollment.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedEnrollment(enrollment)}
                        className={`p-5 border-b border-cavalier-header-bg/30 hover:bg-cavalier-brand/5 transition-all cursor-pointer group relative overflow-hidden ${selectedEnrollment?.id === enrollment.id ? 'bg-cavalier-brand/10 border-l-4 border-l-cavalier-brand' : ''
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedEnrollment?.id === enrollment.id ? 'bg-cavalier-brand text-cavalier-bg' : 'bg-cavalier-bg text-gray-600 group-hover:bg-cavalier-header-bg/50'
                              }`}>
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-black text-white uppercase tracking-tight text-lg leading-none mb-1 group-hover:text-cavalier-brand transition-colors">
                                {enrollment.fullName}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                                <Mail className="w-3 h-3" />
                                {enrollment.email}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(enrollment.status)}
                        </div>

                        <div className="grid grid-cols-2 mt-4 gap-6">
                          <div className="flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 text-cavalier-brand/40" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">COURSE: {enrollment.course}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-cavalier-brand/40" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DATE: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-5 h-5 text-cavalier-brand" />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 opacity-20">
                      <Shield className="w-20 h-20 mb-4" />
                      <p className="font-black uppercase tracking-[0.3em]">No Intel Found</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Detailed Intelligence Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-cavalier-card-dark border border-cavalier-header-bg rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
                <div className="p-4 bg-cavalier-header-bg/40 border-b border-cavalier-header-bg/50">
                  <h2 className="text-[10px] font-black text-cavalier-brand uppercase tracking-widest flex items-center gap-2">
                    <Fingerprint className="w-3 h-3" />
                    Personnel File Breakdown
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  {selectedEnrollment ? (
                    <motion.div
                      key={selectedEnrollment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-8 flex-1"
                    >
                      <div className="text-center mb-10">
                        <div className="relative inline-block mb-4">
                          <div className="w-24 h-24 bg-cavalier-bg border-4 border-cavalier-brand rounded-2xl flex items-center justify-center text-cavalier-brand">
                            <User className="w-12 h-12" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-cavalier-brand text-cavalier-bg p-1.5 rounded-lg border-2 border-cavalier-bg">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                          {selectedEnrollment.fullName}
                        </h3>
                        <p className="text-cavalier-brand font-black uppercase text-[10px] tracking-[0.2em]">
                          UNIT: {selectedEnrollment.course}
                        </p>
                      </div>

                      <div className="space-y-5">
                        <PersonnelDetail
                          icon={<Mail className="w-4 h-4" />}
                          label="SECURE EMAIL"
                          value={selectedEnrollment.email}
                        />
                        <PersonnelDetail
                          icon={<Phone className="w-4 h-4" />}
                          label="COMM LINK"
                          value={selectedEnrollment.phone}
                        />
                        <PersonnelDetail
                          icon={<BookOpen className="w-4 h-4" />}
                          label="MISSION ASSIGNMENT"
                          value={selectedEnrollment.course}
                        />
                        <PersonnelDetail
                          icon={<Calendar className="w-4 h-4" />}
                          label="ENLISTMENT DATE"
                          value={new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}
                        />

                        {selectedEnrollment.notes && (
                          <div className="pt-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                              <ClipboardList className="w-3 h-3" />
                              OPERATIONAL NOTES
                            </label>
                            <div className="bg-cavalier-bg/50 border border-cavalier-header-bg/50 rounded-xl p-4 text-xs font-medium text-gray-400 leading-relaxed italic">
                              "{selectedEnrollment.notes}"
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 mt-10 pt-8 border-t border-cavalier-header-bg/30">
                        <button
                          onClick={() => handleDelete(selectedEnrollment.id)}
                          className="flex-1 bg-red-950/20 text-red-500 border border-red-900/30 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          PURGE RECORD
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
                      <User className="w-16 h-16 text-gray-800 mb-6" />
                      <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Awaiting Selection</h3>
                      <p className="text-[10px] text-gray-800 font-bold uppercase tracking-widest">SCAN THE ROSTER TO VIEW FULL PERSONNEL INTEL</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Tactical detail sub-component
const PersonnelDetail = ({ icon, label, value }) => (
  <div className="group">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <div className="text-xs font-black text-white bg-cavalier-bg border border-cavalier-header-bg/50 rounded-xl px-4 py-3 group-hover:border-cavalier-brand/30 transition-all tracking-wide">
      {value}
    </div>
  </div>
);

export default EnrollmentDetailsPage;

