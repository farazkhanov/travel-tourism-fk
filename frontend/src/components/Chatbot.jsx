import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Plane } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { api } from '../services/api';

const SUGGESTIONS = ['Hunza Valley', 'Skardu', 'Best time to visit', 'Tour packages'];

export default function Chatbot() {
  const { messages, addMessage, isOpen, setIsOpen } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Smooth auto-scroll to newest message whenever messages or loading state change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when the panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  const send = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    addMessage({ role: 'user', content: text });
    setInput('');
    setLoading(true);
    try {
      const res = await api.sendChatMessage(text);
      addMessage({ role: 'assistant', content: res.data.reply });
    } catch {
      addMessage({ role: 'assistant', content: 'Sorry, I could not process that. Try asking about Hunza, Lahore, or Skardu!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9000,
          width: '62px', height: '62px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #0d9488)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 32px rgba(37,99,235,0.45)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? 'close' : 'chat'}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex' }}
          >
            {isOpen
              ? <X style={{ width: '24px', height: '24px', color: '#fff' }} />
              : <MessageCircle style={{ width: '24px', height: '24px', color: '#fff' }} />
            }
          </motion.div>
        </AnimatePresence>
        {!isOpen && messages.length <= 1 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.15, 1] }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#f59e0b', border: '2px solid #fff',
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', bottom: '6.5rem', right: '2rem', zIndex: 9000,
              width: '380px', maxWidth: 'calc(100vw - 2rem)', height: '540px', maxHeight: 'calc(100vh - 9rem)',
              background: '#ffffff', borderRadius: '22px',
              boxShadow: '0 24px 70px rgba(15,23,42,0.25)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              border: '1px solid #e2e8f0',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 55%, #0d9488 100%)',
              padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px',
              flexShrink: 0, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.15,
                backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0%, transparent 40%)',
              }} />
              <div style={{
                width: '38px', height: '38px', background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1,
              }}>
                <Plane style={{ width: '18px', height: '18px', color: '#fff' }} />
              </div>
              <div style={{ zIndex: 1, minWidth: 0 }}>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>
                  Pakistan Travel Assistant
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)', fontSize: '0.76rem',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#4ade80', display: 'inline-block',
                    boxShadow: '0 0 0 2px rgba(74,222,128,0.3)',
                  }} />
                  Online now
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="chat-scroll"
              style={{
                flex: 1, overflowY: 'auto', padding: '1.1rem',
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
                background: '#f8fafc', scrollBehavior: 'smooth',
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div style={{
                      maxWidth: '82%', padding: '0.65rem 0.95rem',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                        : '#ffffff',
                      color: msg.role === 'user' ? '#ffffff' : '#0f172a',
                      fontSize: '0.875rem', lineHeight: 1.6,
                      boxShadow: msg.role === 'user'
                        ? '0 4px 14px rgba(37,99,235,0.25)'
                        : '0 2px 8px rgba(15,23,42,0.06)',
                      border: msg.role === 'user' ? 'none' : '1px solid #f1f5f9',
                    }}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <div style={{
                    background: '#ffffff', border: '1px solid #f1f5f9',
                    padding: '0.7rem 1rem', borderRadius: '16px 16px 16px 4px',
                    display: 'flex', gap: '4px', alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                  }}>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}
                        style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: '#94a3b8', display: 'inline-block',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick suggestions — only shown before the conversation gets going */}
              {messages.length <= 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        padding: '0.4rem 0.8rem', borderRadius: '999px',
                        border: '1.5px solid #dbeafe', background: '#eff6ff',
                        color: '#2563eb', fontSize: '0.78rem', fontWeight: '600',
                        cursor: 'pointer', transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#dbeafe')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#eff6ff')}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: '0.85rem', borderTop: '1px solid #f1f5f9',
              display: 'flex', gap: '0.5rem', background: '#ffffff', flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about Hunza, Lahore..."
                disabled={loading}
                style={{
                  flex: 1, padding: '0.65rem 1rem', border: '1.5px solid #e2e8f0',
                  borderRadius: '999px', fontSize: '0.875rem', outline: 'none',
                  fontFamily: 'inherit', color: '#0f172a', background: '#f8fafc',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  width: '42px', height: '42px', flexShrink: 0,
                  background: (loading || !input.trim())
                    ? '#cbd5e1'
                    : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  border: 'none', borderRadius: '50%',
                  cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Send style={{ width: '16px', height: '16px', color: '#ffffff' }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </>
  );
}