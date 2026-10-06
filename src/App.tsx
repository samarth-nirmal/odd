import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ViewMode, Project } from './types';
import { PROJECTS } from './data/projects';
import { Header } from './components/Header';
import { SliderView } from './components/SliderView';
import { ListView } from './components/ListView';
import { SoundIntro } from './components/SoundIntro';
import { Footer } from './components/Footer';
import { loadSoundAssets, setSoundEnabled } from './services/audio';
import { getImageRGB } from './services/colorExtractor';
import { AmbientBackdrop } from './components/AmbientBackdrop';

// Lazy-load modal overlays for fast initial bundle execution
const StillGalleryModal = lazy(() => import('./components/StillGalleryModal').then((m) => ({ default: m.StillGalleryModal })));
const FullscreenVideoModal = lazy(() => import('./components/FullscreenVideoModal').then((m) => ({ default: m.FullscreenVideoModal })));
const StudioModal = lazy(() => import('./components/StudioModal').then((m) => ({ default: m.StudioModal })));
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));
const ServicesModal = lazy(() => import('./components/ServicesModal').then((m) => ({ default: m.ServicesModal })));

export default function App() {
  const [showSoundIntro, setShowSoundIntro] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [gesturesOn, setGesturesOn] = useState(true);
  const [fisheyeOn, setFisheyeOn] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Preload sound on startup and schedule idle prefetch of secondary modal chunks
  useEffect(() => {
    loadSoundAssets().catch(() => {});

    const prefetchModals = () => {
      import('./components/StillGalleryModal');
      import('./components/FullscreenVideoModal');
      import('./components/StudioModal');
      import('./components/ContactModal');
      import('./components/ServicesModal');
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(prefetchModals);
      } else {
        setTimeout(prefetchModals, 2500);
      }
    }
  }, []);

  const filteredProjects = PROJECTS;

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0] || null;

  // Extract dim color for the project currently at the center
  const centerRGB = useMemo(() => {
    return getImageRGB(currentProject?.image, currentProject?.slug);
  }, [currentProject]);

  // Next & previous project navigation inside lightbox
  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex((p) => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  const handleNextProject = () => {
    if (currentProjectIndex === -1) return;
    const nextIdx = (currentProjectIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    if (currentProjectIndex === -1) return;
    const prevIdx = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIdx]);
  };

  const handleSoundIntroDismiss = (withSound: boolean) => {
    setSoundOn(withSound);
    setSoundEnabled(withSound);
    setShowSoundIntro(false);
  };

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden text-[#f6f4ee] select-none flex flex-col justify-between selection:bg-[#2554f2] selection:text-white">
      {/* Silky-smooth Dual-Layer Ambient Backdrop */}
      <AmbientBackdrop rgb={centerRGB} mode="dark" duration={900} />

      {/* Start Screen Gatekeeper with Exit Animation */}
      <AnimatePresence>
        {showSoundIntro && <SoundIntro key="sound-intro" onEnter={handleSoundIntroDismiss} />}
      </AnimatePresence>

      {/* Main Screen Content with Staggered Object-by-Object Reveal */}
      <div
        className="w-full h-full flex flex-col justify-between transition-all duration-700 ease-out"
        style={{
          transform: (isAboutOpen || isContactOpen || isServicesOpen) ? 'scale(0.96)' : 'scale(1)',
          filter: (isAboutOpen || isContactOpen || isServicesOpen) ? 'blur(4px)' : 'blur(0px)',
          opacity: (isAboutOpen || isContactOpen || isServicesOpen) ? 0.35 : 1,
        }}
      >
        {/* 2. Top Minimal Chrome Navigation: Appears second (at 1.2s) */}
        <motion.div
          animate={{
            opacity: showSoundIntro ? 0 : 1,
            y: showSoundIntro ? -24 : 0,
          }}
          transition={{
            duration: 1.6,
            delay: showSoundIntro ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed top-0 inset-x-0 z-40 pointer-events-none"
        >
          <Header
            viewMode={viewMode}
            setViewMode={setViewMode}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenServices={() => setIsServicesOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            soundOn={soundOn}
            setSoundOn={setSoundOn}
          />
        </motion.div>

        {/* 1. Main Stage (Gallery / Slider): Appears first (at 0.5s) */}
        <motion.main
          animate={{
            opacity: showSoundIntro ? 0 : 1,
            scale: showSoundIntro ? 0.92 : 1,
            y: showSoundIntro ? 24 : 0,
          }}
          transition={{
            duration: 2.2,
            delay: showSoundIntro ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
        >
          {viewMode === 'slider' && (
            <SliderView
              projects={filteredProjects}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              onSelectProject={(proj) => setSelectedProject(proj)}
              fisheyeOn={fisheyeOn}
              curveMode="arch"
              paused={showSoundIntro || Boolean(selectedProject) || isAboutOpen || isContactOpen || isServicesOpen}
            />
          )}

          {viewMode === 'list' && (
            <ListView
              projects={filteredProjects}
              onSelectProject={(proj) => setSelectedProject(proj)}
              currentIndex={currentIndex}
              onHoverIndex={setCurrentIndex}
            />
          )}
        </motion.main>

        {/* 3. Bottom Minimal Chrome: Appears third (at 1.7s) */}
        <motion.div
          animate={{
            opacity: showSoundIntro ? 0 : 1,
            y: showSoundIntro ? 24 : 0,
          }}
          transition={{
            duration: 1.6,
            delay: showSoundIntro ? 0 : 1.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
        >
          <Footer
            currentProject={currentProject}
            projects={filteredProjects}
            currentIndex={currentIndex}
            onSelectIndex={setCurrentIndex}
            fisheyeOn={fisheyeOn}
            setFisheyeOn={setFisheyeOn}
            soundOn={soundOn}
            setSoundOn={setSoundOn}
          />
        </motion.div>
      </div>

      {/* Image Detailed Slide Screen (for stills) / Smooth Fullscreen Video Modal (for videos) */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {selectedProject && (selectedProject.type === 'motion' || Boolean(selectedProject.video)) && (
            <FullscreenVideoModal
              key={`video-${selectedProject.id}`}
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              soundOn={soundOn}
              setSoundOn={setSoundOn}
              totalProjectsCount={PROJECTS.length}
            />
          )}

          {selectedProject && selectedProject.type !== 'motion' && !selectedProject.video && (
            <StillGalleryModal
              key={`stills-${selectedProject.id}`}
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              soundOn={soundOn}
              setSoundOn={setSoundOn}
              gesturesOn={gesturesOn}
              setGesturesOn={setGesturesOn}
              totalProjectsCount={PROJECTS.length}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Studio / About Modal */}
      <Suspense fallback={null}>
        <StudioModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </Suspense>

      {/* Services Modal */}
      <Suspense fallback={null}>
        <ServicesModal
          isOpen={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
          onOpenContact={() => {
            setIsServicesOpen(false);
            setIsContactOpen(true);
          }}
        />
      </Suspense>

      {/* Contact Page Modal */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </Suspense>
    </div>
  );
}
