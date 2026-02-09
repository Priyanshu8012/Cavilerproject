import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

export default function OurOfferingsEbooks() {
  const { title } = useParams(); // Extract title from URL
  const [searchParams] = useSearchParams();
  const selectedClass = searchParams.get("class"); // Get class from query params

  const [ebooks, setEbooks] = useState([]);

  // Format title for better readability
  function formatTitle(title) {
    return decodeURIComponent(title)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Dummy eBooks data per class
  useEffect(() => {
    const ebooksData = {
      "Class 12": [
        { name: "Advanced Mathematics", pdfUrl: "#" },
        { name: "Physics Problem Solving Guide", pdfUrl: "#" },
        { name: "Organic Chemistry Handbook", pdfUrl: "#" },
        { name: "Biology Notes for NEET", pdfUrl: "#" },
      ],
      "Class 11": [
        { name: "Algebra and Trigonometry", pdfUrl: "#" },
        { name: "Modern Physics Explained", pdfUrl: "#" },
        { name: "Inorganic Chemistry Guide", pdfUrl: "#" },
      ],
      "Class 10": [
        { name: "Mathematics Formula Handbook", pdfUrl: "#" },
        { name: "Science Lab Manual", pdfUrl: "#" },
      ],
      "Class 9": [
        { name: "Physics Basics", pdfUrl: "#" },
        { name: "Fundamentals of Chemistry", pdfUrl: "#" },
      ],
      "Class 8": [
        { name: "Understanding Algebra", pdfUrl: "#" },
        { name: "History of India", pdfUrl: "#" },
      ],
      "Class 7": [
        { name: "Science Made Easy", pdfUrl: "#" },
        { name: "World Geography", pdfUrl: "#" },
      ],
      "Class 6": [
        { name: "Basic Mathematics", pdfUrl: "#" },
        { name: "Environmental Science", pdfUrl: "#" },
      ],
      "Class 1 - 5": [
        { name: "Fun with Numbers", pdfUrl: "#" },
        { name: "Storytelling for Kids", pdfUrl: "#" },
      ],
      "LKG - UKG": [
        { name: "Alphabet Learning", pdfUrl: "#" },
        { name: "Basic Counting", pdfUrl: "#" },
      ],
    };

    setEbooks(ebooksData[selectedClass] || []);
  }, [title, selectedClass]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        📚 {formatTitle(title)} for {selectedClass}
      </h1>

      <p className="mt-2 text-gray-600">
        {selectedClass
          ? `Here you'll find all eBooks related to ${selectedClass}.`
          : "Please select a class to view related eBooks."}
      </p>

      {/* Ebooks List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {ebooks.length > 0 ? (
          ebooks.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {book.name}
                </h2>
                <p className="text-gray-500 text-sm">PDF</p>
              </div>
              <a
                href={book.pdfUrl}
                download
                className="text-orange-500 hover:text-orange-700 text-xl"
              >
                <FaDownload />
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No eBooks available.</p>
        )}
      </div>
    </div>
  );
}
