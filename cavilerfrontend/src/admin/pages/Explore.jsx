import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaUpload, FaSave, FaTrash } from "react-icons/fa";

const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", description: "", image: null, preview: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📌 Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/explorecourse`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 📌 Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCourse({ ...newCourse, image: file, preview: URL.createObjectURL(file) });
    }
  };

  // 📌 Save New Course to API
  const handleSaveCourse = async () => {
    if (!newCourse.name || !newCourse.description || !newCourse.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCourse.name);
    formData.append("description", newCourse.description);
    formData.append("image", newCourse.image);

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/explorecourse`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCourses([...courses, response.data]);
      setNewCourse({ name: "", description: "", image: null, preview: null });
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding course:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Delete Course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/explorecourse/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-10">
        Explore Courses
      </h1>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {courses.map((course) => (
          <div key={course.id} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg text-center backdrop-blur-lg border border-gray-700 relative">
            <img src={`${import.meta.env.VITE_BASE_URL}${course.image}`} alt={course.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-orange-400 mb-2">{course.name}</h3>
            <p className="text-gray-300">{course.description}</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Add Course Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition shadow-md"
      >
        <FaPlus /> Add Course
      </button>

      {/* Add Course Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl text-orange-400 mb-4">Add New Course</h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full p-3 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
            />
            <label className="w-full flex items-center gap-3 px-4 py-2 bg-gray-700 rounded cursor-pointer border border-gray-600 text-white hover:border-orange-500">
              <FaUpload className="text-orange-400" /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {newCourse.preview && <img src={newCourse.preview} alt="Preview" className="w-full h-40 object-cover rounded mt-4" />}

            <div className="flex justify-between mt-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700">Cancel</button>
              <button
                onClick={handleSaveCourse}
                className="px-4 py-2 bg-orange-500 text-white rounded flex items-center gap-2 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Saving..." : <><FaSave /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCourses;

