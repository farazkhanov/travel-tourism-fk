import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { api } from '../services/api';

const info = [
  { icon: Phone,  label: 'Phone',   value: '+92 300 1234567',      sub: 'Mon–Sat, 9am–6pm PKT' },
  { icon: Mail,   label: 'Email',   value: 'info@wanderlux.pk',    sub: 'We reply within 24 hours' },
  { icon: MapPin, label: 'Office',  value: 'Blue Area, Islamabad', sub: 'Pakistan' },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setError('');
    try {
      await api.sendContact(form);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', padding: '0.875rem 1rem', border: '1.5px solid #e2e8f0',
    borderRadius: '12px', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'inherit', color: '#0f172a', background: '#ffffff',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <AnimatedSection variant="fadeUp" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '0.4rem 1.25rem', background: '#eff6ff', color: '#2563eb', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
            Contact Us
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Have questions about a tour? We're here to help you plan your perfect Pakistan adventure.
          </p>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Info Cards */}
          <AnimatedSection variant="slideLeft">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {info.map(({ icon: Icon, label, value, sub }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}
                >
                  <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: '22px', height: '22px', color: '#2563eb' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>{value}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Map embed placeholder */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '200px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                <iframe
                  title="Islamabad Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26560.39!2d73.0479!3d33.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789d6df690b4c5b!2sBlue%20Area%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1"
                  width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection variant="slideRight">
            <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>Send a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem' }}
                >
                  <CheckCircle style={{ width: '56px', height: '56px', color: '#059669', margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Message Sent!</h4>
                  <p style={{ color: '#64748b' }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Your Name *</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Faraz Khan" style={inp} required
                        onFocus={e => e.target.style.borderColor = '#2563eb'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" style={inp} required
                        onFocus={e => e.target.style.borderColor = '#2563eb'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Subject</label>
                    <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Tour inquiry, pricing, etc." style={inp}
                      onFocus={e => e.target.style.borderColor = '#2563eb'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Message *</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your dream trip..." rows={5} style={{ ...inp, resize: 'vertical' }} required
                      onFocus={e => e.target.style.borderColor = '#2563eb'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(37,99,235,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1rem', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', borderRadius: '14px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}
                  >
                    {loading
                      ? <><Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} /> Sending...</>
                      : <><Send style={{ width: '18px', height: '18px' }} /> Send Message</>
                    }
                  </motion.button>
                  {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}
                </>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
