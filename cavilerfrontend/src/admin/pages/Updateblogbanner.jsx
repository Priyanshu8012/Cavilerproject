import { useState } from 'react';
import { FaCloudUploadAlt, FaTrashAlt, FaSpinner } from 'react-icons/fa';

// Fetch the API URL from the environment variable
const API_URL = import.meta.env.VITE_BASE_URL;

export default function UpdateBlogBanner() {
    const [banner, setBanner] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setBanner(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setMessage('');
        } else {
            setMessage('Please upload a valid image file.');
            setBanner(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!banner) {
            setMessage('Please select a banner image to upload.');
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('bannerImage', banner);

        try {
            const response = await fetch(`${API_URL}/api/blog/upload-banner`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setPreview(data.imageUrl);
            } else {
                setMessage(data.message || 'Failed to upload the banner.');
            }
        } catch (error) {
            setMessage('Error uploading the banner.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBanner = async () => {
        if (!preview) {
            setMessage('No banner to delete.');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/blog/delete-banner/1`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setPreview('');
                setMessage(data.message);
            } else {
                setMessage(data.message || 'Failed to delete the banner.');
            }
        } catch (error) {
            setMessage('Error deleting the banner.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
            <div className="p-8 max-w-lg w-full bg-white shadow-lg rounded-xl border-2 border-gray-300">
                <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Manage Your Blog Banner</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                        className="border-4 border-dashed border-blue-500 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition-all"
                        onClick={() => document.getElementById('fileInput').click()}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <FaCloudUploadAlt className="text-6xl text-blue-500 mx-auto mb-4" />
                        <p className="text-lg text-gray-700">Click to upload or drag & drop your banner image</p>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : 'Update Banner'}
                    </button>
                </form>

                {preview && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800">Current Banner</h3>
                        <img
                            src={preview}
                            alt="Banner Preview"
                            className="w-full rounded-lg shadow-xl mt-4"
                        />
                        <button
                            onClick={handleDeleteBanner}
                            disabled={loading}
                            className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <><FaTrashAlt /> Delete Banner</>}
                        </button>
                    </div>
                )}

                {message && (
                    <p className={`mt-6 text-center text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                )}
            </div>
        </div>
    );
}

