'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [favoriteToRemove, setFavoriteToRemove] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Theme configuration matching home page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    
    // Simulate loading for consistent experience
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('userFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    // Subscribe to custom event for favorites
    window.addEventListener('favoriteAdded', handleFavoriteAdded);
    
    return () => {
      window.removeEventListener('favoriteAdded', handleFavoriteAdded);
    };
  }, []);

  // Handle favorite added event
  const handleFavoriteAdded = (event) => {
    const newFavorite = event.detail;
    
    // Check if favorite already exists
    const exists = favorites.some(favorite => favorite.id === newFavorite.id);
    
    if (!exists) {
      const updatedFavorites = [...favorites, {
        ...newFavorite,
        favoriteId: `FAV-${Math.floor(Math.random() * 10000)}`,
        dateAdded: new Date().toISOString(),
        notes: ''
      }];
      
      setFavorites(updatedFavorites);
      localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
      
      // Show notification
      setNotificationMessage(`Added to favorites: ${newFavorite.name}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      // Show notification for duplicate
      setNotificationMessage(`${newFavorite.name} is already in your favorites`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Book a favorite destination
  const bookFavorite = (favorite) => {
    // Create booking event
    const bookingEvent = new CustomEvent('bookingAdded', {
      detail: favorite
    });
    window.dispatchEvent(bookingEvent);
    
    // Show notification
    setNotificationMessage(`${favorite.name} added to your bookings`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Remove favorite
  const confirmRemoveFavorite = (favorite) => {
    setFavoriteToRemove(favorite);
    setShowConfirmModal(true);
  };

  const removeFavorite = () => {
    const updatedFavorites = favorites.filter(favorite => favorite.favoriteId !== favoriteToRemove.favoriteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
    setShowConfirmModal(false);
    
    // Show notification
    setNotificationMessage(`Removed from favorites: ${favoriteToRemove.name}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Filter favorites based on search
  const filteredFavorites = favorites.filter(favorite => 
    favorite.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    favorite.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort favorites
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortOption) {
      case 'date':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'price':
        return parseInt(b.price?.replace(/\D/g, '') || '0') - parseInt(a.price?.replace(/\D/g, '') || '0');
      case 'name':
        return a.name?.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  return (
    <div className="flex flex-col min-h-screen relative">
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
              My Favorites
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
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
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
          {/* Header Section */}
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
              MY FAVORITES
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
              Your collection of dream destinations for future adventures
            </motion.p>
            
            {/* Search and filter */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search favorites..."
                  className="w-full py-3 pl-10 pr-4 bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="py-3 px-4 bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date Added</option>
                <option value="price">Sort by Price</option>
              </select>
              
              <div className="flex bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-purple-600/50 text-white' : 'text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-purple-600/50 text-white' : 'text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Favorites Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-32"
          >
            {favorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700/30"
              >
                <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-gray-700/60 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">No Favorites Yet</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  You haven't saved any favorites yet. Explore destinations and click the heart icon to add them to your favorites.
                </p>
                <button 
                  onClick={() => window.location.href = '/destinations'}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Explore Destinations
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Saved Destinations
                  </h2>
                  <span className="text-sm text-gray-400">{sortedFavorites.length} favorites</span>
                </div>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedFavorites.map((favorite, idx) => (
                      <motion.div
                        key={favorite.favoriteId || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 group"
                      >
                        <div className="relative h-48 w-full bg-gray-700/50 overflow-hidden">
                          {favorite.imageUrl ? (
                            <img 
                              src={favorite.imageUrl} 
                              alt={favorite.name} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
                              <svg className="w-16 h-16 text-purple-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          )}
                          
                          <div className="absolute top-2 right-2">
                            <button 
                              onClick={() => confirmRemoveFavorite(favorite)}
                              className="p-2 bg-gray-900/60 backdrop-blur-sm rounded-full text-red-400 hover:bg-red-900/30 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                              </svg>
                            </button>
                          </div>
                          
                          {favorite.price && (
                            <div className="absolute bottom-2 right-2 px-3 py-1 bg-gray-900/60 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                              {favorite.price}
                            </div>
                          )}
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-white mb-1">{favorite.name}</h3>
                          {favorite.location && (
                            <div className="flex items-center text-gray-400 text-sm mb-3">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              {favorite.location}
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-400 mb-4">
                            Added on {formatDate(favorite.dateAdded)}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => bookFavorite(favorite)}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                            >
                              Book Now
                            </button>
                            <button className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium hover:bg-gray-600 transition-colors">
                              Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedFavorites.map((favorite, idx) => (
                      <motion.div
                        key={favorite.favoriteId || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 h-32 sm:h-auto bg-gray-700/50 relative">
                            {favorite.imageUrl ? (
                              <img 
                                src={favorite.imageUrl} 
                                alt={favorite.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
                                <svg className="w-12 h-12 text-purple-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-5 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-1">{favorite.name}</h3>
                                {favorite.location && (
                                  <div className="flex items-center text-gray-400 text-sm mb-2">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    {favorite.location}
                                  </div>
                                )}
                              </div>
                              
                              {favorite.price && (
                                <div className="px-3 py-1 bg-gray-700/60 rounded-full text-white text-sm font-medium">
                                  {favorite.price}
                                </div>
                              )}
                            </div>
                            
                            <div className="text-xs text-gray-400 mb-3">
                              Added on {formatDate(favorite.dateAdded)}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              <button 
                                onClick={() => bookFavorite(favorite)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                              >
                                Book Now
                              </button>
                              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium hover:bg-gray-600 transition-colors">
                                View Details
                              </button>
                              <button 
                                onClick={() => confirmRemoveFavorite(favorite)}
                                className="px-4 py-2 bg-red-900/30 rounded-lg text-red-300 text-sm font-medium hover:bg-red-800/40 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gray-800 rounded-xl w-full max-w-md overflow-hidden p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Remove Favorite</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to remove <span className="text-white font-medium">{favoriteToRemove?.name}</span> from your favorites?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition-colors"
                >
                  Keep
                </button>
                <button
                  onClick={removeFavorite}
                  className="flex-1 px-4 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Notification Toast */}
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
    </div>
  );
}