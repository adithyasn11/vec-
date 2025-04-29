'use client';

import { useState, useEffect, useRef } from 'react';
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
      name: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      description: 'Symbol of eternal love, this ivory-white marble mausoleum on the south bank of the Yamuna river is one of the most recognizable structures in the world.',
      category: 'heritage',
      rating: 4.9,
      price: '₹12,500',
      duration: '2 days',
      highlights: ['UNESCO World Heritage Site', 'Mughal Architecture', 'Marble Craftsmanship'],
      bestTime: 'October to March',
      image: 'taj-mahal'
    },
    {
      id: 2,
      name: 'Varanasi',
      location: 'Uttar Pradesh',
      description: 'One of the oldest continuously inhabited cities in the world, Varanasi is India\'s spiritual capital with its sacred ghats along the Ganges River.',
      category: 'spiritual',
      rating: 4.7,
      price: '₹15,000',
      duration: '3 days',
      highlights: ['Ganga Aarti', 'Ancient Temples', 'Boat Rides on Ganges'],
      bestTime: 'November to February',
      image: 'varanasi'
    },
    {
      id: 3,
      name: 'Jaipur',
      location: 'Rajasthan',
      description: 'Known as the Pink City, Jaipur is famous for its stunning architecture, colorful streets, and royal heritage as part of the Golden Triangle circuit.',
      category: 'city',
      rating: 4.8,
      price: '₹18,000',
      duration: '4 days',
      highlights: ['Amer Fort', 'Hawa Mahal', 'City Palace'],
      bestTime: 'October to March',
      image: 'jaipur'
    },
    {
      id: 4,
      name: 'Kerala Backwaters',
      location: 'Kerala',
      description: 'A network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways, surrounded by lush greenery and coconut groves.',
      category: 'nature',
      rating: 4.9,
      price: '₹22,000',
      duration: '5 days',
      highlights: ['Houseboat Stay', 'Ayurvedic Treatments', 'Pristine Beaches'],
      bestTime: 'September to March',
      image: 'kerala'
    },
    {
      id: 5,
      name: 'Himalayan Mountains',
      location: 'Northern India',
      description: 'The majestic Himalayan range offers breathtaking landscapes, adventure activities, and spiritual retreats in states like Himachal Pradesh and Uttarakhand.',
      category: 'adventure',
      rating: 4.9,
      price: '₹25,000',
      duration: '7 days',
      highlights: ['Trekking', 'River Rafting', 'Spiritual Retreats'],
      bestTime: 'March to June, September to November',
      image: 'himalaya'
    },
    {
      id: 6,
      name: 'Goa Beaches',
      location: 'Goa',
      description: 'India\'s coastal paradise known for its gorgeous beaches, vibrant nightlife, Portuguese architecture, and water sports.',
      category: 'beach',
      rating: 4.7,
      price: '₹20,000',
      duration: '4 days',
      highlights: ['Beach Shacks', 'Water Sports', 'Colonial Architecture'],
      bestTime: 'November to February',
      image: 'goa'
    },
    {
      id: 7,
      name: 'Darjeeling',
      location: 'West Bengal',
      description: 'This hill station in the foothills of the Himalayas is known for its tea plantations, colonial architecture, and views of Kanchenjunga, the world\'s third-highest mountain.',
      category: 'nature',
      rating: 4.6,
      price: '₹16,500',
      duration: '4 days',
      highlights: ['Tea Gardens', 'Toy Train', 'Tiger Hill Sunrise'],
      bestTime: 'March to May, October to November',
      image: 'darjeeling'
    },
    {
      id: 8,
      name: 'Udaipur',
      location: 'Rajasthan',
      description: 'Known as the "City of Lakes" and the "Venice of the East", Udaipur is famous for its palaces, lakes, and romantic atmosphere.',
      category: 'city',
      rating: 4.8,
      price: '₹19,500',
      duration: '3 days',
      highlights: ['Lake Palace', 'City Palace', 'Boat Rides'],
      bestTime: 'October to March',
      image: 'udaipur'
    },
    {
      id: 9,
      name: 'Rann of Kutch',
      location: 'Gujarat',
      description: 'One of the largest salt deserts in the world, this stunning white landscape transforms into a surreal experience during the Rann Utsav festival.',
      category: 'unique',
      rating: 4.7,
      price: '₹17,800',
      duration: '3 days',
      highlights: ['White Desert', 'Rann Utsav', 'Local Crafts'],
      bestTime: 'November to February',
      image: 'kutch'
    }
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
    { name: 'Heritage Tour', count: 12, image: 'heritage' },
    { name: 'Beach Getaways', count: 8, image: 'beach' },
    { name: 'Mountain Escapes', count: 15, image: 'mountain' }
  ];

  // Seasonal recommendations
  const seasonal = [
    { name: 'Winter Wonderlands', description: 'Perfect destinations for the cold season', image: 'winter' },
    { name: 'Monsoon Magic', description: 'Beautiful places to visit during the rains', image: 'monsoon' }
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
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 group-hover:from-purple-600/50 group-hover:to-indigo-600/50 transition-all duration-500"></div>
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
                  onClick={() => openDestinationDetails(destination)}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="h-44 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 group-hover:opacity-70 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                        {categories.find(c => c.id === destination.category)?.name || destination.category}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-white text-xs ml-1">{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-medium text-xl text-white mb-1">{destination.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{destination.location}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-purple-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm">{destination.duration}</span>
                      </div>
                      <span className="font-medium text-white">{destination.price}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                  className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer group border border-gray-700/30"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <svg className="w-6 h-6 text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="inline-flex items-center space-x-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span>View Collection</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            {showDetails && (
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
                  {selectedDestination && (
                    <div className="relative">
                      <div className="h-64 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-indigo-600/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-4xl font-bold text-white mb-2">{selectedDestination.name}</h2>
                          <p className="text-gray-300 text-lg">{selectedDestination.location}</p>
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
                              {categories.find(c => c.id === selectedDestination.category)?.name || selectedDestination.category}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(selectedDestination.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-white text-sm ml-1">{selectedDestination.rating}</span>
                            </div>
                          </div>
                          <div className="text-white font-semibold">{selectedDestination.price}</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <h4 className="text-gray-300 font-medium">Duration</h4>
                            </div>
                            <p className="text-white text-lg">{selectedDestination.duration}</p>
                          </div>
                          
                          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <h4 className="text-gray-300 font-medium">Best Time</h4>
                            </div>
                            <p className="text-white text-lg">{selectedDestination.bestTime}</p>
                          </div>
                          
                          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                              </svg>
                              <h4 className="text-gray-300 font-medium">Category</h4>
                            </div>
                            <p className="text-white text-lg capitalize">{selectedDestination.category}</p>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <h3 className="text-white text-xl font-semibold mb-4">Overview</h3>
                          <p className="text-gray-300 leading-relaxed">{selectedDestination.description}</p>
                        </div>
                        
                        <div className="mb-8">
                          <h3 className="text-white text-xl font-semibold mb-4">Highlights</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedDestination.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-300">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                          <button className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                            Book This Trip
                          </button>
                          <button className="flex-1 py-3 px-6 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                            Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      
    </div>
  );
}