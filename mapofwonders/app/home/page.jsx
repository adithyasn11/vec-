'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Orb from '../../components/Orb.jsx';
import Threads from '../../components/Threads.jsx';

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [orbHovered, setOrbHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to simulate logged-in state
  
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

  // Recent bookings data - for logged in dashboard view
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
  
  // Rotate backgrounds every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden font-sans bg-gray-900 min-h-screen pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 opacity-80" />
      
      {/* Threads background component - positioned behind everything with lower z-index */}
      <div className="absolute inset-0 z-[1]">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      {/* Orb component container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <div 
          className="w-full h-full max-w-2xl pointer-events-auto"
          onMouseEnter={() => setOrbHovered(true)}
          onMouseLeave={() => setOrbHovered(false)}
        >
          <Orb
            hoverIntensity={0.8}
            rotateOnHover={true}
            hue={currentLocation * 72} // Different hue for each location
            forceHoverState={orbHovered}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-[3] flex min-h-screen w-full flex-col items-center justify-start px-6 text-white pt-10">
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
            className="mx-auto mb-4 h-1 bg-gray-400"
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

        {/* Dashboard Content for Logged In Users */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* User Trip Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="col-span-1 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
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
                  <div key={booking.id} className="flex justify-between items-center bg-gray-700/30 p-3 rounded-md">
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
              <button className="w-full mt-3 text-sm flex items-center justify-center py-2 bg-gray-700/50 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">
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
            className="col-span-1 md:col-span-2 bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10"></div>
            
            <motion.div
              key={currentLocation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gray-800"
            >
              {/* We would use an actual image here, but for this example we'll use a placeholder with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-gray-900/80"></div>
            </motion.div>
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <motion.div
                key={`title-${currentLocation}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
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
            </div>
            
            {/* Bottom indicators */}
            <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
              {locations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentLocation(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentLocation === i ? 'bg-white w-6' : 'bg-white/50'
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className="h-48 bg-gray-700 relative overflow-hidden">
                  {/* Background gradient simulating image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    idx === 0 ? 'from-blue-900/80 to-indigo-900/80' :
                    idx === 1 ? 'from-amber-900/80 to-purple-900/80' :
                    'from-green-900/80 to-teal-900/80'
                  } group-hover:scale-110 transition-transform duration-700`}></div>
                  
                  {/* Overlay gradient */}
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
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">5-day tour</span>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 flex w-full justify-center"
        >
          <div className="flex space-x-8">
            {locations.map((location, i) => (
              <motion.div
                key={location}
                whileHover={{ y: -5 }}
                onClick={() => setCurrentLocation(i)}
                className="flex cursor-pointer flex-col items-center"
              >
                <div className={`mb-2 h-3 w-3 rounded-full ${currentLocation === i ? 'bg-gray-300' : 'bg-gray-600'}`}>
                  <motion.div
                    animate={{ scale: currentLocation === i ? [1, 1.5, 1] : 1 }}
                    transition={{ 
                      repeat: currentLocation === i ? Infinity : 0, 
                      duration: 2 
                    }}
                    className={`h-full w-full rounded-full ${currentLocation === i ? 'bg-gray-300' : ''}`}
                  />
                </div>
                <span className={`text-xs font-medium transition-colors ${currentLocation === i ? 'text-gray-300' : 'text-gray-500'}`}>
                  {location}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Floating action menu */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="fixed top-24 right-6 z-[4]"
      >
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gray-800/80 p-3 text-white shadow-lg"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gray-800/80 p-3 text-white shadow-lg"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gray-800/80 p-3 text-white shadow-lg"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}