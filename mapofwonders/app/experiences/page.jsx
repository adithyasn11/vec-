'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const orbControls = useAnimation();
  
  // Theme configuration matching home page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };
  
  // Experiences data
  const experiences = [
    {
      id: 1,
      name: 'Golden Triangle Tour',
      type: 'Cultural',
      description: 'Explore the classic Indian Golden Triangle of Delhi, Agra, and Jaipur with expert guides. Discover magnificent forts, palaces, and the iconic Taj Mahal.',
      category: 'cultural',
      rating: 4.8,
      price: '₹25,000',
      duration: '6 days',
      highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar'],
      inclusions: ['Accommodation', 'Transportation', 'Local Guides'],
      image: 'golden-triangle',
      featured: true
    },
    {
      id: 2,
      name: 'Kerala Ayurveda Retreat',
      type: 'Wellness',
      description: 'Immerse yourself in the ancient science of Ayurveda with a rejuvenating wellness retreat in Kerala\'s backwaters. Includes authentic treatments and holistic healing.',
      category: 'wellness',
      rating: 4.9,
      price: '₹35,000',
      duration: '7 days',
      highlights: ['Traditional Treatments', 'Yoga Sessions', 'Organic Cuisine'],
      inclusions: ['Luxury Accommodation', 'All Meals', 'Personalized Consultation'],
      image: 'ayurveda',
      featured: true
    },
    {
      id: 3,
      name: 'Himalayan Trekking Adventure',
      type: 'Adventure',
      description: 'Challenge yourself with guided treks through magnificent Himalayan landscapes. Suitable for both beginners and experienced trekkers with various difficulty levels.',
      category: 'adventure',
      rating: 4.7,
      price: '₹18,000',
      duration: '5 days',
      highlights: ['Mountain Views', 'Local Cuisine', 'Wildlife Spotting'],
      inclusions: ['Camping Equipment', 'Experienced Guides', 'Meals During Trek'],
      image: 'himalayan-trek',
      featured: false
    },
    {
      id: 4,
      name: 'Rajasthan Desert Safari',
      type: 'Adventure',
      description: 'Experience the magic of the Thar Desert with camel safaris, folk music, and traditional Rajasthani cuisine under the stars in luxurious desert camps.',
      category: 'adventure',
      rating: 4.6,
      price: '₹20,000',
      duration: '4 days',
      highlights: ['Camel Safari', 'Desert Camping', 'Cultural Performances'],
      inclusions: ['Luxury Tent Stay', 'All Meals', 'Local Transportation'],
      image: 'desert-safari',
      featured: false
    },
    {
      id: 5,
      name: 'Goa Culinary Tour',
      type: 'Food & Cuisine',
      description: 'Discover the unique fusion of Portuguese and Indian flavors in Goa\'s cuisine. Learn cooking techniques, visit local markets, and enjoy beachside dining.',
      category: 'food',
      rating: 4.8,
      price: '₹16,000',
      duration: '3 days',
      highlights: ['Cooking Classes', 'Market Visits', 'Wine Tasting'],
      inclusions: ['Beachside Accommodation', 'All Meals', 'Recipe Book'],
      image: 'goa-food',
      featured: false
    },
    {
      id: 6,
      name: 'Wildlife Safari in Ranthambore',
      type: 'Wildlife',
      description: 'Track Bengal tigers and other wildlife in their natural habitat at Ranthambore National Park with expert naturalists and comfortable safari vehicles.',
      category: 'wildlife',
      rating: 4.5,
      price: '₹22,000',
      duration: '3 days',
      highlights: ['Tiger Tracking', 'Bird Watching', 'Nature Walks'],
      inclusions: ['Jungle Resort Stay', 'Safari Drives', 'Conservation Fee'],
      image: 'wildlife-safari',
      featured: true
    },
    {
      id: 7,
      name: 'Varanasi Spiritual Journey',
      type: 'Spiritual',
      description: 'Experience the profound spirituality of India\'s oldest city with ceremonies on the Ganges, meditation sessions, and visits to ancient temples.',
      category: 'spiritual',
      rating: 4.9,
      price: '₹14,000',
      duration: '4 days',
      highlights: ['Ganga Aarti', 'Meditation Sessions', 'Temple Visits'],
      inclusions: ['Riverside Accommodation', 'Spiritual Guide', 'Boat Rides'],
      image: 'varanasi',
      featured: false
    },
    {
      id: 8,
      name: 'Mumbai Film Tour',
      type: 'Entertainment',
      description: 'Go behind the scenes of Bollywood with studio visits, dance workshops, and a chance to watch a film shooting in the entertainment capital of India.',
      category: 'entertainment',
      rating: 4.7,
      price: '₹12,000',
      duration: '2 days',
      highlights: ['Studio Tour', 'Dance Workshop', 'Bollywood Museum'],
      inclusions: ['City Hotel', 'Film City Entry', 'Celebrity Meetup'],
      image: 'bollywood',
      featured: false
    },
    {
      id: 9,
      name: 'Andaman Island Escape',
      type: 'Beach',
      description: 'Discover the pristine beaches and crystal-clear waters of the Andaman Islands with snorkeling, island hopping, and beachside relaxation.',
      category: 'beach',
      rating: 4.8,
      price: '₹30,000',
      duration: '6 days',
      highlights: ['Snorkeling', 'Island Hopping', 'Beach Camping'],
      inclusions: ['Resort Stay', 'Water Activities', 'Ferry Transfers'],
      image: 'andaman',
      featured: true
    }
  ];

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Experiences' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'food', name: 'Food & Cuisine' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'spiritual', name: 'Spiritual' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'beach', name: 'Beach' }
  ];

  // Trending experiences
  const trending = [
    { 
      name: 'Yoga & Meditation', 
      description: 'Find inner peace at ancient ashrams',
      increase: '+24%',
      image: 'yoga' 
    },
    { 
      name: 'Food Trails', 
      description: 'Culinary journeys across regions',
      increase: '+36%',
      image: 'food' 
    },
    { 
      name: 'Heritage Walks', 
      description: 'Guided tours of historical sites',
      increase: '+18%',
      image: 'heritage' 
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

  // Filter experiences based on search and category
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        exp.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || exp.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Render floating particles
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

  // Open experience details modal
  const openExperienceDetails = (experience) => {
    setSelectedExperience(experience);
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
              India Experiences
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
              IMMERSIVE EXPERIENCES
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
              Discover authentic cultural encounters, thrilling adventures, and transformative journeys across the incredible tapestry of India.
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
                placeholder="Search experiences by name or type..."
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

          {/* Featured Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Experiences</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-500/30">
                Curated Selection
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiences.filter(exp => exp.featured).slice(0, 2).map((experience, idx) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openExperienceDetails(experience)}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 group-hover:from-purple-600/50 group-hover:to-indigo-600/50 transition-all duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-20"></div>
                  
                  <div className="absolute bottom-0 left-0 z-30 p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/30 text-purple-200 backdrop-blur-sm border border-purple-400/30">
                        {experience.type}
                      </span>
                      <div className="flex items-center space-x-1 ml-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(experience.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-white text-xs">{experience.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{experience.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{experience.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-gray-300 text-sm">{experience.duration}</span>
                      </div>
                      <div className="text-white font-medium">{experience.price}</div>
                    </div>
                    
                    <div className="w-0 h-1 bg-purple-500 mt-4 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Trending Now Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Trending Experiences</h2>
              <div className="flex items-center text-xs text-purple-300">
                <span className="mr-1">Updated Weekly</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trending.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer group border border-gray-700/30 p-5"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span className="text-green-400 text-sm font-medium flex items-center">
                      {item.increase}
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                      </svg>
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                      ))}
                      <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-800 flex items-center justify-center text-xs text-gray-400">+4</div>
                    </div>
                    
                    <div className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors flex items-center">
                      <span>Discover</span>
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Experiences Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeFilter === 'all' ? 'All Experiences' : categories.find(c => c.id === activeFilter).name}
              </h2>
              <span className="text-sm text-gray-400">{filteredExperiences.length} experiences</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((experience, idx) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openExperienceDetails(experience)}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group border border-gray-700/20"
                >
                  <div className="h-44 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 group-hover:opacity-70 transition-opacity duration-700 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-20"></div>
                    
                    <div className="absolute top-4 left-4 z-30">
                      <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                        {experience.type}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 z-30">
                      <div className="flex items-center space-x-1 bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(experience.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-white text-xs">{experience.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{experience.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{experience.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.highlights.slice(0, 3).map((highlight, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-1 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-gray-300 text-sm">{experience.duration}</span>
                      </div>
                      <div className="text-white font-medium">{experience.price}</div>
                    </div>
                    
                    <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mt-4 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Empty state when no results */}
            {filteredExperiences.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">No experiences found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Experience Details Modal */}
      <AnimatePresence>
        {showDetails && selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-56 sm:h-72 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-indigo-600/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-20"></div>
                
                <button 
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                
                <div className="absolute bottom-6 left-6 z-30">
                  <span className="inline-block px-3 py-1 bg-purple-700/70 text-white text-sm rounded-full backdrop-blur-sm mb-2">
                    {selectedExperience.type}
                  </span>
                  <h2 className="text-3xl font-bold text-white">{selectedExperience.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white">{selectedExperience.rating} Rating</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-white">{selectedExperience.duration}</span>
                  </div>
                  
                  <div className="text-white font-bold text-lg">{selectedExperience.price}</div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">About this experience</h3>
                  <p className="text-gray-300">{selectedExperience.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {selectedExperience.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Inclusions</h3>
                    <ul className="space-y-2">
                      {selectedExperience.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-gray-300">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="block text-gray-400 text-sm mb-1">Have any questions?</span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span className="text-indigo-400">Chat with our travel experts</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium shadow-lg shadow-purple-900/30"
                  >
                    Book This Experience
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Newsletter Signup (fixed at bottom) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: isLoading ? 100 : 0, opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-md z-40 py-4 border-t border-gray-700/30"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg">Get personalized recommendations</h3>
            <p className="text-gray-300 text-sm">Sign up for our newsletter to receive curated experiences.</p>
          </div>
          
          <div className="flex w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 bg-gray-700 rounded-l-lg text-white focus:outline-none border border-gray-600"
            />
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-lg text-white font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}