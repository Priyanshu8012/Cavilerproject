import React, { useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

const coursesData = [
    { id: 1, level: 'OMM Level 3', grade: '3,4', date: '2025-04-01', price: '₹6,999', oldPrice: '₹7,777' },
    { id: 2, level: 'OMM Level 4', grade: '5,6', date: '2025-04-01', price: '₹6,999', oldPrice: '₹7,777' },
    { id: 3, level: 'OMM Level 5', grade: '7,8', date: '2025-04-02', price: '₹10,000', oldPrice: '₹11,111' }
];

export default function UpdateCoursesPage() {
    const [courses, setCourses] = useState(coursesData);
    const [loadingIndex, setLoadingIndex] = useState(null); // Track loading for each course

    const API_URL = import.meta.env.VITE_BASE_URL;

    // 🔹 Handle Update Course
    const handleUpdate = async (index) => {
        const course = courses[index];
        setLoadingIndex(index);  // Set loading state for the specific course
        try {
            const response = await axios.put(`${API_URL}/olympiad/course/${course.id}`, course);
            setCourses(prevCourses => {
                const updatedCourses = [...prevCourses];
                updatedCourses[index] = response.data;  // Optimistic update
                return updatedCourses;
            });
            alert('Course updated successfully!');
        } catch (error) {
            console.error('Error updating course:', error);
            alert('Failed to update course.');
        } finally {
            setLoadingIndex(null);  // Reset loading state
        }
    };

    // 🔹 Handle Change for Course Fields
    const handleChange = (index, key, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index][key] = value;
        setCourses(updatedCourses);
    };

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-orange-500">Update Courses for <span className="italic text-gray-400">Maths</span> ✨</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div key={course.id} className="bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-2xl">
                        <div className="flex flex-col gap-4">
                            <input
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 w-full"
                                value={course.level}
                                onChange={(e) => handleChange(index, 'level', e.target.value)}
                            />
                            <input
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 w-full"
                                value={course.grade}
                                onChange={(e) => handleChange(index, 'grade', e.target.value)}
                            />
                            <input
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 w-full"
                                value={course.date}
                                onChange={(e) => handleChange(index, 'date', e.target.value)}
                            />
                            <div className="flex items-center space-x-4">
                                <input
                                    className="bg-gray-600 text-red-400 rounded-lg px-3 py-2 border border-red-500 w-1/2"
                                    value={course.oldPrice}
                                    onChange={(e) => handleChange(index, 'oldPrice', e.target.value)}
                                />
                                <input
                                    className="bg-gray-600 text-green-400 rounded-lg px-3 py-2 border border-green-500 w-1/2"
                                    value={course.price}
                                    onChange={(e) => handleChange(index, 'price', e.target.value)}
                                />
                            </div>
                            <button
                                className="flex items-center justify-center gap-2 mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                                onClick={() => handleUpdate(index)}
                                disabled={loadingIndex === index}  // Disable button while loading
                            >
                                {loadingIndex === index ? "Updating..." : <><FaEdit /> Update Course</>}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


