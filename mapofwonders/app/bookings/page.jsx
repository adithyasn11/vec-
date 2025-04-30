'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Orb from '../../components/Orb.jsx';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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
    
    // Simulate loading for consistent experience with destination page
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('userBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
    
    // Subscribe to custom event for bookings
    window.addEventListener('bookingAdded', handleBookingAdded);
    
    return () => {
      window.removeEventListener('bookingAdded', handleBookingAdded);
    };
  }, []);

  // Handle booking added event
  const handleBookingAdded = (event) => {
    const newBooking = event.detail;
    
    // Check if booking already exists
    const exists = bookings.some(booking => booking.id === newBooking.id);
    
    if (!exists) {
      const updatedBookings = [...bookings, {
        ...newBooking,
        bookingId: `BK-${Math.floor(Math.random() * 10000)}`,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed',
        paymentStatus: 'Paid',
        guests: 2
      }];
      
      setBookings(updatedBookings);
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      
      // Show notification
      setNotificationMessage(`Booking added: ${newBooking.name}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      // Show notification for duplicate booking
      setNotificationMessage(`${newBooking.name} is already in your bookings`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Cancel booking
  const confirmCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowConfirmModal(true);
  };

  const cancelBooking = () => {
    const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingToCancel.bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    setShowConfirmModal(false);
    
    // Show notification
    setNotificationMessage(`Booking cancelled: ${bookingToCancel.name}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Filter bookings based on search
  const filteredBookings = bookings.filter(booking => 
    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortOption) {
      case 'date':
        return new Date(b.bookingDate) - new Date(a.bookingDate);
      case 'price':
        return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get booking date plus duration for trip end date
  const getTripEndDate = (booking) => {
    const startDate = new Date(booking.bookingDate);
    const durationDays = parseInt(booking.duration);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);
    return formatDate(endDate);
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
              Your Bookings
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
              MY BOOKINGS
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
              Manage all your upcoming adventures and travel plans in one place
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
                  placeholder="Search your bookings..."
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
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>
            </motion.div>
          </motion.div>

          {/* Bookings Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl mx-auto mb-32" // Increased bottom margin to create space for footer
          >
            {bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700/30"
              >
                <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-gray-700/60 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">No Bookings Yet</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  You haven't booked any trips yet. Explore destinations and click "Book This Trip" to add destinations to your bookings.
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
                    Your Trips
                  </h2>
                  <span className="text-sm text-gray-400">{sortedBookings.length} bookings</span>
                </div>
                
                <div className="space-y-6">
                  {sortedBookings.map((booking, idx) => (
                    <motion.div
                      key={booking.bookingId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + (idx * 0.1), duration: 0.5 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="text-xl font-semibold text-white mr-3">{booking.name}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                booking.status === 'Confirmed' 
                                  ? 'bg-green-900/40 text-green-300' 
                                  : 'bg-yellow-900/40 text-yellow-300'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{booking.location}</p>
                          </div>
                          <div className="mt-3 md:mt-0">
                            <span className="text-lg font-medium text-white">{booking.price}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Booking ID</div>
                            <div className="text-white font-medium">{booking.bookingId}</div>
                          </div>
                          
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Travel Dates</div>
                            <div className="text-white font-medium">
                              {formatDate(booking.bookingDate)} - {getTripEndDate(booking)}
                            </div>
                          </div>
                          
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Guests</div>
                            <div className="text-white font-medium">{booking.guests} Person(s)</div>
                          </div>
                          
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Payment Status</div>
                            <div className={`font-medium ${
                              booking.paymentStatus === 'Paid' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                              {booking.paymentStatus}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-medium hover:bg-gray-600 transition-colors">
                            Download Itinerary
                          </button>
                          <button 
                            onClick={() => confirmCancelBooking(booking)}
                            className="px-4 py-2 bg-red-900/50 rounded-lg text-red-300 text-sm font-medium hover:bg-red-800/60 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
              <h3 className="text-xl font-semibold text-white mb-4">Cancel Booking</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to cancel your booking for <span className="text-white font-medium">{bookingToCancel?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={cancelBooking}
                  className="flex-1 px-4 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
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