import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { value: '500+', label: 'Happy Travelers' },
    { value: '50+', label: 'Destinations' },
    { value: '10+', label: 'Years Experience' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  return (
    <section style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontWeight: '500' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
