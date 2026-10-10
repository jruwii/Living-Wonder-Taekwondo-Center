import { ShieldCheck, Heart, Sparkles, Compass, Target, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/*
 * The five traditional Taekwondo tenets plus our own sixth one.
 * Kept outside the component so the array is not rebuilt on every render.
 */
const CORE_VALUES = [
  {
    title: 'Ye-Ui (Courtesy & Respect)',
    korean: '예의',
    description: 'Treating parents, peers, teachers, and opponents with genuine care and humility. Bowing with sincere intention.',
    icon: Heart,
  },
  {
    title: 'Yom-Chi (Integrity)',
    korean: '염치',
    description: 'Knowing right from wrong and having the courage to stand by truth, both inside the dojang and in daily school life.',
    icon: ShieldCheck,
  },
  {
    title: 'In-Nae (Perseverance)',
    korean: '인내',
    description: 'Patience and tenacity. Continuing to try when a technique is difficult or when transitioning into a new environment.',
    icon: Compass,
  },
  {
    title: 'Guk-Gi (Self-Control)',
    korean: '극기',
    description: 'Mastering impulses, emotional regulation, and calm focus under physical exertion or sudden stress.',
    icon: Target,
  },
  {
    title: 'Baekjul-boolgool (Indomitable Spirit)',
    korean: '백절불굴',
    description: 'A courageous, unyielding mindset that stands up for justice, protects the vulnerable, and never surrenders to fear.',
    icon: Sparkles,
  },
  {
    title: 'Belonging & Connection',
    korean: '공동체',
    description: 'Our Living Wonder promise: An inclusive sanctuary where newcomers, relocated families, and local youth thrive together.',
    icon: Users,
  },
];

/** Grid of the six character tenets taught at the dojang. */
export const Values: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="values" className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-[#060c18] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark ? 'bg-[#0b162c] border-blue-900/60 text-blue-300' : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Character &amp; Tenets</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            The Tenets of Living Wonder
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            More than kicking drills — these traditional Korean tenets guide our students towards becoming compassionate leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_VALUES.map((value, index) => {
            const ValueIcon = value.icon;

            return (
              <div
                key={value.title}
                className={`rounded-2xl border p-7 shadow-sm transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 shadow-blue-950/30'
                    : 'bg-white border-blue-100 hover:border-blue-300 shadow-blue-100/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs bg-blue-600 text-white border-blue-500">
                      <ValueIcon className="w-6 h-6" />
                    </div>
                    {/* The Korean name written in Hangul */}
                    <span className={`text-xl font-bold font-serif ${
                      isDark ? 'text-blue-300/70' : 'text-blue-700'
                    }`}>
                      {value.korean}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-2">{value.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {value.description}
                  </p>
                </div>

                <div className={`mt-6 pt-3 border-t text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? 'border-blue-950/80 text-blue-300/60' : 'border-blue-100 text-blue-700'
                }`}>
                  Tenet #{index + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
