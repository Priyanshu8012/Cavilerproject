import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Loader,
  Shield,
  Activity,
  Terminal,
  Trophy
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const TimeTableAdmin = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    date: '',
    time: '',
    duration: '',
    venue: '',
    type: 'Theory',
    status: 'upcoming'
  });

  // Fetch exams from backend
  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/timetables`);
      if (!response.ok) throw new Error('Failed to fetch exams');
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      const savedExams = localStorage.getItem('examTimetable');
      if (savedExams) {
        setExams(JSON.parse(savedExams));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      code: '',
      date: '',
      time: '',
      duration: '',
      venue: '',
      type: 'Theory',
      status: 'upcoming'
    });
    setEditingExam(null);
    setIsAdding(false);
  };

  const handleAddExam = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timetables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add exam');

      const result = await response.json();
      setExams(prev => [...prev, result.timetable]);
      resetForm();
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('Failed to deploy mission schedule.');
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam.id);
    setFormData(exam);
    setIsAdding(true);
  };

  const handleUpdateExam = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timetables/${editingExam}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update exam');

      const result = await response.json();
      setExams(prev =>
        prev.map(exam =>
          exam.id === editingExam ? result.timetable : exam
        )
      );
      resetForm();
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update mission parameters.');
    }
  };

  const handleDeleteExam = async (id) => {
    if (!window.confirm('Confirm deletion of this deployment directive?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/timetables/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete exam');

      setExams(prev => prev.filter(exam => exam.id !== id));
    } catch (error) {
      console.error('Error deleting exam:', error);
      alert('Failed to terminate mission record.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingExam) {
      await handleUpdateExam();
    } else {
      await handleAddExam();
    }
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cavalier-brand selection:text-black">
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
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-cavalier-brand mb-3">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Mission Timeline Control</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Deployment <span className="text-cavalier-brand">Schedules</span>
            </h1>
            <div className="mt-4 flex items-center gap-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
              <span className="flex items-center gap-1.5 bg-cavalier-header-bg/30 px-3 py-1 rounded border border-white/5">
                <Terminal className="w-3 h-3 text-cavalier-brand" />
                Active Directives: {exams.length}
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Cadet Assessment Protocol</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { resetForm(); setIsAdding(true); }}
            className="group flex items-center gap-3 bg-cavalier-brand text-cavalier-bg px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] transition-all"
          >
            <Plus className="w-5 h-5" />
            Initialize New Mission
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="lg:col-span-4"
              >
                <div className="bg-cavalier-card-dark rounded-3xl p-8 border border-cavalier-header-bg shadow-2xl sticky top-28 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cavalier-brand opacity-[0.03] rotate-45 transform translate-x-12 -translate-y-12"></div>

                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                      <div className="w-2 h-6 bg-cavalier-brand rounded-full"></div>
                      {editingExam ? 'Modify Mission' : 'New Strategic Entry'}
                    </h3>
                    <button
                      onClick={resetForm}
                      className="text-gray-600 hover:text-cavalier-brand transition-colors p-2"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operation Objective (Subject)</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="E.G. ADVANCED TACTICS"
                        className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Designation ID</label>
                        <input
                          type="text"
                          name="code"
                          value={formData.code}
                          onChange={handleInputChange}
                          required
                          placeholder="CODE-7X"
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Launch Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold appearance-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Time Window</label>
                        <input
                          type="text"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          placeholder="0900 - 1200 HRS"
                          required
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Mission Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="3 HOURS"
                          required
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Operation Site (Venue)</label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                        placeholder="BASE SECTOR 4"
                        className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Mission Type</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold cursor-pointer"
                        >
                          <option value="Theory" className="bg-gray-900">STRATEGIC THEORY</option>
                          <option value="Practical" className="bg-gray-900">FIELD OPS (PRACTICAL)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic block">Directive Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full bg-cavalier-header-bg/20 border border-white/5 rounded-xl px-4 py-4 text-white focus:border-cavalier-brand outline-none transition-all font-bold cursor-pointer"
                        >
                          <option value="upcoming" className="bg-gray-900">IN PREPARATION</option>
                          <option value="completed" className="bg-gray-900">MISSION COMPLETED</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-3 bg-cavalier-brand text-cavalier-bg py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-cavalier-brand/20 transition-all border-b-4 border-yellow-800"
                      >
                        <Save className="h-4 w-4" />
                        {editingExam ? 'Confirm Change' : 'Authorize Launch'}
                      </motion.button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all"
                      >
                        Abort
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List Section */}
          <div className={`${isAdding ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <div className="bg-cavalier-card-dark rounded-3xl border border-cavalier-header-bg shadow-2xl overflow-hidden flex flex-col h-full min-h-[600px]">
              <div className="p-6 bg-cavalier-header-bg/20 border-b border-cavalier-header-bg/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                  <Shield className="w-4 h-4 text-cavalier-brand" />
                  Verified Mission Manifest
                </h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-40">
                    <Loader className="h-12 w-12 text-cavalier-brand animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Synchronizing Timelines...</p>
                  </div>
                ) : exams.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-40 opacity-20">
                    <Trophy className="h-20 w-20 mb-6" />
                    <p className="font-black uppercase tracking-[0.3em]">No Missions Assigned</p>
                    <button
                      onClick={() => setIsAdding(true)}
                      className="mt-6 text-cavalier-brand hover:underline font-black uppercase text-xs tracking-widest"
                    >
                      Authorize First Mission
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                    {exams.map((exam, idx) => (
                      <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-cavalier-bg/50 border border-white/5 rounded-2xl p-6 hover:bg-cavalier-brand/[0.03] hover:border-cavalier-brand/30 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Status Accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${exam.status === 'upcoming' ? 'bg-cavalier-brand' : 'bg-green-500'
                          }`}></div>

                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-cavalier-brand transition-colors">
                              {exam.subject}
                            </h4>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Ref: {exam.code}</p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditExam(exam)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-cavalier-header-bg/20 text-cavalier-brand/50 hover:text-white hover:bg-cavalier-brand transition-all border border-white/5"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExam(exam.id)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-900/10 text-red-500/30 hover:text-white hover:bg-red-500 transition-all border border-red-900/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-blue-500">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              {new Date(exam.date).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-green-500">
                              <Clock className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">{exam.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-red-500">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest truncate">{exam.venue}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-tighter ${exam.status === 'upcoming'
                              ? 'bg-cavalier-brand/10 text-cavalier-brand border-cavalier-brand/20'
                              : 'bg-green-500/10 text-green-500 border-green-500/20'
                              }`}>
                              {exam.status === 'upcoming' ? 'PREPARING' : 'COMPLETED'}
                            </div>
                          </div>
                        </div>

                        {/* Mission Type Indicator */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{exam.type}</span>
                          <div className="flex items-center gap-1 group-hover:gap-2 transition-all">
                            <div className="w-1 h-1 rounded-full bg-cavalier-brand/30"></div>
                            <div className="w-3 h-1 rounded-full bg-cavalier-brand/30"></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
      `}} />
    </div>
  );
};

export default TimeTableAdmin;
