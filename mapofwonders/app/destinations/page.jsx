'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const orbControls = useAnimation();
  
  // Theme configuration matching home page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };
  
  // Destinations data
  const destinations = [
    {
      id: 1,
      title: "Taj Mahal",
      subTitle: "Agra",
      image: "/destination/taj-mahal.jpg",
      price: "₹5,000",
      description: "Experience the magnificient Taj Mahal, a symbol of eternal love.",
      category: "heritage",
      rating: 4.9,
      duration: "1-2 days",
      bestTime: "October to March",
      highlights: [
        "UNESCO World Heritage Site",
        "One of the Seven Wonders of the World",
        "Magnificent white marble architecture",
        "Symbol of eternal love"
      ]
    },
    {
      id: 2,
      title: "Varanasi",
      subTitle: "Uttar Pradesh",
      image: "/destination/varanasi.jpg",
      price: "₹4,500",
      description: "Explore the spiritual heart of India on the banks of Ganges.",
      category: "spiritual",
      rating: 4.7,
      duration: "3-4 days",
      bestTime: "November to February",
      highlights: [
        "Spiritual city on the banks of river Ganges",
        "Ancient temples and ghats",
        "Evening Ganga Aarti ceremony",
        "One of the oldest continuously inhabited cities"
      ]
    },
    {
      id: 3,
      title: "Jaipur",
      subTitle: "Rajasthan",
      image: "/destination/jaipur.jpg",
      price: "₹6,000",
      description: "Discover the pink city's royal heritage and magnificent forts.",
      category: "city",
      rating: 4.8,
      duration: "3-5 days",
      bestTime: "October to March",
      highlights: [
        "The Pink City of India",
        "Amber Fort and Palace",
        "City Palace and Hawa Mahal",
        "Vibrant culture and shopping"
      ]
    },
    {
      id: 4,
      title: "Kerala",
      subTitle: "God's Own Country",
      image: "/destination/kerala.jpg",
      price: "₹7,500",
      description: "Relax in the serene backwaters and lush greenery.",
      category: "nature",
      rating: 4.9,
      duration: "5-7 days",
      bestTime: "September to March",
      highlights: [
        "Serene backwaters",
        "Lush tea plantations",
        "Beautiful beaches",
        "Ayurvedic wellness treatments"
      ]
    },
    {
      id: 5,
      title: "Himalaya",
      subTitle: "Northern India",
      image: "/destination/himalaya.jpg",
      price: "₹8,000",
      description: "Adventure in the mighty Himalayas with breathtaking views.",
      category: "adventure",
      rating: 4.8,
      duration: "7-10 days",
      bestTime: "April to June, September to November",
      highlights: [
        "Majestic mountain ranges",
        "Trekking and adventure sports",
        "Hill stations and monasteries",
        "Unique local cultures"
      ]
    },
  ];

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'heritage', name: 'Heritage Sites' },
    { id: 'spiritual', name: 'Spiritual' },
    { id: 'city', name: 'Cities' },
    { id: 'nature', name: 'Nature' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'beach', name: 'Beaches' },
    { id: 'unique', name: 'Unique Places' }
  ];

  // Featured collections
  const collections = [
    { 
      name: 'Heritage Tour', 
      count: 12, 
      image: '/category/heritage.jpg'
    },
    { 
      name: 'Beach Getaways', 
      count: 8, 
      image: '/category/beach.jpg'
    },
    { 
      name: 'Mountain Escapes', 
      count: 15, 
      image: '/category/mountain.jpg'
    }
  ];

  // Seasonal recommendations
  const seasonal = [
    { 
      name: 'Winter Wonderlands', 
      description: 'Perfect destinations for the cold season', 
      image: '/category/winter.jpg'
    },
    { 
      name: 'Monsoon Magic', 
      description: 'Beautiful places to visit during the rains', 
      image: '/category/monsoon.jpg'
    }
  ];
  
  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  // Orb animation effect
  useEffect(() => {
    orbControls.start({
      scale: [1, 1.1, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
    });
  }, [orbControls]);

  // Filter destinations based on search and category
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.subTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || dest.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Render floating particles similar to home page
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
            `${themeColors.primary}33` : 
            `${themeColors.secondary}33`
        }}
      />
    ));
  };

  // Open destination details modal
  const openDestinationDetails = (destination) => {
    setSelectedDestination(destination);
    setShowDetails(true);
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
              Discover India
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-grow w-full overflow-x-hidden font-sans bg-gray-900 pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {isMounted && renderParticles()}
        </div>
        
        {/* Orb component */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <motion.div 
            className="w-full h-full max-w-2xl pointer-events-auto"
            animate={orbControls}
          >
            {isMounted && (
              <Orb
                hoverIntensity={1.2}
                rotateOnHover={false}
                hue={themeColors.hue}
                luminosity={0.6}
                pulseEffect={true}
                pulseDuration={8}
                glowEffect={true}
                glowColor={themeColors.primary}
                glowSize={15}
              />
            )}
          </motion.div>
        </div>
        
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-[4] flex w-full flex-col items-center justify-start px-4 sm:px-6 text-white pt-10"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-12 w-full max-w-4xl"
          >
            <motion.h1 
              className="mb-4 font-sans text-4xl md:text-5xl font-bold tracking-tighter"
              initial={{ opacity: 0, letterSpacing: '8px' }}
              animate={{ opacity: 1, letterSpacing: '-1px' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              EXPLORE DESTINATIONS
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
              className="mb-6 text-gray-300 max-w-2xl mx-auto"
            >
              Discover the diverse landscapes, ancient traditions, and vibrant cultures across India's most enchanting destinations.
            </motion.p>
            
            {/* Search bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="relative max-w-xl mx-auto mb-8"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search destinations, cities, regions..."
                className="w-full py-3 pl-10 pr-4 bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-8 overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-3 pb-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Collections</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((collection, idx) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="relative h-40 rounded-xl overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    quality={90}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                    <p className="text-sm text-gray-300">{collection.count} destinations</p>
                    <div className="w-8 h-1 bg-purple-500 mt-2 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Destinations Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeFilter === 'all' ? 'All Destinations' : categories.find(c => c.id === activeFilter).name}
              </h2>
              <span className="text-sm text-gray-400">{filteredDestinations.length} destinations</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination, idx) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="bg-gray-800/50 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="h-44 relative overflow-hidden">
                    <Image 
                      src={destination.image} 
                      alt={destination.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                  
                  <div className="p-5">
                    {/* Title and Subtitle */}
                    <h3 className="font-medium text-xl text-white mb-1">{destination.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{destination.subTitle}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-purple-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      {/* Price */}
                      <span className="font-medium text-white">{destination.price}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => openDestinationDetails(destination)}
                      >
                        Explore Now
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
          </motion.div>

          {/* Seasonal Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Seasonal Recommendations</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-500/30">
                Updated Weekly
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasonal.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer group border border-gray-700/30"
                >
                  <div className="relative h-48">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <svg className="w-6 h-6 text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="inline-flex items-center space-x-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span>View Collection</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Destination Details Modal */}
          <AnimatePresence>
            {showDetails && selectedDestination && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
                onClick={() => setShowDetails(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-gray-800 rounded-2xl w-full max-w-4xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    {/* Image Section - Fixed */}
                    <div className="h-64 relative">
                      <Image 
                        src={selectedDestination.image}
                        alt={selectedDestination.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="object-cover"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-4xl font-bold text-white mb-2">{selectedDestination.title}</h2>
                        <p className="text-gray-300 text-lg">{selectedDestination.subTitle}</p>
                      </div>
                      
                      <button
                        onClick={() => setShowDetails(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/60 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <div className="px-3 py-1 rounded-full bg-purple-900/60 text-purple-300 text-sm">
                            {categories.find(c => c.id === selectedDestination.category)?.name || 'Destination'}
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(selectedDestination.rating || 4.5) ? 'text-yellow-400' : 'text-gray-500'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-white text-sm ml-1">{selectedDestination.rating || '4.5'}</span>
                          </div>
                        </div>
                        <div className="text-white font-semibold">{selectedDestination.price}</div>
                    </div>
                    </div>
                    {/* Description and details */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-white mb-2">About this destination</h3>
                      <p className="text-gray-300">{selectedDestination.description}</p>
                    </div>

                    {/* Key info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-purple-400 text-sm mb-1">Duration</div>
                        <div className="text-white">{selectedDestination.duration}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-purple-400 text-sm mb-1">Best Time to Visit</div>
                        <div className="text-white">{selectedDestination.bestTime}</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-purple-400 text-sm mb-1">Category</div>
                        <div className="text-white">{categories.find(c => c.id === selectedDestination.category)?.name}</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-white mb-4">Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedDestination.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="mt-1 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                      <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium">
                        Book This Trip
                      </button>
                      <button className="flex items-center justify-center py-3 px-6 rounded-lg bg-gray-700 text-white">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="w-full max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md border border-purple-500/20"
          >
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Personalized Travel Recommendations</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and receive custom travel suggestions tailored to your preferences and interests.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                  Subscribe Now
                </button>
              </div>
              
              <p className="text-xs text-gray-400 mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Discover India</h3>
              <p className="text-gray-400 mb-4">
                Your gateway to extraordinary travel experiences across India's diverse landscapes and cultures.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Tours & Packages</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Heritage Sites</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Adventure Travel</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Travel Street, New Delhi, India</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">info@discoverindia.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+91 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Discover India. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}