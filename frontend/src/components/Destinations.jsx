import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, Users } from 'lucide-react';
import { api } from '../services/api';

import skr_deosai from '../assets/images/Skardu_Deosai.jpg';
import hunzaValley from '../assets/images/Hunza_Valley.jpg';
import fairy_Meadowa from '../assets/images/Fairy_meadows.jpg';
import swat_valley from '../assets/images/Swat_Valley_lake.jpg';
import neelam_valley from '../assets/images/Neelam_Valley.jpg';
import khunjerab_pass from '../assets/images/Khunjerab_Pass.jpg';
import chitral_kalash from '../assets/images/Chitral_Kalash.jpg';
import hingol_national_park from '../assets/images/Hingol_national_park.jpg';

// Local image mapping for fallback display
const LOCAL_IMAGES = {
  'Hunza Valley': hunzaValley,
  'Skardu & Deosai': skr_deosai,
  'Fairy Meadows': fairy_Meadowa,
  'Swat Valley': swat_valley,
  'Neelum Valley': neelam_valley,
  'Khunjerab Pass': khunjerab_pass,
  'Chitral & Kalash': chitral_kalash,
  'Hingol National Park': hingol_national_park,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function DestinationCard({ dest, index, onBookNow }) {
  // Use backend image if available, otherwise fallback to local images, then unsplash
  const image = dest.images?.[0] || LOCAL_IMAGES[dest.name] || dest.image || 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=90';
  const rating = dest.average_rating ?? dest.averageRating ?? dest.rating ?? 0;
  const reviews = dest.ratings?.length ?? dest.tours ?? 0;
  const tag = dest.category || dest.tag || '';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={dest.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=90';
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          }}
        />

        {tag && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(255,255,255,0.95)',
              padding: '4px 12px',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#2563eb',
            }}
          >
            {tag}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.95)',
            padding: '4px 12px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Star style={{ width: '14px', height: '14px', color: '#f59e0b', fill: '#f59e0b' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>{rating}</span>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <MapPin style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.8)' }} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>
              {dest.province || dest.location}
            </span>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>
            {dest.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.6, flex: 1 }}>
          {dest.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
            <Users style={{ width: '16px', height: '16px' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{reviews} reviews</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Starting from</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#059669' }}>
              PKR {dest.price.toLocaleString()}
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBookNow(dest.name)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1.25rem',
            padding: '0.875rem',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '14px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
          }}
        >
          Book Now <ArrowRight style={{ width: '18px', height: '18px' }} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Destinations({ onBookNow }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getPlaces({ sort: 'rating', limit: 8 })
      .then(res => setDestinations(res.data || []))
      .catch(err => {
        console.error('Failed to load destinations:', err);
        setError(err.message || 'Failed to load destinations');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="destinations"
      style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.25rem',
              background: '#ecfdf5',
              color: '#059669',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              letterSpacing: '0.5px',
            }}
          >
            Popular Destinations
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            Explore Pakistan's Beauty
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#64748b',
              maxWidth: '550px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            From towering Karakoram peaks to ancient Mughal cities — Pakistan has it all
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid #e2e8f0',
                borderTopColor: '#2563eb',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '4rem',
              gap: '1rem',
              color: '#ef4444',
            }}
          >
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>Could not load destinations</p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{error}</p>
          </div>
        )}

        {/* Destinations Grid */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {destinations.length === 0 ? (
              <p
                style={{
                  textAlign: 'center',
                  padding: '4rem',
                  color: '#94a3b8',
                  gridColumn: '1/-1',
                }}
              >
                No destinations found.
              </p>
            ) : (
              destinations.map((dest, i) => (
                <DestinationCard key={dest._id || i} dest={dest} index={i} onBookNow={onBookNow} />
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Spin animation keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}