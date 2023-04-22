import { motion } from 'framer-motion';

const Animate = ({ children }) => (
  <motion.div
    initial={{ y: 300, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 300, opacity: 0 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
    style={{ flex: 1 }}
  >
    {children}
  </motion.div>
);
export default Animate;
