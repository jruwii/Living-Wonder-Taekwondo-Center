import { useCallback, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMaster } from './components/AboutMaster';
import { InstructorProfiles } from './components/InstructorProfiles';
import { Programs } from './components/Programs';
import { BeltProgression } from './components/BeltProgression';
import { Schedule } from './components/Schedule';
import { Values } from './components/Values';
import { NoticeBoard } from './components/NoticeBoard';
import { GalleryLightbox } from './components/GalleryLightbox';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';

/** Smoothly scrolls to a section, e.g. scrollToSection('programs') */
function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Holds the state that more than one section needs: whether the trial
 * booking modal is open, and which program the visitor clicked on.
 */
function MainApp() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [preferredProgram, setPreferredProgram] = useState('');

  /*
   * These are wrapped in useCallback because the modal passes its close
   * handler to a keyboard listener; a fresh function on every render would
   * mean detaching and reattaching that listener constantly.
   */

  /*
   * Opens the booking modal with the program field filled in.
   *
   * programName is deliberately required. It used to be optional, which meant
   * that wiring this straight to onClick quietly passed React's click event in
   * as the program name and blanked the page. Buttons that have no particular
   * program to offer call openEmptyTrialModal below instead.
   */
  const openTrialModal = useCallback((programName: string) => {
    setPreferredProgram(programName);
    setIsTrialModalOpen(true);
  }, []);

  const openEmptyTrialModal = useCallback(() => openTrialModal(''), [openTrialModal]);

  const closeTrialModal = useCallback(() => setIsTrialModalOpen(false), []);

  // Clicking a timetable slot jumps to the contact form instead of opening
  // the modal, because that form has the day and time dropdowns.
  const selectScheduleSlot = useCallback((slotInfo: string) => {
    setPreferredProgram(slotInfo);

    if (document.getElementById('contact')) {
      scrollToSection('contact');
    } else {
      setIsTrialModalOpen(true);
    }
  }, []);

  const goToPrograms = useCallback(() => scrollToSection('programs'), []);

  return (
    <div className="min-h-screen bg-[#f4f8fc] dark:bg-[#060c18] text-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navbar onOpenTrialModal={openEmptyTrialModal} />

      <main className="flex-1">
        <Hero onOpenTrialModal={openEmptyTrialModal} onExplorePrograms={goToPrograms} />
        <AboutMaster />
        <InstructorProfiles onBookWithInstructor={openTrialModal} />
        <Programs onSelectProgram={openTrialModal} />
        <BeltProgression />
        <Schedule onSelectSlotForTrial={selectScheduleSlot} />
        <Values />
        <NoticeBoard />
        <GalleryLightbox />
        <Testimonials />
        <FAQSection />
        <ContactAndLocation initialProgramInterest={preferredProgram} />
      </main>

      <Footer onOpenTrialModal={openEmptyTrialModal} />

      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={closeTrialModal}
        preferredProgram={preferredProgram}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
