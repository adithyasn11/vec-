'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GridMotion from '../components/GridMotion.jsx';

export default function LandingPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add form data state for forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
 
  // Use effect to simulate loading
  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading check)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(timer);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Add validation checks
    if (!loginEmail || !loginPassword) {
      setLoginError('Email and password are required');
      return;
    }
    
    setIsSubmitting(true);
    setLoginError(''); // Clear any previous errors
    
    console.log("Starting login process...");
    
    try {
      console.log("Sending request to /api/auth/login");
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          rememberMe: rememberMe
        }),
      });
      
      console.log("Received response:", response.status);
      
      // Always parse JSON regardless of status code
      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        throw new Error("Invalid server response");
      }
      
      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        // Handle specific status codes
        if (response.status === 401) {
          setLoginError('Invalid email or password');
        } else if (response.status === 404) {
          setLoginError('User not found');
        } else if (response.status === 429) {
          setLoginError('Too many login attempts. Please try again later.');
        } else {
          setLoginError(data.message || data.error || `Login failed with status ${response.status}`);
        }
        return;
      }
      
      console.log("Login successful, storing user data");
      
      // If successful
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        console.warn("No token received in successful response");
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.warn("No user data received in successful response");
      }
      
      console.log("Redirecting to home page");
      
      // Use router to navigate to home page
      router.push('/home');
      
    } catch (error) {
      console.error("Login process error:", error);
      setLoginError('Connection error or server unavailable. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }
    
    setIsSubmitting(true);
    setSignupError(''); // Clear any previous errors
    
    console.log("Starting signup process...");
    
    try {
      console.log("Sending request to /api/auth/signup");
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword
        })
      });
      
      console.log("Received response:", response.status);
      
      // Always parse JSON regardless of status code
      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        throw new Error("Invalid server response");
      }
      
      if (!response.ok) {
        console.error("Signup failed with status:", response.status);
        // Handle specific status codes
        if (response.status === 409) {
          setSignupError('Email already exists. Please use a different email.');
        } else {
          setSignupError(data.message || data.error || `Signup failed with status ${response.status}`);
        }
        return;
      }
      
      console.log("Signup successful, storing user data");
      
      // If successful
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        console.warn("No token received in successful response");
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.warn("No user data received in successful response");
      }
      
      console.log("Redirecting to home page");
      
      // Use router to navigate to home page
      router.push('/home');
      
    } catch (error) {
      console.error("Signup process error:", error);
      setSignupError('Connection error or server unavailable. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    // In a real app, you'd send a reset link to the email
    console.log("Password reset request for:", forgotEmail);
    
    // Show confirmation message
    setResetMessage('If your email exists in our system, you will receive a password reset link shortly.');
  };

  // Move items array inside component and fix duplicate keys
  const items = [
    // Row 1
    '/destinations/kerala.jpg',
    '/destinations/himalaya.jpg',
    '/destinations/jaipur.jpg',
    '/destinations/kerala.jpg',
    '/destinations/varanasi.jpg',
    '/destinations/taj-mahal.jpg',
    '/destinations/goa.jpg',

    // Row 2
    '/destinations/karna.jpg',
    '/destinations/tamil.jpg',
    '/destinations/varanasi.jpg',
    '/destinations/goa.jpg',
    '/destinations/taj-mahal.jpg',
    '/destinations/amrit.jpg',
    '/destinations/andhra.jpg',

    // Row 3
    '/destinations/1.jpg',
    '/destinations/2.jpg',
    '/destinations/3.jpg',
    '/destinations/4.jpg',
    '/destinations/5.jpg',
    '/destinations/6.jpg',
    '/destinations/7.jpg',

    // Row 4
    '/destinations/kerala.jpg',
    '/destinations/kerala.jpg',
    '/destinations/8.jpg',
    '/destinations/8.jpg',
    '/destinations/9.jpg',
    '/destinations/10.jpg',
    '/destinations/kerala.jpg',
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      <AnimatePresence>
        {isLoading ? (
          // Simplified Loading Screen with Fancy Circle
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
          >
            {/* Simple Fancy Circle Loader */}
            <motion.div 
              className="relative w-24 h-24"
            >
              {/* Outer spinning ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-gray-700"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              
              {/* Middle spinning ring */}
              <motion.div 
                className="absolute inset-2 rounded-full border-4 border-t-white border-l-white border-r-transparent border-b-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              ></motion.div>
              
              {/* Inner spinning ring */}
              <motion.div 
                className="absolute inset-4 rounded-full border-4 border-r-white border-b-white border-l-transparent border-t-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              ></motion.div>
              
              {/* Center dot */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </motion.div>
            </motion.div>
            
            {/* Simple text below loader */}
            <motion.p
              className="mt-6 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Add GridMotion with lower z-index */}
      <div className="relative z-0">
        <GridMotion items={items} />
      </div>

      {/* Main Content with higher z-index */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-white">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-center relative z-20 bg-black bg-opacity-35 p-8 rounded-xl backdrop-blur-sm shadow-2xl border border-white border-opacity-10"
        >
          <motion.h1 
            className="mb-2 font-sans text-6xl font-bold tracking-tighter"
            initial={{ opacity: 0, letterSpacing: '10px', y: -20 }}
            animate={{ opacity: 1, letterSpacing: '-1px', y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            MAP OF WONDERS
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            className="mx-auto mb-4 h-1 bg-white bg-opacity-60"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8 text-xl font-light tracking-wide text-gray-200"
          >
            Discover the timeless beauty of India
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="flex justify-center space-x-4"
          >
            <motion.button
              onClick={toggleLogin}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(75, 85, 99, 0.9)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-md bg-gray-800 bg-opacity-50 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ letterSpacing: '0.5px' }}
                transition={{ duration: 0.3 }}
              >
                Login
              </motion.span>
              <motion.span 
                className="absolute bottom-0 left-0 h-1 w-0 bg-white bg-opacity-30 transition-all duration-300 group-hover:w-full"
                whileHover={{ width: '100%' }}
              ></motion.span>
            </motion.button>
            
            <motion.button
              onClick={toggleSignup}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(75, 85, 99, 0.9)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-md bg-gray-800 bg-opacity-50 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ letterSpacing: '0.5px' }}
                transition={{ duration: 0.3 }}
              >
                Sign Up
              </motion.span>
              <motion.span 
                className="absolute bottom-0 left-0 h-1 w-0 bg-white bg-opacity-30 transition-all duration-300 group-hover:w-full"
                whileHover={{ width: '100%' }}
              ></motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Keep modals with highest z-index */}
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
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
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
              className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 mt-1 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
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
              className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 mt-1 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
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
              className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 pl-10 pr-4 py-2 mt-1 text-white placeholder-gray-500 shadow-inner focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {signupPassword !== confirmPassword && confirmPassword !== "" && (
            <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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
      <h2 className="mb-6 text-center text-2xl font-bold text-white">Reset Your Password</h2>
      {resetMessage ? (
        <div className="mb-6 rounded-md bg-gray-800/80 p-4 text-center">
          <div className="mb-2 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-300">{resetMessage}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleForgotPassword}
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 py-2.5 font-medium text-white transition duration-200 hover:from-gray-600 hover:to-gray-700 focus:outline-none"
          >
            Back to Login
          </motion.button>
        </div>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <div className="mb-6">
            <p className="mb-4 text-sm text-gray-400">
              Please enter your email address. We will send you a link to reset your password.
            </p>
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
          
          <div className="mt-6 text-center">
            <span 
              className="cursor-pointer text-sm text-gray-400 hover:text-gray-300"
              onClick={() => {
                setShowForgotPassword(false);
                setShowLogin(true);
              }}
            >
              Back to Login
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
const handleSignup = async (e) => {
  e.preventDefault();
  
  // Validation checks
  if (signupPassword !== confirmPassword) {
    setSignupError('Passwords do not match');
    return;
  }
  
  if (signupPassword.length < 6) {
    setSignupError('Password must be at least 6 characters');
    return;
  }
  
  setIsSubmitting(true);
  setSignupError(''); // Clear any previous errors
  
  console.log("Starting signup process...");
  
  try {
    console.log("Sending request to /api/auth/signup");
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email: signupEmail,
        password: signupPassword
      })
    });
    
    console.log("Received response:", response.status);
    
    // Always parse JSON regardless of status code
    let data;
    try {
      data = await response.json();
      console.log("Response data:", data);
    } catch (jsonError) {
      console.error("Failed to parse JSON response:", jsonError);
      throw new Error("Invalid server response");
    }
    
    if (!response.ok) {
      console.error("Signup failed with status:", response.status);
      // Handle specific status codes
      if (response.status === 409) {
        setSignupError('Email already exists. Please use a different email.');
      } else {
        setSignupError(data.message || data.error || `Signup failed with status ${response.status}`);
      }
      setIsSubmitting(false);
      return;
    }
    
    console.log("Signup successful, storing user data");
    
    // If successful
    if (data.token) {
      localStorage.setItem('token', data.token);
    } else {
      console.warn("No token received in successful response");
    }
    
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      console.warn("No user data received in successful response");
    }
    
    console.log("Redirecting to home page");
    
    // Use router if available, otherwise use direct location change
    if (typeof router !== 'undefined' && router.push) {
      router.push('/');
    } else {
      window.location.href = '/';
    }
    
  } catch (error) {
    console.error("Signup process error:", error);
    setSignupError('Connection error or server unavailable. Please try again later.');
    setIsSubmitting(false);
  }
};