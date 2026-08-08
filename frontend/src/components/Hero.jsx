import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';

const Hero = ({ onBookNow }) => {
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background Image - Deosai Plains, Skardu */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(88,28,135,0.6) 100%)', zIndex: 1 }} />
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=95"
          alt="Karakoram Mountains Pakistan"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 1.5rem 4rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50px', padding: '0.5rem 1.25rem', marginBottom: '2rem' }}
        >
          <MapPin style={{ width: '16px', height: '16px', color: '#34d399' }} />
          <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>Pakistan's #1 Travel Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: '900', color: '#ffffff', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}
        >
          Discover Pakistan
          <span style={{ display: 'block', background: 'linear-gradient(135deg, #34d399, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginTop: '0.25rem' }}>
            Land of Wonders
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.85)', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.7' }}
        >
          From the mighty peaks of Karakoram to the ancient streets of Lahore — experience the magic of Pakistan
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2rem', maxWidth: '860px', margin: '0 auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '14px', border: '2px solid transparent', transition: 'border-color 0.2s' }}
              onFocus={e => e.currentTarget.style.borderColor = '#2563eb'}
              onBlur={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              <MapPin style={{ width: '22px', height: '22px', color: '#2563eb', flexShrink: 0 }} />
              <input type="text" placeholder="Where to go?" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', color: '#111827', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '14px', border: '2px solid transparent' }}>
              <Calendar style={{ width: '22px', height: '22px', color: '#2563eb', flexShrink: 0 }} />
              <input type="text" placeholder="Select dates" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', color: '#111827', width: '100%' }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(37,99,235,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookNow}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', borderRadius: '14px', padding: '1rem 1.5rem', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(37,99,235,0.4)' }}
            >
              <Search style={{ width: '20px', height: '20px' }} />
              Search Tours
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, cursor: 'pointer' }}
      >
        <ChevronDown style={{ width: '36px', height: '36px', color: 'rgba(255,255,255,0.7)' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
