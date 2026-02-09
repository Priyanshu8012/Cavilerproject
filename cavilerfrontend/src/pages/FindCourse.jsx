import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const classes = [
  "All Classes", "Repeater", "Class 12 Science", "Class 12 Science (PCM)",
  "Class 12 Science (PCB)", "Class 12 Commerce", "Class 11 Science (PCM)",
  "Class 11 Science (PCB)", "Class 11 Commerce", "Class 10",
];

const boardOptions = {
  "All Classes": ["All Boards"],
  "Repeater": ["All Boards"],
  "Class 12 Science": ["All Boards"],
  // "Class 3": ["All Boards"],
  // "Class 4": ["All Boards"],
  // "Class 5": ["All Boards"],
  "Class 12 Science (PCM)": ["All Boards", "CBSE"],
  "Class 12 Science (PCB)": ["All Boards", "CBSE"],
  "Class 11 Science (PCM)": ["All Boards", "CBSE"],
  "Class 11 Science (PCB)": ["All Boards", "CBSE"],
  "Class 12 Commerce": ["CBSE"],
  "Class 11 Commerce": ["CBSE"],
  "Class 7": ["ICSE", "CBSE"],
  "Class 6": ["ICSE", "CBSE"],
  "Class 10": ["Maharashtra Board", "All Boards", "ICSE", "CBSE"],
  "Class 9": ["Maharashtra Board", "All Boards", "ICSE", "CBSE"],
  "Class 8": ["Maharashtra Board", "All Boards", "ICSE", "CBSE"]
};

const FindCourse = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8  md:w-2/3 lg:w-1/2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
          Let&apos;s find the best course for you
        </h2>
        <p className="text-gray-600 font-semibold mt-4">Select Class</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {classes.map((className) => (
            <button
              key={className}
              className={`px-4 py-2 text-sm border rounded-lg transition-all duration-200 ease-in-out ${
                selectedClass === className
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedClass(className);
                setSelectedBoard(null);
              }}
            >
              {className}
            </button>
          ))}
        </div>
        {selectedClass && boardOptions[selectedClass] && (
          <div className="mt-4">
            <p className="text-gray-600 font-semibold">Select Board</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {boardOptions[selectedClass].map((board) => (
                <button
                  key={board}
                  className={`px-4 py-2 text-sm border rounded-lg transition-all duration-200 ease-in-out ${
                    selectedBoard === board
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedBoard(board)}
                >
                  {board}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            className="bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedClass || (boardOptions[selectedClass] && !selectedBoard)}
            onClick={() => navigate("/courses")}
          >
            View course
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindCourse;

