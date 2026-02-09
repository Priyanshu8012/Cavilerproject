import React from "react";

const courses = {
  JEE: [
    { title: "IIT - JEE", description: "11th + 12th + JEE", price: "₹1,70,000", image: "/assets/AllCourses/11-12-jee.jpg" },
    { title: "JEE Advanced", description: "Expert guidance for top ranks", price: "₹80,000", image: "/assets/AllCourses/12-jee-crash.jpg" },
    { title: "JEE Main", description: "Focused preparation for JEE Main", price: "₹80,000", image: "/assets/AllCourses/jee-repeater.jpg" }
  ],
  NEET: [
    { title: "NEET UG", description: "Complete medical entrance coaching", price: "₹1,70,000", image: "/assets/AllCourses/11-12-neet.jpg" },
    { title: "NEET Foundation", description: "Early start for medical aspirants", price: "₹80,000", image: "/assets/AllCourses/12-neet-crash.jpg" },
    { title: "NEET Crash Course", description: "Quick revision for NEET", price: "₹80,000", image: "/assets/AllCourses/neet-repeater.jpg" }
  ],
  MHTCET: [
    { title: "MHT-CET PCM", description: "Engineering entrance preparation", price: "₹54,000", image: "/assets/AllCourses/11-reg-mht.jpg" },
    { title: "MHT-CET PCB", description: "Medical entrance preparation", price: "₹60,000", image: "/assets/AllCourses/12-reg-mht.jpg" },
    { title: "MHT-CET Crash Course", description: "Fast-track preparation", price: "₹70,000", image: "/assets/AllCourses/12-reg-mht-crash.jpg" }
  ]
};

const CourseCard = ({ title, description, price, image }) => {
  return (
    <div className="bg-white md:w-1/4 rounded-2xl shadow-lg p-6 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={image} alt={title} className="w-full aspect-square rounded-lg" />
      <h3 className="text-xl font-semibold mt-4 text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">📚 Live Class | 🎁 Free Content | 📝 Tests</p>
      <div className="flex items-center mt-4 text-gray-700">
        <span className="text-3xl font-bold text-orange-600">{price}</span>
      </div>
      <a href={""} className="mt-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 rounded-lg font-semibold hover:from-red-500 hover:to-orange-600 transition">
        🚀 Get this course
      </a>
    </div>
  );
};

const AllCourses = () => {
  return (
    <div className="p-8">
      {Object.entries(courses).map(([category, courseList]) => (
        <div key={category} className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{category} Courses</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {courseList.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCourses;


