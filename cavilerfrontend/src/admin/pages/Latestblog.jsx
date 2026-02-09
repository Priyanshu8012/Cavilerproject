import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Trash2 } from 'lucide-react';

export default function UploadPage() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [uploadedBlogs, setUploadedBlogs] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/api/blogs`)
            .then((res) => {
                setUploadedBlogs(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.error(err);
                setUploadedBlogs([]);
            });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            await axios.post(`${API_URL}/api/blogs`, formData);
            alert('Blog uploaded successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload blog.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/blogs/${id}`);
            alert('Blog deleted successfully!');
            setUploadedBlogs(uploadedBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete blog.');
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
            <div className="w-full max-w-md shadow-xl rounded-2xl p-6 bg-gray-800 border border-orange-500">
                <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-4">Upload Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border border-dashed border-orange-500 p-4 rounded-md flex flex-col items-center bg-gray-700 w-full">
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 object-cover rounded-md border border-orange-500" />
                        ) : (
                            <Upload className="text-orange-400 w-12 h-12" />
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 bg-gray-600 text-white border border-orange-500 p-2 rounded-md w-full" />
                    </div>
                    <textarea
                        placeholder="Enter blog description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-24 bg-gray-600 text-white border border-orange-500 rounded-md p-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-xl py-2">
                        Submit
                    </button>
                </form>
            </div>

            {uploadedBlogs.map((blog) => (
                <div key={blog.id} className="w-full max-w-md mt-6 p-4 bg-gray-800 border border-orange-500 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-orange-500">Uploaded Blog</h2>
                        <button 
                            onClick={() => handleDelete(blog.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center">
                            <Trash2 className="w-5 h-5 mr-2" /> Delete
                        </button>
                    </div>
                    <img 
                        src={`${API_URL}${blog.image}`} 
                        alt="Uploaded Preview"
                        className="w-full h-48 object-cover rounded-md border border-orange-500 mb-4"
                    />
                    <p className="text-white">{blog.description}</p>
                </div>
            ))}
        </div>
    );
}

