import React from 'react'
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp,ChevronRight } from "lucide-react";
import { Calendar, ShieldCheck, FileText, MessageCircle, CreditCard } from "lucide-react";
import { Trophy, Banknote } from "lucide-react";


const citiesData = [
  { name: "Bhilai", img: "https://source.unsplash.com/100x100/?city,building" },
  { name: "Adilabad", img: "https://source.unsplash.com/100x100/?architecture" },
  { name: "Buldana", img: "https://source.unsplash.com/100x100/?monument" },
  { name: "Karim-Nagar", img: "https://source.unsplash.com/100x100/?cityscape" },
  { name: "Hyderabad", img: "https://source.unsplash.com/100x100/?hyderabad" },
  { name: "Warangal", img: "https://source.unsplash.com/100x100/?temple" },
  { name: "Lucknow", img: "https://source.unsplash.com/100x100/?lucknow" },
  { name: "Vijayawada", img: "https://source.unsplash.com/100x100/?bridge" },
  { name: "Tirupati", img: "https://source.unsplash.com/100x100/?tirupati" },
  { name: "Visakhapatnam", img: "https://source.unsplash.com/100x100/?beach" },
  { name: "Pune", img: "https://source.unsplash.com/100x100/?pune" },
  { name: "Bhubaneswar", img: "https://source.unsplash.com/100x100/?odisha" },
  { name: "Delhi", img: "https://source.unsplash.com/100x100/?delhi" },
  { name: "Bangalore", img: "https://source.unsplash.com/100x100/?bangalore" },
  { name: "Chennai", img: "https://source.unsplash.com/100x100/?chennai" },
  { name: "Patna", img: "https://source.unsplash.com/100x100/?bihar" },
  { name: "Kakinada", img: "https://source.unsplash.com/100x100/?river" },
  { name: "Pondicherry", img: "https://source.unsplash.com/100x100/?pondicherry" },
  { name: "Coimbatore", img: "https://source.unsplash.com/100x100/?coimbatore" },
  { name: "Tiruchirapalli", img: "https://source.unsplash.com/100x100/?temple" },
  { name: "Madurai", img: "https://source.unsplash.com/100x100/?madurai" },
  { name: "Sharjah", img: "https://source.unsplash.com/100x100/?sharjah" },
  { name: "Abu-Dhabi", img: "https://source.unsplash.com/100x100/?abudhabi" }
];
 function AvailableCities() {
  const [expanded, setExpanded] = useState(false);
  const visibleCities = expanded ? citiesData : citiesData.slice(0, 8);

  return (
    <div className="text-center lg:px-64 px-3 py-8">
      <h2 className="text-3xl font-bold">
        Now Available in <span className="text-orange-500 underline">28 Cities</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        {visibleCities.map((city, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center  space-x-3 border-2 border-orange-500 p-3 rounded-full shadow-lg"
          >
            <img src={city.img} alt={city.name} className="w-10 h-10 rounded-full" />
            <span className="font-semibold text-xs">{city.name}</span>
          </motion.div>
        ))}
      </div>
      <button
        className="mt-6 text-orange-500 font-semibold flex items-center mx-auto"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View Less" : "View More"}
        {expanded ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
      </button>
    </div>
  );
}


const learningCenters = [
  {
    name: "Sector 10, Bhilai",
    address: "Vedantu Learning Centre, Shop 148, New Civic Centre, Near Miraz Cinema, Bhilai, Chhattisgarh",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/146e31c1-21…d-932cb1b839c6-1709131436964-4102609977196379.png"
  },
  {
    name: "Adilabad, Adilabad",
    address: "Vedantu Learning Centre, Aditya Junior College, beside RTC Bus depot, Vidya Nagar, Adilabad",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/48e14d3e-1d…7-f75603cc4c17-1709190272857-4102609977196379.png"
  },
  {
    name: "Buldana, Buldana",
    address: "Chaitanya wadi, Plot No.17, Behind ICICI Bank Buldhana, in Front Of Sharda Convent School, Buldana",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/146e31c1-21…d-932cb1b839c6-1709131436964-4102609977196379.png"
  },
  {
    name: "Karim Nagar, Karim-Nagar",
    address: "Coming soon in Karim Nagar",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/48e14d3e-1d…7-f75603cc4c17-1709190272857-4102609977196379.png"
  },
  {
    name: "AS Rao Nagar, Hyderabad",
    address: "3rd floor, The Vibrant Commercial Complex, Plot no. 101, Beside Thatha Hospital, Anupuram, Dr AS Rao",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/a360223c-5e…b-e35e59f8d5a4-1709134903388-4102609977196379.png"
  },
  {
    name: "Nizampet, Hyderabad",
    address: "Vedantu Centre, Vignan School, Kukatpally, Venkatraya Nagar, Nizampet, Hyderabad, Telangana",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/c19244ac-ad…b-0164fec19277-1709135072850-4102609977196379.png"
  }
];

const LearningCenters = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedCenters = showMore ? learningCenters : learningCenters.slice(0, 3);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Popular <span className="text-orange-500">Vidyarjan Learning Centres</span> Near You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedCenters.map((center, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img src={center.image} alt={center.name} className="rounded-lg mb-4 w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold">{center.name}</h3>
            <p className="text-sm text-gray-600">{center.address}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg w-full">Visit Centre</button>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-orange-500 font-semibold hover:underline"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
};







const WhyVedantu = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-orange-600">Why Vidyarjan?</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            Unlock True Potential Through
            <span className="text-orange-500"> Highest Personal Attention</span>
          </h3>
          <p className="text-gray-700 mt-4 max-w-2xl">
            At Vidyarjan, we provide the highest personal attention through our
            <span className="font-bold"> Student Obsessed Heroes</span> and our
            <span className="font-bold"> Tech-integrated Systems</span>.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end mt-8">
          <img
            src="/assets/img2BackgroundRemoved.png"
            alt="Vedantu Students"
            className="w-full -mt-40 max-w-lg"
          />
        </div>

        {/* Feature Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Left Box */}
          <div className="bg-orange-100 p-6 rounded-xl relative pb-32">
            <h4 className="text-xl font-bold">
              Student Obsessed Heroes of <span className="text-orange-500">Personal Attention</span>
            </h4>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              <li>Top Master Teacher</li>
              <li>Dedicated Student Academic Mentor</li>
              <li>Accessible Doubt Expert</li>
            </ul>
            {/* <img
              src="https://vmkt.vedantu.com/vmkt/PROD/png/746c0127-b803-48d6-b592-42207ee8f422-1705588970706-4102418410874681.png"
              alt="Vedantu Teachers"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[250px]"
            /> */}
          </div>

          {/* Right Box */}
          <div className="bg-orange-100 p-6 rounded-xl relative pb-32">
            <h4 className="text-xl font-bold">
              Tech-integrated Systems of <span className="text-orange-500">Personal Attention</span>
            </h4>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              <li>Hi-tech Interactive Classrooms</li>
              <li>Doubt App, Tatva Books, Class Recording and Teacher Notes</li>
              <li>Regular Tests, Lecture Library and Pedagogy App</li>
            </ul>
            {/* <img
              src="https://vmkt.vedantu.com/vmkt/PROD/png/f473daf3-7359-43c9-945f-a95a4c634c05-1705589161538-4102418410874681.png"
              alt="Vedantu Tech"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[250px]"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};






const InteractiveExperience = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white py-12 px-4 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          The Best <span className="text-orange-600">Interactive Learning Experience</span>
        </h2>
      </div>
      
      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-xl text-center">
            <img src={feature.image} alt={feature.title} className="w-full rounded-lg mb-4" />
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-700 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
      
      {/* Video Section */}
      <div className="mt-12 gap-4 md:flex text-center">
        {showVideo ? (
          <iframe
            className="w-full max-w-2xl h-64 md:h-96 mx-auto rounded-lg"
            src="https://www.youtube.com/embed/374e272c-1040-4934-a73b-bb78806dfda7"
            title="Vedantu Tour"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="relative inline-block cursor-pointer" onClick={() => setShowVideo(true)}>
            <img
              src="https://vmkt.vedantu.com/vmkt/PROD/png/680db964-2f8a-409f-8900-4b7bbfaded51-1705586909391-4102418410874681.png"
              alt="Take a Tour"
              className="w-full max-w-lg rounded-lg"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg p-3 rounded-lg">
              ▶ Take a Tour
            </button>
          </div>
        )}
      {/* Booking Section */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold">
          Discover Our Interactive Classes With <span className="text-orange-600">A Guided Center Tour.</span>
        </h3>
        <p className="text-gray-700 mt-2">Receive personalized guidance and course recommendations with <b>FREE counseling session</b>.</p>
        <p className="text-gray-700">Join <b>FREE demo classes</b> led by <b>Top Master Teachers</b>.</p>
        <p className="text-gray-700">Get <b>exclusive offers</b> by visiting us.</p>
        <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg font-bold">Book a Visit</button>
      </div>
      </div>
      
    </div>
  );
};

const features = [
  {
    title: "3D Visualisations",
    description: "Master Teacher teaches every concept using highly engaging and immersive 3D visualisations.",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/f2751bb6-4977-4cbe-a667-c29b6c0f30fb-1705576715531-4102418410874681.png",
  },
  {
    title: "Interactive Clickers",
    description: "Every student is equipped with Clickers and can actively participate in class.",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/f376848e-8052-4357-89b9-7331d90f63ff-1705576782382-4102418410874681.png",
  },
  {
    title: "Gamified Classrooms",
    description: "Students can engage in gamified learning with Quizzes, Leaderboards, and fastest finger first challenges.",
    image: "https://vmkt.vedantu.com/vmkt/PROD/png/9f8e5801-c6c6-4f93-ad50-7a56468d4084-1705576830357-4102418410874681.png",
  },
];


const ParentsNeeds = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-white max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="lg:w-1/2 order-2 sm:order-1 space-y-4 text-center lg:text-left">
        <h2 className="text-2xl font-bold">
          <span className="text-orange-500">Parents</span>, we know exactly what you need
        </h2>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <MessageCircle className="text-orange-500" /> Daily SMS on Attendance
          </p>
          <p className="flex items-center gap-2">
            <FileText className="text-orange-500" /> Performance & Class Engagement report
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="text-orange-500" /> Test Results on WhatsApp
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="text-orange-500" /> Regular & On-demand Parent Teacher Meetings
          </p>
          <p className="flex items-center gap-2">
            <ShieldCheck className="text-orange-500" /> Unmatched Commitment to Child Safety
          </p>
          <p className="flex items-center gap-2">
            <CreditCard className="text-orange-500" /> Flexible payment options
          </p>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          Doubts? Ask Now
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 order-1 sm:order-2 flex justify-center mt-6 lg:mt-0">
        <img
          // src="https://vmkt.vedantu.com/vmkt/PROD/png/b34ef0d3-4b5f-4a02-b901-20c5810196f4-1696786781362-4102515828415223.png"
          src="/assets/Teachers/Rohit.jpg"
          alt="Happy Parent"
          className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
        />
      </div>
    </div>
  );
};




const Scholarships = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-orange-50 max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
        <h2 className="text-2xl font-bold">
          Get up to 70% scholarship with the
          <span className="text-orange-500"> Instant Vidyarjan Scholarship Admission Test (IVSAT)</span>
        </h2>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Trophy className="text-orange-500" /> Upto 70% Scholarship on Vedantu Course Admissions
          </p>
          <p className="flex items-center gap-2">
            <Banknote className="text-green-500" /> Get 2X Scholarship by taking the Test at Our Centre
          </p>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          Register For FREE
        </button>
        <p className="text-sm text-gray-600">Hurry, limited seats are left</p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
        <img
          src="https://vmkt.vedantu.com/vmkt/PROD/png/7e1a1951-f8da-4ded-99d6-f55ab384215c-1696792097453-4102515828415223.png"
          alt="Scholarship Winner"
          className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
        />
      </div>
    </div>
  );
};




// const imageSrc = "https://vmkt.vedantu.com/vmkt/PROD/png/ab9d8f70-938e-44a4-b58b-fd2bd4bff91e-1717674330396-4102609067513531.png";
const images = [
  "/assets/OurResults/jee-1.jpg",
  "/assets/OurResults/jee-2.jpg",
  "/assets/OurResults/neet-1.jpg",
  "/assets/OurResults/neet-2.jpg",
]
// const images =Array(10).fill(imageSrc)
const OurOutStandingResults = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  };

  return (
    <div className="relative w-full  max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.concat(images[0]).map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full flex-shrink-0" />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === (currentIndex % images.length) ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};



const VisitTheCenter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="md:w-1/2 text-left space-y-4">
        <h2 className="text-3xl font-bold text-black">
          Visit the centre for a personalised <span className="text-orange-500">experience</span>
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-orange-500">&#x2022;</span>
            <p>Take a tour of the centre to experience our <span className="font-bold">interactive classes</span></p>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-orange-500">&#x2022;</span>
            <p>Get <span className="font-bold">Free 1-1 counselling</span> & find the right course for you</p>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-orange-500">&#x2022;</span>
            <p>Visit us to avail <span className="font-bold">exclusive discounts</span></p>
          </li>
        </ul>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold text-center mb-4">
          Share your information to <br /> Book a Visit to our Offline Centres
        </h3>
        <form className="space-y-4">
          <input type="text" placeholder="Enter your name" className="w-full p-2 border rounded" />
          <div className="relative">
            <input type="text" placeholder="Enter mobile no." className="w-full p-2 border rounded" />
            <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">Send OTP</button>
          </div>
          <select className="w-full p-2 border rounded">
            <option>Select your grade</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Select your target</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Select your city</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Select your centre</option>
          </select>
          <button type="submit" className="w-full bg-black text-white p-2 rounded">Book a visit</button>
        </form>
      </div>
    </div>
  );
};









const faqs = [
  "Which coaching centre near you is best for NEET Preparation?",
  "How are the classes conducted at Vedantu for JEE and NEET preparation?",
  "What makes Vidyarjan stand out among other coaching centers for JEE and NEET?",
  "How can I find NEET and JEE classes near me?",
  "What are the success rates or achievements of students who have undergone coaching at Vidyarjan for NEET and JEE exams?",
  "How can I enroll in Vidyarjan's NEET or JEE coaching centers near me?",
  "Are there specific batches or schedules available at Vidyarjan for NEET and JEE coaching?",
  "Does Vidyarjan provide additional resources apart from classroom coaching for NEET and JEE?",
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl px-3  mx-auto py-8">
      <h2 className="text-2xl px-2 font-bold mb-4 text-black">
        Frequently <span className="text-orange-500">Asked Questions</span>
      </h2>
      <div className="space-y-2">
        {faqs.map((question, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 break-words">{question}</span>
              <ChevronDown
                className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600">Answer for: {question}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



const BottomDescription = () => {
  return (
    <div className="max-w-3xl px-3 mx-auto py-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        Vidyarjan Coaching Centres for JEE Main, JEE Advanced and NEET Prep in Your Vicinity
      </h2>
      <p className="mb-4">
        Are you confused while searching NEET and JEE Coaching Classes near me? Are you having difficulty in choosing the best institute for NEET?
      </p>
      <p className="mb-4">
        Join Vidyarjan Offline Learning Centre in 12 cities like Muzaffarpur, Chennai, Bangalore, and more for NEET and JEE coaching near you. 
        Experience high-quality tuition, personalised attention, and proximity to your location. Benefit from expert guidance and a supportive 
        environment. Elevate your NEET and JEE preparation at our coaching centres nearby!
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Vidyarjan Coaching Centres Near You: Reasons To Join</h3>
      <p className="mb-4">
        Vidyarjan has been providing you with NEET and JEE Online Coaching Classes for the past 10 years. Now, we are in your city with 100% offline 
        learning. Engage with Interactive Clickers for active participation, Immersive Learning through 3D visuals & quizzes, and Engaging Smartboards 
        breathing life into concepts. Join our NEET and JEE coaching near you, benefiting from hi-tech tools that make learning dynamic and enjoyable.
      </p>
      <p className="mb-4">
        Unleash your potential with top-notch NEET and JEE coaching at Vidyarjan offline centres. Learn from India’s premier educators, renowned for 
        creating top rankers in JEE, NEET, and foundational courses for grades 9 and 10. With 16+ years of expertise now available in 12 cities, our 
        Coaching centres for JEE Main, JEE Advanced and NEET offer personalised attention, robust progress tracking, and unlimited doubt-solving 
        sessions.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        Essential Details for Parents About Vidyarjan's Coaching Centre
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Monthly Parent-Teacher Meetings</strong> - Experience open communication at Vidyarjan through monthly meetings for a cohesive approach 
          to your child’s progress in JEE and NEET coaching.
        </li>
        <li>
          <strong>Positive Learning Environment</strong> - Benefit from a nurturing atmosphere, fostering confidence and curiosity crucial for exam 
          readiness.
        </li>
        <li>
          <strong>Flexible Payment Options</strong> - Access quality coaching with varied payment choices, ensuring affordability for every parent.
        </li>
        <li>
          <strong>Performance Reports</strong> - Receive comprehensive reports aiding progress tracking, strengths identification, and targeted 
          improvement strategies for academic success.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Conclusion</h3>
      <p className="mb-4">
        Experience unmatched NEET and JEE coaching excellence near you at Vidyarjan Offline Learning Centres. Benefit from personalised attention, 
        hi-tech classrooms, and a supportive environment in 12+ cities across India. Engage in collaborative learning, access vast resources, and enjoy 
        interactive sessions for effective NEET and JEE preparation. Explore our interactive classes with a guided tour, get Free 1-1 Counselling for 
        course selection, and exclusive discounts on visits. Choose Vidyarjan Coaching Institute for transformative learning in NEET and JEE exams. 
        Elevate your academic journey with Vidyarjan Learning Centre!
      </p>
    </div>
  );
};



const Footer = () => {
  return (
    <div className="w-full bg-white py-4 border-t border-gray-200 flex justify-between items-center px-8">
      <p className="text-gray-800 text-lg">
        Reach out to us :{" "}
        <a href="tel:1800120456456" className="font-bold underline">
          +91 9834301046
        </a>
      </p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg">
        Book a Visit
      </button>
    </div>
  );
};


const carouselImages = [
  "/assets/Banner/banner1.jpg",
  "/assets/Banner/banner2.jpg",
  "/assets/Banner/banner3.jpg",
  "/assets/Banner/banner4.jpg",
  "/assets/Banner/banner5.jpg",
 
];

const VidyarjanLearningHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-orange-500 mt-3 py-6 px-10  rounded-2xl flex justify-between items-center">
      {/* Left Section */}
      <div className="max-w-lg text-white">
        <h2 className="text-3xl font-bold">
          Vidyarjan Learning Centres <br />
          <span className="text-yellow-300 underline">Now in Your City</span>
        </h2>
        <div className="mt-2 inline-block bg-yellow-400 text-black font-bold py-1 px-4 rounded-md">
          Offline Courses for <span className="font-extrabold">JEE | NEET | 8-10 Foundation</span>
        </div>
        <div className="mt-4 flex gap-4">
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg flex items-center">
            Book a Visit <ChevronRight className="ml-2 w-4 h-4" />
          </button>
          <button className="bg-white text-orange-500 font-semibold py-2 px-6 rounded-lg">
            Download Brochure
          </button>
        </div>
      </div>

      {/* Right Section - Image Carousel */}
      <div className="relative w-1/2 max-w-lg overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((img, idx) => (
            <img key={idx} src={img} alt="Carousel Slide" className="w-full rounded-xl" />
          ))}
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === currentIndex ? "bg-white" : "bg-gray-400"}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};





const Offline = () => {
  return (
    <div>
        <VidyarjanLearningHeader/>
        <AvailableCities />
        <LearningCenters/>
        <WhyVedantu />
        <InteractiveExperience />
        <ParentsNeeds />
        <Scholarships />
        <OurOutStandingResults />
        <VisitTheCenter/>
        <FAQAccordion />
        <BottomDescription/>
        <Footer/>
    </div>
  )
}

export default Offline
