import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", rank: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch students from backend
  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch students.");
        setLoading(false);
      });
  }, [API_URL]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async () => {
    if (!newStudent.name || !newStudent.rank || !imageFile) {
      alert("Please fill all details.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newStudent.name);
    formData.append("rank", newStudent.rank);
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const addedStudent = await res.json();
        setStudents([...students, addedStudent]);
        setNewStudent({ name: "", rank: "" });
        setImageFile(null);
        setImagePreview(null);
      } else {
        alert("Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Olampiad Top students Update</h1>
      
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4 text-orange-400">Add Student</h2>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2 border-2 border-orange-500" />}
        
        <input type="file" accept="image/*" className="border p-2 w-full mb-2 bg-gray-800 text-white" onChange={handleImageChange} />
        <input
          className="border p-2 w-full mb-2 bg-gray-800 text-white"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2 bg-gray-800 text-white"
          placeholder="Rank/Marks"
          value={newStudent.rank}
          onChange={(e) => setNewStudent({ ...newStudent, rank: e.target.value })}
        />
        
        <button onClick={handleAdd} className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600">
          Add Student
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-md border border-orange-500">
              <img
                src={`${API_URL}${student.image}`}
                alt={student.name}
                className="w-full h-48 object-cover rounded-lg border-4 border-orange-500"
              />
              <h2 className="text-lg font-bold text-center mt-2 text-orange-400">{student.name}</h2>
              <p className="text-center font-medium bg-orange-600 text-white px-2 py-1 rounded-full inline-block mt-1">
                Rank/Marks: {student.rank}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

