import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";

// ✅ Use environment variable for API URL
const API_URL = `${import.meta.env.VITE_API_URL}/newonvidyarajan`;

const NewOnVidyarjan = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCourseImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!courseTitle || !courseDescription || !courseImage) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("description", courseDescription);
    formData.append("image", courseImage);

    try {
      await axios.post(API_URL, formData);
      alert("✅ New course added successfully!");
      setCourseTitle("");
      setCourseDescription("");
      setCourseImage(null);
      setPreview(null);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("❌ Error adding course!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("✅ Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("❌ Error deleting course!");
    }
  };

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-10 drop-shadow-lg">
        New on Vidyarjan
      </h1>

      {/* Image Upload Section */}
      <div className="w-full max-w-4xl h-64 bg-gray-800 rounded-xl flex items-center justify-center shadow-xl overflow-hidden border border-gray-700 relative backdrop-blur-lg">
        {preview ? (
          <img src={preview} alt="Course Preview" className="w-full h-full object-cover opacity-90 transition-opacity duration-500" />
        ) : (
          <span className="text-gray-400 text-lg">No Image Selected</span>
        )}
      </div>

      <label className="mt-4 w-full max-w-2xl flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 text-white cursor-pointer hover:border-orange-500 transition">
        <FaCloudUploadAlt className="text-orange-400 text-xl" />
        <span className="text-gray-300">Upload Course Image</span>
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {/* Input Fields */}
      <div className="mt-6 w-full max-w-2xl flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter course title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
        />
        <textarea
          placeholder="Enter course description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full p-4 h-32 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-3 mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition shadow-md"
      >
        <FaSave className="text-xl" /> Save Course
      </button>

      {/* Course List */}
      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-300 mb-4">Existing Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600 shadow-md">
              <img
                src={`${import.meta.env.VITE_API_URL}${course.image}`}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
              <button
                onClick={() => handleDelete(course.id)}
                className="flex items-center gap-2 mt-3 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition shadow-md"
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewOnVidyarjan;

