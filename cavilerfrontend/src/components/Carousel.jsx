import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade, Navigation, Thumbs } from 'swiper/modules';
import axios from 'axios';
import { FaPlay, FaPause, FaExpand, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ImageSlider = () => {
    const [banners, setBanners] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/banners`);
                if (Array.isArray(response.data)) {
                    setBanners(response.data);
                } else {
                    console.error('Invalid data format for banners:', response.data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                // Fallback for demo if API fails
                if (banners.length === 0) {
                    // Optional: keep empty or set dummy data for development
                }
            }
        };
        fetchBanners();
    }, []);

    const toggleAutoplay = () => {
        if (swiperInstance) {
            if (isPlaying) {
                swiperInstance.autoplay.stop();
            } else {
                swiperInstance.autoplay.start();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const enterFullscreen = () => {
        const elem = document.querySelector('.main-slider-container');
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    };

    if (banners.length === 0) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-cavalier-bg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="w-16 h-16 border-4 border-cavalier-brand border-t-transparent rounded-full animate-spin mb-4 z-10"></div>
                <p className="text-cavalier-brand text-lg font-bold tracking-widest uppercase animate-pulse z-10">Loading Mission Data...</p>
            </div>
        );
    }

    return (
        <div className="w-full relative bg-cavalier-bg overflow-hidden main-slider-container group">

            {/* Header / Brand Overlay - Floating */}
            <div className="absolute top-0 left-0 w-full z-30 pt-6 pb-12 bg-gradient-to-b from-cavalier-bg/90 to-transparent pointer-events-none">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-2"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cavalier-brand via-yellow-200 to-cavalier-brand drop-shadow-sm">
                            Cavalier India Pune
                        </span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-12 bg-cavalier-brand/50"></div>
                        <p className="text-gray-300 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-shadow-sm">
                            Preparing Warriors for the Nation
                        </p>
                        <div className="h-px w-12 bg-cavalier-brand/50"></div>
                    </motion.div>
                </div>
            </div>

            {/* Main Swiper */}
            <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation, Thumbs]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh]"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className="relative">
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <motion.img
                                key={activeIndex === index ? 'active' : 'inactive'}
                                inherit={false}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 6, ease: "easeOut" }} // Slow zoom out effect
                                src={`${baseUrl}${banner.image_url}`}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/1920x1080/1a2613/ffd700?text=Cavalier+India+${index + 1}`;
                                }}
                            />
                        </div>

                        {/* Subtle Gradient for Controls Visibility Only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cavalier-bg/80 via-transparent to-transparent opacity-40"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
                            <div className="text-center max-w-5xl mx-auto">
                                <AnimatePresence mode='wait'>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            {/* Decorative Icons */}
                                            <div className="flex justify-center gap-2 mb-4">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                                    >
                                                        {/* <FaStar className="text-cavalier-brand text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" /> */}
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Main Text */}
                                            {banner.text && (
                                                <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                                                    {/* {banner.text} */}
                                                </h2>
                                            )}

                                            {/* <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="mt-4 px-8 py-3 bg-gradient-to-r from-cavalier-brand to-yellow-600 text-cavalier-bg font-bold uppercase tracking-wider rounded-none clip-path-slant hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                                                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
                                            >
                                                Explore Courses
                                            </motion.button> */}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Arrows (Desktop) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full z-20 px-4 hidden md:flex justify-between pointer-events-none">
                <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-cavalier-brand/30 text-cavalier-brand hover:bg-cavalier-brand hover:text-cavalier-bg transition-all duration-300 hover:scale-110 group"
                >
                    <FaChevronLeft className="text-xl" />
                </button>
                <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-cavalier-brand/30 text-cavalier-brand hover:bg-cavalier-brand hover:text-cavalier-bg transition-all duration-300 hover:scale-110 group"
                >
                    <FaChevronRight className="text-xl" />
                </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-cavalier-bg via-cavalier-bg/90 to-transparent pt-12 pb-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Thumbnails Swiper */}
                        <div className="w-full md:max-w-xl lg:max-w-2xl order-2 md:order-1">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className="thumbs-swiper h-16 md:h-20"
                                breakpoints={{
                                    0: { slidesPerView: 3 },
                                    640: { slidesPerView: 4 },
                                    1024: { slidesPerView: 5 }
                                }}
                            >
                                {banners.map((banner, index) => (
                                    <SwiperSlide key={index} className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity !w-auto">
                                        <div className={`relative h-full aspect-video rounded-md overflow-hidden border-2 transition-all duration-300 ${activeIndex === index ? 'border-cavalier-brand opacity-100 scale-105' : 'border-transparent'}`}>
                                            <img
                                                src={`${baseUrl}${banner.image_url}`}
                                                alt={`Thumb ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {activeIndex === index && (
                                                <div className="absolute inset-0 bg-cavalier-brand/20"></div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4 order-1 md:order-2">
                            {/* Slide Counter */}
                            <div className="text-cavalier-text-light font-mono text-sm border-r border-gray-600 pr-4">
                                <span className="text-cavalier-brand text-lg font-bold">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                                <span className="text-gray-500 mx-1">/</span>
                                <span>{banners.length.toString().padStart(2, '0')}</span>
                            </div>

                            <button
                                onClick={toggleAutoplay}
                                className="p-2 rounded-full text-cavalier-brand hover:bg-cavalier-brand/10 transition-colors"
                            >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <button
                                onClick={enterFullscreen}
                                className="p-2 rounded-full text-cavalier-brand hover:bg-cavalier-brand/10 transition-colors hidden md:block"
                            >
                                <FaExpand />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .clip-path-slant {
                    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
                }
            `}</style>
        </div>
    );
};

export default ImageSlider;
