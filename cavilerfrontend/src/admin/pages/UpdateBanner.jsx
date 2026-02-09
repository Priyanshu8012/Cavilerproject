import React, { useState, useEffect } from "react";
import { FaImage, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const UpdateBanner = () => {
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [savedBanners, setSavedBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jeebanners`);
        if (response.data) {
          setSavedBanners(response.data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!bannerText || !bannerImage) {
      alert("Please enter banner text and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("text", bannerText);
    formData.append("image", bannerImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/jeebanner`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        setSavedBanners([...savedBanners, response.data.banner]);
        setBannerText("");
        setBannerImage(null);
        setPreview(null);
        alert("Banner saved successfully!");
      }
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/jeebanner/${id}`);
        setSavedBanners(savedBanners.filter((banner) => banner.id !== id));
        alert("Banner deleted successfully!");
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-10">
        Update Banner
      </h1>

      <div className="w-full max-w-4xl h-64 bg-gray-800 rounded-xl flex items-center justify-center shadow-xl overflow-hidden border border-gray-700 relative">
        {preview ? (
          <img src={preview} alt="Banner Preview" className="w-full h-full object-cover opacity-90" />
        ) : (
          <span className="text-gray-400">No Image Selected</span>
        )}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-6 py-3 rounded-lg text-xl font-semibold">
          {bannerText}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-2xl">
        <label className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 text-white cursor-pointer hover:border-orange-500">
          <FaImage className="text-orange-400" />
          <span className="text-gray-300">Choose Banner Image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        <input
          type="text"
          placeholder="Enter banner text"
          value={bannerText}
          onChange={(e) => setBannerText(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleSave}
          className="flex items-center gap-3 mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      {savedBanners.map((banner) => (
        <div key={banner.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col items-center mt-6">
          <img src={`${API_BASE_URL}${banner.image_url}`} alt="Banner" className="w-full h-64 object-cover" />
          <div className="bg-black bg-opacity-60 px-6 py-3 text-xl font-semibold w-full text-center">
            {banner.text}
          </div>
          <button
            className="mt-3 mb-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            onClick={() => handleDelete(banner.id)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateBanner;

