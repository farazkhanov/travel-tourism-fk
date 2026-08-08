import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 48 },  visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  slideLeft: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  slideRight:{ hidden: { opacity: 0, x: 48 },  visible: { opacity: 1, x: 0 } },
};

export default function AnimatedSection({ children, variant = 'fadeUp', delay = 0, duration = 0.65, style = {}, className = '' }) {
  const { ref, isVisible } = useScrollAnimation(0.12);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
