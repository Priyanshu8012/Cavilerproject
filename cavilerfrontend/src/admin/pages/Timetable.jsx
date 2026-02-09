import React, { useState, useEffect } from "react";
import axios from "axios";

const TimeTableUpdate = () => {
  const [timetable, setTimetable] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/timetable`)
      .then(response => setTimetable(response.data))
      .catch(error => console.error("Error fetching timetable:", error));
  }, [API_URL]);

  const handleUpdate = (index, field, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[index][field] = value;
    setTimetable(updatedTimetable);
  };

  const handleSave = () => {
    axios.put(`${API_URL}/api/timetable`, { timetable })
      .then(() => alert("Timetable updated successfully!"))
      .catch(error => console.error("Error updating timetable:", error));
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">Update Time Table</h1>
      <div className="max-w-4xl mx-auto">
        {timetable.map((entry, index) => (
          <div key={index} className="bg-gray-800 border border-orange-500 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-4">
              <span className="w-20 font-bold text-orange-400">{entry.day}</span>
              <input
                type="text"
                value={entry.class1}
                onChange={(e) => handleUpdate(index, "class1", e.target.value)}
                className="border border-orange-400 bg-gray-700 text-white p-2 rounded w-60"
              />
              <input
                type="text"
                value={entry.class2}
                onChange={(e) => handleUpdate(index, "class2", e.target.value)}
                className="border border-orange-400 bg-gray-700 text-white p-2 rounded w-60"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button 
          onClick={handleSave} 
          className="mt-4 p-3 bg-orange-500 text-black font-bold rounded w-60"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TimeTableUpdate;

