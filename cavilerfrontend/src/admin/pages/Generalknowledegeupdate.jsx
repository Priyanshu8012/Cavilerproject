import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaFilePdf, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const UploadPreviousPapers = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previousPapers, setPreviousPapers] = useState([]);

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  // Fetch existing uploaded files on mount
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setPreviousPapers(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedCourse || !year) {
      alert("Please fill all fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("course", selectedCourse);
    formData.append("year", year);
    formData.append("pdf", file);

    try {
      setIsUploading(true);
      const res = await axios.post(API_URL, formData);
      setPreviousPapers((prev) => [res.data, ...prev]);
      alert("PDF uploaded successfully!");
      setSelectedCourse("");
      setYear("");
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setPreviousPapers((prev) => prev.filter((paper) => paper.id !== id));
      alert("Deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed.");
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-10 pt-28">
      <div className="max-w-xl mx-auto bg-[#1B263B] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          Upload General Knowledge
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-[#293A5A] p-3 rounded text-white"
            >
              <option value="">-- Select --</option>
              <option value="iit-jee">IIT JEE</option>
              <option value="neet">NEET</option>
              <option value="foundation">FOUNDATION</option>
              <option value="board">BOARD</option>
              <option value="mht-cet">MHT CET</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg">Enter Year</label>
            <input
              type="number"
              placeholder="e.g. 2023"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-[#293A5A] p-3 rounded text-white"
              required
            />
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6">
            {file ? (
              <div className="text-center">
                <FaFilePdf size={40} className="text-red-500 mx-auto" />
                <p className="mt-2">{file.name}</p>
              </div>
            ) : (
              <>
                <FaCloudUploadAlt size={40} className="text-gray-400" />
                <p className="mt-2 text-gray-400">
                  Drag and drop or click to upload
                </p>
              </>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-4 text-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            disabled={isUploading}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload PDF"}
          </motion.button>
        </form>
      </div>

      {/* Uploaded Files List */}
      <div className="max-w-4xl mx-auto mt-12">
        <h3 className="text-2xl font-bold mb-4 text-orange-300">
          Uploaded General Knowledge Files
        </h3>
        <div className="space-y-4">
          {previousPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-[#1B263B] p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{formatCourse(paper.course)}</strong> - {paper.year}
                </p>
                <p className="text-sm text-gray-400">{paper.filename}</p>
              </div>
              <div className="flex gap-4 items-center">
                <a
                  href={`${import.meta.env.VITE_BASE_URL}${paper.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(paper.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPreviousPapers;

