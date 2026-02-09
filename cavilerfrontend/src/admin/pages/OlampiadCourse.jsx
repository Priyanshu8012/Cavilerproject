import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function UpdateOlympiadPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    grade: "",
    start_date: "",
    end_date: "",
    description: "",
    price: "",
    weeks: "",
    classes: "",
    tests: "",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/olympiad/courses`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching Olympiad courses:", error));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file, imagePreview: URL.createObjectURL(file) });
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name || "",
      language: course.language || "",
      grade: course.grade || "",
      start_date: course.start_date || "",
      end_date: course.end_date || "",
      description: course.description || "",
      price: course.price || "",
      weeks: course.weeks || "",
      classes: course.classes || "",
      tests: course.tests || "",
      image: null,
      imagePreview: course.image ? `${API_URL}${course.image}` : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "imagePreview") return;
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (selectedCourse) {
        await axios.put(`${API_URL}/olympiad/update-course/${selectedCourse.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Olympiad course updated successfully!");
      } else {
        const response = await axios.post(`${API_URL}/olympiad/add-course`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Olympiad course added successfully!");
        setCourses([...courses, response.data]);
      }
      setFormData({
        name: "",
        language: "",
        grade: "",
        start_date: "",
        end_date: "",
        description: "",
        price: "",
        weeks: "",
        classes: "",
        tests: "",
        image: null,
        imagePreview: null,
      });
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-300">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          {selectedCourse ? "Update Olympiad Course" : "Add Olympiad Course"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {["name", "language", "grade", "price", "weeks", "classes", "tests"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 border border-gray-400 rounded-lg"
                required
              />
            ))}
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg" required />
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg" required />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="w-full p-3 border border-gray-400 rounded-lg resize-none h-24"
            required
          ></textarea>
          <input type="file" onChange={handleFileChange} className="w-full p-3 border border-gray-400 rounded-lg" />
          {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-3 shadow-md" />}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : selectedCourse ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

