'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const orbControls = useAnimation();
  
  // Theme configuration matching gallery page
  const themeColors = {
    primary: '#5603AD',
    secondary: '#8367C7',
    accent: '#C2CAE8',
    hue: 240
  };
  
  // Team members data
  // First, update your teamMembers array to include photo URLs
  const teamMembers = [
    {
      id: 1,
      name: 'Abhin Balakrishna',
      role: 'Lead Developer',
      bio: 'Frontend specialist focused on creating responsive and interactive UI components for the photography platform.',
      expertise: ['React', 'Motion Animation', 'UI/UX'],
      photo: '/team/abhin.jpg'
    },
    {
      id: 2,
      name: 'Adithya S Nayak',
      role: 'Frontend Developer',
      bio: 'Responsible for creating responsive layouts and implementing interactive features for the photography platform.',
      expertise: ['React', 'CSS/Tailwind', 'Component Design'],
      photo: '/team/adithya.jpg'
    },
    {
      id: 3,
      name: 'Ashiq',
      role: 'UI/UX Designer',
      bio: 'Created the visual identity and user experience flow for the photography platform, ensuring intuitive navigation.',
      expertise: ['Visual Design', 'Idea'],
      photo: '/team/ashiq.jpg'
    },
    {
      id: 4,
      name: 'Ashmika',
      role: 'Content Strategist',
      bio: 'Developed the content framework and organization system for showcasing the photography collection effectively.',
      expertise: ['Content Strategy', 'Digital Curation'],
      photo: '/team/ashmika.jpg'
    }
  ];
  // Mission statement sections
  const missionSections = [
    {
      id: 1,
      title: 'Our Vision',
      content: 'To showcase the unparalleled beauty, diversity, and cultural richness of India through the lens of passionate photographers who capture its essence in every frame.'
    },
    {
      id: 2,
      title: 'Our Mission',
      content: 'To create a comprehensive visual archive of India\'s landscapes, heritage, wildlife, and cultural traditions that educates, inspires, and preserves the country\'s unique identity for future generations.'
    },
    {
      id: 3,
      title: 'Our Approach',
      content: 'We blend artistry with authenticity, capturing moments that tell stories of India\'s past and present while highlighting its incredible diversity and the spirit of its people.'
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

  // Render floating particles similar to gallery page
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
              About Us
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
              ABOUT US
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
              Discover the team behind the lens capturing the spirit and soul of incredible India.
            </motion.p>
          </motion.div>

          {/* Introduction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-4xl mx-auto mb-16"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
              <p className="text-gray-300 mb-4">
                India Photo Gallery was born from a collective passion to showcase the breathtaking diversity and cultural richness of India through the art of photography. What began as a small group of enthusiasts traveling across the subcontinent has grown into a dedicated team of professional photographers committed to capturing India's essence.
              </p>
              <p className="text-gray-300">
                From the snow-capped peaks of the Himalayas to the sun-kissed beaches of Kerala, from ancient temples to modern cityscapes, our lenses have documented the myriad facets of this incredible country. We believe that each photograph tells a story - of traditions passed down through generations, of landscapes shaped by time, of moments that define the Indian experience.
              </p>
            </div>
          </motion.div>

          {/* Mission Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missionSections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                  className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                      {section.id === 1 && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      )}
                      {section.id === 2 && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      )}
                      {section.id === 3 && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white ml-4">{section.title}</h3>
                  </div>
                  <p className="text-gray-300">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Meet Our Team */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.8, duration: 0.8 }}
  className="w-full max-w-6xl mx-auto mb-16"
>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-white">Meet Our Team</h2>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {teamMembers.map((member, idx) => (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 + (idx * 0.1), duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 group"
      >
        {/* Member photo - updated to use actual images */}
        <div className="h-48 relative">
          {member.photo ? (
            <div className="w-full h-full overflow-hidden">
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            </div>
          ) : (
            // Fallback if no image is available
            <div className="h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 group-hover:from-purple-900/60 group-hover:to-indigo-900/60 transition-all duration-300"></div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
            <h3 className="text-lg font-bold text-white">{member.name}</h3>
            <p className="text-sm text-purple-300">{member.role}</p>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
          <div className="flex flex-wrap gap-2">
            {member.expertise.map((skill, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

          {/* Our Services */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.2, duration: 0.8 }}
  className="w-full max-w-6xl mx-auto mb-16"
>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-white">Our Services</h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.3, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
      
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Photography Sessions</h3>
      <p className="text-gray-300 mb-4 relative z-10">
        Professional photography sessions capturing your special moments with artistic excellence and technical precision.
      </p>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Portrait</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Event</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Product</span>
      </div>
    </motion.div>
    
    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-600/20 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
      
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Visual Storytelling</h3>
      <p className="text-gray-300 mb-4 relative z-10">
        We craft compelling visual narratives that convey your brand's unique story and connect with your audience.
      </p>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Brand Stories</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Documentation</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Marketing</span>
      </div>
    </motion.div>
    
    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
      
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Image Editing</h3>
      <p className="text-gray-300 mb-4 relative z-10">
        Expert post-processing and editing services to enhance your photographs while maintaining a natural, authentic look.
      </p>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Retouching</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Color Grading</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Restoration</span>
      </div>
    </motion.div>
    
    {/* Card 4 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-600/20 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
      
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Digital Exhibition</h3>
      <p className="text-gray-300 mb-4 relative z-10">
        Custom digital galleries and exhibitions to showcase your photographic work to audiences worldwide.
      </p>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Online Gallery</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Virtual Tours</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">Digital Curation</span>
      </div>
    </motion.div>
  </div>
</motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl overflow-hidden border border-gray-700/30 p-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
                  <p className="text-gray-300 mb-6">
                    Have questions about our work or interested in collaborating? We'd love to hear from you!
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-800/50 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white">contact@indiagallery.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-800/50 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-white">+91 98765 43210</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-800/50 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Address</div>
                        <div className="text-white">123 Art Street, Creative Hub, New Delhi</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                  <h3 className="text-xl font-bold text-white mb-4">Send us a message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Name</label>
                      <input type="text" className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input type="email" className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Message</label>
                      <textarea rows="4" className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="flex flex-wrap justify-center gap-6">
              {/* Instagram */}
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              
              {/* Facebook */}
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              
              {/* Twitter/X */}
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              
              {/* YouTube */}
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
              
              {/* Pinterest */}
              <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="w-full max-w-4xl mx-auto mb-24"
          >
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl overflow-hidden border border-gray-700/30 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter to receive updates on new exhibitions, featured photographers, and special events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
          
        </motion.div>
        
        {/* Animated Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}