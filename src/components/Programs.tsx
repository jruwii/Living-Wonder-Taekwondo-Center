import { Sparkles, Shield, Zap, Trophy, HeartHandshake, Check, Clock, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PROGRAMS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

interface ProgramsProps {
  onSelectProgram: (programTitle: string) => void;
}

// Looks up the icon named in the data file. Shield is the fallback.
const PROGRAM_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Shield,
  Zap,
  Trophy,
  HeartHandshake,
};

/** One card per program, each with its own "Book Free Trial" button. */
export const Programs: React.FC<ProgramsProps> = ({ onSelectProgram }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="programs" className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-[#040812] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark ? 'bg-[#0b162c] border-blue-900/60 text-blue-300' : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <span>Tailored Martial Arts Pathways</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Our Taekwondo Programs
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Structured age-appropriate curricula designed to foster athletic excellence, safety, and personal confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => {
            const ProgramIcon = PROGRAM_ICONS[program.iconName] ?? Shield;

            return (
              <div
                key={program.id}
                className={`rounded-2xl border p-7 shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 text-slate-100 shadow-blue-950/40'
                    : 'bg-white border-blue-100 hover:border-blue-400 text-slate-900 shadow-blue-100/50'
                }`}
              >
                <div>
                  {/* Icon and category badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs bg-blue-600 text-white border-blue-500">
                      <ProgramIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'bg-[#060c18] text-blue-300 border-blue-900/60'
                        : 'bg-blue-50 text-blue-900 border-blue-200'
                    }`}>
                      {program.badge}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-heading text-2xl font-bold">{program.title}</h3>
                    <div className={`flex items-center gap-2 text-xs font-semibold mt-1 ${
                      isDark ? 'text-blue-300/80' : 'text-blue-700'
                    }`}>
                      <span>{program.ageGroup}</span>
                      <span>•</span>
                      <span>{program.beltLevel}</span>
                    </div>
                  </div>

                  <p className={`text-sm italic font-medium mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    “{program.tagline}”
                  </p>

                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {program.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Curriculum Highlights:
                    </div>
                    {program.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Class times and the booking button */}
                <div className={`pt-4 border-t space-y-4 ${
                  isDark ? 'border-blue-950/80' : 'border-blue-100'
                }`}>
                  <div className={`flex items-center gap-2 text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <Clock className="w-4 h-4 shrink-0 text-blue-500" />
                    <span className="line-clamp-1">{program.schedule}</span>
                  </div>

                  <button
                    onClick={() => onSelectProgram(program.title)}
                    className="w-full py-3 px-4 font-extrabold uppercase tracking-wider text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white cursor-pointer ring-1 ring-blue-400/30"
                  >
                    <span>Book Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
