'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  const letters = 'Lenz'.split('');

  return (
    <nav className='z-50 p-6 flex justify-center'>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 'auto', opacity: 1 }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        className='bg-black/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 flex items-center overflow-hidden'
      >
        <motion.div
          className='relative flex items-center cursor-default select-none'
          whileHover='hover'
        >
          {/* Animated Letters */}
          <div className='flex'>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className='text-2xl font-black tracking-tighter text-white'
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* The "Laser Scan" Wipe */}
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'linear',
              repeatDelay: 1,
            }}
            className='absolute top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-cyan-400 to-transparent opacity-30 skew-x-12'
          />
        </motion.div>
      </motion.div>
    </nav>
  );
}
