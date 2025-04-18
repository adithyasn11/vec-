// components/Footer.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { heading: 'Destinations', links: ['Taj Mahal', 'Varanasi', 'Jaipur', 'Kerala', 'Himalaya'] },
    { heading: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Contact'] },
    { heading: 'Support', links: ['FAQ', 'Help Center', 'Privacy Policy', 'Terms of Service'] }
  ];
  
  const socialIcons = {
    Instagram: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    Facebook: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
      </svg>
    ),
    Twitter: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
      </svg>
    ),
    YouTube: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    )
  };

  return (
    <footer className="relative z-10 w-full bg-transparent py-16">
      {/* Gradient Background with Creative Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/70 pointer-events-none">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0,rgba(255,255,255,0)_70%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,transparent_0%,#ffffff_50%,transparent_100%)]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section with Logo and Newsletter */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12 pb-12 border-b border-indigo-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Logo Section */}
          <div className="mb-8 md:mb-0 md:mr-8">
            <div className="flex items-center mb-4">
              {/* Reusing similar logo from header */}
              <div className="mr-3 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                  Map of Wonders
                </span>
                <span className="text-xs text-gray-400 tracking-wider mt-0.5">Explore the Extraordinary</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Discover the timeless beauty and rich cultural heritage of India with our curated travel experiences.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-auto">
            <h3 className="text-gray-300 text-sm font-medium mb-3">Join our newsletter</h3>
            <div className="flex w-full max-w-md">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-r-lg px-4 py-2 text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Middle Section with Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-indigo-900/30">
          {footerLinks.map((section, index) => (
            <motion.div 
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-sm font-medium mb-6 inline-block relative">
                {section.heading}
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link}>
                    <Link href="#">
                      <motion.span 
                        className="text-gray-400 hover:text-gray-200 text-sm transition-colors cursor-pointer inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {link}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Section with Copyright and Social */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-6 md:mb-0"
          >
            <p>© {new Date().getFullYear()} Map of Wonders. All rights reserved.</p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {Object.entries(socialIcons).map(([name, icon]) => (
              <Link href="#" key={name}>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ y: -3, boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}