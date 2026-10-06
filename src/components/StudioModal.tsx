import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_INFO, TEAM_MEMBERS } from '../data/projects';
import { playTick } from '../services/audio';
import logoWhite from '../assets/Logo/logo-white.png';
import founderImage from '../assets/Founder/founder1.jpg';

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioModal: React.FC<StudioModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const founder = TEAM_MEMBERS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="studio-about-modal"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            scale: 1.25,
            filter: 'blur(16px)',
            transition: { duration: 1.1, ease: [0.72, 0, 0.22, 1] },
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] pointer-events-auto flex flex-col justify-between bg-[#0e0e0e]/98 backdrop-blur-md p-6 sm:p-12 overflow-y-auto select-none will-change-transform"
          onClick={onClose}
        >
          {/* 1. Top Bar: Appears first (at 0.2s) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-between text-xs sm:text-sm font-medium tracking-tight shrink-0 mb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#fcf8ef]">ODD MANGO</span>
              <sup className="text-xs font-bold">®</sup>
            </div>

            <button
              id="close-about-btn"
              onClick={() => {
                playTick();
                onClose();
              }}
              className="font-mono text-xs uppercase text-[#cbc7c2] hover:text-[#fcf8ef] transition-colors cursor-pointer"
            >
              <span className="roll">
                <span className="roll-inner">
                  <span className="roll-face">[close]</span>
                  <span className="roll-face text-white">[close]</span>
                </span>
              </span>
            </button>
          </motion.div>

          {/* Main Content: Bio, Logo, Clients & Founder */}
          <div
            className="max-w-5xl w-full mx-auto my-auto py-4 text-[#fcf8ef] flex flex-col md:flex-row items-start gap-10 md:gap-14"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Logo + Typography + Bio + Clients */}
            <div className="flex-1 flex flex-col">
              {/* 2. Studio Logo: Appears second (at 0.45s) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6"
              >
                <img
                  src={logoWhite}
                  alt="ODD MANGO Logo"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* 3. Main Headline: Appears third (at 0.7s) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight mb-5"
              >
                A boutique production studio with unyielding passion for storytelling.
              </motion.h1>

              {/* 4. Bio Text: Appears fourth (at 0.95s) */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-[#cbc7c2] font-normal leading-relaxed mb-8 max-w-2xl"
              >
                {STUDIO_INFO.bio}
              </motion.p>

              {/* 6. Client Roster: Appears sixth (at 1.2s) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-neutral-800/60"
              >
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  SELECTED CLIENTS & COLLABORATORS
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm uppercase font-mono text-[#cbc7c2]">
                  {STUDIO_INFO.trustedClients.map((client) => (
                    <span key={client.slug} className="hover:text-white transition-colors">
                      {client.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Founder Portrait — Appears fifth (at 0.85s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full sm:w-72 md:w-80 shrink-0 flex flex-col gap-3"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-900 border border-white/10 shadow-2xl">
                <img
                  src={founderImage}
                  alt={founder?.name || 'Founder'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col text-xs font-mono pt-1 gap-0.5">
                <span className="text-[#fcf8ef] uppercase font-bold tracking-wider">
                  {founder?.name || 'Omkar Janvekar'}
                </span>
                <span className="text-neutral-500 uppercase tracking-wide">
                  {founder?.role || 'Founder & Creative Director'}
                </span>
                <a
                  href={`mailto:${founder?.email || 'oddmangomedia@gmail.com'}`}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {founder?.email || 'oddmangomedia@gmail.com'}
                </a>
                <a
                  href={`tel:${(founder?.phone || '+91 93706 02824').replace(/\s+/g, '')}`}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {founder?.phone || '+91 93706 02824'}
                </a>
              </div>
            </motion.div>
          </div>

          {/* 7. Bottom Information: Appears seventh (at 1.4s) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-neutral-500 border-t border-neutral-900/60 pt-4 shrink-0 mt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <span>© 2016–2026 ODD MANGO &bull; PRODUCTION STUDIO</span>
            <span className="text-[#cbc7c2] uppercase">PUNE, MAHARASHTRA</span>
            <div className="flex items-center gap-4">
              <a
                href="mailto:oddmangomedia@gmail.com"
                className="text-[#cbc7c2] hover:text-[#fcf8ef] transition-colors uppercase"
              >
                ODDMANGOMEDIA@GMAIL.COM
              </a>
              <span className="text-neutral-700 hidden sm:inline">&bull;</span>
              <a
                href="tel:+919370602824"
                className="text-[#cbc7c2] hover:text-[#fcf8ef] transition-colors uppercase hidden sm:inline"
              >
                +91 93706 02824
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
