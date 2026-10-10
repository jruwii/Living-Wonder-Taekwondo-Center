import { Sparkles, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface FooterProps {
  onOpenTrialModal: () => void;
}

// Both link columns point at sections on this same page
const PROGRAM_LINKS = [
  'Little Tigers (Ages 4–6)',
  'Kids Taekwondo (Ages 7–12)',
  'Teens & Adults (13+)',
  'Competition Sparring Team',
  'Family Classes',
];

const QUICK_LINKS = [
  { label: "Founder's Letter", href: '#about' },
  { label: 'Instructor Profiles', href: '#instructors' },
  { label: 'Class Timetable', href: '#schedule' },
  { label: 'Our 6 Core Tenets', href: '#values' },
  { label: 'Notices & Events', href: '#notices' },
  { label: 'Photo Gallery', href: '#gallery' },
];

/** Page footer. It keeps white text in both themes, just on a slightly different black. */
export const Footer: React.FC<FooterProps> = ({ onOpenTrialModal }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t text-white border-zinc-800 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-zinc-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand blurb, double width on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl p-1.5 shadow-md flex items-center justify-center bg-white text-black border border-zinc-700">
                <Logo className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-wider text-white uppercase">
                  Living Wonder
                </span>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase -mt-0.5">
                  Taekwondo Center
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              “Learning is a living wonder!” Rooted in Angeles City, Pampanga, we empower students of all ages with Kukkiwon-standard martial arts, confidence, and community belonging under Master Edmond Dagpin.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenTrialModal}
                className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a Free Trial Session</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Programs
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {PROGRAM_LINKS.map((label) => (
                <li key={label}>
                  <a href="#programs" className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Angeles City Dojang
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>MacArthur Hwy, Angeles City, 2009 Pampanga</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:+639175558963" className="hover:text-white transition-colors">
                  (0917) 555-8963
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:ruwiitkd@gmail.com" className="hover:text-white transition-colors">
                  ruwiitkd@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Living Wonder Taekwondo Center. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Affiliated with World Taekwondo (Kukkiwon) &amp; PTA</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer border border-zinc-800"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
