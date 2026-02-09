import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const coachingFeatures = [
  {
    title: "Periodic Test Series",
    image: "https://via.placeholder.com/150", // Replace with actual image
  },
  {
    title: "Digital Learning Support",
    image: "https://via.placeholder.com/150", // Replace with actual image
  },
  {
    title: "Doubt Removal Classes",
    image: "https://via.placeholder.com/150", // Replace with actual image
  },
  {
    title: "Mentor For Each Student",
    image: "https://via.placeholder.com/150", // Replace with actual image
  },
];

const CoachingSystem = () => {
  return (
    <div className="bg-white py-10 px-5 md:px-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Vidyarjan Coaching System</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coachingFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
            <p className="mt-3 text-lg font-semibold">{feature.title}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-5 left-5 bg-green-500 p-3 rounded-full shadow-lg cursor-pointer">
        <FaWhatsapp className="text-white text-3xl" />
      </div>
      <button className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-l-md shadow-lg">
        APPLY NOW
      </button>
    </div>
  );
};

export default CoachingSystem;
