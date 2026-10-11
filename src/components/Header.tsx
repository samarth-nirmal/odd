import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { ViewMode } from '../types';
import { playTick, setSoundEnabled } from '../services/audio';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenAbout: () => void;
  onOpenServices?: () => void;
  onOpenContact?: () => void;
  onCloseModals?: () => void;
  isAboutOpen?: boolean;
  isServicesOpen?: boolean;
  isContactOpen?: boolean;
  soundOn?: boolean;
  setSoundOn?: (on: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenAbout,
  onOpenServices,
  onOpenContact,
  onCloseModals,
  isAboutOpen = false,
  isServicesOpen = false,
  isContactOpen = false,
  soundOn = true,
  setSoundOn,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasActiveModal = isAboutOpen || isServicesOpen || isContactOpen;

  const handleModeChange = (mode: ViewMode) => {
    playTick();
    if (hasActiveModal && onCloseModals) {
      onCloseModals();
    }
    setViewMode(mode);
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    playTick();
    if (setSoundOn) {
      setSoundOn(next);
    }
    setSoundEnabled(next);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[10020] px-6 sm:px-10 pt-[max(1.5rem,calc(env(safe-area-inset-top)+0.5rem))] pb-2 pointer-events-none flex items-start justify-between text-sm sm:text-base font-medium tracking-tight">
        {/* Left: Brand Logo */}
        <div className="flex items-start pointer-events-auto">
          <button
            onClick={() => {
              playTick();
              if (hasActiveModal && onCloseModals) {
                onCloseModals();
              }
              setIsMobileMenuOpen(false);
              setViewMode('slider');
            }}
            className="text-3xl sm:text-4xl font-extrabold text-[#fcf8ef] tracking-tighter leading-none hover:opacity-75 transition-opacity cursor-pointer flex items-baseline"
          >
            <span>ODD MANGO</span>
            <sup className="text-sm font-bold ml-0.5">®</sup>
          </button>
        </div>

        {/* Center: View Toggles (SLIDER | LIST) - Untouched on md: and above, hidden on mobile */}
        <div className="pointer-events-auto hidden md:flex items-start absolute left-1/2 -translate-x-1/2 top-6">
          <div className="flex items-start gap-5 sm:gap-7">
            {(['slider', 'list'] as const).map((mode) => {
              const isActive = !hasActiveModal && viewMode === mode;
              return (
                <div key={mode} className="flex flex-col items-center">
                  <button
                    id={`view-toggle-${mode}`}
                    onClick={() => handleModeChange(mode)}
                    className={`uppercase font-bold tracking-tight text-sm sm:text-base transition-colors cursor-pointer ${
                      isActive ? 'text-[#f6f4ee]' : 'text-[#c7c4bd]/70 hover:text-[#f6f4ee]'
                    }`}
                  >
                    <span className="roll">
                      <span className="roll-inner">
                        <span className="roll-face">{mode}</span>
                        <span className="roll-face text-white">{mode}</span>
                      </span>
                    </span>
                  </button>

                  {/* Active underline indicator */}
                  <div className="h-[2px] flex items-center justify-center mt-[2px] w-full relative">
                    {isActive && (
                      <motion.div
                        layoutId="active-view-indicator-underline"
                        className="w-1/2 max-w-[20px] h-[2px] bg-[#FF9B00]"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Desktop Navigation (Services + About + Contact) */}
        <div className="pointer-events-auto hidden md:flex items-start gap-6 sm:gap-8">
          {/* SERVICES */}
          <div className="flex flex-col items-center">
            <button
              id="nav-services-btn"
              onClick={() => {
                playTick();
                if (isServicesOpen && onCloseModals) {
                  onCloseModals();
                } else {
                  onOpenServices?.();
                }
              }}
              className={`text-xs sm:text-sm uppercase transition-colors cursor-pointer font-medium ${
                isServicesOpen ? 'text-[#fcf8ef]' : 'text-[#cbc7c2]/80 hover:text-[#fcf8ef]'
              }`}
            >
              <span className="roll">
                <span className="roll-inner">
                  <span className="roll-face">services</span>
                  <span className="roll-face text-white">services</span>
                </span>
              </span>
            </button>
            <div className="h-[2px] flex items-center justify-center mt-[2px] w-full relative">
              {isServicesOpen && (
                <motion.div
                  layoutId="active-view-indicator-underline"
                  className="w-1/2 max-w-[20px] h-[2px] bg-[#FF9B00]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
            </div>
          </div>

          {/* ABOUT */}
          <div className="flex flex-col items-center">
            <button
              id="nav-about-btn"
              onClick={() => {
                playTick();
                if (isAboutOpen && onCloseModals) {
                  onCloseModals();
                } else {
                  onOpenAbout();
                }
              }}
              className={`text-xs sm:text-sm uppercase transition-colors cursor-pointer font-medium ${
                isAboutOpen ? 'text-[#fcf8ef]' : 'text-[#cbc7c2]/80 hover:text-[#fcf8ef]'
              }`}
            >
              <span className="roll">
                <span className="roll-inner">
                  <span className="roll-face">about</span>
                  <span className="roll-face text-white">about</span>
                </span>
              </span>
            </button>
            <div className="h-[2px] flex items-center justify-center mt-[2px] w-full relative">
              {isAboutOpen && (
                <motion.div
                  layoutId="active-view-indicator-underline"
                  className="w-1/2 max-w-[20px] h-[2px] bg-[#FF9B00]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-center">
            <button
              id="nav-contact-btn"
              onClick={() => {
                playTick();
                if (isContactOpen && onCloseModals) {
                  onCloseModals();
                } else {
                  onOpenContact?.();
                }
              }}
              className={`text-xs sm:text-sm uppercase transition-colors cursor-pointer font-medium ${
                isContactOpen ? 'text-[#fcf8ef]' : 'text-[#cbc7c2]/80 hover:text-[#fcf8ef]'
              }`}
            >
              <span className="roll">
                <span className="roll-inner">
                  <span className="roll-face">contact</span>
                  <span className="roll-face text-white">contact</span>
                </span>
              </span>
            </button>
            <div className="h-[2px] flex items-center justify-center mt-[2px] w-full relative">
              {isContactOpen && (
                <motion.div
                  layoutId="active-view-indicator-underline"
                  className="w-1/2 max-w-[20px] h-[2px] bg-[#FF9B00]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right: Mobile Hamburger Button (Visible only on mobile screen) */}
        <div className="pointer-events-auto md:hidden">
          <button
            id="mobile-hamburger-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => {
              playTick();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            className="p-2 -mr-2 flex items-center justify-center text-[#fcf8ef] hover:opacity-75 active:scale-90 transition-all cursor-pointer drop-shadow-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay - Portaled directly to body to guarantee pointer-events and top z-index */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-nav-drawer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[10015] bg-[#0c0d10]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.25rem))] pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.5rem))] select-none pointer-events-auto md:hidden"
              >
                {/* Drawer Center: Links & Controls */}
                <div className="flex flex-col gap-8 my-auto py-4">
                  {/* Primary Links */}
                  <div className="flex flex-col gap-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTick();
                        setIsMobileMenuOpen(false);
                        if (isServicesOpen && onCloseModals) {
                          onCloseModals();
                        } else {
                          onOpenServices?.();
                        }
                      }}
                      className={`flex items-center justify-between text-left text-3xl sm:text-4xl font-black uppercase tracking-tight transition-colors cursor-pointer group pointer-events-auto ${
                        isServicesOpen ? 'text-[#FF9B00]' : 'text-[#fcf8ef] hover:text-[#FF9B00] active:text-[#FF9B00]'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>Services</span>
                        {isServicesOpen && (
                          <div className="w-12 h-[2px] bg-[#FF9B00] mt-1" />
                        )}
                      </div>
                      <ArrowUpRight className={`transition-all ${isServicesOpen ? 'opacity-100 text-[#FF9B00]' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1'}`} size={28} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTick();
                        setIsMobileMenuOpen(false);
                        if (isAboutOpen && onCloseModals) {
                          onCloseModals();
                        } else {
                          onOpenAbout();
                        }
                      }}
                      className={`flex items-center justify-between text-left text-3xl sm:text-4xl font-black uppercase tracking-tight transition-colors cursor-pointer group pointer-events-auto ${
                        isAboutOpen ? 'text-[#FF9B00]' : 'text-[#fcf8ef] hover:text-[#FF9B00] active:text-[#FF9B00]'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>About Studio</span>
                        {isAboutOpen && (
                          <div className="w-12 h-[2px] bg-[#FF9B00] mt-1" />
                        )}
                      </div>
                      <ArrowUpRight className={`transition-all ${isAboutOpen ? 'opacity-100 text-[#FF9B00]' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1'}`} size={28} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTick();
                        setIsMobileMenuOpen(false);
                        if (isContactOpen && onCloseModals) {
                          onCloseModals();
                        } else {
                          onOpenContact?.();
                        }
                      }}
                      className={`flex items-center justify-between text-left text-3xl sm:text-4xl font-black uppercase tracking-tight transition-colors cursor-pointer group pointer-events-auto ${
                        isContactOpen ? 'text-[#FF9B00]' : 'text-[#fcf8ef] hover:text-[#FF9B00] active:text-[#FF9B00]'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>Contact</span>
                        {isContactOpen && (
                          <div className="w-12 h-[2px] bg-[#FF9B00] mt-1" />
                        )}
                      </div>
                      <ArrowUpRight className={`transition-all ${isContactOpen ? 'opacity-100 text-[#FF9B00]' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1'}`} size={28} />
                    </button>
                  </div>

                  {/* Status & Options Card */}
                  <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                    {/* View Mode Toggle for Mobile */}
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#c7c4bd]">
                      <span>View Mode</span>
                      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                        {(['slider', 'list'] as const).map((mode) => {
                          const isActive = !hasActiveModal && viewMode === mode;
                          return (
                            <button
                              key={mode}
                              onClick={() => {
                                playTick();
                                setIsMobileMenuOpen(false);
                                if (hasActiveModal && onCloseModals) {
                                  onCloseModals();
                                }
                                setViewMode(mode);
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all ${
                                isActive
                                  ? 'bg-[#FF9B00] text-black font-bold'
                                  : 'text-[#c7c4bd] hover:text-white'
                              }`}
                            >
                              {mode}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sound Toggle */}
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#c7c4bd]">
                      <span>Audio Feedback</span>
                      <button
                        onClick={handleToggleSound}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#fcf8ef] active:scale-95 transition-all cursor-pointer pointer-events-auto"
                      >
                        {soundOn ? <Volume2 size={14} className="text-[#FF9B00]" /> : <VolumeX size={14} />}
                        <span>{soundOn ? 'SOUND : ON' : 'SOUND : OFF'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Drawer Bottom: Studio Location & Year */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-1 text-xs font-mono text-[#c7c4bd]/70 uppercase">
                  <div className="flex justify-between">
                    <span>Pune, Maharashtra</span>
                    <span>© 2026</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
