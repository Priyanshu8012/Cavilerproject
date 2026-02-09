import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function ProfileUpdate() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const response = await fetch(`${API_URL}/api/profile`);
    const data = await response.json();
    setProfiles(data);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("post", post);
    formData.append("education", education);
    formData.append("experience", experience);
    if (photo) {
      formData.append("photo", photo);
    }

    await fetch(`${API_URL}/api/profile`, {
      method: "POST",
      body: formData,
    });

    alert("Profile saved successfully!");
    fetchProfiles(); // Refresh profiles list
    setName("");
    setPost("");
    setEducation("");
    setExperience("");
    setPhoto(null);
  };

  const handleDeleteProfile = async (id) => {
    await fetch(`${API_URL}/api/profile/${id}`, {
      method: "DELETE",
    });

    alert("Profile deleted successfully!");
    fetchProfiles();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-center text-orange-500 mb-8">
          Update Teacher's Profile
        </h1>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 border-4 border-orange-400 rounded-full overflow-hidden mb-6 shadow-lg">
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-full h-full object-cover" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full bg-gray-700 text-white p-3 rounded-lg cursor-pointer mb-6" />
        </div>
        <div className="space-y-6">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" />
          <input type="text" placeholder="Post" value={post} onChange={(e) => setPost(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" />
          <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" />
          <input type="text" placeholder="Years of Experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" />
        </div>
        <button onClick={handleSaveProfile} className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg">
          Save Profile
        </button>
      </div>

      {profiles.length > 0 && (
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-orange-500 mb-4 text-center">Saved Profiles</h2>
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-gray-900 p-6 rounded-xl shadow-lg mb-4">
              <div className="flex items-center">
                <img src={`${API_URL}${profile.photo}`} alt="Profile" className="w-20 h-20 rounded-full border-4 border-orange-400 mr-4" />
                <div>
                  <p className="text-xl font-semibold">{profile.name}</p>
                  <p className="text-orange-400">{profile.post}</p>
                  <p className="text-gray-300">{profile.education}</p>
                  <p className="text-gray-300">{profile.experience}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteProfile(profile.id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">
                Delete Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

