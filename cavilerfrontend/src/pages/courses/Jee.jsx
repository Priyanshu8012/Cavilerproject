
import React from "react";

import { PlayCircle, MapPin, Phone } from "lucide-react";
import { Users, Calendar, Award, MessageCircle, HelpCircle, BookOpen } from "lucide-react";
import { Check } from "lucide-react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Ruler, FlaskConical, Atom } from "lucide-react";
import { Lightbulb } from "lucide-react";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { CheckCircle } from "lucide-react";
import { CalendarCheck, Trophy, MessageCircleQuestion, } from "lucide-react";
import FreeDemoSection from "../../components/FreeDemoSection"


const links = [
  { icon: Users, label: "Teachers" },
  { icon: CalendarCheck, label: "Schedule" },
  { icon: Trophy, label: "Results" },
  { icon: MessageCircleQuestion, label: "FAQ’s" },
  { icon: PlayCircle, label: "Book a free demo" },
  { icon: MessageCircleQuestion, label: "Testimonials" },
];

function QuickLinks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
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
  // "https://vmkt.vedantu.com/prod/Ankt/Car_1.png",
  "/assets/Banner/banner7.jpg",
  "/assets/Banner/banner8.jpg",
  "/assets/Banner/banner1.jpg",
  "/assets/Banner/banner4.jpg",

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
            Offline PRO Course
          </span>
          <span className='text-blue-700 font-semibold ml-3 text-lg sm:text-xl'>Class 11 NEET UG (2025-27)</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            A wing, Third Floor, Tilak Bhawan, NC Kelkar Road, Near Kesariwada, Narayan Peth, pune
          </h2>
          <div className="flex flex-col gap-3 mt-5 text-gray-700">
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> Interactive classes with clickers and leaderboards
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> Personal attention from top master teachers
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> Dedicated mentor to every student
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={20} /> Unlimited post-class doubt solving
            </div>
          </div>
          <div className="mt-5">
            <span className="font-semibold">Subjects Covered: </span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm">Physics</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm ml-2">Chemistry</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md text-sm ml-2">Maths</span>
          </div>
          <div className="mt-5">
            <span className="font-semibold">Language:</span>
            <span className="bg-black text-white px-3 py-1 rounded-md ml-2">ENGLISH</span>
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
          <div className="bg-white p-5 rounded-lg shadow-lg mt-5 border border-purple-500">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              Vidyarjan Science Academy
            </span>
            <h3 className="text-lg font-bold mt-2">Narayan Peth, Pune</h3>
            <p className="text-gray-600">08 AM - 04 PM | Mon - Sun</p>
            <div className="flex items-center gap-2 mt-2 text-blue-500">
              <MapPin size={18} />
              <a href="#" className="hover:underline">Vidyarjan Science Academy, NC Kelkar Road, Narayan Peth, Pune</a>
            </div>
            <div className="flex items-center gap-2 mt-2 text-blue-500">
              <Phone size={18} />
              <a href="tel:8971907256" className="hover:underline">+91 9834301046</a>
            </div>
          </div>
        </div>
      </div>
      <div className="">

        <QuickLinks />

      </div>
    </section>
  );
}
// max-w-6xl mx-auto relative z-10 bg-white p-5 mt-10 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-6 gap-30



const CoursePlans = () => {
  return (
    <section className="bg-purple-700 sm:pt-32 sm:-mt-32 pb-10  pt-10 px-5 md:px-20">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-5">Course Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
          {/* Class Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Class</h3>
            <ul className="space-y-2">
              {[
                "India’s most tech-enabled offline classes",
                "Active quiz participation with Smart Clickers",
                "Personalised feedback based on clicker responses",
                "3D models aid in-depth understanding of concept",
                "Learn from India’s top master teachers offline",
                "Leaderboards to make class competitive & fun",
                "On-spot doubts cleared in class by master teacher"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After Class Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3">After Class</h3>
            <ul className="space-y-2">
              {[
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
                "Centre library for self & group study"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Value Adds */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-3">Value Adds</h3>
          <ul className="space-y-2">
            {[
              "Guaranteed improvement or 100% fees refund",
              "Monthly parent-teacher meetings",
              "Parent’s App tracks performance"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="text-green-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mt-6 p-6 border-t flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-gray-500 line-through text-lg">₹1,70,000</span>
            <span className="text-green-500 text-lg font-semibold ml-2">0% OFF</span>
            <p className="text-2xl font-bold text-gray-900">₹1,70,000 for 2 years</p>
            <p className="text-gray-600">₹10,688/month • <a href="#" className="text-blue-500 underline">See EMI options</a></p>
          </div>
          <button className="mt-4 md:mt-0 bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-orange-600">
            Buy Full Course
          </button>
        </div>
      </div>
    </section>
  );
};



const subjects = [
  { name: "Maths", startDate: "20 May 2024", icon: <Ruler size={32} />, color: "bg-green-100", textColor: "text-green-600" },
  { name: "Chemistry", startDate: "20 May 2024", icon: <FlaskConical size={32} />, color: "bg-purple-100", textColor: "text-purple-600" },
  { name: "Physics", startDate: "20 May 2024", icon: <Atom size={32} />, color: "bg-blue-100", textColor: "text-blue-600" },
];

function BatchScheduleAndSyllabus() {
  return (
    <div className="">
      <h2 className="text-xl font-semibold  mb-4">Batch schedule & syllabus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl shadow rounded-lg p-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center gap-4 p-4 shadow rounded-lg">
            <div className={`p-3 rounded-full ${subject.color}`}>{subject.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <p className="text-sm text-gray-600">Start date: {subject.startDate}</p>
              <a href="#" className={`text-sm font-medium ${subject.textColor} mt-2 flex items-center gap-1`}>
                View full schedule <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const timetableData = [
  { day: "MON", class1: "Self revision", class2: "Self revision" },
  { day: "TUE", class1: { subject: "Physics", time: "5:30 - 7:00 pm", color: "bg-blue-100" }, class2: { subject: "Chemistry", time: "7:10 - 8:40 pm", color: "bg-purple-100" } },
  { day: "WED", class1: { subject: "Mathematics", time: "5:30 - 7:00 pm", color: "bg-green-100" }, class2: { subject: "Chemistry", time: "7:10 - 8:40 pm", color: "bg-purple-100" } },
  { day: "THU", class1: { subject: "Physics", time: "5:30 - 7:00 pm", color: "bg-blue-100" }, class2: { subject: "Chemistry", time: "7:10 - 8:40 pm", color: "bg-purple-100" } },
  { day: "FRI", class1: { subject: "Chemistry", time: "5:30 - 7:00 pm", color: "bg-purple-100" }, class2: { subject: "Physics", time: "7:10 - 8:40 pm", color: "bg-blue-100" } },
  { day: "SAT", class1: "Self revision", class2: "Self revision" },
  { day: "SUN", class1: "Self revision", class2: "Self revision" },
];

const Timetable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Time Table (24 Feb 2025 - 02 Mar 2025)</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-200 rounded-full"><ChevronLeft size={16} /></button>
          <button className="p-2 bg-gray-800 text-white rounded-full"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-3 text-start font-medium border-b pb-2">
        <div className='col-start-2 col-end-3 row-start-1 row-end-2 '>CLASS 1</div>
        <div></div>
        <div>CLASS 2</div>
      </div>
      <div className="divide-y">
        {timetableData.map(({ day, class1, class2 }, index) => (
          <div key={index} className="flex   py-3 text-center items-center">
            <div className="font-semibold w-1/4 sm:w-1/3 ">{day}</div>
            <div className='w-3/4 sm:w-2/3 flex justify-between'>
              <div className=''>
                {typeof class1 === "string" ? (
                  <span className="text-gray-500">{class1}</span>
                ) : (
                  <div className={`px-2 py-1 rounded-lg inline-block ${class1?.color}`}>
                    <span className="font-medium">{class1?.subject}</span>
                    <span className="block text-sm text-gray-600">{class1?.time}</span>
                  </div>
                )}
              </div>
              <div>
                {typeof class2 === "string" ? (
                  <span className="text-gray-500">{class2}</span>
                ) : (
                  <div className={`px-2 py-1 rounded-lg inline-block ${class2?.color}`}>
                    <span className="font-medium">{class2?.subject}</span>
                    <span className="block text-sm text-gray-600">{class2?.time}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





function OurResults() {

  const images = [
    "/assets/OurResults/jee-1.jpg",
    "/assets/OurResults/jee-2.jpg"
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

const BatchSchedule = () => {
  const [activeBatch, setActiveBatch] = useState('latest');

  return (
    <div className=" py-10 max-w-6xl mx-auto px-6  bg-gray-50 min-h-screen flex lg:gap-0 sm:gap-3">
      <div className='w-full sm:w-3/4 flex flex-col gap-6'>
        <BatchScheduleHeader />
        {/* Header Section */}
        <div className="text-sm text-blue-600 font-semibold">VSA - NC Kelkar Road, Near Kesariwada, Narayan Peth, Pune</div>
        <h1 className="text-2xl font-bold mt-2">Batch schedule & syllabus</h1>

        {/* Batch Selector */}
        <div className="mt-4 flex gap-3">
          <button
            className={`px-4 py-2 rounded-md text-white font-semibold ${activeBatch === 'latest' ? 'bg-black' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveBatch('latest')}
          >
            Latest batch (20 May 2024)
          </button>
          <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-semibold" disabled>
            Next batch (Coming Soon)
          </button>
        </div>

        {/* Time Table */}

        <Timetable />
        {/* Batch schedule & syllabus */}
        <BatchScheduleAndSyllabus />
        {/*Our Results */}
        <OurResults />
        {/* No Cost EMI */}
        <NoCostEMI />
        {/* Need More Clarity */}
        {/* <NeedMoreClarity/> */}

        <FreeDemoSection />
      </div>
      {/* Course Plan */}
      <div className=" hidden sticky top-0 h-screen overflow-auto sm:block bg-white shadow-lg rounded-t-lg border border-purple-500 w-1/4">
        <div className='p-4'>
          <h2 className="text-xl font-bold text-purple-700">Course plans</h2>
          <div className="mt-4 bg-red-100 text-red-600 font-bold p-2 rounded-md text-center">
            PRO
          </div>
          <div className="mt-2 text-gray-600 text-sm line-through">₹1,70,000</div>
          <div className="text-xl font-bold">₹1,70,000 for 2 years</div>
          <div className="text-sm text-gray-500">₹10,688/month. <a href="#" className="text-blue-500">See EMI options</a></div>
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



const Jee = () => {
  return (
    <div>
      <div className='w-full py-3 px-5 md:px-20 flex gap-4 items-center bg-gray-300 lg:px-20'>
        <p>Class 11 Science (PCM) | All Boards | JEE | Teaching language: English
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

export default Jee
