'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState(0);
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
    { primary: '#FF6B6B', secondary: '#4ECDC4', hue: 0 },     // Taj Mahal
    { primary: '#FF9F1C', secondary: '#A42CD6', hue: 60 },    // Varanasi
    { primary: '#F8485E', secondary: '#FFB740', hue: 120 },   // Jaipur
    { primary: '#2EC4B6', secondary: '#9BF6FF', hue: 180 },   // Kerala
    { primary: '#5603AD', secondary: '#8367C7', hue: 240 }    // Himalaya
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
    { id: 1, destination: 'Jaipur', date: 'May 15, 2025', status: 'Confirmed' },
    { id: 2, destination: 'Kerala', date: 'July 3, 2025', status: 'Pending' },
  ];

  // Recommended destinations
  const recommendations = [
    { name: 'Goa', rating: 4.8, image: 'beaches' },
    { name: 'Udaipur', rating: 4.9, image: 'palace' },
    { name: 'Darjeeling', rating: 4.7, image: 'mountains' }
  ];

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
          className="relative z-[4] flex w-full flex-col items-center justify-start px-6 text-white pt-10"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="mb-2 font-sans text-5xl font-bold tracking-tighter md:text-6xl"
              initial={{ opacity: 0, letterSpacing: '10px' }}
              animate={{ opacity: 1, letterSpacing: '-1px' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              EXPLORE INDIA
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1, delay: 1 }}
              className="mx-auto mb-4 h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-8 text-xl font-light tracking-wide text-gray-300"
            >
              Welcome back to your journey through timeless beauty
            </motion.p>
          </motion.div>

          {/* Dashboard Content Grid */}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* User Trip Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="col-span-1 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 transition-all duration-300"
            >
              <h2 className="text-xl font-medium mb-4 text-white">Your Journey</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-400">3</p>
                  <p className="text-gray-400 text-sm mt-1">Places Visited</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-indigo-400">2</p>
                  <p className="text-gray-400 text-sm mt-1">Upcoming Trips</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Upcoming Bookings
                </h3>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center bg-gray-700/30 p-3 rounded-md transition-all duration-300"
                    >
                      <div>
                        <p className="font-medium text-white">{booking.destination}</p>
                        <p className="text-xs text-gray-400">{booking.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-sm flex items-center justify-center py-2 bg-gray-700/50 rounded-md text-gray-300 hover:bg-gray-700 transition-all duration-300">
                  <span>View All Bookings</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Featured Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden relative transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-${currentLocation}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 bg-gray-800"
                >
                  <motion.div 
                    animate={{ 
                      background: `radial-gradient(circle at 50% 50%, 
                        ${locationThemes[currentLocation].primary}50 0%, 
                        ${locationThemes[currentLocation].secondary}50 50%, 
                        rgba(17, 24, 39, 0.8) 100%)`
                    }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentLocation}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-purple-300 text-sm mb-1">Featured Destination</p>
                    <h2 className="text-3xl font-bold text-white mb-2">{locations[currentLocation]}</h2>
                    <p className="text-gray-300 mb-4">{descriptions[currentLocation]}</p>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                        Explore Now
                      </button>
                      <button className="px-4 py-2 bg-gray-700/50 backdrop-blur-sm rounded-md text-gray-300 text-sm font-medium hover:bg-gray-700/80 transition-all duration-300">
                        Add to Wishlist
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
                        ? 'w-6 h-2 bg-white rounded-full' 
                        : 'w-2 h-2 bg-white/50 rounded-full'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Recommendations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={rec.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (idx * 0.2) }}
                  whileHover={{ y: -10 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className="h-48 bg-gray-700 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      idx === 0 ? 'from-blue-900/80 to-indigo-900/80' :
                      idx === 1 ? 'from-amber-900/80 to-purple-900/80' :
                      'from-green-900/80 to-teal-900/80'
                    } group-hover:scale-110 transition-transform duration-700`} />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="flex items-center space-x-1 mb-1">
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
                      <h3 className="font-medium text-white text-lg">{rec.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-purple-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm">5-day tour</span>
                      </div>
                      <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Destination Indicators */}
          <div className="flex space-x-8 justify-center mb-16">
            {locations.map((location, i) => (
              <div
                key={`dest-${i}`}
                onClick={() => setCurrentLocation(i)}
                className="flex cursor-pointer flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                    currentLocation === i ? 'bg-gray-700' : 'bg-white/10'
                  }`}
                />
                <span className={`text-sm ${currentLocation === i ? 'text-white' : 'text-gray-400'}`}>
                  {location}
                </span>
              </div>
            ))}
          </div>

          {/* Clear margin at the bottom to ensure Footer visibility */}
          <div className="w-full h-16"></div>
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
              { icon: "cart", tooltip: "View Bookings" }
            ].map((item, idx) => (
              <div key={`action-${idx}`} className="relative group">
                <button className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-md flex items-center justify-center text-white border border-gray-700 hover:border-purple-500 transition-all duration-300">
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
                  {item.icon === "cart" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-3 right-16 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap transition-opacity duration-200">
                  {item.tooltip}
                  <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 border-8 border-transparent border-l-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio toggle button */}
        <button className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-md flex items-center justify-center text-white border border-gray-700 hover:border-purple-500 transition-all duration-300 z-40">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l3.536-3.536m-2.828-2.829a9 9 0 010 12.728M19.414 7.757l2.121-2.121m-16.97 7.071l-2.122-2.121m-1.414 1.414L7.757 7.757"></path>
          </svg>
        </button>
      </div>

      {/* Space for footer - this allows content to flow naturally so the footer will be visible */}
      <div className="relative z-[5] bg-gray-900 w-full">
        {/* The actual Footer component will be rendered here by your layout or page structure */}
        {/* We're not adding the footer component directly as requested, just making space for it */}
      </div>
    </div>
  );
}