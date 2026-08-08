import { motion } from 'framer-motion';
import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = ({ onBookNow }) => (
  <footer style={{ background: '#0f172a', color: '#ffffff', padding: '5rem 1.5rem 2rem' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <Plane style={{ width: '32px', height: '32px', color: '#60a5fa' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>WanderLux</span>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Pakistan's premier travel platform. We craft unforgettable journeys through the world's most spectacular landscapes.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <Icon style={{ width: '18px', height: '18px', color: '#94a3b8' }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['About Us', 'Destinations', 'Tours', 'Blog', 'Contact'].map(link => (
              <li key={link}>
                <a
                  href={link === 'Contact' ? '#contact' : link === 'Destinations' ? '#destinations' : '#'}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Destinations</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Hunza Valley', 'Skardu', 'Fairy Meadows', 'Swat Valley', 'Lahore'].map(dest => (
              <li key={dest}>
                <a href="#destinations" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                >{dest}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { Icon: Mail, text: 'info@wanderlux.pk' },
              { Icon: Phone, text: '+92 300 1234567' },
              { Icon: MapPin, text: 'Blue Area, Islamabad, Pakistan' },
            ].map(({ Icon, text }, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Icon style={{ width: '18px', height: '18px', color: '#60a5fa', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5 }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.4rem' }}>Stay Updated</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Get the latest travel deals and destination guides.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input type="email" placeholder="Enter your email" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '0.95rem', outline: 'none', minWidth: '240px', fontFamily: 'inherit' }} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}
          >
            Subscribe
          </motion.button>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ color: '#64748b', fontSize: '0.9rem' }}></span>
        <Heart style={{ width: '16px', height: '16px', color: '#ef4444', fill: '#ef4444' }} />
        <span style={{ color: '#64748b', fontSize: '0.9rem' }}></span>
      </div> */}
    </div>
  </footer>
);

export default Footer;
