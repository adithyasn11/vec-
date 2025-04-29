'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const orbControls = useAnimation();
  
  // Theme configuration matching home page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };
  
  // Image categories
  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'heritage', name: 'Heritage' },
    { id: 'nature', name: 'Nature' },
    { id: 'culture', name: 'Culture' },
    { id: 'aerial', name: 'Aerial' },
    { id: 'wildlife', name: 'Wildlife' }
  ];
  
  // Gallery images data with placeholder names
  // In a real scenario, these would be actual image paths
  const galleryImages = [
    {
      id: 1,
      title: 'Taj Mahal at Sunrise',
      description: 'The iconic marble mausoleum captured during the golden hour',
      location: 'Agra, Uttar Pradesh',
      category: 'heritage',
      photographer: 'Amit Sharma',
      featured: true
    },
    {
      id: 2,
      title: 'Western Ghats Landscape',
      description: 'Rolling hills and lush valleys of the Western Ghats mountain range',
      location: 'Kerala',
      category: 'nature',
      photographer: 'Priya Mehta'
    },
    {
      id: 3,
      title: 'Holi Festival Celebrations',
      description: 'Vibrant colors during the festival of Holi',
      location: 'Mathura, Uttar Pradesh',
      category: 'culture',
      photographer: 'Rahul Patel',
      featured: true
    },
    {
      id: 4,
      title: 'Varanasi Ghats',
      description: 'Sacred rituals along the banks of the Ganges River',
      location: 'Varanasi, Uttar Pradesh',
      category: 'culture',
      photographer: 'Sarah Williams'
    },
    {
      id: 5,
      title: 'Bengal Tiger',
      description: 'A majestic Bengal tiger in its natural habitat',
      location: 'Bandhavgarh National Park, Madhya Pradesh',
      category: 'wildlife',
      photographer: 'Michael Johnson'
    },
    {
      id: 6,
      title: 'Mumbai Skyline',
      description: 'Aerial view of Mumbai city and the Arabian Sea',
      location: 'Mumbai, Maharashtra',
      category: 'aerial',
      photographer: 'Ravi Kumar',
      featured: true
    },
    {
      id: 7,
      title: 'Backwaters of Kerala',
      description: 'Serene canals and houseboats in the Kerala backwaters',
      location: 'Alleppey, Kerala',
      category: 'nature',
      photographer: 'Lakshmi Nair'
    },
    {
      id: 8,
      title: 'Ancient Temples of Hampi',
      description: 'UNESCO World Heritage ruins of the Vijayanagara Empire',
      location: 'Hampi, Karnataka',
      category: 'heritage',
      photographer: 'Thomas Anderson'
    },
    {
      id: 9,
      title: 'Himalayan Peaks',
      description: 'Snow-capped peaks of the mighty Himalayas',
      location: 'Uttarakhand',
      category: 'nature',
      photographer: 'Vikram Singh',
      featured: true
    },
    {
      id: 10,
      title: 'Traditional Kathakali Dancer',
      description: 'Performer in the classical Kathakali dance form',
      location: 'Kochi, Kerala',
      category: 'culture',
      photographer: 'Meera Krishnan'
    },
    {
      id: 11,
      title: 'Desert Landscape',
      description: 'Golden sand dunes of the Thar Desert',
      location: 'Jaisalmer, Rajasthan',
      category: 'nature',
      photographer: 'David Miller'
    },
    {
      id: 12,
      title: 'Delhi from Above',
      description: 'Bird\'s eye view of New Delhi\'s urban landscape',
      location: 'New Delhi',
      category: 'aerial',
      photographer: 'Arjun Kapoor'
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

  // Filter gallery based on category
  const filteredImages = galleryImages.filter(image => {
    return activeFilter === 'all' || image.category === activeFilter;
  });

  // Featured images - subset used for the showcase
  const featuredImages = galleryImages.filter(image => image.featured);

  // Open image modal
  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Render floating particles similar to home page
  const renderParticles = () => {
    if (!isMounted) return null;
    
    return [...Array(8)].map((_, i) => (
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
              India Gallery
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
              PHOTO GALLERY
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
              Explore stunning visuals capturing the essence, diversity, and beauty of incredible India.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-8 overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-3 pb-2 min-w-max justify-center">
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

          {/* Featured Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Photographs</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openImageModal(image)}
                  className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                >
                  {/* Using a placeholder for demo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 group-hover:from-purple-600/50 group-hover:to-indigo-600/50 transition-all duration-500"></div>
                  
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.location}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                        {categories.find(c => c.id === image.category)?.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeFilter === 'all' ? 'All Photos' : categories.find(c => c.id === activeFilter).name}
              </h2>
              <span className="text-sm text-gray-400">{filteredImages.length} photos</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => openImageModal(image)}
                  className="group relative h-48 rounded-lg overflow-hidden cursor-pointer"
                >
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800"></div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/40 group-hover:to-indigo-600/40 transition-all duration-300"></div>
                  
                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-gray-900 to-transparent">
                    <h3 className="font-medium text-white text-sm mb-1 truncate">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-xs">{image.location}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                        {categories.find(c => c.id === image.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* View icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photo Categories Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Photo Categories</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.filter(c => c.id !== 'all').map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveFilter(category.id)}
                  className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer group border border-gray-700/30 h-32 relative"
                >
                  {/* Category placeholder gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-indigo-800/20"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                      <div className="w-12 h-1 bg-purple-500 mx-auto group-hover:w-16 transition-all duration-300"></div>
                      <p className="text-gray-400 text-sm mt-1">
                        {galleryImages.filter(img => img.category === category.id).length} photos
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Details Modal */}
          <AnimatePresence>
            {showModal && selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
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
                    <div className="h-72 relative">
                      {/* Image placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8">
                        <div className="mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-900/60 text-purple-300">
                            {categories.find(c => c.id === selectedImage.category)?.name}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-1">{selectedImage.title}</h2>
                        <p className="text-gray-300">{selectedImage.location}</p>
                      </div>
                      
                      <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/60 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                      
                      <div className="flex items-center space-x-2 text-gray-400 mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>Photo by {selectedImage.photographer}</span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
                          Download
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition-colors">
                          Share
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}