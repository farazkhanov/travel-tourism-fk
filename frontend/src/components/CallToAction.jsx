import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const CallToAction = ({ onBookNow }) => (
  <section style={{ position: 'relative', padding: '6rem 1.5rem', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,64,175,0.85) 100%)', zIndex: 1 }} />
      <img
        src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1600&q=90"
        alt="Hunza Valley Pakistan"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>

    <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.2 }}
      >
        Ready to Explore Pakistan?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', lineHeight: 1.7 }}
      >
        Book your dream tour today and get 15% off on all packages. Limited slots available!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onBookNow}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 2.5rem', background: '#ffffff', color: '#1e40af', border: 'none', borderRadius: '50px', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer' }}
        >
          Book Now <ArrowRight style={{ width: '18px', height: '18px' }} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 2.5rem', background: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50px', fontSize: '1.05rem', fontWeight: '600', cursor: 'pointer' }}
        >
          <Phone style={{ width: '18px', height: '18px' }} /> Contact Us
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default CallToAction;
