import { ArrowRight, Sparkles, Heart, Award, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface HeroProps {
  onOpenTrialModal: () => void;
  onExplorePrograms: () => void;
}

// Short selling points listed under the headline
const SELLING_POINTS = [
  'Nurturing, family-friendly coaching',
  'Ages 4 to Adults (Beginner to Black Belt)',
  'Safe, positive & ego-free environment',
  'Kukkiwon-aligned belt progression',
];

// The three cards inside the "Why Families Choose Us" panel
const FAMILY_PILLARS = [
  {
    icon: Heart,
    title: 'Warm & Encouraging Tone',
    description: 'No harsh drills. We inspire through patience, kindness, and celebrating effort.',
  },
  {
    icon: Users,
    title: 'Home for Newcomers',
    description: 'Special care for children adjusting to new schools, languages, and cities.',
  },
  {
    icon: Award,
    title: 'Certified Black Belt Masters',
    description: 'Authentic Kukkiwon curriculum with structured character-building values.',
  },
];

/** Top-of-page banner: headline, selling points, the two main buttons and a feature panel. */
export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onExplorePrograms }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#060c18] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      {/* Faded training photo behind the text, dimmed by two gradients so the copy stays readable */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=70"
          alt=""
          aria-hidden="true"
          decoding="async"
          className={`w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out filter grayscale ${
            isDark ? 'opacity-15' : 'opacity-10'
          }`}
        />
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-t from-[#060c18] via-[#060c18]/85 to-[#060c18]/65'
            : 'bg-gradient-to-t from-[#f0f6fc] via-[#f0f6fc]/90 to-[#f0f6fc]/75'
        }`} />
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-r from-[#060c18] via-[#060c18]/90 to-transparent'
            : 'bg-gradient-to-r from-[#f0f6fc] via-[#f0f6fc]/95 to-transparent'
        }`} />
        <div className="absolute inset-0 bg-tatami-pattern opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left column: the main pitch */}
          <div className="lg:col-span-8 text-left space-y-6">
            {/* Motto and location pill */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm shadow-xs ${
              isDark
                ? 'bg-[#0b162c] border-blue-900/60 text-blue-200'
                : 'bg-white border-blue-200 text-blue-950'
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-bold">“Learning is a living wonder!”</span>
              <span className={isDark ? 'text-blue-900' : 'text-blue-200'}>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> Angeles City, Pampanga
              </span>
            </div>

            <h1 className={`font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Welcome to <br />
              <span className="text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-8 decoration-blue-500">
                Living Wonder
              </span> <br />
              Taekwondo Center
            </h1>

            <p className={`text-lg sm:text-xl max-w-2xl font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              We are more than just kicks and forms. Here, Taekwondo is about building{' '}
              <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                belonging, inner confidence, and connection
              </strong>.
              We help students find their footing and flourish — especially young beginners, new residents, and relocating families.
            </p>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {SELLING_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenTrialModal}
                className="px-7 py-3.5 font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-lg shadow-lg shadow-blue-600/30 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ring-1 ring-blue-400/40"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a Free Trial Class</span>
              </button>

              <button
                onClick={onExplorePrograms}
                className={`px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#0b162c] text-slate-200 hover:text-white hover:bg-[#10203f] border-blue-900/60'
                    : 'bg-white text-slate-800 hover:text-slate-950 hover:bg-blue-50 border-blue-200 shadow-xs'
                }`}
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Right column: "Why Families Choose Us" panel */}
          <div className="lg:col-span-4 w-full">
            <div className={`border rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden ${
              isDark
                ? 'bg-[#0b162c]/95 border-blue-900/60 text-slate-100 shadow-blue-950/50'
                : 'bg-white border-blue-100 text-slate-900 shadow-blue-100/70'
            }`}>
              <div className={`flex items-center gap-3 border-b pb-4 mb-5 ${
                isDark ? 'border-blue-950/80' : 'border-blue-100'
              }`}>
                <div className={`w-12 h-12 rounded-xl border p-1.5 flex items-center justify-center ${
                  isDark ? 'bg-[#060c18] text-white border-blue-800/60' : 'bg-[#eef4fa] text-slate-950 border-blue-200'
                }`}>
                  <Logo className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Why Families Choose Us</h3>
                  <p className={`text-xs ${isDark ? 'text-blue-300/80' : 'text-blue-700'}`}>
                    Angeles City's Welcoming Dojang
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {FAMILY_PILLARS.map((pillar) => {
                  const PillarIcon = pillar.icon;

                  return (
                    <div
                      key={pillar.title}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        isDark
                          ? 'bg-[#060c18]/80 border-blue-950/70 text-slate-200'
                          : 'bg-[#f4f8fc] border-blue-100 text-slate-800'
                      }`}
                    >
                      <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5 bg-blue-600 text-white shadow-xs">
                        <PillarIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                          {pillar.title}
                        </h4>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Free trial reminder at the bottom of the panel */}
              <div className={`mt-5 pt-4 border-t flex items-center justify-between text-xs ${
                isDark ? 'border-blue-950/80 text-slate-300' : 'border-blue-100 text-slate-700'
              }`}>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  First class is complimentary:
                </span>
                <button
                  onClick={onOpenTrialModal}
                  className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline cursor-pointer"
                >
                  Claim Pass →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
