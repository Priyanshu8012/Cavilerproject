import { useState, useEffect, useRef } from 'react';
import { toast } from "react-hot-toast";

export default function TitleUpdate() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [updatedData, setUpdatedData] = useState({}); // 🔥 Added state to store updated data
    const formRef = useRef(null); // 🔥 Added ref for scrolling

    const fetchTitle = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/title`);
            const data = await response.json();
            console.log('Fetched Data:', data); // ✅ Added log to check data
            if (data.title) setTitle(data.title);
            if (data.subtitle) setSubtitle(data.subtitle);
        } catch (error) {
            console.error('Failed to fetch title data:', error);
        }
    };
    
    useEffect(() => {
        fetchTitle();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/title`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, subtitle })
            });

            if (!response.ok) throw new Error(`Failed to update title: ${response.statusText}`);

            toast.success('Title updated successfully!');

            setUpdatedData({ title, subtitle }); // ✅ Store updated data

            // 🔽 Scroll to bottom after submission
            setTimeout(() => {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } catch (error) {
            toast.error('Failed to update title');
            console.error("Error updating title:", error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
            <h2 className="text-3xl font-extrabold text-black mb-6">
                Update Title Section
            </h2>

            <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                <div>
                    <label className="block text-gray-600 text-sm mb-2">Title</label>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm mb-2">Subtitle</label>
                    <input
                        type="text"
                        placeholder="Enter Subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition duration-300"
                >
                    Save Changes
                </button>
            </form>

            {/* 🔽 Display updated information below the form */}
            {updatedData.title && (
                <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
                    <h3 className="text-lg font-semibold text-green-800">Updated Information</h3>
                    <p className="text-sm text-green-700">Title: {updatedData.title}</p>
                    <p className="text-sm text-green-700">Subtitle: {updatedData.subtitle}</p>
                </div>
            )}
        </div>
    );
}

