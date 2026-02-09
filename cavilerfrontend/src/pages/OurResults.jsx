import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";

const images = [
  "https://d2tyn24bgzb1v3.cloudfront.net/static-assets/top-fold/Result2021.png",
  "https://d2tyn24bgzb1v3.cloudfront.net/static-assets/top-fold/Result2021.png",
  "https://vmkt.vedantu.com/vmkt/PROD/png/f30ffe29-1c6d-425a-a1ff-273f2f6fb2ac-1718175217424-4001376723323670.png",
  "https://vmkt.vedantu.com/vmkt/PROD/png/65fad621-60ce-4dfa-a14c-90dea50c5adb-1717507177267-4001376723323670.png",
  "https://vmkt.vedantu.com/vmkt/PROD/png/65fad621-60ce-4dfa-a14c-90dea50c5adb-1717507177267-4001376723323670.png"
];

const resultsData = {
  "JEE Mains": {
    year: 2023,
    qualified: 2449,
    highestRank: 59,
    top500: 9,
    top1000: 19,
  },
  "JEE Advanced": {
    year: 2023,
    qualified: 1200,
    highestRank: 45,
    top500: 5,
    top1000: 12,
  },
  NEET: {
    year: 2023,
    qualified: 3000,
    highestRank: 25,
    top500: 15,
    top1000: 30,
  },
};

function ResultsComponent() {
  const [selectedExam, setSelectedExam] = useState("JEE Mains");

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* Sticky Sidebar */}
      <aside className="w-full lg:w-1/4 lg:min-h-screen lg:sticky lg:top-0 bg-white p-4 border rounded-lg shadow-md">
        <h2 className="font-bold text-lg">FILTER</h2>
        <div className="mt-4">
          <h3 className="font-semibold">Exams</h3>
          {Object.keys(resultsData).map((exam) => (
            <div key={exam} className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                id={exam}
                name="exam"
                checked={selectedExam === exam}
                onChange={() => setSelectedExam(exam)}
                className="accent-orange-500"
              />
              <label htmlFor={exam} className="cursor-pointer">
                {exam}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Year</h3>
          <select className="w-full p-2 border rounded-md mt-2">
            <option>2023</option>
          </select>
        </div>
      </aside>

      {/* Results Section */}
      <section className="flex-1">
        <h1 className="text-2xl font-bold">
          Our {selectedExam} {resultsData[selectedExam].year} results
        </h1>
        <p className="text-gray-500">All the results are All India Ranking (AIR*)</p>

        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 border rounded-md">JEE Mains</button>
          <button className="px-4 py-2 border rounded-md">{resultsData[selectedExam].year}</button>
        </div>

        {/* Result Cards */}
        <div className="bg-yellow-100 p-4 lg:p-6 rounded-lg flex flex-col lg:flex-row mt-6 shadow-lg">
          <div className="flex-1 text-center mb-4 lg:mb-0">
            <div className="text-4xl font-bold">{resultsData[selectedExam].qualified}</div>
            <p className="text-gray-600">Qualified for JEE Advanced</p>
          </div>
          <div className="flex-1 text-center mb-4 lg:mb-0">
            <div className="text-4xl font-bold">{resultsData[selectedExam].highestRank}</div>
            <p className="text-gray-600">Our Highest Rank</p>
          </div>
          <div className="flex-1 text-center mb-4 lg:mb-0">
            <div className="text-4xl font-bold">{resultsData[selectedExam].top500}</div>
            <p className="text-gray-600">Ranks in Top 500</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-4xl font-bold">{resultsData[selectedExam].top1000}</div>
            <p className="text-gray-600">Ranks in Top 1000</p>
          </div>
        </div>
        <TopRankers />
        <TopPerformers />
      </section>
    </div>
  );
}

const rankers = [
  {
    name: "Hrishit",
    location: "Bangalore",
    rank: "AIR 113",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    bgColor: "bg-blue-600",
  },
  {
    name: "Sunrit Roy Karmakar",
    location: "Kolkata",
    rank: "AIR 139",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    bgColor: "bg-green-600",
  },
  {
    name: "Kushagra Sharma",
    location: "Jaipur",
    rank: "AIR 158",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    bgColor: "bg-purple-600",
  },
];

function TopRankers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? rankers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === rankers.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-5">Our Top Rankers</h2>
      <div className="relative flex items-center w-full max-w-4xl overflow-hidden">
        <button
          className="absolute left-0 z-10 p-3 bg-gray-800 text-white rounded-full"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>
        <div className="flex transition-transform duration-300 w-full gap-4 ease-in-out transform" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {rankers.map((ranker, index) => (
            <div key={index} className={`min-w-full p-5 rounded-2xl text-center shadow-lg ${ranker.bgColor}`}>
              <div className="relative inline-block">
                <img
                  src={ranker.image}
                  alt={ranker.name}
                  className="w-28 h-28 rounded-full border-4 border-yellow-500 object-cover"
                />
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-yellow-400 text-4xl">
                  👑
                </span>
              </div>
              <p className="mt-3 bg-yellow-400 text-black px-4 py-2 inline-block rounded-md font-bold text-lg">
                {ranker.rank}
              </p>
              <h3 className="text-xl font-semibold text-white mt-3">{ranker.name}</h3>
              <p className="text-white opacity-90 text-lg">{ranker.location}</p>
              <p className="text-white font-bold text-lg">EKLAVYA</p>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 z-10 p-3 bg-gray-800 text-white rounded-full"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

const students = [
  {
    name: "Prakhar Jain",
    city: "Kochi",
    rank: 59,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Suyash Kapoor",
    city: "Jaipur",
    rank: 91,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Aditya Anand Sawant",
    city: "Mumbai",
    rank: 168,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Parth Agarwal",
    city: "Jaipur",
    rank: 236,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Deevij Bansal",
    city: "Chandigarh",
    rank: 316,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Pranjal",
    city: "Sonepat",
    rank: 328,
    image: "https://via.placeholder.com/100",
  },
];

const TopPerformers = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Best Performers in JEE Mains 2023
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border border-gray-200"
          >
            <div className="relative">
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full border-4 border-orange-500"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                AIR {student.rank}
              </div>
            </div>
            <h3 className="text-lg font-semibold mt-4">{student.name}</h3>
            <p className="text-gray-600">{student.city}</p>
            <p className="text-sm text-gray-500">EKLAVYA</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <label className="mr-2 text-gray-600">Show Results</label>
          <select className="border border-gray-300 rounded p-1">
            <option>6</option>
            <option>12</option>
            <option>24</option>
          </select>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {[1, 2, 3, 4, 5, "..."]?.map((num, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-full border ${
                num === 1 ? "bg-blue-500 text-white" : "border-gray-300 text-gray-600"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function OurResults() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div>
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-auto flex-shrink-0 snap-center"
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <FaCircle
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer text-sm ${
                index === currentIndex ? "text-black" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      <ResultsComponent />
    </div>
  );
}
