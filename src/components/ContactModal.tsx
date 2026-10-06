import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_INFO, TEAM_MEMBERS } from '../data/projects';
import { playTick } from '../services/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="studio-contact-modal"
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
            className="w-full flex items-center justify-between text-xs sm:text-sm font-medium tracking-tight"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#fcf8ef]">ODD MANGO</span>
              <sup className="text-xs font-bold">®</sup>
            </div>

            <button
              id="close-contact-btn"
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

          {/* Main Content Area */}
          <div
            className="max-w-3xl my-auto py-8 text-[#fcf8ef] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 2. Category Tag: Appears second (at 0.4s) */}
            <motion.p
              initial={{ opacity: 0, y: 12, letterSpacing: '0.12em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-3"
            >
              CONTACT & COMMISSION
            </motion.p>

            {/* 3. Main Headline: Appears third (at 0.65s) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-8"
            >
              Let’s discuss stories, motion, and visual directions.
            </motion.h1>

            {/* 4. Contact Info Columns: Appears fourth (at 0.9s) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
            >
              <div>
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  GENERAL INQUIRIES
                </p>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  onClick={() => playTick()}
                  className="text-base sm:text-lg text-[#fcf8ef] hover:text-[#2554f2] transition-colors font-mono tracking-tight block break-all sm:break-normal"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  DIRECT CONTACT
                </p>
                <a
                  href={`tel:${(STUDIO_INFO.phone || '+91 93706 02824').replace(/\s+/g, '')}`}
                  onClick={() => playTick()}
                  className="text-base sm:text-lg text-[#fcf8ef] hover:text-[#2554f2] transition-colors font-mono tracking-tight block"
                >
                  {STUDIO_INFO.phone || '+91 93706 02824'}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  STUDIO LOCATION
                </p>
                <p className="text-base sm:text-lg text-[#cbc7c2] font-mono tracking-tight">
                  {STUDIO_INFO.location}
                </p>
              </div>
            </motion.div>

            {/* 5. Founder & Leadership Section: Appears fifth (at 1.15s) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 border-t border-neutral-800/60"
            >
              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-6">
                FOUNDER
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.name} className="flex flex-col">
                    <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#fcf8ef]">
                      {member.name}
                    </span>
                    <span className="text-xs font-mono uppercase text-[#cbc7c2]/80 mt-0.5 tracking-wider">
                      {member.role}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
                      <a
                        href={`mailto:${member.email}`}
                        onClick={() => playTick()}
                        className="text-xs font-mono text-[#cbc7c2]/60 hover:text-[#fcf8ef] transition-colors"
                      >
                        {member.email}
                      </a>
                      {member.phone && (
                        <>
                          <span className="text-neutral-700 hidden sm:inline">&bull;</span>
                          <a
                            href={`tel:${member.phone.replace(/\s+/g, '')}`}
                            onClick={() => playTick()}
                            className="text-xs font-mono text-[#cbc7c2]/60 hover:text-[#fcf8ef] transition-colors"
                          >
                            {member.phone}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 6. Bottom Information: Appears sixth (at 1.4s) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-neutral-500 border-t border-neutral-900/60 pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span>© 2016–2026 ODD MANGO &bull; PRODUCTION STUDIO</span>
            <span className="text-[#cbc7c2] uppercase">
              PUNE, MAHARASHTRA
            </span>
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
