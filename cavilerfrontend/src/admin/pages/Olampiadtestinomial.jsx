import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function TestimonialAdmin() {
    const [testimonials, setTestimonials] = useState([]);
    const [editTestimonial, setEditTestimonial] = useState(null);

    // Fetch testimonials on component mount
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/testimonials`);
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    const handleAddTestimonial = async () => {
        const newTestimonial = { name: "New User", role: "Student", text: "New testimonial...", rating: 5 };
        try {
            await axios.post(`${BASE_URL}/testimonials`, newTestimonial);
            fetchTestimonials(); // Refresh list after adding
        } catch (error) {
            console.error("Error adding testimonial:", error);
        }
    };

    const handleDeleteTestimonial = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/testimonials/${id}`);
            fetchTestimonials(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const handleEditTestimonial = (testimonial) => {
        setEditTestimonial(testimonial);
    };

    const handleUpdateTestimonial = async () => {
        try {
            await axios.put(`${BASE_URL}/testimonials/${editTestimonial.id}`, editTestimonial);
            fetchTestimonials(); // Refresh list after update
            setEditTestimonial(null);
        } catch (error) {
            console.error("Error updating testimonial:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
            <button onClick={handleAddTestimonial} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md">Add Testimonial</button>

            {editTestimonial && (
                <div className="mb-4 p-4 border rounded-md">
                    <input 
                        value={editTestimonial.name} 
                        onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })} 
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="Name"
                    />
                    <input 
                        value={editTestimonial.role} 
                        onChange={(e) => setEditTestimonial({ ...editTestimonial, role: e.target.value })} 
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="Role"
                    />
                    <textarea 
                        value={editTestimonial.text} 
                        onChange={(e) => setEditTestimonial({ ...editTestimonial, text: e.target.value })} 
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="Testimonial"
                    />
                    <input 
                        type="number" 
                        value={editTestimonial.rating} 
                        onChange={(e) => setEditTestimonial({ ...editTestimonial, rating: Number(e.target.value) })} 
                        className="w-full p-2 border rounded-md mb-2"
                        placeholder="Rating (1-5)"
                        min="1" max="5"
                    />
                    <button onClick={handleUpdateTestimonial} className="bg-green-500 text-white px-4 py-2 rounded-md">Update Testimonial</button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 rounded-2xl shadow-md bg-white">
                        <p className="italic">{testimonial.text}</p>
                        <h3 className="font-bold mt-3">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <p className="text-yellow-400">{'⭐'.repeat(testimonial.rating)}</p>
                        <div className="mt-2 space-x-2">
                            <button 
                                onClick={() => handleEditTestimonial(testimonial)} 
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteTestimonial(testimonial.id)} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

