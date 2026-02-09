import React, { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BoardPapers() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/ncrt-books`)
      .then((res) => {
        const boardOnly = res.data
          .filter(
            (paper) =>
              paper.course &&
              paper.course.toLowerCase() === "board" &&
              paper.file_url
          )
          .map((paper) => ({
            ...paper,
            url: `${BASE_URL}${paper.file_url.replace(/\\/g, "/")}`,
          }));
        setPapers(boardOnly);
      })
      .catch((err) => console.error("Error fetching NCERT books:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
          NCERT BOOK
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Download or view NCERT BOOK in PDF format to help your preparation.
        </p>

        {papers.length === 0 ? (
          <p className="text-center text-gray-500">No NCERT BOOK found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {paper.title || `NCERT BOOK ${paper.year}`}
                  </h3>
                </div>
                <div className="mt-auto flex gap-3">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
                  >
                    <FileText className="w-4 h-4" />
                    View
                  </a>
                  <a
                    href={paper.url}
                    download
                    className="border border-orange-500 text-orange-500 text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-100 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

