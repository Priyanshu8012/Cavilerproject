import React from "react";

const courses = [
    {
      title: "Periodic Properties - Micro Course",
      subject: "Chemistry",
      teacher: "Raja Thiangaya Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Redox Reactions - Prime - Micro Course",
      subject: "Chemistry",
      teacher: "Raja Thiangaya Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Structure of an Atom - Prime - Micro Course",
      subject: "Chemistry",
      teacher: "Raja Thiangaya Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Basic Mathematics - Prime - Micro Course",
      subject: "Maths",
      teacher: "Simon Joseph Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Complex Numbers - 1 - Prime - Micro Course",
      subject: "Maths",
      teacher: "Simon Joseph Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "General Mathematics - Prime - Micro Course",
      subject: "Maths",
      teacher: "Simon Joseph Sir",
      price: "₹99",
      originalPrice: "₹299",
      image: "https://via.placeholder.com/150",
    },
  ];
  const Footer = () => {
    return (
      <footer className="bg-black text-white p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold">QUICK LINKS</h3>
            <ul>
              <li>Home</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">TARGET EXAMS</h3>
            <ul>
              <li>CBSE Tuitions</li>
              <li>JEE Main</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">INFO</h3>
            <ul>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">CONTACT</h3>
            <p>WhatsApp: +91 8951183660</p>
          </div>
        </div>
      </footer>
    );
  };
  
  const CourseCard = ({ course }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-3 w-64 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-32 object-cover rounded-md"
        />
        <h3 className="font-bold text-sm mt-2">{course.title}</h3>
        <p className="text-xs text-gray-500">Recorded classes</p>
        <p className="text-xs text-gray-500">{course.subject}</p>
        <p className="text-xs font-semibold">{course.teacher}</p>
        <div className="flex items-center mt-2">
          <span className="text-gray-400 line-through text-xs">{course.originalPrice}</span>
          <span className="text-lg font-bold ml-2">{course.price}</span>
        </div>
      </div>
    );
  };
  
  
  


const OnlineCourses = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-purple-600 text-white text-center py-6 px-4">
        <h1 className="text-xl font-bold">Master any topic of your choice!</h1>
        <h2 className="text-2xl font-bold">Curated by your favourite teachers</h2>
        <div className="flex justify-center mt-4 gap-2">
          <select className="p-2 rounded-md bg-white text-black">
            <option>Class 11</option>
            <option>Class 12</option>
            <option>Class 13</option>
          </select>
          <input
            type="text"
            placeholder="Search Courses"
            className="p-2 rounded-md  border-2 border-black w-1/2"
          />
        </div>
      </header>
      <nav className="p-4 shadow">
      <div className="container mx-auto flex gap-2 ">
        <span className="font-semibold">Explore courses by:</span>
        <div className="flex gap-4">
          <button className="px-4 py-1">Subjects ▼</button>
          <button className="px-4 py-1">Target Exams ▼</button>
          <button className="px-4 py-1">Course Types ▼</button>
        </div>
      </div>
    </nav>

      {/* Course Section */}
      <section className="p-4">
      <div className="p-5">
      <h2 className="font-bold text-xl">VIDIYAL</h2>
      <div className="flex space-x-4 overflow-x-auto mt-4 scrollbar-hide">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
       
      </section>
   <Footer/>
    </div>
  );
};

export default OnlineCourses;







