import { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenTrialModal: () => void;
}

// Section links shown in the navbar. Each href matches a section id on the page.
const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Instructors', href: '#instructors' },
  { name: 'Programs', href: '#programs' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Values', href: '#values' },
  { name: 'Notices', href: '#notices' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const PHONE_NUMBER = '(0917) 555-8963';

/** Sticky header: announcement bar, logo, section links, theme toggle and the trial button. */
export const Navbar: React.FC<NavbarProps> = ({ onOpenTrialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  /*
   * Layering note: this bar sits at z-40 so it stays above the page sections
   * but below the popups at z-50. They used to share z-50, and because the bar
   * is fixed across the top it covered the close button of the centred modals.
   */

  // Shrink the navbar and give it a solid background once the page scrolls
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    // passive tells the browser we will not block the scroll, which keeps it smooth
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Announcement strip above the navbar */}
      <div className={`text-xs py-1.5 px-4 border-b transition-colors ${
        isDark
          ? 'bg-[#040812] text-slate-300 border-blue-950/60'
          : 'bg-[#0b1b36] text-white border-blue-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-600 text-white tracking-wider uppercase shadow-xs">
              Angeles City
            </span>
            <span className="hidden sm:inline font-medium text-slate-300">
              Under Master Edmond Dagpin (6th Dan Kukkiwon)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:+639175558963"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <span className="hidden md:inline-block text-blue-400/40">•</span>
            <span className="hidden md:inline-block text-slate-300">
              Kukkiwon &amp; PTA Certified
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#060c18]/95 backdrop-blur-md shadow-lg border-b border-blue-950/80 py-3'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 py-3'
          : isDark
            ? 'bg-gradient-to-b from-[#060c18]/95 via-[#060c18]/80 to-transparent py-4'
            : 'bg-gradient-to-b from-[#f0f6fc]/95 via-[#f0f6fc]/80 to-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand: logo mark plus the two-line wordmark */}
            <a href="#" className="flex items-center gap-3 group">
              <div className={`w-11 h-11 rounded-xl p-1.5 shadow-sm flex items-center justify-center transition-all duration-200 group-hover:scale-105 border ${
                isDark ? 'bg-[#0b162c] border-blue-900/60 text-white' : 'bg-white border-blue-200 text-slate-950'
              }`}>
                <Logo className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className={`font-heading text-lg sm:text-xl font-extrabold tracking-wider uppercase transition-colors ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  Living Wonder
                </span>
                <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase -mt-0.5 ${
                  isDark ? 'text-blue-300/80' : 'text-blue-600'
                }`}>
                  Taekwondo Center
                </span>
              </div>
            </a>

            {/* Section links (desktop only) */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isDark
                      ? 'text-slate-300 hover:text-white hover:bg-[#0b162c]'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-blue-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme toggle and trial button (tablet and up) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                type="button"
                className={`p-2 rounded-lg border font-bold text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#0b162c] hover:bg-[#11203e] text-slate-200 border-blue-900/50 shadow-xs'
                    : 'bg-white hover:bg-blue-50 text-slate-800 border-blue-200 shadow-xs'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle dark and light mode"
              >
                {isDark ? <Sun className="w-4 h-4 text-blue-300" /> : <Moon className="w-4 h-4 text-blue-700" />}
                <span className="text-xs font-bold pr-1">
                  {isDark ? 'Light Mode' : 'Navy Mode'}
                </span>
              </button>

              <button
                onClick={onOpenTrialModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-extrabold rounded-lg shadow-md shadow-blue-600/25 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer ring-1 ring-blue-400/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Free Trial</span>
              </button>
            </div>

            {/* Theme toggle and hamburger (mobile only) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                type="button"
                className={`p-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0b162c] text-white border-blue-900/50'
                    : 'bg-white text-slate-800 border-blue-200'
                }`}
                aria-label="Toggle dark and light mode"
              >
                {isDark ? <Sun className="w-4 h-4 text-blue-300" /> : <Moon className="w-4 h-4 text-blue-700" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className={`p-2 rounded-lg focus:outline-none ${
                  isDark
                    ? 'text-slate-200 hover:text-white hover:bg-[#0b162c]'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-blue-50'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown menu for small screens */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-2 animate-fadeIn ${
            isDark ? 'bg-[#070e1b] border-blue-950/80' : 'bg-white border-blue-100 shadow-xl'
          }`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-semibold rounded-lg ${
                  isDark
                    ? 'text-slate-200 hover:text-white hover:bg-[#0b162c]'
                    : 'text-slate-800 hover:text-slate-950 hover:bg-blue-50'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className={`pt-3 border-t flex flex-col gap-2 ${
              isDark ? 'border-blue-950/60' : 'border-blue-100'
            }`}>
              <div className="flex items-center justify-between px-2 py-1 text-xs">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Display Mode:
                </span>
                <button
                  onClick={toggleTheme}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-[#0b162c] text-white border border-blue-900/50'
                      : 'bg-white text-slate-800 border border-blue-200'
                  }`}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-blue-300" /> : <Moon className="w-3.5 h-3.5 text-blue-700" />}
                  <span>Switch to {isDark ? 'Light' : 'Navy'} Mode</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full py-3 px-4 text-center font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a Free Trial Class</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
