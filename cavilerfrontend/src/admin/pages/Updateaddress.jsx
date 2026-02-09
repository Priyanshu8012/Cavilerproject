import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Fetch the API URL from the .env file
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
    const [formData, setFormData] = useState({
        address: "",
        timing: "",
        contact: "",
        courseDetails: "",
        price: ""
    });

    const [updatedData, setUpdatedData] = useState(null);

    const fetchData = () => {
        axios.get(`${API_URL}/api/details`) // Use the API_URL from the .env file
            .then(response => {
                setFormData(response.data);
                setUpdatedData(response.data);
            })
            .catch(error => console.error('❌ Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/api/update`, formData) // Use the API_URL from the .env file
            .then(() => {
                alert('✅ Details Updated Successfully!');
                fetchData();
            })
            .catch((error) => console.error('❌ Error updating data:', error));
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                <h1 className="text-3xl font-extrabold text-orange-500 text-center mb-6">
                    Address Update Details
                </h1>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {['address', 'timing', 'contact', 'courseDetails', 'price'].map((field) => (
                        <div key={field}>
                            <label className="block text-lg font-medium text-gray-300">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder={`Enter ${field}`}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                    >
                        Update Details
                    </button>
                </form>

                {/* Updated Information Section */}
                {updatedData && (
                    <div className="mt-8 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-lg">
                        <h2 className="text-2xl font-bold text-orange-500 mb-4">Updated Information</h2>
                        <ul className="list-none space-y-2">
                            <li className="text-gray-300"><strong>📍 Address:</strong> {updatedData.address}</li>
                            <li className="text-gray-300"><strong>🕒 Timing:</strong> {updatedData.timing}</li>
                            <li className="text-gray-300"><strong>📞 Contact:</strong> {updatedData.contact}</li>
                            <li className="text-gray-300"><strong>📘 Course Details:</strong> {updatedData.courseDetails}</li>
                            <li className="text-gray-300"><strong>💰 Price:</strong> ₹{updatedData.price}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

