import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Tech / Engineering",
    description: "We at engineering are always striving to stay ahead in the tech game! We work and we play harder!",
    icon: "🖥️",
  },
  {
    title: "Innovate",
    description: "Always exploring and innovating to solve the next big problem in India's education sector.",
    icon: "🚀",
  },
  {
    title: "Design and user experience",
    description: "Delivering the best user experience is our passion!",
    icon: "🎨",
  },
];

const WhatWeDo = () => {
  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-orange-500 font-semibold uppercase tracking-wide">What We Do</h3>
        <h2 className="text-4xl font-bold mt-2">Check out what we are up to</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col hover:shadow  px-3 py-6 items-center text-center">
            <div className="text-5xl">{service.icon}</div>
            <h4 className="mt-4 text-lg font-semibold">{service.title}</h4>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};





const posts = [
  {
    title: "How to book and an hour of fun!?",
    author: "Sharath",
    image: "https://tech.vedantu.com/images/blog/article1/main.jpg",
  },
  {
    title: "How we built our own in-house Video Streaming Platform?",
    author: "Yashovardhan Siramdas, Sarthak",
    image: "https://tech.vedantu.com/images/blog/article2/main.jpg",
  },
  {
    title: "Step By Step Guide to Enable Hot Module Replacement in a Custom Server-Side Rendered React App",
    author: "Kamlesh Tajpuri",
    image: "https://tech.vedantu.com/images/blog/article3/main.gif",
  },
];

const RecentWriteups = () => {
  return (
    <section className="py-16  bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-orange-500 font-semibold uppercase tracking-wide">Blog</h3>
        <h2 className="text-4xl font-bold mt-2">Our Recent Writeups</h2>
      </div>
<div className="flex flex-col items-center justify-center gap-6">

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {posts.map((post, index) => (
            <div key={index} className="text-center">
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl" />
            <h4 className="mt-4 text-lg font-semibold">{post.title}</h4>
            <p className="text-gray-500">{post.author}</p>
          </div>
        ))}
      </div>
      <button className="bg-orange-500 px-3 py-4 rounded font-bold">MORE WRITEUPS</button>
        </div>
    </section>
  );
};








const testimonials = [
  {
    name: "RAVNEET SINGH",
    role: "Tech Team",
    text: "I'm lucky to be a part of such an organisation that is touching million student lives daily...",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "DIVYA",
    role: "Tech Team",
    text: "My growth and development are fully supported...",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "ALEX JOHNSON",
    role: "Design Team",
    text: "Working here has been a game-changer for my career...",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export function Testimonials() {
  const scrollRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [autoScroll]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <h2 className="text-orange-500 text-sm font-bold">TESTIMONIALS</h2>
      <h1 className="text-4xl font-bold mb-6">Hear from our people</h1>
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth"
        >
          {testimonials.concat(testimonials).map((t, index) => (
            <div
              key={index}
              className="min-w-[300px] p-6 bg-white shadow-lg rounded-xl flex-shrink-0"
            >
              <p className="text-gray-600">{t.text}</p>
              <div className="flex items-center mt-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>
    </div>
  );
}







export  function JoinTeam() {
    return (
      <div className="relative w-full bg-orange-600 text-white text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Interested In Teaming Up?</h2>
          <p className="text-lg mb-6">
            If you think you have what it takes to bring great changes to India's educational sphere
            and be part of a revolution, then we'd love to hear from you! Explore openings in Vidyarjan!
          </p>
          <button className="bg-black text-orange-400 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-900">
            EXPLORE CAREER@Vidyarjan
          </button>
        </div>
      </div>
    );
  }
  

  export  function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="text-orange-500 text-3xl font-bold">Vedantu</div>
  
          {/* Navigation Links */}
          <nav className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-white hover:text-gray-400">Home</a>
            <a href="#" className="text-white hover:text-gray-400">Blog</a>
            <a href="#" className="text-white hover:text-gray-400">Join us!</a>
          </nav>
  
          {/* Social Media Links */}
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">Follow us on social media :</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className="bg-white p-2 rounded-full">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }



const EngineeringBlog = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-2xl font-bold text-orange-400">Vedantu</h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="hover:text-orange-400">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">Blog</a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">Join us!</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center p-10 md:p-20 bg-cover bg-center bg-black bg-opacity-70">
        <h2 className="text-5xl md:text-6xl font-extrabold">Tech@Vedantu</h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          This is how we create a bright future for students around the world.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition">
          ENTER
        </button>
      </section>

      {/* Social Media Links */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-4">
        {["instagram", "twitter", "facebook"].map((social) => (
          <a
            key={social}
            href="#"
            className="text-white transform rotate-90 text-sm hover:text-orange-400"
          >
            {social}
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2">
        <p className="text-white text-sm rotate-90">Scroll</p>
      </div>
      <WhatWeDo/>
      <RecentWriteups/>
      <Testimonials/>
      <JoinTeam/>
      <Footer/>
    </div>
  );
};

export default EngineeringBlog;

