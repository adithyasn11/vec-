'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [activeTab, setActiveTab] = useState('discover');
  const [orbHovered, setOrbHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const orbControls = useAnimation();
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Color themes for each location
  const locationThemes = [
    { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D', hue: 0 },     // Taj Mahal
    { primary: '#FF9F1C', secondary: '#A42CD6', accent: '#F9C846', hue: 60 },    // Varanasi
    { primary: '#F8485E', secondary: '#FFB740', accent: '#00A6A6', hue: 120 },   // Jaipur
    { primary: '#2EC4B6', secondary: '#9BF6FF', accent: '#EFCA08', hue: 180 },   // Kerala
    { primary: '#5603AD', secondary: '#8367C7', accent: '#C2CAE8', hue: 240 }    // Himalaya
  ];
  
  // Indian travel destinations
  const locations = [
    'Taj Mahal',
    'Varanasi',
    'Jaipur',
    'Kerala',
    'Himalaya'
  ];
  
  // Destination descriptions
  const descriptions = [
    'Symbol of eternal love in Agra',
    'Spiritual heart of India on the Ganges',
    'The majestic Pink City of Rajasthan',
    'Serene backwaters and lush landscapes',
    'Majestic mountains touching the sky'
  ];

  // Recent bookings data
  const recentBookings = [
    { id: 1, destination: 'Jaipur', date: 'May 15, 2025', status: 'Confirmed', price: '₹24,500' },
    { id: 2, destination: 'Kerala', date: 'July 3, 2025', status: 'Pending', price: '₹18,900' },
    { id: 3, destination: 'Taj Mahal', date: 'June 12, 2025', status: 'Confirmed', price: '₹12,350' },
  ];

  // Recommended destinations
  const recommendations = [
    { name: 'Goa', rating: 4.8, category: 'Beaches', price: '₹15,000', duration: '5 days' },
    { name: 'Udaipur', rating: 4.9, category: 'Palace', price: '₹22,500', duration: '4 days' },
    { name: 'Darjeeling', rating: 4.7, category: 'Mountains', price: '₹19,800', duration: '6 days' }
  ];

  // Special offers
  const specialOffers = [
    { title: 'Golden Triangle Tour', discount: '15% OFF', validUntil: 'May 30' },
    { title: 'Kerala Backwaters', discount: '₹5,000 OFF', validUntil: 'June 15' },
    { title: 'Himalayan Adventure', discount: 'FREE Hotel Upgrade', validUntil: 'Limited Time' },
  ];

  // Trip stats
  const tripStats = {
    visited: 3,
    upcoming: 2,
    wishlist: 5,
    reviews: 8
  };

  // Handle initial loading
  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Animation for orb when location changes
  useEffect(() => {
    orbControls.start({
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, ease: "easeInOut" }
    });
  }, [currentLocation, orbControls]);
  
  // Auto-rotate locations every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating particles
  const renderParticles = () => {
    if (!isMounted) return null;
    
    return [...Array(12)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        initial={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          opacity: Math.random() * 0.5 + 0.1
        }}
        animate={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          opacity: [0.1, 0.5, 0.1]
        }}
        transition={{ 
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute rounded-full"
        style={{
          width: (Math.random() * 6 + 2) + 'px',
          height: (Math.random() * 6 + 2) + 'px',
          backgroundColor: i % 2 === 0 ? 
            `${locationThemes[currentLocation].primary}33` : 
            `${locationThemes[currentLocation].secondary}33`
        }}
      />
    ));
  };

  // Navigation options
  const navOptions = [
    { id: 'discover', label: 'Discover', icon: 'compass' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar' },
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'explore', label: 'Explore', icon: 'map' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-400"
            />
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute text-white text-2xl font-bold"
            >
              India Awaits
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* Main content area - with non-fixed background to allow footer to be visible */}
      <div 
        ref={containerRef} 
        className="flex-grow w-full overflow-x-hidden font-sans bg-gray-900 pt-20"
      >
        {/* Modified background - no longer fixed position, part of the normal flow */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
        
        {/* Floating particles with position absolute instead of fixed */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {isMounted && renderParticles()}
        </div>
        
        {/* Orb component - keep as fixed since it's a focal element */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[3]">
          <motion.div 
            className="w-full h-full max-w-2xl pointer-events-auto"
            onMouseEnter={() => setOrbHovered(true)}
            onMouseLeave={() => setOrbHovered(false)}
            animate={orbControls}
          >
            {isMounted && (
              <Orb
                hoverIntensity={1.2}
                rotateOnHover={true}
                hue={locationThemes[currentLocation].hue}
                luminosity={0.6}
                forceHoverState={orbHovered}
                pulseEffect={true}
                pulseDuration={8}
                glowEffect={true}
                glowColor={locationThemes[currentLocation].primary}
                glowSize={orbHovered ? 30 : 15}
              />
            )}
          </motion.div>
        </div>
        
        {/* Main Content */}
        <motion.div 
          initial={false}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-[4] flex w-full flex-col items-center justify-start px-4 sm:px-6 text-white pt-10"
        >
          {/* Welcome Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-4 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30"
            >
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </motion.div>
            
            <motion.h1 
              className="mb-2 font-sans text-4xl md:text-5xl font-bold tracking-tighter"
              initial={{ opacity: 0, letterSpacing: '10px' }}
              animate={{ opacity: 1, letterSpacing: '-1px' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              MAP OF WONDERS
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, delay: 1 }}
              className="mx-auto mb-4 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500"
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-6 text-gray-300 max-w-lg mx-auto"
            >
              Continue your journey through India's timeless landscapes and cultural treasures. Where will your spirit take you today?
            </motion.p>
            
            {/* Quick action buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Find Adventures
              </button>
              <button className="px-5 py-2 rounded-full bg-gray-800 text-gray-300 font-medium text-sm hover:bg-gray-700 transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Recent Trips
              </button>
              <button className="px-5 py-2 rounded-full bg-gray-800 text-gray-300 font-medium text-sm hover:bg-gray-700 transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Booking
              </button>
            </motion.div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Left Column: Featured Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="md:col-span-8 bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden relative transition-all duration-300 min-h-[300px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/90 z-10"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-${currentLocation}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  <motion.div 
                    animate={{ 
                      background: `radial-gradient(circle at 50% 30%, 
                        ${locationThemes[currentLocation].primary}50 0%, 
                        ${locationThemes[currentLocation].secondary}50 50%, 
                        rgba(17, 24, 39, 0.8) 100%)`
                    }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="relative z-20 p-8 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-start">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900/50 text-purple-300 backdrop-blur-sm border border-purple-500/30"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Featured Destination
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex space-x-2"
                  >
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/70 text-gray-300 hover:text-white transition-colors backdrop-blur-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/70 text-gray-300 hover:text-white transition-colors backdrop-blur-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                    </button>
                  </motion.div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentLocation}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-auto"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="flex items-start space-x-2 mb-3"
                    >
                      <div className="flex h-6 items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-300">4.9 (287 reviews)</span>
                      </div>
                    </motion.div>
                    
                    <h2 className="text-4xl font-bold text-white mb-2">{locations[currentLocation]}</h2>
                    <p className="text-gray-300 mb-6 max-w-lg">{descriptions[currentLocation]}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{['Agra, UP', 'Varanasi, UP', 'Jaipur, Rajasthan', 'Kerala', 'Himachal Pradesh'][currentLocation]}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>5-7 days recommended</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span>Starting from ₹15,000</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Book Experience
                      </button>
                      <button className="px-5 py-2.5 bg-gray-800/70 backdrop-blur-sm rounded-lg text-gray-300 text-sm font-medium hover:bg-gray-700 transition-all duration-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z"></path>
                        </svg>
                        View Details
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Location indicators */}
              <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
                {locations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentLocation(i)}
                    className={`transition-all duration-300 ${
                      currentLocation === i 
                        ? 'w-8 h-2 bg-white rounded-full' 
                        : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Right Column: Stats & Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="md:col-span-4 flex flex-col gap-6"
            >
              {/* Travel Stats */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Your Journey</h2>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-900/60 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">{tripStats.visited}</p>
                    <p className="text-gray-400 text-sm mt-1">Places Visited</p>
                  </div>
                  <div className="bg-gray-900/60 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-indigo-400">{tripStats.upcoming}</p>
                    <p className="text-gray-400 text-sm mt-1">Upcoming Trips</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm px-2 py-3">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-300">{tripStats.wishlist}</span>
                    <span className="text-gray-500">Wishlist</span>
                  </div>
                  <div className="h-10 border-l border-gray-700/50"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-300">{tripStats.reviews}</span>
                    <span className="text-gray-500">Reviews</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>2025 Travel Goal</span>
                    <span className="text-purple-400">60% complete</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Recent Bookings */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Recent Bookings</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-500/30">
                    {recentBookings.length} active
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  {recentBookings.slice(0, 2).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center bg-gray-900/60 p-3 rounded-lg hover:bg-gray-900/80 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-white">{booking.destination}</p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {booking.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{booking.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-2.5 bg-gray-900/60 rounded-lg text-sm flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-all duration-300">
                  <span>View All Bookings</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Special Offers & Popular Destinations */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            {/* Section Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-4 sm:mb-0"
              >
                <h2 className="text-2xl font-bold text-white">Special Offers</h2>
                <p className="text-gray-400 text-sm">Limited time deals just for you</p>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
              >
                View All Offers
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.button>
            </div>
            
            {/* Special Offers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {specialOffers.map((offer, idx) => (
                <motion.div
                  key={offer.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (idx * 0.2) }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 group cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-lg bg-gray-900/70">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          {idx === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          ) : idx === 1 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          )}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-400">Valid until {offer.validUntil}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{offer.title}</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30">
                        Special Offer
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-900/70 text-gray-300">
                        Limited Time
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <span className="font-bold text-2xl text-purple-400">{offer.discount}</span>
                    </div>
                    
                    <button className="w-full py-2.5 bg-gray-900/70 rounded-lg text-white text-sm font-medium hover:bg-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Recommendations Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
                  <p className="text-gray-400 text-sm">Based on your travel history</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + (idx * 0.2) }}
                    whileHover={{ y: -8 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <div className="h-40 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        idx === 0 ? 'from-blue-500/30 to-indigo-600/30' :
                        idx === 1 ? 'from-amber-500/30 to-purple-600/30' :
                        'from-green-500/30 to-teal-600/30'
                      } group-hover:opacity-80 transition-opacity duration-700`} />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                          {rec.category}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(rec.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-white text-xs ml-1">{rec.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-medium text-xl text-white mb-2">{rec.name}</h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-purple-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <span className="text-gray-400 text-sm">{rec.duration}</span>
                        </div>
                        <span className="font-medium text-white">{rec.price}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Book Now
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Destinations Indicator Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-full max-w-3xl mx-auto flex justify-center mb-12"
          >
            <div className="bg-gray-800/30 backdrop-blur-md rounded-full px-4 py-3 flex space-x-6 border border-gray-700/30">
              {locations.map((location, i) => (
                <div
                  key={`dest-${i}`}
                  onClick={() => setCurrentLocation(i)}
                  className={`flex cursor-pointer flex-col items-center transition-all duration-300 px-3 py-1 rounded-full ${
                    currentLocation === i ? 'bg-gray-700/70' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <span className={`text-sm font-medium ${currentLocation === i ? 'text-white' : 'text-gray-400'}`}>
                    {location}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Clear margin at the bottom to ensure Footer visibility */}
          <div className="w-full h-24"></div>
        </motion.div>

        {/* Scroll progress indicator */}
        {isMounted && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
          />
        )}

        {/* Floating action buttons */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
          <div className="flex flex-col space-y-4">
            {[
              { icon: "search", tooltip: "Search Destinations" },
              { icon: "heart", tooltip: "Saved Favorites" },
              { icon: "support", tooltip: "24/7 Support" },
              { icon: "settings", tooltip: "Settings" }
            ].map((item, idx) => (
              <div key={`action-${idx}`} className="relative group">
                <button className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-md flex items-center justify-center text-white border border-gray-700/50 hover:border-purple-500/70 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-600/90 group-hover:to-indigo-600/90">
                  {item.icon === "search" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  )}
                  {item.icon === "heart" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  )}
                  {item.icon === "support" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  )}
                  {item.icon === "settings" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {item.tooltip}
                  <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}