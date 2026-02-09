
import React from "react";

import { useState } from 'react';
import { PlayCircle, XCircle, CheckCircle, Users, Calendar, MessageCircle, HelpCircle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Lightbulb, CalendarCheck, Trophy, MessageCircleQuestion, } from "lucide-react";
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import FreeDemoSection from '../../components/FreeDemoSection';





const links = [
  { icon: Users, label: "Teachers" },
  { icon: Trophy, label: "Results" },
  { icon: MessageCircleQuestion, label: "FAQ’s" },
  { icon: PlayCircle, label: "Book a free demo" },
  { icon: MessageCircleQuestion, label: "Testimonials" },
];

function QuickLinks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center  gap-2">
        Quick Links <span className="text-lg">→</span>
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-6">
        {links.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 p-4 bg-purple-50 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <Icon className="w-8 h-8 text-purple-600" />
            <p className="text-sm font-medium text-gray-800">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}





const carouselImages = [
  "/assets/Banner/banner9.jpg",
  "/assets/Banner/banner10.jpg",
  "/assets/Banner/banner3.jpg",
  "/assets/Banner/banner2.jpg",
  // "https://vmkt.vedantu.com/prod/Ankt/Car_1.png",
  // "https://vmkt.vedantu.com/prod/Ankt/Car_1.png",
  // "https://vmkt.vedantu.com/prod/Ankt/Car_1.png",
  // "https://vmkt.vedantu.com/prod/Ankt/Car_1.png",
];

function HeroSection() {
  return (
    <section className="bg-gray-100 py-10 px-5 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            PRO Course
          </span>
          <span className='text-blue-700 font-semibold ml-3 text-lg sm:text-xl'>Class 11 NEET UG (2025-27)</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            2-year NEET UG Course (2025-27)
          </h2>
          <div className="flex flex-col gap-3 mt-5 text-gray-700">
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> LIVE Interactive Class
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> "Offline" Like Discipline
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> Hard Copy Books delivered to you
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} />  delivered to you 24*7 Live Video Call Doubt Solving
            </div>
          </div>
          <div className="mt-5">
            <span className="font-semibold">Subjects Covered: </span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">Physics</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm ml-2">Biology</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm ml-2">Chemistry</span>
          </div>
          <div className="mt-5">
            <span className="font-semibold">Language:</span>
            <span className="bg-black text-white px-3 py-1 rounded-md ml-2">ENGLISH</span>
            <span className="bg-black text-white px-3 py-1 rounded-md ml-2">HINGLISH</span>
          </div>
          <button className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-md text-lg font-semibold hover:bg-orange-600">
            View course plans
          </button>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-56 bg-gray-300 rounded-lg overflow-hidden"
          >
            {carouselImages.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <img src={image} alt="Carousel" className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="  mt-12 ">
            <img src='https://vmkt.vedantu.com/vmkt/PROD/svg%2Bxml/bfacf8ff-9d89-4dd6-8d46-b83dbb70af01-1713967429468-4102421636079153.svg%2Bxml' />
          </div>
        </div>
      </div>
      <div className="">

        <QuickLinks />

      </div>
    </section>
  );
}



const plans = [
  {
    title: "REPEATER BATCH",
    price: "₹80,000",
    duration: "1 year",
    monthly: "₹3,856/month",
    discount: "0% Off",
    features: [
      "LIVE classes by master teachers",
      "Discussion of practice questions",
      "LIVE in-class doubt solving",
      "LIVE in-class quizzes and leaderboard",
      "Student Camera On - Offline Coaching like discipline",
    ],
    afterClass: [
      "Assignments and class notes",
      "All India test series",
      "Digital study material (PDF)",
      "Post class doubt solving",
      "Printed study material delivered to your home",
      "24/7 instant 1-on-1 doubt solving via text, voice & video call",
      "Telegram groups for community discussions with teachers",
      "Student Progress report via dedicated Parent portal",
      "Dedicated Mentor for every student",
      "Parent-Teacher Meeting every 3 months",
      "Handwritten Teacher Notes after class",
      "Recordings of Previous classes",
      "Physically Studied Material - TATVA delivered to home",
      "700+ Assignments",
      "100+ Chapter Tests",
      "DPP Generator for unlimited practice",
      "Unlimited Access to 500+ e-books",
      "Unlimited Access to 500+ videos",
      "All India Test Series with Discussion",
    ],
    valueAdds: ["Vidyarjan improvement promise", "No"],
  },
  {
    title: "11th + 12th + NEET",
    price: "₹1,70,000",
    duration: "2 years",
    monthly: "₹4,753/month",
    discount: "0% Off",
    features: [
      "LIVE classes by master teachers",
      "Discussion of practice questions",
      "LIVE in-class doubt solving",
      "LIVE in-class quizzes and leaderboard",
      "Student Camera On - Offline Coaching like discipline",
    ],
    afterClass: [
      "Assignments and class notes",
      "All India test series",
      "Digital study material (PDF)",
      "Post class doubt solving",
      "Printed study material delivered to your home",
      "24/7 instant 1-on-1 doubt solving via text, voice & video call",
      "Telegram groups for community discussions with teachers",
      "Student Progress report via dedicated Parent portal",
      "Dedicated Mentor for every student",
      "Parent-Teacher Meeting every 3 months",
      "Handwritten Teacher Notes after class",
      "Recordings of Previous classes",
      "Physically Studied Material - TATVA delivered to home",
      "700+ Assignments",
      "100+ Chapter Tests",
      "DPP Generator for unlimited practice",
      "Unlimited Access to 500+ e-books",
      "Unlimited Access to 500+ videos",
      "All India Test Series with Discussion",
    ],
    valueAdds: ["Vidyarjan improvement promise", "Yes"],
  },
];

function CoursePlans() {
  return (
    <div className='bg-purple-700 sm:pt-32 sm:-mt-32  w-full'>

      <div className='max-w-6xl mx-auto  p-6 '>

        <h2 className="text-2xl   font-bold text-white mb-5">Course Plans</h2>
        <div className="flex max-w-6xl gap-4 flex-wrap mx-auto justify-between px-5 md:px-20 ">
          {plans.map((plan, index) => (
            <div key={index} className="p-6 bg-white shadow-md rounded-lg w-96 border border-gray-200">
              <h2 className="text-lg font-bold text-purple-700">{plan.title}</h2>
              <p className="text-2xl font-semibold">{plan.price} <span className="text-gray-500 text-sm">for {plan.duration}</span></p>
              <p className="text-sm text-gray-600">{plan.monthly}</p>
              <button className="bg-orange-500 text-white py-2 px-4 mt-4 rounded-lg">Buy Full Course</button>
              <h3 className="mt-4 text-md font-semibold">FEATURES</h3>
              <ul className="mt-2 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-4 text-md font-semibold">After Class</h3>
              <ul className="mt-2 space-y-2">
                {plan.afterClass.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-4 text-md font-semibold">Value Adds</h3>
              <ul className="mt-2 space-y-2">
                {plan.valueAdds.map((value, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    {value.includes("No") ? (
                      <XCircle className="text-red-500" size={16} />
                    ) : (
                      <CheckCircle className="text-green-500" size={16} />
                    )}
                    <span>{value === "No" || value === "Yes" ? "Personal Teacher" : value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const batchScheduleHeaderLinks = [
  { icon: <Users className="w-5 h-5 text-purple-600" />, label: "Teachers" },
  { icon: <CalendarCheck className="w-5 h-5 text-purple-600" />, label: "Schedule" },
  { icon: <Trophy className="w-5 h-5 text-purple-600" />, label: "Results" },
  { icon: <Calendar className="w-5 h-5 text-purple-600" />, label: "Book a free demo" },
  { icon: <MessageCircle className="w-5 h-5 text-purple-600" />, label: "Testimonials" },
  { icon: <HelpCircle className="w-5 h-5 text-purple-600" />, label: "FAQ’s" }
];

function BatchScheduleHeader() {
  return (
    <div className="flex  items-start justify-center flex-wrap gap-2  ">
      {batchScheduleHeaderLinks.map((item, index) => (
        <div key={index} className="flex items-center gap-2 flex-wrap shrink-0 bg-purple-100 px-2 py-1 rounded-xl shadow-sm">
          {item.icon}
          <span className="text-gray-800 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
function OurResults() {

  const images = [
    "/assets/OurResults/neet-1.jpg",
    "/assets/OurResults/neet-2.jpg"
  ]
  return (
    <div className="relative max-w-3xl w-full  ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Our results</h2>
        {/* Custom Navigation Buttons */}
        <div className="flex gap-2">
          <button className="custom-prev bg-black p-2 rounded-full z-10">
            <ChevronLeft className="text-white" />
          </button>
          <button className="custom-next bg-black p-2 rounded-full z-10">
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => (
            `<span class='${className} custom-dot'></span>`
          ),
        }}
        className="relative mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination flex justify-center gap-2 mt-4"></div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-dot {
          width: 20px;
          height: 4px;
          background: #d1d5db;
          border-radius: 4px;
          transition: background 0.3s, width 0.3s;
        }
        .swiper-pagination-bullet-active.custom-dot {
          background: #000;
          width: 30px;
        }
      `}} />
    </div>
  );
}

const banks = [
  "IDBI Credit Card",
  "AU Small Finance Bank Credit Card",
  "American Express Credit Card",
  "Citi Bank Credit Card",
  "HDFC Bank Debit Card",
  "ICICI Bank Debit Card",
  "Bank of Baroda Credit Card",
  "Axis Bank Credit Card",
  "Yes Bank Credit Card",
  "Kotak Mahindra Bank Credit Card",
];

const emiPlans = {
  "IDBI Credit Card": [
    { duration: "3 months", amount: 85500, savings: 5458.76 },
    { duration: "6 months", amount: 42750, savings: 9451.37 },
    { duration: "9 months", amount: 28500, savings: 13359.3 },
    { duration: "12 months", amount: 21375, savings: 17184.6 },
  ],
};

function NoCostEMI() {
  const [showAllBanks, setShowAllBanks] = useState(false);
  const [selectedBank, setSelectedBank] = useState("IDBI Credit Card");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const visibleBanks = showAllBanks ? banks : banks.slice(0, 4);

  return (
    <div className="max-w-3xl ">
      <h2 className="text-2xl font-bold mb-4">No cost EMI options</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Bank List */}
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-3 shadow-sm">
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full p-2 border rounded mb-3"
          />
          <div>
            {visibleBanks.map((bank) => (
              <div
                key={bank}
                className={`p-2 cursor-pointer border-b last:border-none flex items-center ${selectedBank === bank ? "bg-white border-l-4 border-orange-500 font-semibold" : ""
                  }`}
                onClick={() => setSelectedBank(bank)}
              >
                {bank}
              </div>
            ))}
          </div>
          {!showAllBanks && (
            <button
              className="text-red-500 mt-2"
              onClick={() => setShowAllBanks(true)}
            >
              15 more banks available
            </button>
          )}
        </div>

        {/* EMI Plans */}
        <div className="w-full md:w-2/3  rounded-lg p-3 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">{selectedBank}</h3>
          {emiPlans[selectedBank] ? (
            emiPlans[selectedBank].map((plan, index) => (
              <div
                key={index}
                className={`p-2 border rounded mb-2 cursor-pointer flex items-center ${selectedPlan === index ? "bg-blue-100 font-semibold" : ""
                  }`}
                onClick={() => setSelectedPlan(index)}
              >
                <input type="radio" className="mr-2" checked={selectedPlan === index} readOnly />
                <div>
                  <p>
                    Pay <span className="font-bold">₹{plan.amount}</span> x {plan.duration}
                  </p>
                  <p className="text-green-500 text-sm">
                    Total interest saved ₹{plan.savings}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No EMI plans available for this bank.</p>
          )}

          {/* Proceed & Pay Button */}
          <button
            className={`w-full p-3 mt-4 rounded text-lg font-semibold ${selectedPlan !== null ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            disabled={selectedPlan === null}
          >
            Proceed & Pay ₹256500
          </button>

          <p className="text-xs text-gray-500 mt-2">
            The banks issuing the cards reserve the right to charge Goods and
            Services Tax (GST) or other applicable taxes on the purchase
            transactions undertaken on EMI which will be over and above the
            product price.
          </p>
        </div>
      </div>
    </div>
  );
}

// function NeedMoreClarity() {
//     return (
//       <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl ">
//         {/* Left Section - Text */}
//         <div className="text-center md:text-left md:w-1/2">
//           <h2 className="text-2xl font-bold text-gray-900">Need more clarity?</h2>
//           <p className="text-gray-600 mt-2">Book a session with our expert</p>
//           <button className="mt-4 px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800">
//             Book a free demo
//           </button>
//         </div>

//         {/* Right Section - Image */}
//         <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
//           <img
//             src="https://storefront.vedantu.com/cdn/images/aiLive/sessionClarityHero.png"
//             alt="Need more clarity"
//             className="w-64 h-auto"
//           />
//         </div>
//       </div>
//     );
//   }

const featuresData = [
  {
    title: "Class",
    items: [
      "India’s most tech-enabled offline classes",
      "Learn from India’s top master teachers offline",
      "Active quiz participation with Smart Clickers",
      "Leaderboards to make class competitive & fun",
      "Personalised feedback based on clicker responses",
      "On-spot doubts cleared in class by master teacher",
      "3D models aid in-depth understanding of concept",
    ],
  },
  {
    title: "After Class",
    items: [
      "Personal academic mentor for personalised guidance",
      "Instant LIVE one-on-one doubt solving in phone",
      "Dedicated Doubt solving counters in centers",
      "Tatva study material covers 12000 questions",
      "QR codes in books for video tutorials",
      "Digital notes & class recordings on phone",
      "Daily practice questions, 24x7 access",
      "Tests every 14 days, detailed analysis",
      "All India Test Series available",
      "1200+ hrs of recorded master lectures",
      "Unlimited custom tests and assignments",
      "Access 150+ books at no cost",
      "Centre library for self & group study",
    ],
  },
  {
    title: "Value Adds",
    items: [
      "Guaranteed improvement or 100% fees refund",
      "Monthly parent-teacher meetings",
      "Parent’s App tracks performance",
    ],
  },
];

function Features() {
  return (
    <div className="  ">
      {featuresData.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="bg-gray-100 px-4 py-2 font-semibold text-lg text-gray-800 rounded">
            {section.title}
          </h3>
          <ul className="mt-2 space-y-2">
            {section.items.map((feature, index) => (
              <li key={index} className="flex items-start px-4 gap-2 text-gray-700">
                <CheckCircle className="text-green-500 mt-1 shrink-0 w-5 h-5" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}



const BatchSchedule = () => {
  const [activeBatch, setActiveBatch] = useState('latest');

  return (
    <div className=" py-10 max-w-6xl mx-auto px-6  bg-gray-50 min-h-screen flex lg:gap-0 sm:gap-3">
      <div className='w-full sm:w-3/4 flex flex-col gap-6'>
        <BatchScheduleHeader />
        <div className='w-full  '>
          <h1 className='text-3xl font-bold mb-6'>Master Teachers</h1>
          <div className='  flex flex-col gap-4 sm:flex-row rounded-lg flex-wrap  p-4'>
            <div className='h-2/3 sm:w-[calc((100%-48px)/4)]'>

              <img className='mx-auto rounded-lg h-2/3 aspect-square ' src='/assets/Teachers/Satij.jpg'></img>
              <div className='w-full p-4 text-center h-1/3  bg-blue-950 rounded-lg'>
                <h2 className='font-bold text-xl text-white'>Satij k. Sir</h2>
                <p className='font-semibold text-white'>Physics</p>
              </div>

            </div>
            <div className='h-2/3 sm:w-[calc((100%-48px)/4)]'>

              <img className='mx-auto rounded-lg h-2/3  aspect-square' src='/assets/Teachers/Shripad.jpg'></img>
              <div className='w-full p-4 text-center h-1/3  bg-blue-950 rounded-lg'>
                <h2 className='font-bold text-xl text-white'>K. Shripad Sir</h2>
                <p className='font-semibold text-white'>Physics</p>
              </div>

            </div>
            <div className='h-2/3 sm:w-[calc((100%-48px)/4)]'>

              <img className='mx-auto rounded-lg h-2/3 aspect-square' src='/assets/Teachers/Rohit.jpg'></img>
              <div className='w-full p-4 text-center h-1/3  bg-blue-950 rounded-lg'>
                <h2 className='font-bold text-xl text-white'>Rohit N. Sir</h2>
                <p className='font-semibold text-white'>chemistry</p>
              </div>

            </div>
            <div className='h-2/3 sm:w-[calc((100%-48px)/4)] '>

              <img className='mx-auto rounded-lg h-2/3  aspect-square' src='/assets/Teachers/Aditi.jpg'></img>
              <div className='w-full p-4 text-center h-1/3  bg-blue-950 rounded-lg'>
                <h2 className='font-bold text-xl text-white'>Aditi Madam</h2>
                <p className='font-semibold text-white'>Biology</p>
              </div>

            </div>
            <div className='h-2/3 sm:w-[calc((100%-48px)/4)] '>

              <img className='mx-auto rounded-lg h-2/3  aspect-square' src='/assets/Teachers/Satish.jpg'></img>
              <div className='w-full p-4 text-center h-1/3  bg-blue-950 rounded-lg'>
                <h2 className='font-bold text-xl text-white'>Satish J. Sir</h2>
                <p className='font-semibold text-white'>Mathematics</p>
              </div>

            </div>
          </div>

        </div>
        <OurResults />
        {/* <div className=' rounded-full'>
        <img src='https://storefront.vedantu.com/cdn/images/aiLive/vipbanner2dweb.webp'/>
      </div> */}
        <NoCostEMI />
        {/* <NeedMoreClarity/> */}
        <FreeDemoSection />
      </div>
      {/* Course Plan */}
      <div className=" hidden sticky top-0 h-screen overflow-auto sm:block bg-white shadow-lg rounded-t-lg border border-purple-500 w-1/4">
        <div className='p-4'>
          <h2 className="text-xl font-bold text-purple-700">Course plans</h2>
          <div className="mt-4 bg-red-100 text-red-600 font-bold p-2 rounded-md text-center">
            11th + 12th + NEET
          </div>
          <div className="mt-2 text-gray-600 text-sm line-through">₹1,70,000</div>
          <div className="text-xl font-bold">₹1,70,000 for 2 years</div>
          <div className="text-sm text-gray-500">₹3,858/month. <a href="#" className="text-blue-500">See EMI options</a></div>
          <button className="mt-4 bg-red-500 text-white font-bold w-full py-2 rounded-md">Buy Full Course</button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">FEATURES</h3>
          </div>
        </div>
        <Features />
        <div className='p-4  border-t border-gray-200'>

          <div className="mt-4 bg-red-100 text-red-600 font-bold p-2 rounded-md text-center">
            REPEATER BATCH
          </div>
          <div className="mt-2 text-gray-600 text-sm line-through">₹80,000</div>
          <div className="text-xl font-bold">₹80,000   for 2 years</div>
          <div className="text-sm text-gray-500">₹4,758/month. <a href="#" className="text-blue-500">See EMI options</a></div>
          <button className="mt-4 bg-red-500 text-white font-bold w-full py-2 rounded-md">Buy Full Course</button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">FEATURES</h3>
          </div>
        </div>
        <Features />
      </div>

    </div>
  );
};

function StoriesAndImpact() {
  return (
    <div className="bg-[#f9f9ff] py-16">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-10 h-10 text-purple-600" />
          <h2 className="text-3xl font-semibold text-gray-900">
            Stories that inspire
          </h2>
        </div>
      </div>

      {/* Impact Section */}
      <div className="max-w-6xl mx-auto mt-10 px-6">
        <div className="bg-[#fff6f3] border border-orange-300 rounded-2xl p-8 shadow-xl relative">
          <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl bg-orange-400" />
          <p className="font-bold text-xl">
            Impact. <span className="text-orange-500">At scale</span>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">
            <div>
              <p className="text-2xl font-bold">2.1+ <span className="text-lg">crore</span></p>
              <p className="text-gray-600 text-sm">hours of LIVE learning</p>
            </div>

            <div>
              <p className="text-2xl font-bold">10+ <span className="text-lg">lakh</span></p>
              <p className="text-gray-600 text-sm">monthly YouTube views</p>
            </div>

            <div>
              <p className="text-2xl font-bold">25+ <span className="text-lg">lakh</span></p>
              <p className="text-gray-600 text-sm">doubts resolved on the app</p>
            </div>

            <div>
              <p className="text-2xl font-bold">57+ <span className="text-lg">countries</span></p>
              <p className="text-gray-600 text-sm">monthly web & app visitors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const faqs = [
  {
    question: "Can I choose between Hindi and English language while selecting batches?",
    answer: "Yes, students can choose the language as per their choice."
  },
  {
    question: "Can I change teacher if I am not able to understand?",
    answer: "Yes, you can request a change based on availability."
  },
  {
    question: "Will I get class notes and assignments?",
    answer: "Yes, all enrolled students will receive class notes and assignments."
  },
  {
    question: "Will I get study material for practice?",
    answer: "Yes, study materials will be provided."
  },
  {
    question: "Can I choose class timings as per my convenience?",
    answer: "Yes, we offer flexible class timings."
  },
  {
    question: "Will I get a test series?",
    answer: "Yes, test series are available for students."
  },
  {
    question: "Will I get a revision after the syllabus is completed?",
    answer: "Yes, revisions are conducted after syllabus completion."
  },
  {
    question: "Will I get recordings of classes?",
    answer: "Yes, class recordings are available for review."
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-900 font-medium">{faq.question}</span>
              {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const Neet = () => {
  return (
    <div>
      <div className='w-full py-3 px-5 md:px-20 flex gap-4 items-center bg-gray-300 lg:px-20'>
        <p>Class 11 Science (PCB) | All Boards | NEET | Teaching language: English
        </p>
        <button className='bg-white text-sm font-semibold  px-4 rounded-lg shadow text-orange-400 py-2'>change</button>
      </div>
      <HeroSection />
      <CoursePlans />
      <BatchSchedule />
      <StoriesAndImpact />
      <FAQAccordion />
    </div>
  )
}

export default Neet;
