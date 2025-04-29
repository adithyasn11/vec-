'use client';  

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Add form data state for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Add form data state for signup
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  
  // Add form data state for forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
 
  const locations = [
    'Taj Mahal',
    'Varanasi',
    'Jaipur',
    'Kerala',
    'Himalaya'
  ];
  
  // Valid user credentials (hardcoded for demonstration)
  const validCredentials = {
    email: 'user@gmail.com',
    password: '1234'
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  
  const toggleLogin = () => {
    setShowLogin(!showLogin);
    if (showSignup) setShowSignup(false);
    if (showForgotPassword) setShowForgotPassword(false);
    // Reset login form and error
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    if (showLogin) setShowLogin(false);
    if (showForgotPassword) setShowForgotPassword(false);
    // Reset signup form and error
    setFirstName('');
    setLastName('');
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
    setSignupError('');
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    if (showLogin) setShowLogin(false);
    if (showSignup) setShowSignup(false);
    // Reset forgot password form and message
    setForgotEmail('');
    setResetMessage('');
  };

  // Function to save user activity
  const saveUserActivity = (email, action) => {
    try {
      // Get existing activities or initialize empty array
      const existingActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
      
      // Add new activity
      const newActivity = {
        email,
        action,
        timestamp: new Date().toISOString()
      };
      
      existingActivities.push(newActivity);
      
      // Save back to localStorage
      localStorage.setItem('userActivities', JSON.stringify(existingActivities));
      
      // Save current user
      localStorage.setItem('currentUser', email);
      
    } catch (error) {
      console.error('Error saving user activity:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if credentials match the valid ones
    if (loginEmail === validCredentials.email && loginPassword === validCredentials.password) {
      // Log user activity
      saveUserActivity(loginEmail, 'login');
      
      // Navigate to home page
      console.log("Navigating to home page after successful login");
      router.push('/home');
    } else {
      // Display error message
      setLoginError('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    
    // For demo purposes, let's pretend we're "storing" this user
    // In a real app, you'd send this to a backend
    try {
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if user already exists
      if (existingUsers.some(user => user.email === signupEmail)) {
        setSignupError('User already exists.');
        return;
      }
      
      // Add new user
      const newUser = {
        firstName,
        lastName,
        email: signupEmail,
        password: signupPassword  // Note: Never store plain text passwords in production!
      };
      
      existingUsers.push(newUser);
      
      // Save back to localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Log user activity
      saveUserActivity(signupEmail, 'signup');
      
      // Navigate to home page
      console.log("Navigating to home page after successful signup");
      router.push('/home');
    } catch (error) {
      setSignupError('Error creating account. Please try again.');
      console.error('Error handling signup:', error);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    // In a real app, you'd send a reset link to the email
    console.log("Password reset request for:", forgotEmail);
    
    // Log user activity
    saveUserActivity(forgotEmail, 'password_reset_request');
    
    // Show confirmation message
    setResetMessage('If your email exists in our system, you will receive a password reset link shortly.');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      {/* Dynamic Background - Using placeholder here */}
      <div className="absolute inset-0 z-0">
        {locations.map((location, index) => (
          <motion.div
            key={location}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentLocation === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/api/placeholder/1920/1080')`,
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-white">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <motion.h1 
            className="mb-2 font-sans text-6xl font-bold tracking-tighter"
            initial={{ opacity: 0, letterSpacing: '10px' }}
            animate={{ opacity: 1, letterSpacing: '-1px' }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            MAP OF WONDERS
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mb-4 h-1 bg-gray-400"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8 text-xl font-light tracking-wide text-gray-300"
          >
            Discover the timeless beauty of India
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex justify-center gap-6"
          >
            <button
              onClick={toggleLogin}
              className="group relative overflow-hidden rounded-md bg-gray-800 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-gray-700"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={toggleSignup}
              className="group relative overflow-hidden rounded-md border border-gray-600 bg-transparent px-8 py-3 font-medium text-gray-300 transition-all duration-300 hover:border-gray-500 hover:text-white"
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 -z-10 scale-x-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"></span>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Destination Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 flex w-full justify-center"
        >
          <div className="flex space-x-8">
            {locations.map((location, i) => (
              <motion.div
                key={location}
                whileHover={{ y: -5 }}
                onClick={() => setCurrentLocation(i)}
                className="flex cursor-pointer flex-col items-center"
              >
                <div className={`mb-2 h-3 w-3 rounded-full ${currentLocation === i ? 'bg-gray-300' : 'bg-gray-600'}`}>
                  <motion.div
                    animate={{ scale: currentLocation === i ? [1, 1.5, 1] : 1 }}
                    transition={{ 
                      repeat: currentLocation === i ? Infinity : 0, 
                      duration: 2 
                    }}
                    className={`h-full w-full rounded-full ${currentLocation === i ? 'bg-gray-300' : ''}`}
                  />
                </div>
                <span className={`text-xs font-medium transition-colors ${currentLocation === i ? 'text-gray-300' : 'text-gray-500'}`}>
                  {location}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Login Modal with slide-in effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showLogin ? 1 : 0,
          pointerEvents: showLogin ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={toggleLogin} />
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: showLogin ? 0 : '100%', opacity: showLogin ? 1 : 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Welcome Back</h2>
            <form onSubmit={handleLogin}>
              {loginError && (
                <div className="mb-4 rounded-md bg-red-900/30 p-3 text-sm text-red-200">
                  {loginError}
                </div>
              )}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 mt-1 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 mt-1 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-gray-600 focus:ring-1 focus:ring-gray-600 focus:ring-offset-1 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <div 
                  className="text-sm font-medium text-gray-400 hover:text-gray-300 cursor-pointer"
                  onClick={() => {
                    setShowLogin(false);
                    setShowForgotPassword(true);
                  }}
                >
                  Forgot password?
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Login
              </motion.button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900 px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* GitHub icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* Twitter icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* Google icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <span 
                className="cursor-pointer font-medium text-gray-300 hover:text-white"
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Sign up
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Signup Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showSignup ? 1 : 0,
          pointerEvents: showSignup ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={toggleSignup} />
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: showSignup ? 0 : '100%', opacity: showSignup ? 1 : 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl"
        >
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Create Account</h2>
            <form onSubmit={handleSignup}>
              {signupError && (
                <div className="mb-4 rounded-md bg-red-900/30 p-3 text-sm text-red-200">
                  {signupError}
                </div>
              )}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Create Account
              </motion.button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900 px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* GitHub icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* Twitter icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400 shadow-sm hover:bg-gray-700"
                >
                  {/* Google icon */}
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <span 
                className="cursor-pointer font-medium text-gray-300 hover:text-white"
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              >
                Log in
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Forgot Password Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showForgotPassword ? 1 : 0,
          pointerEvents: showForgotPassword ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={toggleForgotPassword} />
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: showForgotPassword ? 0 : '100%', opacity: showForgotPassword ? 1 : 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl"
        >
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Reset Password</h2>
            
            {resetMessage ? (
              <div className="rounded-lg bg-gray-800/80 p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-gray-700 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300">{resetMessage}</p>
                <button
                  onClick={toggleForgotPassword}
                  className="mt-6 w-full rounded-lg bg-gray-700 py-2 text-white hover:bg-gray-600"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <p className="mb-6 text-sm text-gray-400">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
                
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                      required
                      placeholder="your@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Send Reset Link
                </motion.button>
                
                <div className="mt-6 text-center text-sm text-gray-400">
                  Remember your password?{" "}
                  <span 
                    className="cursor-pointer font-medium text-gray-300 hover:text-white"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setShowLogin(true);
                    }}
                  >
                    Back to login
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}