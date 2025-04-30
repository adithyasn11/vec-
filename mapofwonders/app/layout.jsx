// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import Splash from '../components/splash'; 
import Header from '../components/header';
import Footer from '../components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: 'Map of Wonders | Discover India',
  description: 'Explore the magical destinations of India through a futuristic travel experience.',
  keywords: 'India, travel, tourism, Taj Mahal, Kerala, Varanasi, Jaipur, Himalayas',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Map of Wonders India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/twitter-image.jpg'],
  },
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