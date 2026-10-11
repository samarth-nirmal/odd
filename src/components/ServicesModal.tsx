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
  isSwitchingPage?: boolean;
}

interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Brand Films',
    tagline: 'Give your brand a story people can feel.',
    description: 'Cinematic films that capture who you are and why people should care.',
  },
  {
    number: '02',
    title: 'Social Media Content',
    tagline: 'Keep your brand moving.',
    description: 'Reels and short-form content built to hold attention and stay unmistakably yours.',
  },
  {
    number: '03',
    title: 'Commercials & Campaigns',
    tagline: 'Turn ideas into something people remember.',
    description: 'Concept-led films and campaigns built to make an impact.',
  },
  {
    number: '04',
    title: 'Product & Lifestyle Films',
    tagline: 'Make what you sell look irresistible.',
    description: 'Cinematic visuals that bring products, spaces, and experiences to life.',
  },
  {
    number: '05',
    title: 'Corporate & Institutional Films',
    tagline: 'Say what you do differently.',
    description: 'Clear, human films that make businesses and ideas easier to understand.',
  },
  {
    number: '06',
    title: 'Photography & Creative Design',
    tagline: 'Make every touchpoint feel like your brand.',
    description: 'Photography and design that extend your visual identity beyond video.',
  },
];

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
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

  const handleInquire = () => {
    playTick();
    if (onOpenContact) {
      onOpenContact();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="studio-services-wrapper"
          className="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto"
        >
          {/* 1. SLIDE: Glides across and fully covers the entire screen first (solid, sharp slit) */}
          <motion.div
            key="slide-services"
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

          {/* 2. SERVICES SCREEN: Arrives right behind yellow slide with silky smooth deceleration */}
          <motion.div
            id="studio-services-modal"
            key="services-content-slide"
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
            className={`fixed inset-0 ${isOpen ? 'z-[10008]' : 'z-[10005]'} pointer-events-auto flex flex-col justify-between bg-[#0e0e0e] px-6 sm:px-12 pt-24 sm:pt-28 pb-12 overflow-y-auto select-none text-[#fcf8ef]`}
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
              id="close-services-btn"
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
            className="max-w-6xl w-full mx-auto py-4 sm:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-8 border-b border-neutral-800/80">
              <div className="max-w-2xl">
                {/* 2. Category Label */}
                <motion.p
                  initial={{ opacity: 0, y: 10, letterSpacing: '0.12em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
                  transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs font-mono text-[#FF9B00] uppercase tracking-widest font-semibold mb-3 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9B00] inline-block" />
                  <span>SERVICES</span>
                </motion.p>

                {/* 3. Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-[1.08] text-[#fcf8ef] mb-5"
                >
                  We make brands worth watching<span className="text-[#FF9B00]">.</span>
                </motion.h1>

                {/* Intro Paragraphs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2.5 text-sm sm:text-base text-[#cbc7c2] leading-relaxed font-normal"
                >
                  <p>
                    From idea to final frame, we create video-led work that gives brands a stronger voice, sharper identity, and something worth remembering.
                  </p>
                  <p className="text-[#fcf8ef] font-medium">
                    We figure out how it should look, sound, and feel.
                  </p>
                </motion.div>
              </div>

              {/* Inquire CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleInquire}
                className="px-5 py-2.5 border border-white/20 hover:border-[#FF9B00] text-[#fcf8ef] hover:text-[#FF9B00] transition-all cursor-pointer font-mono text-xs uppercase tracking-wider flex items-center gap-2 group shrink-0"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF9B00] transition-transform" />
              </motion.button>
            </div>

            {/* Services Grid (6 Pillar Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14">
              {SERVICES_DATA.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.75 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col justify-between p-6 sm:p-7 bg-neutral-900/40 border border-white/8 hover:border-[#FF9B00]/40 transition-all rounded-sm group backdrop-blur-sm relative"
                >
                  <div>
                    {/* Top Row: Number & Title */}
                    <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider mb-4 pb-3 border-b border-white/6">
                      <span className="text-[#FF9B00] font-bold">{service.number}</span>
                      <span className="text-neutral-600">—</span>
                      <h2 className="text-sm sm:text-base font-bold text-[#fcf8ef] group-hover:text-white transition-colors tracking-tight">
                        {service.title}
                      </h2>
                    </div>

                    {/* Tagline */}
                    <p className="text-base sm:text-[17px] font-semibold text-[#fcf8ef] leading-snug mb-3">
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#cbc7c2] leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Statement / Brand Manifesto */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-9 border border-neutral-800/80 bg-neutral-950/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-sm relative overflow-hidden mb-4"
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                <img
                  src={logoWhite}
                  alt="ODD MANGO"
                  className="w-11 h-11 object-contain opacity-80 shrink-0 hidden sm:block"
                />
                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-tight text-[#fcf8ef] leading-snug">
                    One idea. Multiple formats. One unmistakable identity<span className="text-[#FF9B00]">.</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbc7c2] font-normal leading-relaxed">
                    Everything we create should feel like it came from the same brand.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-1 text-[11px] font-mono text-neutral-400 shrink-0 uppercase tracking-wider">
                <span className="text-[#fcf8ef] font-bold">ODD MANGO <span className="text-[#FF9B00]">&bull;</span> STUDIO</span>
                <span>Pune <span className="text-[#FF9B00]">&bull;</span> Worldwide Deployment</span>
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
            <span>© 2016–2026 ODD MANGO <span className="text-[#FF9B00]">&bull;</span> PRODUCTION STUDIO</span>
            <span className="text-[#cbc7c2] uppercase">COMMERCIAL <span className="text-[#FF9B00]">&bull;</span> CINEMA PRACTICE</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="text-[#cbc7c2] hover:text-[#FF9B00] transition-colors uppercase"
              >
                {STUDIO_INFO.email}
              </a>
              <span className="text-neutral-700">&bull;</span>
              <a
                href={`tel:${(STUDIO_INFO.phone || '+91 93706 02824').replace(/\s+/g, '')}`}
                className="text-[#fcf8ef] font-semibold text-xs sm:text-[13px] tracking-wide hover:text-[#FF9B00] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="text-[#FF9B00] font-bold">TEL:</span>
                <span>{STUDIO_INFO.phone || '+91 93706 02824'}</span>
              </a>
            </div>
          </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
