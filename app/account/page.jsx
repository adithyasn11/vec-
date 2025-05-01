'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const orbControls = useAnimation();
  
  // Theme configuration matching gallery page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };
  
  // User profile data
  const userProfile = {
    name: 'Abhin Balakrishna',
    username: '@abhindev',
    role: 'Photography Enthusiast & Explorer',
    bio: 'Capturing the magical landscapes and cultural wonders of India through my lens. Constantly exploring the unseen and sharing the beauty of incredible India.',
    location: 'Bangalore, India',
    memberSince: 'March 2023',
    website: 'abhinbalakrishna.dev',
    preferences: {
      interests: ['Landscape', 'Cultural', 'Wildlife', 'Architecture', 'Travel'],
      favoriteLocations: ['Rajasthan', 'Kerala', 'Himachal Pradesh', 'Ladakh', 'Meghalaya']
    },
    stats: {
      uploads: 47,
      favorites: 128,
      collections: 15,
      contributions: 32
    },
    achievements: [
      {
        id: 1,
        name: 'Explorer',
        description: 'Visited and documented over 20 unique locations',
        icon: '🧭',
        level: 'Gold',
        progress: 100
      },
      {
        id: 2,
        name: 'Contributor',
        description: 'Added valuable content to the community',
        icon: '🏆',
        level: 'Silver',
        progress: 75
      },
      {
        id: 3,
        name: 'Curator',
        description: 'Created highly appreciated collections',
        icon: '📊',
        level: 'Bronze',
        progress: 60
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'upload',
        title: 'Added 5 new photos to "Mystic Mountains"',
        date: '2 days ago',
        icon: '📷'
      },
      {
        id: 2,
        type: 'collection',
        title: 'Created new collection "Temples of South India"',
        date: '1 week ago',
        icon: '📁'
      },
      {
        id: 3,
        type: 'favorite',
        title: 'Liked "Sunrise at Taj Mahal"',
        date: '2 weeks ago',
        icon: '❤️'
      }
    ]
  };

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

  // Render floating particles
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
  
  // Tab navigation
  const tabs = [
    { id: 'profile', label: 'Profile' }
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
              Your Profile
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
            className="w-full h-full max-w-2xl pointer-events-none"
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
            className="text-center mb-8 w-full max-w-4xl"
          >
            <motion.h1 
              className="mb-4 font-sans text-4xl md:text-5xl font-bold tracking-tighter"
              initial={{ opacity: 0, letterSpacing: '8px' }}
              animate={{ opacity: 1, letterSpacing: '-1px' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              YOUR PROFILE
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, delay: 1 }}
              className="mx-auto mb-4 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500"
            />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-8"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-full p-1 border border-gray-700/30 flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-2 rounded-full transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30">
                    {/* Profile Header */}
                    <div className="relative">
                      {/* Profile Banner */}
                      <div className="h-36 bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-800">
                        <div className="absolute inset-0 bg-[url('/backgrounds/pattern.svg')] opacity-10"></div>
                      </div>
                      
                      {/* Profile Image */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="w-28 h-28 rounded-full border-4 border-gray-800 overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
                          >
                            <span className="text-5xl">AB</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-16 p-6 text-center">
                      <h2 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h2>
                      <p className="text-purple-300 text-sm mb-4">{userProfile.username}</p>
                      <p className="text-gray-300 text-sm mb-6">{userProfile.bio}</p>
                      
                      {/* User Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="text-sm">{userProfile.location}</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-sm">Member since {userProfile.memberSince}</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-sm">{userProfile.website}</span>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-white">{userProfile.stats.uploads}</div>
                          <div className="text-xs text-gray-400">Uploads</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-white">{userProfile.stats.favorites}</div>
                          <div className="text-xs text-gray-400">Favorites</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-white">{userProfile.stats.collections}</div>
                          <div className="text-xs text-gray-400">Collections</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-white">{userProfile.stats.contributions}</div>
                          <div className="text-xs text-gray-400">Contributions</div>
                        </div>
                      </div>
                      
                      {/* Edit Profile Button */}
                      <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Main Content Area */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="lg:col-span-2 space-y-8"
                >
                  {/* Interests and Preferences */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-4">Your Interests</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {userProfile.preferences.interests.map((interest, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Favorite Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.preferences.favoriteLocations.map((location, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-300 text-sm"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Your Achievements</h3>
                      <span className="text-sm text-purple-300">3 of 15 earned</span>
                    </div>
                    
                    <div className="space-y-6">
                      {userProfile.achievements.map((achievement) => (
                        <div key={achievement.id} className="relative">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div 
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                                  ${achievement.level === 'Gold' ? 'bg-yellow-600/30 text-yellow-300' : 
                                    achievement.level === 'Silver' ? 'bg-gray-400/30 text-gray-300' : 
                                    'bg-amber-700/30 text-amber-500'}`}
                              >
                                {achievement.icon}
                              </div>
                            </div>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-white">{achievement.name}</h4>
                                <span className={`text-sm px-2 py-0.5 rounded
                                  ${achievement.level === 'Gold' ? 'bg-yellow-600/30 text-yellow-300' : 
                                    achievement.level === 'Silver' ? 'bg-gray-400/30 text-gray-300' : 
                                    'bg-amber-700/30 text-amber-500'}`}
                                >
                                  {achievement.level}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${achievement.progress}%` }}
                                  transition={{ duration: 1, delay: 1.8 + achievement.id * 0.1 }}
                                  className={`h-full rounded-full 
                                    ${achievement.level === 'Gold' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                                      achievement.level === 'Silver' ? 'bg-gradient-to-r from-gray-500 to-gray-300' : 
                                      'bg-gradient-to-r from-amber-700 to-amber-500'}`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                    
                    <div className="space-y-4">
                      {userProfile.recentActivity.map((activity) => (
                        <motion.div 
                          key={activity.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2 + activity.id * 0.1, duration: 0.5 }}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex-shrink-0 text-2xl mr-4">{activity.icon}</div>
                          <div className="flex-grow">
                            <p className="text-white">{activity.title}</p>
                            <p className="text-sm text-gray-400">{activity.date}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button className="text-purple-300 hover:text-purple-200 text-sm font-medium">
                        View All Activity
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === 'collections' && (
              <motion.div
                key="collections-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Your Collections</h3>
                  <p className="text-gray-400 mb-6">View and manage your custom collections</p>
                  <p className="text-gray-500 italic">This tab content is currently in development.</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Your Favorites</h3>
                  <p className="text-gray-400 mb-6">Browse your favorite photos from around India</p>
                  <p className="text-gray-500 italic">This tab content is currently in development.</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                key="settings-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Account Settings</h3>
                  <p className="text-gray-400 mb-6">Manage your account preferences and settings</p>
                  <p className="text-gray-500 italic">This tab content is currently in development.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="w-full max-w-6xl mx-auto mt-12 mb-8"
          >
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('/backgrounds/pattern.svg')] opacity-10"></div>
              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to explore more?</h3>
                  <p className="text-purple-200">Share your photography journey with fellow explorers</p>
                </div>
                <button className="px-6 py-3 bg-white text-purple-900 font-medium rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                  Upload New Photos
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}