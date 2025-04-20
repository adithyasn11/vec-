// components/Footer.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const [hoverEmail, setHoverEmail] = useState(false);
  
  const footerLinks = [
    {
      title: "Discover",
      links: ["Popular Destinations", "Hidden Gems", "Seasonal Wonders", "Travel Guides"]
    },
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "Press Kit"]
    },
    {
      title: "Support",
      links: ["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"]
    }
  ];
  
  const socialIcons = [
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      name: "YouTube",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Footer Top Section with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link href="/">
              <motion.div 
                className="flex items-center mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Logo (simplified version of header logo) */}
                <div className="mr-3 relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-gray-900 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Text with Gradient */}
                <span className="font-bold text-white text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                  Map of Wonders
                </span>
              </motion.div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Discover extraordinary destinations and unforgettable experiences across the globe with our curated selection of the world's most mesmerizing wonders.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.15, 
                    color: "#fff",
                    textShadow: "0 0 8px rgba(167, 139, 250, 0.7)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer Link Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-lg relative inline-block">
                {column.title}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 w-10 bg-gradient-to-r from-purple-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                />
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#">
                      <motion.span 
                        className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        whileHover={{ x: 3 }}
                      >
                        {link}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="max-w-xl mx-auto text-center">
            <motion.h3 
              className="text-white font-semibold text-xl mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Subscribe to Our Newsletter
            </motion.h3>
            <p className="text-gray-400 text-sm mb-6">
              Stay updated with the latest destinations, exclusive offers, and inspiring travel stories.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="relative flex-grow">
                <motion.input 
                  type="email" 
                  className="w-full py-3 px-4 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Enter your email"
                  onFocus={() => setHoverEmail(true)}
                  onBlur={() => setHoverEmail(false)}
                  animate={hoverEmail ? { boxShadow: "0 0 0 2px rgba(167, 139, 250, 0.5)" } : {}}
                />
                
                {/* Email animation indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={hoverEmail ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <motion.button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-sm shadow-md"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Map of Wonders. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item, index) => (
              <Link key={index} href="#">
                <motion.span 
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  whileHover={{ color: "#fff" }}
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Footer Element */}
      <div className="relative overflow-hidden h-1">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          animate={{ 
            x: ["0%", "100%", "0%"],
          }}
          transition={{ 
            duration: 15, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
      </div>
    </footer>
  );
}