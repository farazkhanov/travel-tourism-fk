import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Destinations from './components/Destinations';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Chatbot from './components/Chatbot';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselected, setPreselected] = useState('');

  const openBooking = (destination = '') => {
    setPreselected(destination);
    setBookingOpen(true);
  };

  return (
    <AuthProvider>
    <Router>
      <div style={{ width: '100%', minHeight: '100vh', background: '#ffffff' }}>
        <Navbar onBookNow={() => openBooking()} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero onBookNow={() => openBooking()} />
              <Stats />
              <Features />
              <Destinations onBookNow={openBooking} />
              <Gallery />
              <Testimonials />
              <Contact />
              <CallToAction onBookNow={() => openBooking()} />
            </>
          } />
        </Routes>
        <Footer onBookNow={() => openBooking()} />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          preselectedDestination={preselected}
        />
        <Chatbot />
        <AuthModal />
        <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { borderRadius: '12px', fontSize: '14px' },
              success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
              error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
            }}
          />
      </div>
    </Router>
    </AuthProvider>
  );
}
