import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/projects';
import { playTick } from '../services/audio';
import logoWhite from '../assets/Logo/logo-white.png';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

interface ServiceItem {
  number: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  equipment: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Commercial & Brand Films',
    tag: 'DIRECTION & PRODUCTION',
    description:
      'High-impact narrative brand anthems, lifestyle campaigns, and cultural commercial spots designed for global broadcast and digital presence.',
    deliverables: ['Broadcast Master (8K/4K)', 'Digital Social Suites (9:16, 4:5, 1:1)', 'Extended Director’s Cut'],
    equipment: 'ARRI Alexa Mini LF / RED V-Raptor / Cooke Anamorphic',
  },
  {
    number: '02',
    title: 'Fashion & Editorial Movement',
    tag: 'CAMPAIGN & RUNWAY',
    description:
      'Avant-garde silhouette studies, kinetic garment motion, and evocative lighting treatments crafted for luxury fashion houses and streetwear pioneers.',
    deliverables: ['Campaign Hero Films', 'Editorial Stills Archive', 'BTS Cinematic Vignettes'],
    equipment: 'Leica SL2-S / Leitz Hugo Primes / High-Speed Phantom',
  },
  {
    number: '03',
    title: 'Architectural & Spatial Cinema',
    tag: 'SPATIAL & HOSPITALITY',
    description:
      'Immersive captures of luxury estates, flagship architecture, and culinary experiences balancing daylight geometry and sensory atmosphere.',
    deliverables: ['Atmospheric Tour Films', 'Architectural Photo Folio', 'Looping Exhibition Displays'],
    equipment: 'Laowa 24mm PeriProbe / Sony FX6 / Stabilized Cinema Gimbals',
  },
  {
    number: '04',
    title: 'Art Direction & Color Science',
    tag: 'POST-PRODUCTION & FINISHING',
    description:
      'Full-spectrum creative oversight from moodboarding to final mastering. Tailored analog film-emulation color palettes and bespoke sound design.',
    deliverables: ['ACES Custom LUTs', 'Dolby Vision Mastering', 'Spatial 5.1 Sound Mix'],
    equipment: 'DaVinci Resolve Studio / Film-Stock Emulations / 10-Bit HDR',
  },
];

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
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

  const handleInquire = () => {
    playTick();
    onClose();
    if (onOpenContact) {
      setTimeout(() => {
        onOpenContact();
      }, 180);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="studio-services-modal"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            scale: 1.25,
            filter: 'blur(16px)',
            transition: { duration: 1.1, ease: [0.72, 0, 0.22, 1] },
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] pointer-events-auto flex flex-col justify-between bg-[#0e0e0e]/98 backdrop-blur-md p-6 sm:p-12 overflow-y-auto select-none will-change-transform text-[#fcf8ef]"
          onClick={onClose}
        >
          {/* 1. Top Bar: Appears first (at 0.2s) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-between text-xs sm:text-sm font-medium tracking-tight shrink-0 mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#fcf8ef]">ODD MANGO</span>
              <sup className="text-xs font-bold">®</sup>
            </div>

            <button
              id="close-services-btn"
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
            className="max-w-5xl w-full mx-auto my-auto py-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-8 border-b border-neutral-800/60">
              <div>
                {/* 2. Category Label: Appears second (at 0.38s) */}
                <motion.p
                  initial={{ opacity: 0, y: 10, letterSpacing: '0.12em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
                  transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-3"
                >
                  PRACTICE & DISCIPLINES
                </motion.p>

                {/* 3. Main Headline: Appears third (at 0.6s) */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight max-w-2xl"
                >
                  Tailored motion, brand films, and visual storytelling for culture and luxury.
                </motion.h1>
              </div>

              {/* Inquire CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleInquire}
                className="px-5 py-2.5 border border-[#fcf8ef] text-[#fcf8ef] hover:bg-[#fcf8ef] hover:text-[#111111] transition-all cursor-pointer font-mono text-xs uppercase tracking-wider flex items-center gap-2 group shrink-0"
              >
                <span>Commission Studio</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Services Grid (2x2 Pillar Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-14">
              {SERVICES_DATA.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.75 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col justify-between p-6 sm:p-8 bg-neutral-900/40 border border-white/8 hover:border-white/20 transition-all rounded-sm group backdrop-blur-sm"
                >
                  <div>
                    {/* Top Row: Number & Tag */}
                    <div className="flex items-center justify-between font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">
                      <span className="text-[#2554f2] font-bold">{service.number}</span>
                      <span>{service.tag}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#fcf8ef] group-hover:text-white transition-colors mb-3">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#cbc7c2] leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables & Technical Specs */}
                  <div className="pt-4 border-t border-white/6 flex flex-col gap-2.5 text-[11px] font-mono">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#fcf8ef]/90">
                      {service.deliverables.map((del) => (
                        <span key={del} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#2554f2]" />
                          {del}
                        </span>
                      ))}
                    </div>
                    <span className="text-neutral-500 uppercase tracking-tight">
                      Capture: {service.equipment}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Studio Standards Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 border border-neutral-800/80 bg-black/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={logoWhite}
                  alt="ODD MANGO"
                  className="w-10 h-10 object-contain opacity-80"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#fcf8ef] font-bold">
                    Cinema Production Pipeline
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Native RAW workflow &bull; ACES Color Management &bull; Certified Master Delivery
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono uppercase text-[#cbc7c2]">
                <span>Pune</span>
                <span className="text-neutral-600">&bull;</span>
                <span>Worldwide Deployment</span>
              </div>
            </motion.div>
          </div>

          {/* 7. Bottom Information: Appears last (at 1.5s) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-neutral-500 border-t border-neutral-900/60 pt-4 shrink-0 mt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <span>© 2016–2026 ODD MANGO &bull; PRODUCTION STUDIO</span>
            <span className="text-[#cbc7c2] uppercase">COMMERCIAL & CINEMA PRACTICE</span>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="text-[#cbc7c2] hover:text-[#fcf8ef] transition-colors uppercase"
              >
                {STUDIO_INFO.email}
              </a>
              <span className="text-neutral-700 hidden sm:inline">&bull;</span>
              <a
                href={`tel:${(STUDIO_INFO.phone || '+91 93706 02824').replace(/\s+/g, '')}`}
                className="text-[#cbc7c2] hover:text-[#fcf8ef] transition-colors uppercase hidden sm:inline"
              >
                {STUDIO_INFO.phone || '+91 93706 02824'}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
