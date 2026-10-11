import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_INFO, TEAM_MEMBERS } from '../data/projects';
import { playTick } from '../services/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSwitchingPage?: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  isSwitchingPage = false,
}) => {
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
          key="studio-contact-wrapper"
          className="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto"
        >
          {/* 1. SLIDE: Glides across and fully covers the entire screen first (solid, sharp slit) */}
          <motion.div
            key="slide-contact"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{
              opacity: 0,
              transition: { duration: 0.1 },
            }}
            transition={{
              duration: 1.15,
              ease: [0.14, 1, 0.22, 1],
            }}
            style={{ willChange: 'transform' }}
            className={`fixed inset-0 ${isOpen ? 'z-[10007]' : 'z-[10000]'} bg-[#FF9B00] pointer-events-none`}
          />

          {/* 2. CONTACT SCREEN: Arrives right behind yellow slide with silky smooth deceleration */}
          <motion.div
            id="studio-contact-modal"
            key="contact-content-slide"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={
              isSwitchingPage
                ? { opacity: 0, transition: { delay: 0.55, duration: 0.1 } }
                : { x: '100%', transition: { duration: 0.45, ease: [0.14, 1, 0.22, 1] } }
            }
            transition={{
              duration: 1.05,
              delay: 0.45,
              ease: [0.12, 1, 0.2, 1],
            }}
            style={{ willChange: 'transform' }}
            className={`fixed inset-0 ${isOpen ? 'z-[10008]' : 'z-[10005]'} pointer-events-auto flex flex-col justify-between bg-[#0e0e0e] px-6 sm:px-12 pt-24 sm:pt-28 pb-12 overflow-y-auto select-none`}
            onClick={onClose}
          >
          {/* 1. Top Bar: [close] button aligned to right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-end text-xs sm:text-sm font-medium tracking-tight shrink-0 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-contact-btn"
              onClick={() => {
                playTick();
                onClose();
              }}
              className="font-mono text-xs uppercase text-[#cbc7c2]/70 hover:text-[#fcf8ef] transition-colors cursor-pointer"
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
              className="text-[11px] font-mono text-[#FF9B00] uppercase tracking-widest mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9B00] inline-block" />
              <span>CONTACT & COMMISSION</span>
            </motion.p>

            {/* 3. Main Headline: Appears third (at 0.65s) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-8"
            >
              Let’s discuss stories, motion, and visual directions<span className="text-[#FF9B00]">.</span>
            </motion.h1>

            {/* 4. Contact Info Columns: Appears fourth (at 0.9s) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
            >
              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="text-[#FF9B00] font-semibold">/</span>
                  GENERAL INQUIRIES
                </p>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  onClick={() => playTick()}
                  className="text-base sm:text-lg text-[#fcf8ef] hover:text-[#FF9B00] transition-colors font-mono tracking-tight block break-all sm:break-normal"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="text-[#FF9B00] font-semibold">/</span>
                  DIRECT CONTACT
                </p>
                <a
                  href={`tel:${(STUDIO_INFO.phone || '+91 93706 02824').replace(/\s+/g, '')}`}
                  onClick={() => playTick()}
                  className="text-base sm:text-lg text-[#fcf8ef] hover:text-[#FF9B00] transition-colors font-mono tracking-tight block"
                >
                  {STUDIO_INFO.phone || '+91 93706 02824'}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="text-[#FF9B00] font-semibold">/</span>
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
              className="pt-8 border-t border-neutral-800/60 relative"
            >
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#FF9B00]" />
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-1.5">
                <span className="text-[#FF9B00] font-semibold">/</span>
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
                        className="text-xs font-mono text-[#cbc7c2]/60 hover:text-[#FF9B00] transition-colors"
                      >
                        {member.email}
                      </a>
                      {member.phone && (
                        <>
                          <span className="text-neutral-700 hidden sm:inline">&bull;</span>
                          <a
                            href={`tel:${member.phone.replace(/\s+/g, '')}`}
                            onClick={() => playTick()}
                            className="text-xs font-mono text-[#cbc7c2]/60 hover:text-[#FF9B00] transition-colors"
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
            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500 border-t border-neutral-900/60 pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span>© 2016–2026 ODD MANGO &bull; PRODUCTION STUDIO</span>
            <span className="text-[#cbc7c2] uppercase">
              PUNE, MAHARASHTRA
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="mailto:oddmangomedia@gmail.com"
                className="text-[#cbc7c2] hover:text-[#FF9B00] transition-colors uppercase"
              >
                ODDMANGOMEDIA@GMAIL.COM
              </a>
              <span className="text-neutral-700">&bull;</span>
              <a
                href="tel:+919370602824"
                className="text-[#fcf8ef] font-semibold text-xs sm:text-[13px] tracking-wide hover:text-[#FF9B00] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="text-[#FF9B00] font-bold">TEL:</span>
                <span>+91 93706 02824</span>
              </a>
            </div>
          </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
