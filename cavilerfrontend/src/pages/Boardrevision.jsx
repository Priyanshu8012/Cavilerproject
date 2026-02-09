import React, { useEffect, useState } from "react";
import { FileText, Download, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BoardPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BASE_URL}/api/revision-notes`);
        
        const boardOnly = response.data
          .filter(
            (paper) =>
              paper.course &&
              paper.course.toLowerCase() === "board" &&
              paper.file_url
          )
          .map((paper) => ({
            ...paper,
            url: `${BASE_URL}${paper.file_url.replace(/\\/g, "/")}`,
            title: paper.title || `Revision Notes ${paper.year || ''}`.trim(),
          }));
        
        setPapers(boardOnly);
      } catch (err) {
        console.error("Error fetching Board papers:", err);
        setError("Failed to load revision notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleDownload = async (paper, e) => {
    // Optional: Add download tracking or additional logic
    console.log('Downloading:', paper.title);
    // The download will proceed normally via the browser
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading revision notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
          Revision Notes
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Download or view Revision Notes in PDF format to help your preparation.
        </p>

        {papers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No revision notes available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-500">
              Showing {papers.length} revision note{papers.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {paper.title}
                    </h3>
                  </div>
                  
                  {paper.year && (
                    <div className="text-sm text-gray-500 mb-4">
                      Year: {paper.year}
                    </div>
                  )}
                  
                  <div className="mt-auto flex gap-3">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-orange-500 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition text-center"
                    >
                      <FileText className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={paper.url}
                      download={`${paper.title.replace(/\s+/g, '_')}.pdf`}
                      onClick={(e) => handleDownload(paper, e)}
                      className="flex-1 border border-orange-500 text-orange-500 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition text-center"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
