import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const students = [
  { name: "Shreya Nigam", score: "99.80%", img: "https://via.placeholder.com/80" },
  { name: "Khushi Arora", score: "99.60%", img: "https://via.placeholder.com/80" },
  { name: "Anshika Singha", score: "99.40%", img: "https://via.placeholder.com/80" },
  { name: "Aloki Upadhyay", score: "99.40%", img: "https://via.placeholder.com/80" },
  { name: "Ishita Surana", score: "99.20%", img: "https://via.placeholder.com/80" },
  { name: "Saumya Gupta", score: "99.20%", img: "https://via.placeholder.com/80" },
];

const stats = [
  { text: "24% Students", subtext: "Scored Above 95%" },
  { text: "3 in 5 Students", subtext: "Scored Above 90%" },
  { text: "4 in 5 Students", subtext: "Scored Above 85%" },
];


const ComputerScienceBanner = () => {
  return (
    <div className="relative w-full bg-orange-500 text-white px-6 flex flex-col md:flex-row items-center justify-center">
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold">Computer Science</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">Tuitions for CBSE Students</h2>
        <p className="text-lg mt-4 text-yellow-200">Grade 11th & Grade 12th</p>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800">
          Book A FREE Demo
        </button>
      </div>
      <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center ">
        <img
          src="https://d9hhrg4mnvzow.cloudfront.net/courses.vedantu.com/computerscience/3f6777b9-group-3-1_1000000000000000000028.png" 
          alt="Student Learning"
          className="w-full h-full max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
};



const teachers = [
  {
    name: "Priya Shrivastava",
    qualification: "M.tech in Computer Science with 6 years of experience",
    description:
      "Coding is becoming basic literacy in this digital age, and it is significant for kids to understand and utilize the technology around them.",
    img: "https://via.placeholder.com/80",
  },
  {
    name: "Aakanksha S Nagar",
    qualification: "B.tech in Electronics & Comm. with 4+ years of experience",
    description:
      "At Vidyarjan our motto is Teacher by choice, which has given me an amazing opportunity to interact with students from all over the world. It makes every day special.",
    img: "https://via.placeholder.com/80",
  },
  {
    name: "Anu Chhabra",
    qualification: "MCA, BCA, B.Ed with 14+ years of experience",
    description:
      "I believe in the holistic development of my learners and improving their conceptual and logical thinking skills which in turn imparts creativity in them.",
    img: "https://via.placeholder.com/80",
  },
];

const MasterTeachers = () => {
  return (
    <div className="py-10 px-4 bg-gray-100">
      <h2 className="text-center text-3xl font-bold text-gray-800">Master Teachers</h2>
      <p className="text-center text-gray-600 mt-2">Give a Flight to your Dream with our Master Teachers</p>
      <div className="w-16 h-1 bg-orange-500 mx-auto mt-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
        {teachers.map((teacher, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-orange-300 rounded-lg w-16 h-16 top-2 left-2"></div>
              <img
                src={teacher.img}
                alt={teacher.name}
                className="w-20 h-20 rounded-full relative border-2 border-gray-300 mx-auto"
              />
            </div>
            <p className="text-lg font-bold text-gray-800 mt-4">{teacher.name}</p>
            <p className="text-sm font-semibold text-gray-600">{teacher.qualification}</p>
            <p className="text-gray-600 text-sm mt-2">{teacher.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};




const ResultsComponent = () => {
  return (
    <div className="bg-yellow-200 w-full mt-10 py-10 px-4">
      <h2 className="text-center text-2xl font-bold text-gray-800">Results Class 12th</h2>
      <div className="w-16 h-1 bg-orange-500 mx-auto mt-2"></div>

      <div className="bg-white shadow-md rounded-xl p-5 mt-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center items-center">
          {students.map((student, index) => (
            <div key={index} className="text-center">
              <img
                src={student.img}
                alt={student.name}
                className="w-16 h-16 rounded-full mx-auto border-2 border-gray-300"
              />
              <p className="font-semibold text-gray-700 mt-2">{student.name}</p>
              <p className="text-gray-600 text-sm">{student.score}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-purple-600">{stat.text}</p>
            <p className="text-gray-600 text-sm">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-500 w-full md:px-20 sm:px-6  lg:px-60 text-white py-4  flex sm:flex-row flex-col justify-between items-center">
      <div className="flex items-center justify-between  lg:gap-10 space-x-4 mb-2">
        <span>Connect with us:</span>
        <FaFacebookF className="text-xl cursor-pointer hover:text-gray-200" />
        <FaLinkedinIn className="text-xl cursor-pointer hover:text-gray-200" />
        <FaTwitter className="text-xl cursor-pointer hover:text-gray-200" />
        <FaYoutube className="text-xl cursor-pointer hover:text-gray-200" />
      </div>
      <p className="text-sm">&copy; 2021 Vidyarjan.com. All rights reserved</p>
    </footer>
  );
};




export default function ComputerScience() {
    return (
        <div>
            <ComputerScienceBanner/>

      <div className="flex flex-col items-center px-4 py-10 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Computer Science Tuitions <br /> for Grade 11 & Grade 12
        </h2>
        <p className="text-gray-600 text-center mt-2">Comprehensive Syllabus Coverage</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Grade 11", "Grade 12"].map((grade, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-600">{grade}</h3>
              <p className="text-sm text-gray-600 mt-1">Batch 1: 5th October 2021</p>
              <p className="text-sm text-gray-600">Batch 2: 7th October 2021</p>
              <hr className="my-4" />
              <h4 className="font-semibold">Units</h4>
              <ul className="text-gray-700 text-sm mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Unit 1:</span> Computational Thinking & Programming (Python) <br />
                  ({index === 0 ? "75 marks" : "66 marks"})
                </li>
                <li>
                  <span className="font-semibold">Unit 2:</span> {index === 0 ? "Computer Systems and Organisation" : "Computer Networks"} <br />
                  ({index === 0 ? "10 marks" : "10 marks"})
                </li>
                <li>
                  <span className="font-semibold">Unit 3:</span> {index === 0 ? "Society, Law, Ethics" : "Database Management"} <br />
                  ({index === 0 ? "15 marks" : "24 marks"})
                </li>
                <li className="font-semibold text-gray-900">Bonus Unit: Question Paper Brainstorming</li>
              </ul>
              <div className="mt-4 text-center">
                <p className="text-gray-500 line-through">₹25000</p>
                <p className="text-2xl font-bold text-orange-600">₹20000</p>
                <p className="text-sm text-gray-500">Use Code: <span className="font-semibold">VIDYARJANCS5000</span></p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                  Register FREE for {index === 0 ? "11th" : "12th"}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-yellow-200 p-6 w-full rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-800">Course Details</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
                { title: "Live Classes", icon: "📺" },
                { title: "In Class Quizzes", icon: "📖" },
                { title: "Post Class Worksheets", icon: "📝" },
                { title: "Peer Discussion", icon: "👥" },
                { title: "Mock Test", icon: "⏳" }
            ].map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <span className="text-orange-500 text-3xl">{item.icon}</span>
                <p className="text-gray-800 font-semibold mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mt-10 bg-orange-500 p-6 rounded-lg text-center text-white">
          <h3 className="text-xl font-bold">Salient Features of Introductory Sessions</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 text-left">
            <div>
              <p>✔ Best in-class experience with our engaging and interactive live classes.</p>
              <p className="mt-2">✔ Practical Applications of Concepts</p>
            </div>
            <div>
              <p>✔ Strengthen your understanding through regular revisions and mock tests</p>
              <p className="mt-2">✔ Unlimited In-class doubt solving</p>
            </div>
          </div>
        </div>
  
        {/* New Section: Why Choose Vedantu */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold text-center text-gray-800">Why Choose Vidyarjan</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-orange-600">Performance Tracking</h4>
              <p className="text-gray-700 mt-2">Session assignments, tasks, and evaluations to keep an eye on your progress report.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-orange-600">Project-Based Learning</h4>
              <p className="text-gray-700 mt-2">Apply acquired skills to create complex projects for solving real-world problems.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-orange-600">Student Evaluation</h4>
              <p className="text-gray-700 mt-2">Evaluating and analyzing student work to improve academic performance through special sessions.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-orange-600">Score Improvement</h4>
              <p className="text-gray-700 mt-2">Special sessions to help students improve their scores and academic performance.</p>
            </div>
          </div>
        </div>
        <ResultsComponent/>
        <MasterTeachers/>
      </div>
     
            </div>
    );
  }
