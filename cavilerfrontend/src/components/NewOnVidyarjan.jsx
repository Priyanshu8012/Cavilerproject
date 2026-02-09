import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaRocket, FaFire, FaUserShield, FaMedal } from "react-icons/fa6";

export default function NewAtCavalier() {
  const navigate = useNavigate();
  const courses = [
    {
      image: "/assets/new/NDA.jpeg",
      title: "NDA Impact Batch 2025",
      price: "45,000",
      duration: "6 Months",
      level: "Officer Entry",
      rating: 4.9,
      students: "500+",

      tagColor: "from-green-600 to-green-800",
      link: "/courses/nda-impact",
    },
    {
      image: "/assets/new/SSB.jpeg",
      title: "SSB Interview Crash Course",
      price: "15,000",
      duration: "21 Days",
      level: "Personality Test",
      rating: 4.8,
      students: "200+",

      tagColor: "from-orange-500 to-red-600",
      link: "/courses/ssb",
    },
    {
      image: "/assets/new/CDS.jpeg",
      title: "CDS Written + SSB",
      price: "35,000",
      duration: "4 Months",
      level: "Graduate Entry",
      rating: 4.7,
      students: "150+",

      tagColor: "from-blue-600 to-blue-800",
      link: "/courses/cds",
    },
    {
      image: "/assets/new/AFCAT.jpeg",
      title: "AFCAT Flying Branch",
      price: "25,000",
      oldPrice: "30,000",
      discount: "5000 OFF",
      duration: "3 Months",
      level: "Air Force",
      rating: 4.6,
      students: "300+",

      tagColor: "from-cavalier-brand to-yellow-600",
      link: "/courses/afcat",
    },
  ];

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-black relative overflow-hidden">
      {/* Dark Ambient Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cavalier-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cavalier-header-bg/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-cavalier-card-dark border border-cavalier-brand/30 text-cavalier-brand px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <FaFire className="text-orange-500" />
            Latest Updates
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase">
            New At <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Cavalier</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with our newly launched batches and specialized defence training modules.
          </p>
        </motion.div>

        {/* Course Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 }, // Adjusted for better card width
            }}
            navigation={{
              nextEl: '.swiper-custom-next',
              prevEl: '.swiper-custom-prev',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="pb-12 px-4"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index} className="pt-8 pb-8">
                <CourseCard {...course} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-custom-prev w-12 h-12 flex items-center justify-center rounded-full border border-cavalier-brand/30 text-cavalier-brand hover:bg-cavalier-brand hover:text-black transition-all">←</button>
            <button className="swiper-custom-next w-12 h-12 flex items-center justify-center rounded-full border border-cavalier-brand/30 text-cavalier-brand hover:bg-cavalier-brand hover:text-black transition-all">→</button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/courses")}
            className="group px-10 py-4 bg-cavalier-brand text-black font-bold uppercase tracking-wider rounded-none clip-path-slant hover:bg-white transition-all duration-300 relative overflow-hidden"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaRocket /> View All New Courses
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const CourseCard = ({ image, title, level, rating, students }) => {
  return (
    <motion.div
      className="group bg-cavalier-card-dark/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cavalier-brand/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 h-full flex flex-col"
      whileHover={{ y: -10 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-black/20 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Floating Icon */}
        <div className="absolute -top-10 right-6 w-14 h-14 bg-cavalier-card-dark rounded-xl border border-cavalier-brand/30 flex items-center justify-center text-2xl text-cavalier-brand shadow-xl group-hover:bg-cavalier-brand group-hover:text-black transition-all duration-300">
          <FaMedal />
        </div>

        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-cavalier-brand/80 uppercase tracking-widest">
          <FaUserShield /> {level}
        </div>

        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-cavalier-brand transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 border-b border-white/10 pb-6">
          <FaStar className="text-yellow-500" />
          <span>{rating} ({students})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-gray-400 font-medium tracking-wide">
            {students} Students Enrolled
          </span>

          <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-cavalier-brand group-hover:border-cavalier-brand group-hover:text-black transition-all">
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
};
