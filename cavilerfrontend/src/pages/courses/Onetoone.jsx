import React, { useState } from "react";
import { CalendarCheck, Users, BookOpen, FolderOpen } from "lucide-react";
import { UserCheck, Star } from "lucide-react";

const PremiumTutionForm = () => {
  return (
    <div className="relative bg-white px-6 md:px-12 py-10 md:py-16 lg:py-20 max-w-7xl mx-auto">
      {/* Background Image */}
      <img
        src="https://d9hhrg4mnvzow.cloudfront.net/courses.vedan…b094f-group-1000009166_1000000000000000000028.png"
        alt="Curved Background"
        className="absolute right-0 top-0 md:top-[-50px] lg:top-[-100px] w-64 md:w-80 lg:w-[400px] -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-orange-500">One - to - One</span> <br />
            <span className="text-black underline">Live Premium Tutions</span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Premium Tutors. Personal Attention. Perfect Learning.
          </p>

          {/* Leaf Icon with Text */}
          <div className="flex items-center mt-4">
          <BookOpen className="w-6 h-6 mr-2 text-orange-500" />
            <span className="text-gray-700 text-sm md:text-base">
              Attend free demo classes with our premium tutor
            </span>
          </div>

          {/* Form */}
          <p className="text-red-600 font-semibold mt-4">
            Fill the form and we will get back to you!
          </p>
          <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name *"
              className="border p-2 rounded w-full"
            />
            <div className="flex border p-2 rounded w-full">
              <span className="mr-2">🇮🇳 +91</span>
              <input type="text" placeholder="Phone Number *" className="w-full outline-none" />
            </div>
            <input type="email" placeholder="Email *" className="border p-2 rounded w-full" />
            <select className="border p-2 rounded w-full">
              <option>Select Grade *</option>
            </select>
            <input type="text" placeholder="Board *" className="border p-2 rounded w-full" />
          </form>
          <button className="bg-orange-500 text-white px-4 py-2 rounded mt-4">
            Submit form
          </button>
        </div>

        {/* Right Section */}
        <div className="relative">
          {/* Girl Image */}
          <img
            src="/assets/img4.jpg"
            alt="Girl"
            className="relative rounded-b-full  w-64 md:w-80 lg:w-[400px] mx-auto"
          />

          {/* Tutor Rating */}
          <div className="absolute top-6 left-6 bg-white shadow-lg px-3 py-2 rounded-md flex items-center">
            <span className="text-orange-500 font-bold text-lg">⭐ 4.8</span>
            <span className="ml-2 text-sm text-gray-600">Our tutor rating</span>
          </div>

          {/* Daily Live Classes */}
          <div className="absolute bottom-20 left-6 bg-white shadow-lg px-3 py-2 rounded-md">
            <span className="text-orange-500 font-bold">📺 Daily</span>{" "}
            <span className="text-gray-600">Live classes</span>
          </div>

          {/* Students Cleared */}
          <div className="absolute bottom-6 right-6 bg-white shadow-lg px-3 py-2 rounded-md">
            <span className="text-orange-500 font-bold">1000+</span>{" "}
            <span className="text-gray-600">students clear JEE.Adv 2023</span>
          </div>

          {/* Doubt Resolution */}
          <div className="absolute bottom-2 left-6 bg-white shadow-lg px-3 py-2 rounded-md flex items-center">
            <span className="text-black">📚 25 Lakh+ doubt resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};





const features = [
  {
    title: "Customised Course Plans",
    description:
      "Tailor-Made Course Plans for Students by Academic Counsellors. Our panel of academic counsellors assesses each student to create a customised curriculum that meets individual needs.",
    icon: <CalendarCheck className="w-10 h-10 text-orange-500" />,
    bgColor: "bg-purple-100",
  },
  {
    title: "Personalised Attention",
    description:
      "One-to-One Premium Classes with Expert Tutors for Customised Learning. Our expert tutors offer maximum personal attention by solving the student’s doubts and helping them with their homework.",
    icon: <Users className="w-10 h-10 text-orange-500" />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Conceptual Clarity",
    description:
      "One-to-One Premium Classes with Expert Tutors for Customised Learning. Our expert tutors provide maximum clarity by solving doubts and ensuring better understanding.",
    icon: <BookOpen className="w-10 h-10 text-orange-500" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Dedicated Student Account Managers",
    description:
      "One-to-One Premium Classes with Expert Tutors for Customised Learning. Our expert tutors offer personal attention by solving doubts and helping students with homework.",
    icon: <FolderOpen className="w-10 h-10 text-orange-500" />,
    bgColor: "bg-pink-100",
  },
];

const WhyStudyWithUs = () => {
  return (
    <div className=" px-6 md:px-12 max-w-6xl mx-auto text-start">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Why study with us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md flex flex-col items-start ${feature.bgColor}`}
          >
            <div className="p-3 bg-white rounded-full shadow-md">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};





const BookFreeDemo = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-6 md:p-12  max-w-7xl mx-auto">
      {/* Left Text Section */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Book a <span className="text-orange-500">Free demo</span> class with our premium tutor
        </h2>
        <p className="text-gray-600 mt-2">Get Personalized tutor experience!</p>
        <button className="mt-4 px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
          Book demo session &rarr;
        </button>
      </div>

      {/* Right Image Section */}
      <div className="mt-6 md:mt-0 md:ml-6">
        <img
          src="/assets/img1.jpg"
          alt="Premium tutor"
          className="w-48 md:w-64 rounded-full border-orange-600 border-4"
        />
      </div>
    </div>
  );
};



const courses = [
  {
    id: 1,
    title: "Structured/Exam Preparation Courses",
    description:
      "For students in classes 6-12 that tackle individual subjects, such as CBSE Class 10 Maths or Class 11. JEE Physics or SAT Preparation, taught by premium one-to-one tutors.",
    image: "https://d9hhrg4mnvzow.cloudfront.net/courses.Vidyarjan.com/one-to-one-live/5a7bf0d0-rectangle-34_108q04s000000000000028.png",
  },
  {
    id: 2,
    title: "Java & Python Courses",
    description:
      "We provide students courses in programming languages like Java & Python. From basic to intermediate learners, our courses offer a flexible way to achieve objectives.",
    image: "https://d9hhrg4mnvzow.cloudfront.net/courses.Vidyarjan.com/one-to-one-live/9619a3f6-rectangle-34_108q04t000000000000028.png",
  },
  {
    id: 3,
    title: "French Courses",
    description:
      "Each individual is thoroughly assessed with a free introductory session by expert teachers. The comprehensive classes cover grammar, writing, and speaking.",
    image: "https://d9hhrg4mnvzow.cloudfront.net/courses.Vidyarjan.com/one-to-one-live/a852bc01-rectangle-34-1_108q04s000000000000028.png",
  },
];

const CoursesWeOffer = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
        Courses we offer <span role="img" aria-label="book">📚</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">{course.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{course.description}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600">
              Start Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};




const tutors = [
  {
    id: 1,
    image: "/assets/Teachers/Abhijit.jpg",
    name:"Abhijit Sir",
  },
  {
    id: 2,
    image: "/assets/Teachers/Aditi.jpg",
    name:"Aditi Mam",
  },
  {
    id: 3,
    image: "/assets/Teachers/Shripad.jpg",
    name:"Shripad Sir",
    
  },
];

const MeetOurTutors = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet our expert Tutors</h2>

      {/* Top Section */}
      <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <UserCheck className="text-orange-500 w-8 h-8" />
          <p className="text-gray-700 font-medium">
            Our 600-strong team has been carefully selected after a stringent 5 stage process.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Star className="text-yellow-500 w-8 h-8" />
          <p className="text-gray-700 font-medium">
            Our tutors’ experience and quality shows in our average tutor rating of 4.8.
          </p>
        </div>
      </div>

      {/* Tutor Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="relative pb-10 group">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2  font-bold text-xl">{tutor.name}</div>
            {/* Tutor Image */}
            <img src={tutor.image} alt={tutor.name} className=" md:mt-14 relative z-20 w-full h-auto" />
            {/* Text Box */}
        
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-bold">Book your tutor for better results<span className="text-red-500">💯</span></h3>
        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600">
          Find your personal tutor →
        </button>
      </div>
    </div>
  );
};





const StoriesThatInspire = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title & Intro */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
        <div className="md:w-1/2 pr-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-4">
            Stories that inspire <span className="ml-2">🏆</span>
          </h2>
          <p className="text-gray-700">
            Don’t just take our word for it. Listen to our students’ inspiring stories and learn how Vidyarjan has made a meaningful impact in their lives by helping them cruise through their learning journey.
          </p>
        </div>
        <div className="md:w-1/2">
          <iframe
            className="w-full aspect-video rounded-lg"
            src="https://youtu.be/QdBZY2fkU-0?si=0JCFUmYc88lCaC2z"
            title="Student Testimonial Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Student Testimonials */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Janesh's Testimonial */}
        <div className="bg-gray-100 p-4 rounded-lg flex border border-gray-300">
          <img
            src="https://d9hhrg4mnvzow.cloudfront.net/courses.Vidyarjan.com/one-to-one-live/dbc5a2fa-whatsapp-image-2024-01-12-at-20-44-1_104a09j000000000000028.png"
            alt="Janesh"
            className="w-24 h-24 rounded-md object-cover mr-4"
          />
          <div>
            <p className="text-gray-700 text-sm">
              My son Janesh enrolled in Vidyarjan JEE Foundation course and coached with Ms. Shilpa Mam. Compared to the past, his interest and understanding in math has improved a lot. Janesh recently participated in the LogiQids mental aptitude Olympiad. We are glad to inform you that he has cleared the 1st round and qualified for the final round of the Olympiad. Janesh was able to secure 81st rank at the Zonal level which includes participation from 12 countries; 72,915 students participated in grade 8.
            </p>
            <p className="mt-2 font-bold text-gray-900">Janesh</p>
            <p className="text-red-500 text-sm font-semibold">Rank 81 of 72,915 students<br /> LogiQids Olympiad</p>
          </div>
        </div>

        {/* Agastya Menon's Testimonial */}
        <div className="bg-gray-100 p-4 rounded-lg flex border border-gray-300">
          <img
            src="https://d9hhrg4mnvzow.cloudfront.net/courses.Vidyarjan.com/one-to-one-live/b8d9e2de-whatsapp-image-2024-01-12-at-20-07-1_104105c000000000000028.png"
            alt="Agastya Menon"
            className="w-24 h-24 rounded-md object-cover mr-4"
          />
          <div>
            <p className="text-gray-700 text-sm">
              Vidyarjan's teachers are professional and knowledgeable in their respective fields. They provide personalized guidance to their students and are always willing to answer any questions. They are also patient and understanding, making it easy for students to learn and understand the material. Furthermore, their passion and dedication to teaching make them an excellent choice for anyone looking for a great learning experience. Overall, Vidyarjan teachers are highly recommended for anyone looking for quality education.
            </p>
            <p className="mt-2 font-bold text-gray-900">Agastya Menon</p>
            <p className="text-red-500 text-sm font-semibold">ICSE Class 10 Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};






const HaveQuestion = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is One-to-One Class?",
      answer:
        "Introducing OTO, Vidyarjan's One-to-One learning program! With OTO, students receive complete syllabus preparation, personalised attention from a specific tutor, and the flexibility to learn difficult topics and clarify doubts on their own schedule. Plus, we can create customised learning programs for the entire academic year.",
    },
    {
      question: "What are the benefits of One-to-One online classes?",
      answer:
        "Experience the ultimate personalised education with Vidyarjan's One-to-One online classes! Our program offers flexible scheduling to fit your unique learning needs, and the ability to learn at your own pace.",
    },
    {
      question: "For which Boards are One-to-One classes available?",
      answer:
        "Currently, Vidyarjan is offering One-to-One classes for CBSE, ICSE, IB, IGCSE, State Boards, Australian Board & Common Core (USA).",
    },
    {
      question: "Which students can take One-to-One classes?",
      answer: "At present, One-to-One classes are available for students of classes 3-13.",
    },
  ]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Have questions?</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-md border border-gray-200"
          >
            <h3 className="font-semibold text-lg">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Footer =()=>{
    return <div className="h-30 flex  w-full bg-blue-950 py-5 justify-center items-center ">
          <p className="text-white font-bold text 3xl">Copyright © Vidyarjan. All rights reserved</p>
    </div>
}



 function Header() {
    return (
      <header className="flex flex-col md:flex-row items-center justify-between p-4 lg:px-52 bg-white ">
        {/* Logo */}
        <div className="text-orange-500 text-3xl font-bold italic">
          Vidyarjan
        </div>
  
        {/* Categories */}
        <nav className="mt-2 md:mt-0 text-center md:text-left">
          <p className="text-sm md:text-base font-medium text-gray-800">
            CBSE | ICSE | IB | IGCSE | State Boards | K12 Australian Board | Common Core (USA)
          </p>
          <p className="text-sm md:text-base font-medium text-gray-800">
            SAT Prep | Java | Python | French
          </p>
        </nav>
      </header>
    );
  }
  

const Onetoone = () => {
  return (
    <div>
        <Header/>
        <PremiumTutionForm/>
        <WhyStudyWithUs/>
        <BookFreeDemo/>
        <CoursesWeOffer/>
        <MeetOurTutors/>
        <StoriesThatInspire/>
        <HaveQuestion/>
        <Footer/>
    </div>
  )
}

export default Onetoone;
