'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion';
import Orb from '../../components/Orb.jsx';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [activeTab, setActiveTab] = useState('discover');
  const [orbHovered, setOrbHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const containerRef = useRef(null);
  const orbControls = useAnimation();
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  
  
  const locationThemes = [
    { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D', hue: 0 },     // Taj Mahal
    { primary: '#FF9F1C', secondary: '#A42CD6', accent: '#F9C846', hue: 60 },    // Varanasi
    { primary: '#F8485E', secondary: '#FFB740', accent: '#00A6A6', hue: 120 },   // Jaipur
    { primary: '#2EC4B6', secondary: '#9BF6FF', accent: '#EFCA08', hue: 180 },   // Kerala
    { primary: '#5603AD', secondary: '#8367C7', accent: '#C2CAE8', hue: 240 }    // Himalaya
  ];
  
  
  const locations = [
    'Taj Mahal',
    'Varanasi',
    'Jaipur',
    'Kerala',
    'Himalaya'
  ];
  
  
  const descriptions = [
    'Symbol of eternal love in Agra',
    'Spiritual heart of India on the Ganges',
    'The majestic Pink City of Rajasthan',
    'Serene backwaters and lush landscapes',
    'Majestic mountains touching the sky'
  ];

  const locationDetails = [
    { location: 'Taj Mahal', price: '₹12,350', place: 'Agra, UP', duration: '5-7 days' },
    { location: 'Varanasi', price: '₹14,500', place: 'Varanasi, UP', duration: '4-6 days' },
    { location: 'Jaipur', price: '₹24,500', place: 'Jaipur, Rajasthan', duration: '5-7 days' },
    { location: 'Kerala', price: '₹18,900', place: 'Kerala', duration: '6-8 days' },
    { location: 'Himalaya', price: '₹28,700', place: 'Himachal Pradesh', duration: '7-10 days' }
  ];
  
  const destinationImages = [
    {
      main: '/destinations/taj-mahal.jpg',
      thumb: '/destinations/taj-mahal.jpg',
      gallery: [
        '/destinations/taj-mahal.jpg',
        '/destinations/taj-mahal.jpg',
        '/destinations/taj-mahal.jpg'
      ]
    },
    {
      main: '/destinations/varanasi.jpg',
      thumb: '/destinations/varanasi.jpg',
      gallery: [
        '/destinations/varanasi.jpg',
        '/destinations/varanasi.jpg',
        '/destinations/varanasi.jpg'
      ]
    },
    {
      main: '/destinations/jaipur.jpg',
      thumb: '/destinations/jaipur.jpg',
      gallery: [
        '/destinations/jaipur.jpg',
        '/destinations/jaipur.jpg',
        '/destinations/jaipur.jpg'
      ]
    },
    {
      main: '/destinations/kerala.jpg',
      thumb: '/destinations/kerala.jpg',
      gallery: [
        '/destinations/kerala.jpg',
        '/destinations/kerala.jpg',
        '/destinations/kerala.jpg'
      ]
    },
    {
      main: '/destinations/himalaya.jpg',
      thumb: '/destinations/himalaya.jpg',
      gallery: [
        '/destinations/himalaya.jpg',
        '/destinations/himalaya.jpg',
        '/destinations/himalaya.jpg'
      ]
    }
  ];
 
  // Load bookings from localStorage
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save bookings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const specialOffers = [
    { title: 'Golden Triangle Tour', discount: '15% OFF', validUntil: 'May 30' },
    { title: 'Kerala Backwaters', discount: '₹5,000 OFF', validUntil: 'June 15' },
    { title: 'Himalayan Adventure', discount: 'FREE Hotel Upgrade', validUntil: 'Limited Time' },
  ];

  // Trip stats based on actual bookings and favorites
  const tripStats = {
    visited: Math.min(3, bookings.filter(booking => new Date(booking.date) < new Date()).length),
    upcoming: bookings.filter(booking => new Date(booking.date) >= new Date()).length,
    wishlist: favorites.length,
    reviews: Math.floor(Math.random() * 10) + 3
  };

  // Add a new booking
  const addBooking = (location) => {
    const locationInfo = locationDetails.find(loc => loc.location === location);
    if (!locationInfo) return;
    
    const newBooking = {
      id: Date.now(),
      destination: location,
      date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      status: 'Pending',
      price: locationInfo.price
    };
    
    setBookings(prev => [...prev, newBooking]);
    toast.success(`Booking for ${location} added successfully!`);
  };

  // Toggle favorite
  const toggleFavorite = (location) => {
    if (favorites.includes(location)) {
      setFavorites(favorites.filter(fav => fav !== location));
      toast.success(`${location} removed from favorites`);
    } else {
      setFavorites([...favorites, location]);
      toast.success(`${location} added to favorites`);
    }
  };
  
  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  
  useEffect(() => {
    orbControls.start({
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, ease: "easeInOut" }
    });
  }, [currentLocation, orbControls]);
  
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

 
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

      {/* Toast notifications container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50"></div>

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
              
              <a href="/destinations">
              <button 
                onClick={() => setActiveTab('discover')}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Find Adventures
              </button>
            </a>

            <a href="/favorite">
              <button 
                onClick={() => setActiveTab('favorites')}
                className="px-5 py-2 rounded-full bg-gray-800 text-gray-300 font-medium text-sm hover:bg-gray-700 transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {favorites.length}
                  </span>
                )}
              </button>
            </a>

            <a href="/bookings">
            <button 
                onClick={goToBookings}
                className="px-5 py-2.5 bg-gray-800/70 backdrop-blur-sm rounded-lg text-gray-300 text-sm font-medium hover:bg-gray-700 transition-all duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                My Bookings
              </button>
            </a>
            </motion.div>
          </motion.div>
          
          {/* Main Dashboard Grid */}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Left Column: Featured Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="md:col-span-8 bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden relative transition-all duration-300 min-h-[300px] border border-gray-700/30 hover:border-purple-500/30"
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
                  <div className="relative w-full h-full">
                    <Image
                      src={destinationImages[currentLocation].main}
                      alt={locations[currentLocation]}
                      fill
                      className="transition-transform duration-500 group-hover:scale-110 object-cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={destinationImages[currentLocation].main}
                      priority
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/50 to-gray-900/90"
                    />
                  </div>
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
                    <button 
                      onClick={() => toggleFavorite(locations[currentLocation])}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        favorites.includes(locations[currentLocation]) 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800/70 text-gray-300 hover:text-white'
                      } transition-colors backdrop-blur-sm`}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill={favorites.includes(locations[currentLocation]) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                        <span>{locationDetails[currentLocation].place}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{locationDetails[currentLocation].duration} recommended</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span>Starting from {locationDetails[currentLocation].price}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => addBooking(locations[currentLocation])}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Book Experience
                    </button>
                      <button 
                        onClick={() => setActiveTab('details')}
                        className="px-5 py-2.5 bg-gray-800/70 backdrop-blur-sm rounded-lg text-gray-300 text-sm font-medium hover:bg-gray-700 transition-all duration-300 flex items-center"
                      >
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
                onClick={() => setActiveTab('offers')}
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
                  <div className="relative h-48 mb-4">
                    <Image
                      src={idx === 0 ? '/destinations/taj-mahal.jpg' : 
                           idx === 1 ? '/destinations/kerala.jpg' : 
                           '/destinations/himalaya.jpg'}
                      alt={offer.title}
                      fill
                      className="transition-transform duration-500 group-hover:scale-110 object-cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={idx === 0 ? '/destinations/taj-mahal.jpg' : 
                                   idx === 1 ? '/destinations/kerala.jpg' : 
                                   '/destinations/himalaya.jpg'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-lg bg-gray-900/70">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          {idx === 0 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          ) : idx === 1 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5a1 1 0 011-1V8z" clipRule="evenodd" />
                          )}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-400">Valid until {offer.validUntil}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{offer.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30">
                        Special Offer
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-900/70 text-gray-300">
                        Limited Time
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <span className="font-bold text-xl text-purple-400">{offer.discount}</span>
                    </div>
                    
                    <button 
                      className="w-full py-2 bg-gray-900/70 rounded-lg text-white text-sm font-medium hover:bg-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600"
                      onClick={() => {
                        const destination = offer.title.split(' ')[0];
                        const matchingLocation = locations.find(loc => loc.includes(destination));
                        if (matchingLocation) {
                          addBooking(matchingLocation);
                        } else {
                          toast.success(`Booked special offer: ${offer.title}`);
                          setBookings(prev => [...prev, {
                            id: Date.now(),
                            destination: offer.title,
                            date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }),
                            status: 'Pending',
                            price: offer.discount
                          }]);
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Popular Destinations */}
            <div className="mb-6 flex flex-wrap justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mb-4 sm:mb-0"
              >
                <h2 className="text-2xl font-bold text-white">Popular Destinations</h2>
                <p className="text-gray-400 text-sm">Most loved places in India</p>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                onClick={() => window.location.href = '/destinations'}
              >
                View All Destinations
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.button>
            </div>
            
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.slice(0, 3).map((location, idx) => (
                <motion.div
                  key={location}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + (idx * 0.2) }}
                  whileHover={{ y: -5 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer h-64"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={destinationImages[idx].main}
                      alt={location}
                      fill
                      className="transition-transform duration-500 group-hover:scale-110 object-cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={destinationImages[idx].main}
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-900/50 text-white backdrop-blur-sm">
                        {locationDetails[idx].duration}
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(location);
                        }}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          favorites.includes(location) 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-800/70 text-gray-300 hover:text-white'
                        } transition-colors backdrop-blur-sm`}
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill={favorites.includes(location) ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{location}</h3>
                      <p className="text-gray-300 text-sm mb-3">{descriptions[idx]}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{locationDetails[idx].price}</span>
                        
                        <button 
                          onClick={() => addBooking(location)}
                          className="px-3 py-1 bg-purple-600 rounded-lg text-white text-xs font-medium hover:bg-purple-500 transition-all duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conditional Content Based on Active Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto mb-16"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Favorites</h2>
                  <button 
                    onClick={() => setActiveTab('discover')}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Back to Discover
                  </button>
                </div>
                
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favLocation, idx) => {
                      const locationIndex = locations.findIndex(loc => loc === favLocation);
                      return (
                        <div
                          key={favLocation}
                          className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 group"
                        >
                          <div className="p-6">
                            <div 
                              className="h-32 mb-4 rounded-lg bg-gray-900/70 flex items-center justify-center"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, 
                                  ${locationThemes[locationIndex]?.primary || locationThemes[0].primary}30 0%, 
                                  ${locationThemes[locationIndex]?.secondary || locationThemes[0].secondary}30 70%, 
                                  rgba(17, 24, 39, 0.9) 100%)`
                              }}
                            >
                              <h3 className="text-2xl font-bold text-white">{favLocation}</h3>
                            </div>
                            
                            <p className="text-gray-300 text-sm mb-4">
                              {descriptions[locationIndex] || "A beautiful destination in India"}
                            </p>
                            
                            <div className="flex justify-between">
                              <button 
                                onClick={() => toggleFavorite(favLocation)}
                                className="px-4 py-2 bg-red-600/80 rounded-lg text-white text-sm font-medium hover:bg-red-500 transition-all duration-300 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 011 1h2a1 1 0 011 1v5a1 1 0 11-2 0v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 11-2 0v-5a1 1 0 011-1V8z" clipRule="evenodd" />
                                </svg>
                                Remove
                              </button>
                              
                              <button 
                                onClick={() => addBooking(favLocation)}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-10 text-center border border-gray-700/50">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">No favorites yet</h3>
                    <p className="text-gray-400 mb-6">Add destinations to your favorites to see them here</p>
                    <button 
                      onClick={() => setActiveTab('discover')}
                      className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                    >
                      Discover Places
                    </button>
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto mb-16"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Bookings</h2>
                  <button 
                    onClick={() => setActiveTab('discover')}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Back to Discover
                  </button>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-900/70">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Destination</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-700/20 transition-colors">
                              <td className="py-4 px-4 text-sm text-white">{booking.destination}</td>
                              <td className="py-4 px-4 text-sm text-gray-300">{booking.date}</td>
                              <td className="py-4 px-4 text-sm text-gray-300">{booking.price}</td>
                              <td className="py-4 px-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  booking.status === 'Confirmed' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button 
                                  onClick={() => {
                                    setBookings(bookings.filter(b => b.id !== booking.id));
                                    toast.success(`Booking for ${booking.destination} cancelled`);
                                  }}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-10 text-center border border-gray-700/50">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">No bookings yet</h3>
                    <p className="text-gray-400 mb-6">Book your first adventure to get started</p>
                    <button 
                      onClick={() => setActiveTab('discover')}
                      className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                    >
                      Explore Destinations
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-2 px-4 z-40 md:hidden">
            <div className="flex justify-around items-center">
              {navOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`flex flex-col items-center py-1 px-3 rounded-lg ${
                    activeTab === option.id ? 'text-purple-400' : 'text-gray-400'
                  }`}
                >
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {option.icon === 'compass' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10L4.553 2.276A1 1 0 002 5.618V18.38a1 1 0 001.553.894L9 17m0-13V4m0 0L9 7"></path>
                    )}
                    {option.icon === 'calendar' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    )}
                    {option.icon === 'user' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    )}
                    {option.icon === 'map' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    )}
                  </svg>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

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
      </div>

      


</div>
  );
}

const renderNotification = () => {
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-gray-800 border border-purple-500/30 rounded-lg shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-white">{notificationMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const goToBookings = () => {
  window.location.href = '/bookings';
};

const addBooking = (locationName) => {
  // Find the location details
  const locationIndex = locations.findIndex(loc => loc === locationName);
  
  // Create a new booking object
  const newBooking = {
    id: `destination-${locationIndex}`,
    name: locationName,
    location: locationDetails[locationIndex].place,
    price: locationDetails[locationIndex].price,
    duration: locationDetails[locationIndex].duration.split(' ')[0], // Extract just the number
    bookingId: `BK-${Math.floor(Math.random() * 10000)}`,
    bookingDate: new Date().toISOString(),
    status: 'Confirmed',
    paymentStatus: 'Paid',
    guests: 2
  };
  
  // Store the booking in localStorage
  const storedBookings = localStorage.getItem('userBookings');
  let bookings = [];
  
  if (storedBookings) {
    bookings = JSON.parse(storedBookings);
  }
  
  // Check if this destination is already booked
  const existingBooking = bookings.find(booking => booking.id === newBooking.id);
  
  if (!existingBooking) {
    // Add the new booking
    bookings.push(newBooking);
    
    // Update localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Show notification
    setNotificationMessage(`${locationName} added to your bookings!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    
    // Dispatch custom event for inter-page communication
    const bookingEvent = new CustomEvent('bookingAdded', {
      detail: newBooking
    });
    window.dispatchEvent(bookingEvent);
  } else {
    // Show notification for already booked
    setNotificationMessage(`${locationName} is already in your bookings`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }
};