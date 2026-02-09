import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa";
import { PlayCircle } from 'lucide-react';
import { useState } from "react";
import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";


const HereItFromTheFounder = () => {
  const [videoSrc, setVideoSrc] = useState(null);

  const videos = [
    {
      title: "Hear it from the founder",
      description: "English Superstar Program will be life-changing for your kid.",
      name: "Vamsi Krishna",
      role: "CEO AND CO-FOUNDER, Vidyarjan",
      thumbnail: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders/Founder.webp",
      videoUrl: "https://www.youtube.com/embed/b02d0763-5e21-450c-9ac5-315fb6c805ec"
    },
    {
      title: "See how our class works",
      description: "Watch our in-class video to have a better understanding of our fun-filled classes.",
      thumbnail: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders/InCourseVideo.webp",
      videoUrl: "https://www.youtube.com/embed/2004ce9d-a796-4c8e-b6ff-541c898970b0"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="bg-blue-100 md:bg-green-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2 shadow-md"
        >
          <div className="flex-1">
            <h2 className="text-lg font-bold">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.description}</p>
            {video.name && <p className="mt-2 font-bold">{video.name}</p>}
            {video.role && <p className="text-xs text-gray-500">{video.role}</p>}
          </div>
          <div className="relative w-32 h-20 cursor-pointer" onClick={() => setVideoSrc(video.videoUrl)}>
            <img src={video.thumbnail} alt={video.title} className="rounded-lg w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <span className="text-orange-500 text-xl">▶</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {videoSrc && (
        <div className="fixed inset-0 flex items-center justify-center p-4" onClick={() => setVideoSrc(null)}>
          <div className="bg-white p-4 rounded-lg w-full max-w-lg relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={() => setVideoSrc(null)}
            >
              ✕
            </button>
            <iframe
              src={videoSrc}
              title="Video Player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-64 rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};







const ConnectWithUs = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      
    
    <section className="flex flex-col md:flex-row items-center justify-between p-8 max-w-6xl mx-auto">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-4">
        <img
          src="https:/www.Vidyarjan.com/cdn/vsk/images/vsk-demo/English_SuperStar_Logo.svg"
          alt="English Superstar"
          className="w-56"
        />
        <p className="text-gray-600">
          Confidence & personality-building program for your child's bright future
        </p>
        <ul className="list-none text-black space-y-2">
          <li>✓ Phonics based reading</li>
          <li>✓ Advanced reading and public speaking</li>
        </ul>
        
        {/* Form Section */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-orange-500">Connect with us to know more</h3>
          <p className="text-gray-600">Enter your phone number</p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <img src="https:/www.Vidyarjan.com/cdn/vsk/images/vsk-demo/parent-phone.svg" alt="Phone" className="h-10 p-2" />
            <input
              type="text"
              placeholder="Phone number"
              className="w-full p-2 outline-none"
            />
          </div>
          <button className="flex items-center justify-center bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg w-full hover:bg-yellow-500">
            <img src="https:/www.Vidyarjan.com/cdn/vsk/images/superreaders/whatsapp.png" alt="WhatsApp" className="h-5 w-5 mr-2" />
            Submit
          </button>
          <p className="text-sm text-gray-600">
            Already booked? <span className="text-orange-500 font-bold">Join Now</span>
          </p>
        </div>
      </div>

      {/* Right Image (SVG placeholder) */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        {/* Insert the large SVG here */}
        <div className="w-full h-auto bg-gray-200">
          <img
            src="	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gA…SJEmSJEmSJEmS9OXy/wEGf9W/Wl2kZQAAAABJRU5ErkJggg=="
            alt="English Superstar"
            className="w-full"
          />
        </div>
      </div>
    </section>
      <HereItFromTheFounder/>
    </div>
  );
};



const ReadSpeakWrite = () => {
  const features = [
    {
      img: "https:/www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/read.svg",
      title: "Read fluently",
      description:
        "Comprehend story books, poems, comics, instructions and more",
    },
    {
      img: "https:/www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/speak.svg",
      title: "Speak confidently",
      description: "Ace the art of public speaking across various topics",
    },
    {
      img: "https:/www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/write.svg",
      title: "Write creatively",
      description: "Express creatively by writing fiction and non-fiction",
    },
  ];

  return (
    <div
      className="relative bg-cover  bg-center py-16  md:py-32 px-4 sm:px-8 md:px-16 lg:px-24"
      style={{
        backgroundImage:
          "url('https://www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/readSpeakWritebackground.svg')",
      }}
    >
      <h2 className="text-center text-2xl md:text-4xl font-bold text-black mb-8">
        Read. Speak. Write. <br /> Like a Superstar.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <img src={feature.img} alt={feature.title} className="w-14 h-14 mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};






const FunAndEngaging = () => {
  return (
    <div className="bg-green-400 py-10 text-center px-4">
      <h2 className="text-3xl font-bold text-black">
        Fun and engaging learning, every day
      </h2>

      {/* Buttons */}
      <div className="flex justify-center mt-4 flex-wrap gap-4">
        <button className="bg-black text-white py-2 px-6 rounded-lg">
          1-1 Live Classes
        </button>
        <button className="bg-white text-black py-2 px-6 rounded-lg">
          Activity books
        </button>
      </div>

      {/* Card Section */}
      <div className="flex justify-center mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap w-full max-w-4xl items-center">
          {/* Left Image */}
          <img
            src="https://www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/live_class_dweb.webp"
            alt="Live Class"
            className="rounded-lg w-full sm:w-1/2 md:w-2/5"
          />

          {/* Right Content */}
          <div className="w-full sm:w-1/2 md:w-3/5 text-left flex flex-col justify-stretch mt-6 sm:mt-0 px-4">
            <h3 className="text-xl font-semibold">
              Learn with personalised 1-1 live classes.
            </h3>

            {/* Features List */}
            <div className="grid  grid-cols-2 gap-4 mt-4">
              <FeatureItem
                imgSrc="https://img.icons8.com/color/48/000000/book.png"
                text="Stories & songs"
              />
              <FeatureItem
                imgSrc="https://img.icons8.com/external-flat-juicy-fish/60/000000/external-interactive-game-flat-flat-juicy-fish.png"
                text="Interactive tasks"
              />
              <FeatureItem
                imgSrc="https://img.icons8.com/fluency/48/000000/voice-recognition-scan.png"
                text="Sound through actions"
              />
              <FeatureItem
                imgSrc="https://img.icons8.com/color/48/000000/trophy.png"
                text="Games & rewards"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable FeatureItem Component
const FeatureItem = ({ imgSrc, text }) => (
  <div className="flex items-center">
    <img src={imgSrc} alt={text} className="w-8 h-8" />
    <p className="ml-2">{text}</p>
  </div>
);






const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/blueBackgroung.svg')" }}>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-black">
        Every class is a fun filled experience
      </h2>
      <p className="text-lg text-center text-gray-800">
        A sneak peek into our demo class
      </p>
      <div className="mt-6 cursor-pointer" onClick={() => setIsOpen(true)}>
        <img src="https://www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/experience.webp" alt="Thumbnail" className="w-full  rounded-lg shadow-lg" />
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <div className="relative bg-white p-4 rounded-lg shadow-xl w-full max-w-2xl">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            <video controls autoPlay className="w-full rounded-lg">
              <source src="blob:https://www.youtube.com/150b10d7-e58c-4d00-89dd-fec339b4599c" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};




const stories = [
  {
    title: "Yogi learns Yoga",
    description:
      "This is a story of how Yogi is taught yoga by being asked to mimic poses of wild animals. It’s a story to help with the ‘y’ sound.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/yogi-learns-yoga.png",
  },
  {
    title: "King Ring",
    description:
      "The story tells the tale of a wise king who sways a gang of robbers to mend their ways. A story to help with the ‘ng’ sound.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/king-ring.png",
  },
  {
    title: "The Intelligent Cook",
    description:
      "A funny tale of how a cook saves himself by outsmarting a witch on a flying broomstick. It’s a story to help with the ‘oo’ sound.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/the-intelligent-cook.webp",
  },
  {
    title: "Iggy the Iguana",
    description:
      "A heartwarming story of an iguana who overcomes all barriers to save his friend Isabel. It’s a story to help with the ‘I’ sound.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/iggy-the-iguana.webp",
  },
  {
    title: "The Buzzing Bees",
    description:
      "The story talks of how a swarm of bees together protects its hive from a honey-seeking bear. A story to help with the ‘Z’ sound.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/the-buzzing-bees.webp",
  },
  {
    title: "And many more exciting stories",
    description:
      "We have a collection of 50+ engaging stories for your child.",
    image: "https://www.Vidyarjan.com/cdn/vsk/images/superreaders-revamp/stories/more-stories.webp",
  },
];

const WorldOfStories = () => {
  return (
    <div className="max-w-6xl mx-auto p-x-4 py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Introduce your child to the magical world of stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{story.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{story.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center">
          <img
            src="https://www.Vidyarjan.com/cdn/vsk/images/superreaders/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5 mr-2"
          />
          Connect with us
        </button>
      </div>
    </div>
  );
};





const levels = [
  "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8"
];

const curriculumData = {
  "Level 1": [
    "Retell story parts",
    "Read pattern texts"
  ],
  "Level 2": [
    "Recognize sight words",
    "Understand basic sentences"
  ],
  "Level 3": [
    "Read short sentences fluently",
    "Identify key story elements"
  ],
  "Level 4": [
    "Comprehend short paragraphs",
    "Answer simple questions about a story"
  ],
  "Level 5": [
    "Analyze story themes",
    "Summarize key events"
  ],
  "Level 6": [
    "Infer meaning from text",
    "Predict story outcomes"
  ],
  "Level 7": [
    "Evaluate character motives",
    "Write short summaries"
  ],
  "Level 8": [
    "Critically analyze texts",
    "Compare and contrast different stories"
  ]
};

 function PersonalisedCurriculum() {
  const [selectedLevel, setSelectedLevel] = useState("Level 1");

  return (
    <div style={{backgroundImage:"url(https://www.Vidyarjan.com/cdn/vsk/images/englishSuperstar/curriculum.svg)",objectFit:"cover"}} className="bg-green-300  flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">Personalised curriculum for your child</h2>
      <p className="text-lg text-center mt-2">Our teachers will help find the right starting level</p>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {levels.map((level) => (
          <button
            key={level}
            className={`px-4 py-2 rounded-lg border ${
              selectedLevel === level ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-lg text-center">
        <p className="text-lg font-semibold">Your child will learn how to:</p>
        <ul className="text-left mt-2">
          {curriculumData[selectedLevel].map((point, index) => (
            <li key={index} className="text-lg font-bold flex items-center gap-2">
              • {point}
            </li>
          ))}
        </ul>
      <button className="mt-6 px-6 py-3 rounded-lg bg-white border border-red-400 text-red-500 flex items-center gap-2">
        <span>📥 Download our curriculum now</span>
      </button>
      </div>

    </div>
  );
}



const Investment = () => {
  return (
    <div className="flex flex-col items-center p-6 md:p-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
        A smart investment to help <br /> your child achieve big in life
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Single Level Plan */}
        <div className="border p-6 rounded-xl shadow-md w-full md:w-1/2 bg-white">
          <h3 className="text-lg font-bold">Superstar Single level - 1</h3>
          <p className="text-gray-500 mt-2">What will your kid learn?</p>
          <ul className="list-disc ml-4 text-gray-700 mt-2">
            <li>60 live one to one classes</li>
            <li>Flexibility to reschedule the class</li>
            <li>3 times a week</li>
            <li>30 minutes class</li>
            <li>Activity books</li>
          </ul>
          <p className="text-xl font-bold mt-4">₹ 45,000</p>
          <button className="w-full bg-orange-500 text-white py-2 mt-4 rounded-md hover:bg-orange-600">
            Buy now
          </button>
        </div>

        {/* Two Levels Plan */}
        <div className="border p-6 rounded-xl shadow-md w-full md:w-1/2 bg-pink-100">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Superstar Two levels - 1</h3>
            <span className="text-sm text-blue-600 font-semibold">Recommended</span>
          </div>
          <p className="text-gray-500 mt-2">What will your kid learn?</p>
          <ul className="list-disc ml-4 text-gray-700 mt-2">
            <li>120 live one to one classes</li>
            <li>Flexibility to reschedule the class</li>
            <li>3 times a week</li>
            <li>30 minutes class</li>
            <li>Activity books</li>
          </ul>
          <div className="flex items-center mt-4">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-md mr-2">
              10% off
            </span>
            <p className="text-xl font-bold">₹ 80,900</p>
          </div>
          <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};


 function Storytellers() {
  const teachers = [
    {
      name: "Frida D’Souza",
      experience: "9+ years of experience",
      image: "https://www.Vidyarjan.com/cdn/vsk/images/englishpro/ESteacher1.png",
      description:
        "I'm an English language enthusiast. I love seeing the energetic faces of my students. My students enjoy the activities and songs from our program and are always excited to attend sessions with me! This is what makes my day.",
    },
    {
      name: "Priyanka Kakkad",
      experience: "6+ years of experience",
      image: "https://www.Vidyarjan.com/cdn/vsk/images/englishpro/ESteacher2.png",
      description:
        "I feel blessed to have found a job that I love. The things I find most satisfying are the unending prospects of learning, performing out of my comfort zone and the endless love that I receive from the children.",
    },
    {
      name: "Shabnam Basheerudeen",
      experience: "5+ years of experience",
      image: "https://www.Vidyarjan.com/cdn/vsk/images/englishpro/ESteacher3.png",
      description:
        "When children learn something new, the glimmer they have in their eyes fascinates me. My most precious rewards have been when my former students greet me with a smile and proudly proclaim: ‘She was my teacher!’",
    },
  ];

  return (
    <section className="bg-blue-500 py-12 text-center px-4">
      <h2 className="text-3xl font-bold text-white mb-8">
        Our storytellers will soon become your child’s best friend!
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-20 h-20 rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{teacher.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{teacher.experience}</p>
            <p className="text-gray-700 text-sm text-center">{teacher.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}






const WhyParentsLoveVidyarjan = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="bg-pink-100 py-12 px-6 md:px-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Why do parents and students love
          <br /> Vidyarjan English Superstar?
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Video Section */}
        <div className="relative w-full md:w-1/3">
          <img
            src="https://www.Vidyarjan.com/cdn/vsk/images/englishpro/parent_testimonial.webp"
            alt="Parent Testimonial"
            className="rounded-lg shadow-lg w-full cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          />
          <button className="absolute inset-0 flex items-center justify-center" onClick={() => setIsVideoOpen(true)}>
            <PlayCircle size={50} className="text-white bg-orange-500 rounded-full" />
          </button>
        </div>

        {/* Right Testimonials Section */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
            <p className="flex-1 text-gray-700">
              "At first, I was skeptical to take online classes for my son, but now, I’m very happy that I made this decision.
              Thank you Vidyarjan for improving his communication skills."
              <br /> <strong>– Puneeth’s mother</strong>
            </p>
            <img
              src="https://www.Vidyarjan.com/cdn/vsk/images/superreaders/puneeth.webp"
              alt="Puneeth's mother"
              className="w-16 h-16 rounded-lg shadow-md"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
            <p className="flex-1 text-gray-700">
              "Kyaraa is a very interactive child. During the lockdown, Vidyarjan online classes helped her to interact and
              learn new things."
              <br /> <strong>– Kyaraa’s mother</strong>
            </p>
            <img
              src="https://www.Vidyarjan.com/cdn/vsk/images/superreaders/kyaraa.webp"
              alt="Kyaraa's mother"
              className="w-16 h-16 rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={24} />
            </button>
            <video controls autoPlay className="w-full rounded-lg">
              <source src="https://vmkt.s3.ap-southeast-1.amazonaws.com/vsk/english-pro/final-vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};




const ExploreOtherCourses = () => {
  return (
    <section className="py-12 px-6 md:px-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
        Explore our other courses
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Spoken English Course */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-1/3">
          <img
            src="https://www.Vidyarjan.com/cdn/vsk/images/supermath/orther-courses/spoken.svg"
            alt="Spoken English"
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            Spoken English <span className="text-orange-500">for grade 3 - 5</span>
          </h3>
          <p className="text-gray-600 text-sm mt-2">Explore more on Vidyarjan SuperSpeakers</p>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold shadow-md">
            EXPLORE NOW
          </button>
        </div>
        
        {/* Math Course */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-1/3">
          <img
            src="https://www.Vidyarjan.com/cdn/vsk/images/superkids-integrated/course-icon-1.svg"
            alt="Math Classes"
            className="w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            Math classes <span className="text-orange-500">for grade 1 and 2</span>
          </h3>
          <p className="text-gray-600 text-sm mt-2">Explore more on Vidyarjan SuperMaths</p>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold shadow-md">
            EXPLORE NOW
          </button>
        </div>
      </div>
    </section>
  );
};



const faqs = [
  { question: "How do I join the Live class?", answer: "To join the live class, log in to your account and click on the 'Join Class' button." },
  { question: "Can I attend the Live classes on a mobile phone?", answer: "Yes, you can attend live classes on a mobile phone using our mobile app or a browser." },
  { question: "How long and how frequent are the Live classes?", answer: "Live classes are typically 45-60 minutes long and are conducted 3-4 times a week." },
  { question: "What if I have to cancel or reschedule my Live class?", answer: "You can cancel or reschedule your live class through the dashboard under 'My Classes'." },
  { question: "Can I pause the classes when I go on a vacation or if my child is unwell?", answer: "Yes, you can pause your classes and resume them later by contacting support." },
  { question: "What if I need to reach out to Vidyarjan for some query?", answer: "You can reach out to us via the 'Contact Us' section on our website." },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              {faq.question}
              <ChevronDown size={20} className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};



 function Footer() {
  return (
    <footer className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <span>&copy; 2025. Vidyarjan.com. All rights reserved</span>
        <a href="#" className="hover:underline">Privacy policy</a>
        <a href="#" className="hover:underline">Terms and conditions</a>
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          <FaEnvelope size={18} />
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          <FaFacebookF size={18} />
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          <FaLinkedinIn size={18} />
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          <FaTwitter size={18} />
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          <FaYoutube size={18} />
        </a>
      </div>
    </footer>
  );
}




const EnglishSuperstar = () => {
    return (
        <div>
        <ConnectWithUs/>
        <ReadSpeakWrite/>
        <FunAndEngaging/>
        <VideoPopup/>
        <WorldOfStories/>
        <PersonalisedCurriculum/>
        <Investment/>
        <Storytellers/>
        <WhyParentsLoveVidyarjan/>
        <ExploreOtherCourses/>
        <FAQAccordion/>
        <Footer/>
        </div>
    );
}

 export  default EnglishSuperstar;

