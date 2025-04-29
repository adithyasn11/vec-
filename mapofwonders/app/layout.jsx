// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import Splash from '../components/splash'; 
import Header from '../components/header';
import Footer from '../components/footer';



// Initialize the Inter font with Latin subset
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Map of Wonders | Discover India',
  description: 'Explore the magical destinations of India through a futuristic travel experience.',
  keywords: 'India, travel, tourism, Taj Mahal, Kerala, Varanasi, Jaipur, Himalayas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-900 text-gray-100`}>
        <Splash />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}