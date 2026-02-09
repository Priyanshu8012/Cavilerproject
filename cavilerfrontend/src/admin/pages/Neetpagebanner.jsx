import React, { useState, useEffect } from "react";
import { FaImage, FaSave, FaTrash } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const UpdateBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/banner`);
        const data = await response.json();
        if (data.image_path) {
          setPreview(data.image_path);
        }
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    };

    fetchBanner();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!bannerImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("bannerImage", bannerImage);

    try {
      const response = await fetch(`${API_BASE_URL}/api/banner/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Banner saved successfully!");
        setPreview(data.imagePath);
      } else {
        alert(data.error || "Failed to save banner.");
      }
    } catch (error) {
      alert("Error uploading banner.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banner/delete`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Banner deleted successfully!");
        setBannerImage(null);
        setPreview(null);
      } else {
        alert(data.error || "Failed to delete banner.");
      }
    } catch (error) {
      alert("Error deleting banner.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-10 drop-shadow-lg">
        Update Banner
      </h1>

      <div className="w-full max-w-4xl h-64 bg-gray-800 rounded-xl flex items-center justify-center shadow-xl overflow-hidden border border-gray-700 relative">
        {preview ? (
          <img src={preview} alt="Banner Preview" className="w-full h-full object-cover opacity-90" />
        ) : (
          <span className="text-gray-400">No Image Selected</span>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-2xl">
        <label className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 text-white cursor-pointer hover:border-orange-500">
          <FaImage className="text-orange-400" />
          <span className="text-gray-300">Choose Banner Image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        <button onClick={handleSave} className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 flex items-center gap-3">
          <FaSave /> Save
        </button>

        {preview && (
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
            <FaTrash /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateBanner;

