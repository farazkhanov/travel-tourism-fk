import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

import attabad from "../assets/images/Attabad_lake.jpg";
import deosai from "../assets/images/Deosai-plains.jpg";
import fairy from "../assets/images/fairy-meadows.png";
import saif from "../assets/images/saif-ul-malook.jpg";
import badshahi from "../assets/images/badshahi-mosque.jpg";
import swat from "../assets/images/swat-valley.jpg";
import kkh from "../assets/images/Karakoram-highway.png";
import ratti from "../assets/images/ratti-gali-lake.png";
import skardu from "../assets/images/skardu.jpg";

const images = [
  { url: attabad, title: "Attabad Lake", location: "Hunza Valley" },
  { url: deosai, title: "Deosai Plains", location: "Skardu" },
  { url: fairy, title: "Fairy Meadows", location: "Gilgit-Baltistan" },
  { url: saif, title: "Saif-ul-Malook Lake", location: "Naran, KPK" },
  { url: badshahi, title: "Badshahi Mosque", location: "Lahore" },
  { url: swat, title: "Swat Valley", location: "Khyber Pakhtunkhwa" },
  { url: kkh, title: "Karakoram Highway", location: "Gilgit-Baltistan" },
  { url: ratti, title: "Ratti Gali Lake", location: "Azad Kashmir" },
  { url: skardu, title: "Skardu Valley", location: "Gilgit-Baltistan" },
];

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" style={{ padding: '6rem 1.5rem', background: '#0f172a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ display: 'inline-block', padding: '0.4rem 1.25rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem', border: '1px solid rgba(52,211,153,0.3)' }}>
            Photo Gallery
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Captured Moments
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Stunning views from Pakistan's most breathtaking destinations
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(img)}
              style={{
                position: 'relative',
                height: '320px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="gallery-item"
            >
              <img
                src={img.url}
                alt={img.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover',display: 'block', transition: 'transform 0.5s ease' }}
                onError={e => { e.target.src = `https://picsum.photos/seed/${img.title}/800/600`; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-overlay" />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', opacity: 0, transition: 'opacity 0.3s ease', transform: 'translateY(8px)', transition: 'all 0.3s ease' }} className="gallery-text">
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>{img.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>{img.location}</div>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-zoom">
                <ZoomIn style={{ width: '36px', height: '36px', color: '#ffffff' }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'pointer' }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                <X style={{ width: '24px', height: '24px', color: '#ffffff' }} />
              </button>
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '1000px', width: '100%', cursor: 'default' }}
              >
                <img src={selected.url} alt={selected.title} style={{ width: '100%', borderRadius: '16px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} />
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff' }}>{selected.title}</div>
                  <div style={{ fontSize: '1rem', color: '#94a3b8', marginTop: '4px' }}>{selected.location}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .gallery-item:hover img { transform: scale(1.08); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-text { opacity: 1 !important; transform: translateY(0) !important; }
        .gallery-item:hover .gallery-zoom { opacity: 1 !important; }
      `}</style>
    </section>
  );
};

export default Gallery;
