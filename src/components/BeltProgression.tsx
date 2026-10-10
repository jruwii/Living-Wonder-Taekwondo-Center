import { Award, CheckCircle2 } from 'lucide-react';
import { BELT_STAGES } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

/** Shows the six belt ranks in order, from white belt through to black belt. */
export const BeltProgression: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lastStageIndex = BELT_STAGES.length - 1;

  return (
    <section className={`py-20 border-y transition-colors duration-300 ${
      isDark ? 'bg-[#060c18] text-slate-100 border-blue-950/80' : 'bg-[#f0f6fc] text-slate-900 border-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark ? 'bg-[#0b162c] border-blue-900/60 text-blue-300' : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <Award className="w-3.5 h-3.5 text-blue-500" />
            <span>Kukkiwon Standard Rank System</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            The Belt Progression Journey
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Belt advancement is not about speed — it is about honoring character, dedication, and personal mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BELT_STAGES.map((stage, index) => (
            <div
              key={stage.name}
              className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 shadow-blue-950/30'
                  : 'bg-white border-blue-100 hover:border-blue-400 shadow-blue-100/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-[#060c18] text-blue-300 border-blue-900/60'
                      : 'bg-blue-50 text-blue-900 border-blue-200'
                  }`}>
                    Stage {index + 1}
                  </span>
                  <span className={`text-xs font-semibold ${
                    isDark ? 'text-blue-300/80' : 'text-blue-700'
                  }`}>
                    {stage.duration}
                  </span>
                </div>

                {/* Coloured bar standing in for the actual belt */}
                <div className={`h-3.5 rounded-full mb-4 border shadow-xs ${stage.barClass}`} />

                <h3 className="font-heading text-xl font-bold">{stage.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 mb-2 ${
                  isDark ? 'text-blue-300/80' : 'text-blue-700'
                }`}>
                  {stage.level} • {stage.meaning}
                </p>

                <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {stage.focus}
                </p>
              </div>

              <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                isDark ? 'border-blue-950/80 text-slate-400' : 'border-blue-100 text-slate-600'
              }`}>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Kukkiwon Testing</span>
                </span>
                {/* Black belt is the end of the geup grades, so it has no promotion exam */}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {index === lastStageIndex ? 'Mastery' : 'Promotion Exam'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div className={`mt-12 p-6 sm:p-8 rounded-2xl border text-center max-w-4xl mx-auto shadow-md ${
          isDark
            ? 'bg-[#0b162c] border-blue-900/60 text-slate-200'
            : 'bg-white border-blue-100 text-slate-800'
        }`}>
          <blockquote className={`font-heading text-base sm:text-lg font-bold italic mb-2 ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            “A Black Belt is just a White Belt who never, ever gave up.”
          </blockquote>
          <p className={`text-xs sm:text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Master Edmond Dagpin supervises every grading test to ensure students develop genuine technique, emotional humility, and lifelong character.
          </p>
        </div>

      </div>
    </section>
  );
};
