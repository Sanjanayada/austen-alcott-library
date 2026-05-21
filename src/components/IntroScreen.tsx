import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#0d1216] select-none text-white">
      {/* Intricate background subtle texture overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=1600')` 
        }}
      />
      {/* Linear vignette gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c0f] via-transparent to-[#0e1318] opacity-90" />

      {/* Main interactive loading box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center max-w-md px-8 text-center"
      >
        {/* Interlocking Monogram Logo */}
        <Logo size={160} className="mb-8" />

        {/* Brand Text */}
        <motion.h1 
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.8, delay: 0.5 }}
          className="text-2xl md:text-3xl font-serif text-[#d4af37] font-light uppercase tracking-[0.25em] mb-3 text-center"
        >
          Austen & Alcott
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-gray-400 font-medium mb-16 text-center"
        >
          Welcome to the Library
        </motion.p>

        {/* Premium elegant loading line or interactive Enter Button */}
        <div className="w-64 h-24 flex flex-col items-center justify-center relative">
          {progress < 100 ? (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#9b8034] via-[#dfba6b] to-[#9b8034]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest text-[#c5a85c] opacity-80 uppercase">
                Initializing Archival Core... {Math.round(progress)}%
              </span>
            </div>
          ) : (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnter}
              id="library-enter-btn"
              className="px-8 py-3.5 bg-transparent border border-[#c5a85c] text-[#dfba6b] tracking-[0.2em] text-xs font-serif uppercase cursor-pointer relative overflow-hidden group transition-all duration-300 shadow-[0_4px_24px_rgba(197,168,92,0.15)] hover:shadow-[0_4px_32px_rgba(197,168,92,0.3)] hover:bg-[#c5a85c] hover:text-[#0d1216] rounded"
            >
              <span className="relative z-10 font-bold">Unlocking Stack Doors</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#9b8034] via-[#dfba6b] to-[#9b8034] transition-transform duration-500 -z-0" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-[#c5a85c]/20 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-[#c5a85c]/20 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-[#c5a85c]/20 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-[#c5a85c]/20 rounded-br-sm pointer-events-none" />
    </div>
  );
}
