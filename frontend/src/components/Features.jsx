import { motion } from 'framer-motion';
import { Mountain, Shield, Camera, Headphones, Globe, Award } from 'lucide-react';

const features = [
  { icon: Mountain, title: 'Adventure Tours', desc: "Thrilling expeditions to Pakistan's highest peaks, glaciers and remote valleys", color: '#2563eb' },
  { icon: Shield, title: 'Safe & Secure', desc: 'Experienced guides, safety equipment and 24/7 emergency support on every trip', color: '#10b981' },
  { icon: Camera, title: 'Photo Experiences', desc: 'Capture world-class landscapes — from Deosai Plains to Badshahi Mosque', color: '#8b5cf6' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance from our dedicated travel experts', color: '#f59e0b' },
  { icon: Globe, title: 'Local Expertise', desc: 'Authentic experiences guided by locals who know every hidden gem', color: '#ef4444' },
  { icon: Award, title: 'Best Value', desc: 'Premium quality tours at the most competitive prices guaranteed', color: '#06b6d4' },
];

const Features = () => (
  <section id="features" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ display: 'inline-block', padding: '0.4rem 1.25rem', background: '#eff6ff', color: '#2563eb', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Why Choose Us
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
          Your Perfect Travel Partner
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Experience Pakistan with confidence through our world-class services
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
            style={{ padding: '2.25rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'all 0.3s ease', cursor: 'default' }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <f.icon style={{ width: '28px', height: '28px', color: f.color }} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>{f.title}</h3>
            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
