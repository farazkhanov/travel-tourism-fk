import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { api } from '../services/api';

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function TestimonialCard({ testimonial }) {
  const { name, location, image, rating, text, review } = testimonial;
  const displayText = review || text;
  const displayImage = image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: '#ffffff',
        padding: '2.25rem',
        borderRadius: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid #f1f5f9',
        position: 'relative',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Quote Icon */}
      <Quote
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: '48px',
          height: '48px',
          color: '#d1fae5',
          opacity: 0.8,
        }}
      />

      {/* Avatar + Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <img
          src={displayImage}
          alt={name}
          loading="lazy"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #d1fae5',
          }}
        />
        <div>
          <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a' }}>
            {name}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
            {location}
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            style={{
              width: '16px',
              height: '16px',
              color: j < rating ? '#f59e0b' : '#e2e8f0',
              fill: j < rating ? '#f59e0b' : '#e2e8f0',
            }}
          />
        ))}
      </div>

      {/* Review Text */}
      <p
        style={{
          fontSize: '0.95rem',
          color: '#475569',
          lineHeight: 1.7,
          fontStyle: 'italic',
          flex: 1,
        }}
      >
        "{displayText}"
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getTestimonials()
      .then(res => setTestimonials(res.data || []))
      .catch(err => {
        console.error('Failed to load testimonials:', err);
        setError(err.message || 'Failed to load testimonials');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="testimonials"
      style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
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
            Traveler Stories
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
            What Fellow Pakistanis Say
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
            Real stories from travelers who discovered the magic of Pakistan with us
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', gridColumn: '1/-1' }}>
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
          ) : error ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4rem',
                gap: '1rem',
                color: '#ef4444',
                gridColumn: '1/-1',
              }}
            >
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>Could not load testimonials</p>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <p
              style={{
                color: '#94a3b8',
                textAlign: 'center',
                gridColumn: '1/-1',
                padding: '2rem',
              }}
            >
              No stories yet.
            </p>
          ) : (
            testimonials.map((t, i) => <TestimonialCard key={t.id || i} testimonial={t} />)
          )}
        </motion.div>
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