// components/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.header 
      className={`fixed top-0 z-30 w-full transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/">
          <motion.div 
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Creative Logo */}
            <div className="mr-3 relative">
              {/* Outer Circle */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                {/* Inner Elements */}
                <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                    {/* Pulse Animation */}
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-indigo-500/30"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.2, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Orbit Element */}
              <motion.div 
                className="absolute top-0 left-0 h-10 w-10 rounded-full border border-purple-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-1 left-5 h-2 w-2 rounded-full bg-purple-400" />
              </motion.div>
            </div>
            
            {/* Text with Gradient */}
            <div className="flex flex-col">
              <span className="font-bold text-white text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                Map of Wonders
              </span>
              <span className="text-xs text-gray-400 tracking-wider mt-0.5">Explore the Extraordinary</span>
            </div>
          </motion.div>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['Destinations', 'Experiences', 'Gallery', 'About'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`}>
                  <motion.div 
                    className="relative group"
                    whileHover={{ y: -2 }}
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium cursor-pointer">
                      {item}
                    </span>
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Login/Account Button */}
          <motion.button 
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full text-sm font-medium text-white shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Account</span>
          </motion.button>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}