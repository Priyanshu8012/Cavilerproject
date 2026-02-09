import React, { useEffect, useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BoardPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/sample-papers`);
        const boardOnly = res.data
          .filter(
            (paper) =>
              paper.course &&
              paper.course.toLowerCase() === "board" &&
              paper.url
          )
          .map((paper) => ({
            ...paper,
            // Fix URL construction
            viewUrl: paper.url.startsWith('http') 
              ? paper.url 
              : `${BASE_URL}${paper.url.startsWith('/') ? '' : '/'}${paper.url}`,
            downloadUrl: paper.url.startsWith('http')
              ? paper.url
              : `${BASE_URL}${paper.url.startsWith('/') ? '' : '/'}${paper.url}?download=true`,
            title: `Sample Paper (${paper.year})`
          }));
        setPapers(boardOnly);
      } catch (err) {
        console.error("Error fetching Board papers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleDownload = async (paper) => {
    try {
      const response = await fetch(paper.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `Board-Sample-Paper-${paper.year}-${paper.filename || 'paper'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(paper.viewUrl, '_blank');
    }
  };

  const handleView = (paper) => {
    window.open(paper.viewUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sample papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Sample Papers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access and download Board exam sample papers for classes 10th and 12th.
            Practice with these papers to improve your exam preparation.
          </p>
        </div>

        {papers.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No sample papers available yet.</p>
            <p className="text-gray-400">Check back later for updated papers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Board {paper.year}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Sample Paper
                    </p>
                    {paper.fileSize && (
                      <p className="text-xs text-gray-400 mt-1">
                        {Math.round(paper.fileSize / 1024 / 1024 * 100) / 100} MB
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleView(paper)}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors duration-200 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(paper)}
                    className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors duration-200 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            Having trouble viewing or downloading PDFs?
          </h3>
          <ul className="text-orange-700 text-sm space-y-1">
            <li>• Make sure you have a PDF reader installed (Adobe Acrobat, Chrome PDF viewer, etc.)</li>
            <li>• Check your internet connection</li>
            <li>• Try using a different browser</li>
            <li>• For mobile devices, use the "View" option first</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
