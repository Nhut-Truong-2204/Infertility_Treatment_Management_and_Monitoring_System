import { motion } from 'framer-motion';

export default function Sperm({ delay = 0, start = { x: 0, y: 0 } }) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: start.x, y: start.y, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-6 h-6 bg-white rounded-full relative shadow-md">
        <div className="w-[2px] h-10 bg-white absolute left-1/2 -translate-x-1/2 top-full animate-wiggle"></div>
      </div>
    </motion.div>
  );
}
