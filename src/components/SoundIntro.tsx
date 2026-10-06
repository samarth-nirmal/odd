import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { loadSoundAssets, playShutter, setSoundEnabled } from '../services/audio';
import logoIntroDesktop from '../assets/Loading Video/Logo Intro desktop.mp4';
import logoIntroMobile from '../assets/Loading Video/Logo Intro mobile.mp4';

interface SoundIntroProps {
  onEnter: (sound: boolean) => void;
}

export const SoundIntro: React.FC<SoundIntroProps> = ({ onEnter }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const enteredRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerEnter = () => {
    if (enteredRef.current) return;
    enteredRef.current = true;

    if (videoRef.current) {
      videoRef.current.pause();
    }

    setSoundEnabled(true);
    loadSoundAssets().then(() => {
      playShutter();
    }).catch(() => {});

    onEnter(true);
  };

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile]);

  // The video duration is ~5.3s. Automatically transition when video finishes or 5.6s fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerEnter();
    }, 5600);

    return () => clearTimeout(timer);
  }, []);

  const videoSource = isMobile ? logoIntroMobile : logoIntroDesktop;

  return (
    <motion.div
      id="sound-intro-modal"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={triggerEnter}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#fcf8ef] select-none overflow-hidden cursor-pointer"
    >
      {/* Crisp Logo Intro Video — No blur filter */}
      <video
        key={videoSource}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerEnter}
        className="w-full h-full object-cover pointer-events-none"
        src={videoSource}
      />
    </motion.div>
  );
};

