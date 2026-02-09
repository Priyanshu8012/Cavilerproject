import React, { useState, useEffect } from "react";
import { FaImage, FaSave, FaTrash, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
// Toast Component
const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <FaCheck className="text-green-400" />,
    error: <FaTimes className="text-red-400" />,
    warning: <FaExclamationTriangle className="text-yellow-400" />,
  };

  const styles = {
    success: "border-green-500 bg-green-500 bg-opacity-10",
    error: "border-red-500 bg-red-500 bg-opacity-10",
    warning: "border-yellow-500 bg-yellow-500 bg-opacity-10",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border-l-4 ${styles[type]} backdrop-blur-sm animate-slideInRight`}>
      {icons[type]}
      <span className="flex-1 text-white font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <FaTimes />
      </button>
    </div>
  );
};

const UpdateBanner = () => {
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [savedBanners, setSavedBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/banners`);
        if (response.data) {
          setSavedBanners(response.data);
        }
      } catch (err) {
        addToast("Communication failed. Backend link broken.", "error");
      }
    };
    fetchBanners();
  }, []);

  const addToast = (message, type = "error") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast("Invalid intelligence format. Upload images only.", "warning");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        addToast("Payload exceeds 5MB limit.", "warning");
        return;
      }

      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!bannerText.trim()) {
      addToast("Designate banner objective text", "warning");
      return;
    }

    if (!bannerImage) {
      addToast("Select reconnaissance visual", "warning");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("text", bannerText.trim());
    formData.append("images", bannerImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/banners`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setSavedBanners(prev => [response.data.banner, ...prev]);
        addToast("Banner deployed to frontline!", "success");
        setBannerText("");
        setBannerImage(null);
        setPreview(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Deployment failed. Request backup.";
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this visual directive?")) return;

    setLoading(true);

    try {
      await axios.delete(`${API_BASE_URL}/api/banners/${id}`);
      setSavedBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== id));
      addToast("Banner decommissioned.", "success");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Decommissioning failed.";
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-cavalier-bg text-white px-6 py-8 relative overflow-hidden font-sans">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 w-80">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cavalier-brand/30 bg-cavalier-brand/5 text-cavalier-brand text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          Visual Reconnaissance
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
          Banner <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Directives</span>
        </h1>
        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Operational Command Hub</p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

        {/* Left Column - Creation Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Creation Card */}
          <div className="bg-cavalier-card-dark rounded-2xl p-8 border border-cavalier-header-bg shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cavalier-brand opacity-5 rotate-45 transform translate-x-12 -translate-y-12"></div>

            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter italic">
              <div className="w-2 h-6 bg-cavalier-brand rounded-full"></div>
              Initialize Payload
            </h2>

            {/* Banner Preview */}
            <div className="mb-8 p-1 bg-cavalier-header-bg/50 rounded-2xl">
              <div className="w-full h-56 bg-cavalier-bg rounded-xl flex items-center justify-center shadow-inner border border-white/5 relative overflow-hidden group/preview pointer-events-none">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover transition-transform duration-700 bg-cavalier-bg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </>
                ) : (
                  <div className="text-center text-gray-700">
                    <FaImage className="text-5xl mb-3 mx-auto opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Visual Feedback Pending</p>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-cavalier-brand/10 backdrop-blur-md border border-cavalier-brand/20 px-4 py-2 rounded-lg text-lg font-black text-white uppercase tracking-tight shadow-2xl inline-block">
                    {bannerText || "Directive text will manifest here"}
                  </div>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
              <label className="flex flex-col gap-2 cursor-pointer group">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 italic">Tactical Visual Asset</span>
                <div className="flex items-center gap-4 px-5 py-4 bg-cavalier-header-bg/20 rounded-xl border border-white/5 group-hover:border-cavalier-brand/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-cavalier-brand/10 rounded-lg flex items-center justify-center text-cavalier-brand group-hover:bg-cavalier-brand group-hover:text-cavalier-bg transition-colors">
                    <FaImage />
                  </div>
                  <span className="text-sm font-bold text-gray-400 flex-1 truncate">
                    {bannerImage ? bannerImage.name : "Select JPG / PNG Directive"}
                  </span>
                  <span className="text-[10px] font-black uppercase text-cavalier-brand tracking-widest">Browse</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                </div>
              </label>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 italic">Directive Announcement</label>
                <input
                  type="text"
                  placeholder="Enter strategic message..."
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  disabled={loading}
                  className="w-full p-5 rounded-xl bg-cavalier-header-bg/20 border border-white/5 text-white placeholder-gray-700 focus:border-cavalier-brand outline-none transition-all duration-300 font-bold"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={loading || !bannerText.trim() || !bannerImage}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-cavalier-brand text-cavalier-bg rounded-xl font-black uppercase text-sm tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
              >
                <FaSave className="text-xl" />
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-cavalier-bg/30 border-t-cavalier-bg rounded-full animate-spin"></div>
                    Deploying...
                  </div>
                ) : (
                  "Deploy Directive"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Saved Banners */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-cavalier-card-dark rounded-2xl p-8 border border-cavalier-header-bg shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter italic">
                <div className="w-2 h-6 bg-yellow-600 rounded-full"></div>
                Active Frontline Log
              </h2>
              <span className="px-3 py-1 bg-cavalier-header-bg text-[10px] font-black text-cavalier-brand rounded-full border border-cavalier-brand/20">
                {savedBanners.length} UNITS
              </span>
            </div>

            {savedBanners.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-20">
                <FaImage className="text-6xl mb-4" />
                <p className="font-black uppercase tracking-[0.3em]">No Active Directives</p>
                <p className="text-[10px] mt-2">Frontline is currently clear</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pr-4">
                {savedBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-cavalier-bg/50 border border-white/5 rounded-2xl p-5 flex justify-between items-center group hover:bg-cavalier-brand/5 hover:border-cavalier-brand/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-white/5 bg-black/40">
                        <img
                          src={banner.image_url.startsWith("http") ? banner.image_url : `${API_BASE_URL}${banner.image_url}`}
                          alt={banner.text}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/120x80/1a1a1a/c19d4b?text=OFFLINE";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-black text-white uppercase tracking-tight truncate group-hover:text-cavalier-brand transition-colors" title={banner.text}>
                          {banner.text}
                        </p>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Status: Active Deployment</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      disabled={loading}
                      className="w-12 h-12 flex items-center justify-center text-red-950/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300 disabled:opacity-20 border border-transparent hover:border-red-500/20"
                      title="Decommission"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
      `}} />
    </div>
  );
};

export default UpdateBanner;
