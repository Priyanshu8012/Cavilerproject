import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaFilePdf, FaTrashAlt, FaHistory, FaFilter, FaBook } from "react-icons/fa";
import axios from "axios";

const NCRTBookUpdate = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [ncrtBooks, setNcrtBooks] = useState([]);
  const [uploadedData, setUploadedData] = useState(null);

  const API_URL = import.meta.env.VITE_BASE_URL;

  // Fetch NCRT books from the backend
  const fetchNCRTBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ncrt-books`);
      setNcrtBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchNCRTBooks();
  }, []);

  const formatCourse = (val) => {
    switch (val) {
      case "iit-jee": return "IIT JEE";
      case "neet": return "NEET";
      case "foundation": return "FOUNDATION";
      case "board": return "BOARD";
      case "mht-cet": return "MHT CET";
      default: return val;
    }
  };

  // Upload new book to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedCourse || !year) {
      alert("Please fill all fields and upload a PDF.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("course", selectedCourse);
    formData.append("year", year);

    try {
      const response = await axios.post(`${API_URL}/api/ncrt-books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedData(response.data);
      setNcrtBooks((prev) => [response.data, ...prev]);
      setSelectedCourse("");
      setYear("");
      setFile(null);
      alert("✅ NCRT Book Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("Failed to upload book.");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete book from backend
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${API_URL}/api/ncrt-books/${id}`);
      setNcrtBooks((prev) => prev.filter((book) => book.id !== id));
      alert("✅ Book Deleted Successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  // View the uploaded PDF
  const handleView = (fileUrl) => {
    window.open(`${API_URL}${fileUrl}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white p-6 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Upload Section */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-cavalier-card-dark border border-cavalier-header-bg p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cavalier-brand opacity-5 rotate-45 transform translate-x-12 -translate-y-12"></div>

              <h2 className="text-3xl font-black text-cavalier-brand mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <FaBook className="text-4xl" />
                Upload NCERT Books
              </h2>

              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-bold uppercase tracking-widest text-gray-400">Select Exam / Course</label>
                  <div className="relative">
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full bg-cavalier-header-bg/20 border border-cavalier-header-bg p-4 rounded-xl text-white appearance-none focus:outline-none focus:border-cavalier-brand transition-all font-medium"
                    >
                      <option value="" className="bg-cavalier-card-dark text-white">-- Select Course --</option>
                      <option value="iit-jee" className="bg-cavalier-card-dark text-white">IIT JEE</option>
                      <option value="neet" className="bg-cavalier-card-dark text-white">NEET</option>
                      <option value="foundation" className="bg-cavalier-card-dark text-white">FOUNDATION</option>
                      <option value="board" className="bg-cavalier-card-dark text-white">BOARD</option>
                      <option value="mht-cet" className="bg-cavalier-card-dark text-white">MHT CET</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cavalier-brand opacity-50">
                      <FaFilter />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold uppercase tracking-widest text-gray-400">Publication Year</label>
                  <input
                    type="number"
                    placeholder="e.g. 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-cavalier-header-bg/20 border border-cavalier-header-bg p-4 rounded-xl text-white focus:outline-none focus:border-cavalier-brand transition-all font-medium placeholder:opacity-30"
                    required
                  />
                </div>

                <div className="group relative">
                  <div className={`flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-cavalier-brand bg-cavalier-brand/5' : 'border-cavalier-header-bg bg-cavalier-header-bg/10'} rounded-2xl p-10 transition-all group-hover:border-cavalier-brand/50`}>
                    {file ? (
                      <div className="text-center">
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                          <FaFilePdf size={60} className="text-cavalier-brand mx-auto mb-4" />
                        </motion.div>
                        <p className="font-bold text-white truncate max-w-full">{file.name}</p>
                        <p className="text-xs text-cavalier-brand uppercase mt-1">Ready for deploy</p>
                      </div>
                    ) : (
                      <>
                        <FaCloudUploadAlt size={60} className="text-gray-500 mb-4 group-hover:text-cavalier-brand transition-colors duration-300" />
                        <p className="text-gray-400 font-medium">Select PDF resource file</p>
                        <p className="text-xs text-gray-600 mt-2">Maximum size: 50MB</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isUploading}
                  type="submit"
                  className={`w-full ${isUploading ? 'bg-gray-600' : 'bg-cavalier-brand'} text-cavalier-bg py-5 rounded-xl font-black uppercase tracking-widest shadow-xl hover:shadow-cavalier-brand/20 transition-all flex items-center justify-center gap-3`}
                >
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-cavalier-bg/30 border-t-cavalier-bg rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-xl" />
                      Deploy Book
                    </>
                  )}
                </motion.button>
              </form>

              {uploadedData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-cavalier-header-bg/20 rounded-xl border border-cavalier-brand/30 ring-1 ring-cavalier-brand/10 shadow-inner"
                >
                  <h3 className="text-sm font-bold text-cavalier-brand uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cavalier-brand rounded-full animate-pulse"></div>
                    Deployment Successful
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Course</span>
                      <span className="font-bold">{formatCourse(uploadedData.course)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Year</span>
                      <span className="font-bold">{uploadedData.year}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* History Section */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                  <FaHistory className="text-cavalier-brand" />
                  Mission History
                </h3>
                <span className="px-3 py-1 bg-cavalier-header-bg/30 rounded-full text-xs font-bold text-gray-400 border border-white/5">
                  {ncrtBooks.length} Total Resources
                </span>
              </div>

              <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                {ncrtBooks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-cavalier-card-dark/30 rounded-2xl border border-dashed border-cavalier-header-bg">
                    <p className="text-gray-500 font-bold uppercase tracking-widest">No deployments found</p>
                  </div>
                ) : (
                  ncrtBooks.map((book) => (
                    <motion.div
                      layout
                      key={book.id}
                      className="group bg-cavalier-card-dark/60 border border-cavalier-header-bg/50 hover:border-cavalier-brand/30 p-5 rounded-2xl flex justify-between items-center transition-all hover:bg-cavalier-card-dark"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cavalier-brand/10 flex items-center justify-center text-cavalier-brand group-hover:bg-cavalier-brand group-hover:text-cavalier-bg transition-colors duration-300">
                          <FaFilePdf size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-cavalier-brand uppercase tracking-tighter">{formatCourse(book.course)}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-xs font-bold text-gray-400">{book.year}</span>
                          </div>
                          <p className="text-sm font-bold text-white mt-1 group-hover:text-cavalier-brand transition-colors line-clamp-1">{book.filename}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(book.file_url)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-cavalier-header-bg/30 text-gray-400 hover:text-cavalier-brand hover:bg-cavalier-brand/10 transition-all border border-white/5"
                          title="View"
                        >
                          <FaFilePdf />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-900/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/20 transition-all border border-red-900/10"
                          title="Terminate"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NCRTBookUpdate;

