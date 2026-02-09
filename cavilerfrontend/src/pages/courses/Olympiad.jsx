import React from "react";

function EngagingCourses() {
  const courses = [
    {
      title: "ISI Last Mile 2025",
      subtitle: "ISI Last Mile 2025",
      language: "📘 HINDI",
      grades: "GRADES: 10 - 12",
      startDate: "3 Feb, 2025",
      endDate: "30 June, 2025",
      summary: "Mastery in ISI-CMI with critical thinking & cover advanced topics.",
      weeks: "Weeks: 12 | Classes: 70 | Tests: 8",
      priceOld: "₹5,555",
      priceNew: "₹5,000",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      title: "NSEP 2025 Module 1",
      subtitle: "NSEP 2025 Module 1",
      language: "📘 HINDI",
      grades: "GRADES: 10 - 12",
      startDate: "3 Feb, 2025",
      endDate: "24 Mar, 2025",
      summary: "Building a strong foundation in key physics concepts.",
      weeks: "Weeks: 7 | Classes: 14 | Tests: 4",
      priceOld: "₹3,000",
      priceNew: "₹2,700",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "NSEJS PRIME 2025",
      subtitle: "NSEJS PRIME 2025",
      language: "📘 HINDI",
      grades: "GRADES: 8 - 10",
      startDate: "29 Jan, 2025",
      endDate: "31 Dec, 2025",
      summary: "A focused batch designed to help students excel in NSEJS.",
      weeks: "Weeks: 45 | Classes: 175 | Tests: 25",
      priceOld: "₹7,777",
      priceNew: "₹6,999",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "OMM Level 5: Spring 2025 Batch",
      subtitle: "OMM Level 5: Spring 2025 Batch",
      language: "📘 HINDI",
      grades: "GRADES: 7 - 8",
      startDate: "2 Apr, 2025",
      endDate: "31 Dec, 2025",
      summary: "Master key math concepts and advance to Olympiad levels.",
      weeks: "Weeks: 18 | Classes: 58 | Tests: 8",
      priceOld: "₹11,000",
      priceNew: "₹10,000",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "OMM Level 7: Spring 2025 Batch",
      subtitle: "OMM Level 7: Spring 2025 Batch",
      language: "📘 HINDI",
      grades: "GRADES: 8 - 12",
      startDate: "1 Apr, 2025",
      endDate: "31 Dec, 2025",
      summary: "Master core math concepts and get Olympiad-ready.",
      weeks: "Weeks: 18 | Classes: 75 | Tests: 8",
      priceOld: "₹13,333",
      priceNew: "₹12,000",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Full Math Mastery: Spring 2027 Batch",
      subtitle: "Full Math Mastery: Spring 2027 Batch",
      language: "📘 HINDI",
      grades: "GRADES: 8 - 12",
      startDate: "1 Apr, 2025",
      endDate: "31 Jul, 2027",
      summary: "Advance in math, JEE, IB, and Olympiads with deep concepts.",
      weeks: "Weeks: 100 | Classes: 300 | Tests: 20",
      priceOld: "₹26,666",
      priceNew: "₹23,999",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="p-6 lg:px-32 ">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Discover Our Most <span className="text-orange-500">Engaging Courses</span> ✨
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                LIVE
              </span>
              <h3 className="text-lg font-bold mt-2">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.language}</p>
              <p className="text-xs text-gray-500">{course.grades}</p>
              <p className="text-sm text-gray-800 mt-2">
                <strong>Starts On:</strong> {course.startDate} | <strong>Ends On:</strong> {course.endDate}
              </p>
              <p className="text-sm text-gray-600 mt-2">{course.summary}</p>
              <p className="text-xs text-gray-500">{course.weeks}</p>

              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-500 line-through">{course.priceOld}</p>
                <p className="text-lg font-bold text-green-600">{course.priceNew}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600">
                  Know More
                </button>
                <button className="flex-1 py-2 bg-orange-500 text-white text-sm font-bold rounded hover:bg-orange-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}







const courses = [
{
  grade: "3,4",
  level: "OMM Level 3",
  batch: "Spring 2025 Batch",
  exams: "Math Kangaroo, AMO, SASMO",
  price: "6,999",
  originalPrice: "7,777",
  startDate: "1 Apr, 2025"
},
{
  grade: "5,6",
  level: "OMM Level 4",
  batch: "Spring 2025 Batch",
  exams: "Math Kangaroo, AMO, SASMO, NMTC",
  price: "6,999",
  originalPrice: "7,777",
  startDate: "1 Apr, 2025"
},
{
  grade: "7,8",
  level: "OMM Level 5",
  batch: "Spring 2025 Batch",
  exams: "Math Kangaroo, NMTC, AMC-8",
  price: "10,000",
  originalPrice: "11,111",
  startDate: "2 Apr, 2025"
},
{
  grade: "9,10",
  level: "OMM Level 6",
  batch: "Spring 2025 Batch",
  exams: "Math Kangaroo, NMTC, AMC 10, IOQM, IOQM Certificate",
  price: "10,000",
  originalPrice: "11,111",
  startDate: "2 Apr, 2025"
},
{
  grade: "8-12",
  level: "OMM Level 7",
  batch: "Spring 2025 Batch",
  exams: "AMC-10, AMC-12, IOQM, RMO Basics",
  price: "12,000",
  originalPrice: "13,333",
  startDate: "1 Apr, 2025"
},
{
  grade: "7,8",
  level: "OMM Level 5",
  batch: "Spring 2025 Weekend Batch",
  exams: "Math Kangaroo, NMTC, AMC-8",
  price: "10,000",
  originalPrice: "11,111",
  startDate: "6 Apr, 2025"
}
];

const MathCourses = () => {
return (
  <div className=" text-white py-12 px-6 md:px-12">
    <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
      Courses offered for <span className="text-yellow-400 italic">Maths ✨</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <div key={index} className="bg-white text-black rounded-2xl p-6 shadow-lg relative">
          <span className="absolute top-3 left-3 bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full font-semibold">
            Grade {course.grade}
          </span>
          <span className="absolute top-3 right-3 bg-purple-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
            Batch Starts On {course.startDate}
          </span>
          <h3 className="text-xl font-bold mt-8">{course.level}</h3>
          <p className="text-gray-600">{course.batch}</p>
          <p className="text-sm text-gray-500 mt-2">{course.exams}</p>
          <p className="mt-4 text-lg font-semibold">
            <span className="line-through text-gray-500 text-sm mr-2">
              ₹{course.originalPrice}
            </span>
            ₹{course.price}
          </p>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </div>
);
};





const scienceCourses = [
{
  grade: "8-10",
  title: "NSEJS PRIME 2025",
  description: "NSEJS 2025",
  originalPrice: "7,777",
  discountedPrice: "6,999",
  batchStart: "29 Jan, 2025",
},
{
  grade: "9-12",
  title: "NSEP 2025 Module 1",
  description: "NSEP 2025",
  originalPrice: "3,000",
  discountedPrice: "2,700",
  batchStart: "3 Feb, 2025",
},
{
  grade: "9-12",
  title: "NSEP 2025 - Full Course",
  description: "NSEP 2025",
  originalPrice: "13,500",
  discountedPrice: "12,150",
  batchStart: "3 Feb, 2025",
},
];

const ScienceCourses = () => {
return (
  <div className=" py-10 px-5 text-white">
    <h2 className="text-center text-3xl font-bold mb-6">
      Courses offered for <span className="text-yellow-400">Science ✨</span>
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {scienceCourses.map((course, index) => (
        <div key={index} className="bg-white text-black p-6 rounded-2xl shadow-lg relative">
          <span className="absolute top-4 left-4 bg-purple-200 text-purple-700 px-3 py-1 text-xs rounded-full font-semibold">
            Grade {course.grade}
          </span>
          <span className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 text-xs rounded-full font-semibold">
            Batch Starts On {course.batchStart}
          </span>
          <h3 className="text-xl font-bold mt-10">{course.title}</h3>
          <p className="text-gray-700 mt-2">{course.description}</p>
          <div className="mt-4 text-lg font-semibold">
            <span className="line-through text-gray-500 text-sm">₹{course.originalPrice}</span>
            <span className="ml-2 text-green-600">(Upto 10% OFF)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{course.discountedPrice}</p>
          <button className="mt-4 bg-orange-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-orange-600">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </div>
);
};




const TeachingStyle = () => {
const videos = [
  {
    // thumbnail: "https://i.ytimg.com/vi/8ThQV2FKHWE/sddefault.jpg",
    videoUrl: "https://www.youtube.com/embed/cXDel5a4-OA?si=H1teMpUBqUF9O20A",
  },
  {
    // thumbnail: "https://i.ytimg.com/vi/NGqTe1Tok3Q/sddefault.jpg",
    videoUrl: "https://www.youtube.com/embed/09d2C5BDlz0?si=ZNzwWdzqTwwAe8tr",
  },
];

return (
  <div className="bg-[#fff7f2] py-10 px-4 text-center">
    <h2 className="text-2xl font-bold text-black">
      Discover Our Teaching Style with <span className="text-red-500">Free</span> Educational Videos 📚
    </h2>
    <div className="mt-6 grid md:grid-cols-2 gap-6 justify-center">
      {videos.map((video, index) => (
        <div key={index} className="w-full max-w-md mx-auto">
          <iframe width="560" height="315" src={video.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      ))}
    </div>
  </div>
);
};





const testimonials = [
{
  name: "Gauransh Kapoor",
  role: "Student",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4,
  feedback:
    "The teachers' dedication with crisp lectures, challenging assignments, and mock tests greatly enhanced my exam readiness. Thanks to Vidyarjan for their pivotal role in my journey.",
},
{
  name: "Avra Sanyal",
  role: "Parent",
  image: "https://randomuser.me/api/portraits/men/45.jpg",
  rating: 4,
  feedback:
    "Vidyarjan's structured approach from class 8 helped Arnab identify his strengths and weaknesses, leading to his success and securing rank 1 in the ISI Olympiad.",
},
{
  name: "Shivani Patel",
  role: "Student",
  image: "https://randomuser.me/api/portraits/women/29.jpg",
  rating: 4,
  feedback:
    "Vidyarjan is a great help to me, its test assignments are all very good. We are able to interact with all the teachers very well and they are much better than school teachers.",
},
];

const Testimonials = () => {
return (
  <section className="bg-white py-12">
    <h2 className="text-center text-3xl font-bold mb-6">
      <i>Testimonials ✨</i>
    </h2>
    <div className="flex justify-center gap-6 flex-wrap">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white shadow-lg p-6 rounded-xl border w-80 text-center"
        >
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < testimonial.rating ? "text-orange-500" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-700 italic">{testimonial.feedback}</p>
          <div className="mt-4 flex flex-col items-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mb-2 border-2 border-gray-300"
            />
            <p className="font-bold">{testimonial.name}</p>
            <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {testimonial.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
);
};


const students = [
{
  name: "Arnab Sanyal",
  image: "https://randomuser.me/api/portraits/men/10.jpg",
  rank: "AIR 1",
},
{
  name: "Soham Gupta",
  image: "https://randomuser.me/api/portraits/men/20.jpg",
  rank: "AIR 2",
},
{
  name: "Sounak Kar",
  image: "https://randomuser.me/api/portraits/men/30.jpg",
  rank: "AIR 4",
},
];

const VedantuOlympiad = () => {
return (
  <div className="bg-[#1A0136] text-white py-10 px-5 md:px-20">
    <div className="text-center">
      <span className="bg-purple-600 text-xs py-2 px-4 rounded-full">✨ VIDYARJAN TODAY, 🏆 OLYMPIAD TOMORROW! </span>
      <h2 className="text-3xl md:text-5xl font-bold mt-4">
        <span className="text-white">VIDYARJAN</span> <span className="text-yellow-400">Olympiad School</span>
      </h2>
    </div>

    <div className="flex flex-wrap justify-center gap-5 mt-8 text-sm md:text-lg">
      <p className="border-b border-gray-400">Logical / <strong>Critical Thinking + Problem Solving</strong> Approach</p>
      <p className="border-b border-gray-400">Strong base for <strong>Olympiad / JEE / ISI / NEET</strong></p>
      <p className="border-b border-gray-400">Improvement in <strong>School / Board Score</strong></p>
      <p className="border-b border-gray-400"><strong>Quick Calculation</strong></p>
    </div>

    <div className="bg-orange-600 rounded-xl mt-10 p-8 text-center">
      <h3 className="text-2xl font-bold">Our Students Shine Bright in <span className="text-yellow-300">Indian Statistical Institute (ISI) - UG 2024</span></h3>
      <div className="flex flex-wrap justify-center mt-6 gap-6">
        {students.map((student, index) => (
          <div key={index} className="text-center">
            <img src={student.image} alt={student.name} className="w-24 h-24 rounded-full border-4 border-white mx-auto" />
            <p className="mt-2 font-bold">{student.name}</p>
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{student.rank}</span>
          </div>
        ))}
      </div>
      <div className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-full mt-8 inline-block text-xl">18 Students in Top 100 AIRs</div>
    </div>

    <div className="text-center mt-10">
      <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full text-lg">Register For Free ➜</button>
    </div>
  </div>
);
};




const Olympiad = () => {
return (
  <div>
      <VedantuOlympiad/>
      <EngagingCourses/>
      <div className="bg-gradient-to-b from-purple-900 to-black">

      <MathCourses/>
      <ScienceCourses/>
      <TeachingStyle/>
      <Testimonials/>
      </div>
     
  </div>
)
}

export default Olympiad
