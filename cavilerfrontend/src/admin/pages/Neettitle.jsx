import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function TitleUpdate() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [updatedData, setUpdatedData] = useState({});
    const formRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;  // 🔥 Backend URL

    // 🔹 Fetch Title Data from Backend
    const fetchTitle = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.title) setTitle(data.title);
            if (data.subtitle) setSubtitle(data.subtitle);
        } catch (error) {
            console.error("❌ Failed to fetch title:", error);
        }
    };

    useEffect(() => {
        fetchTitle();
    }, []);

    // 🔹 Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, subtitle }),
            });

            if (!response.ok) throw new Error("Failed to update title");

            toast.success("✅ Title updated successfully!");
            setUpdatedData({ title, subtitle });

            setTimeout(() => {
                formRef.current.scrollIntoView({ behavior: "smooth" });
            }, 300);
        } catch (error) {
            toast.error("❌ Error updating title");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center p-6">

            <div className="max-w-xl w-full bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
                <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
                    Update NEET Title
                </h2>

                <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Subtitle</label>
                        <input
                            type="text"
                            placeholder="Enter Subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>

                {updatedData.title && (
                    <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
                        <h3 className="text-lg font-semibold text-orange-500">Updated Information</h3>
                        <p className="text-sm text-gray-300">Title: {updatedData.title}</p>
                        <p className="text-sm text-gray-300">Subtitle: {updatedData.subtitle}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

