import { BookOpen, HeartHandshake, Compass, ShieldCheck } from 'lucide-react';
import { INSTRUCTORS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

// The three trust badges shown under the founder's photo
const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: 'World Taekwondo / Kukkiwon Certified',
    subtitle: '6th Dan Black Belt & PTA Master License',
  },
  {
    icon: HeartHandshake,
    title: 'Angeles City Community Advocate',
    subtitle: 'Specialized in youth confidence & newcomer transition',
  },
  {
    icon: Compass,
    title: 'Positive Pedagogy & Safe Mat Policy',
    subtitle: 'CPR/First Aid certified coaching staff',
  },
];

/** A letter from the founder, laid out like a real letter with his portrait beside it. */
export const AboutMaster: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Reuse the founder's details from the shared data file so they only live in one place
  const founder = INSTRUCTORS[0];

  return (
    <section id="about" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#040812] text-slate-200' : 'bg-[#f0f6fc] text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark
              ? 'bg-[#0b162c] text-blue-300 border-blue-900/60'
              : 'bg-white text-blue-950 border-blue-200'
          }`}>
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Our Heart &amp; Philosophy</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            A Letter from Founder {founder.name}
          </h2>
          <p className={`mt-2 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Why we believe every child and student is a living wonder waiting to unfold.
          </p>
        </div>

        {/* Two-column card: portrait on the left, letter on the right */}
        <div className={`rounded-2xl shadow-xl border overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#0b162c] border-blue-900/60 shadow-blue-950/40'
            : 'bg-white border-blue-100 shadow-blue-100/60'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Portrait and credentials */}
            <div className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r ${
              isDark
                ? 'bg-[#060c18] border-blue-950/80 text-white'
                : 'bg-[#0b1b36] border-blue-900 text-white'
            }`}>
              <div className="space-y-6">
                <div className="relative mx-auto max-w-[280px]">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-2 border-blue-800/60 bg-black relative">
                    <img
                      src={founder.imageUrl}
                      alt={`${founder.name} in traditional Taekwondo dobok`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter grayscale contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060c18] via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider mb-1 shadow-xs">
                        {founder.role}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white leading-tight">
                        {founder.name}
                      </h3>
                      <p className="text-xs text-blue-200/90">
                        {founder.beltRank} • {founder.experienceYears}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {TRUST_BADGES.map((badge) => {
                    const BadgeIcon = badge.icon;

                    return (
                      <div
                        key={badge.title}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#040812]/80 border border-blue-900/50 text-xs"
                      >
                        <BadgeIcon className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <div className="font-bold text-white">{badge.title}</div>
                          <div className="text-blue-300/80 text-[11px]">{badge.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-900/60 text-center">
                <blockquote className="italic text-blue-200 text-sm">
                  “When a student feels safe and valued, their true strength naturally awakens.”
                </blockquote>
              </div>
            </div>

            {/* The letter itself */}
            <div className={`lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#0b162c]' : 'bg-white'
            }`}>
              <div className={`space-y-5 text-base sm:text-[17px] leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <div className={`border-b pb-4 ${isDark ? 'border-blue-950/80' : 'border-blue-100'}`}>
                  <p className={`font-heading text-xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Dear Parents, Students, and Friends of Angeles City,
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-blue-300/80' : 'text-blue-700'}`}>
                    Mabuhay and welcome to Living Wonder Taekwondo Center.
                  </p>
                </div>

                <p>
                  When parents first walk into our dojang, they often ask about belt timelines and physical techniques. While we take immense pride in our authentic Kukkiwon technical standards, our deeper mission is something far more profound.
                </p>

                {/* Pull quote highlighting the dojang motto */}
                <div className={`p-4 rounded-xl border-l-4 ${
                  isDark
                    ? 'bg-[#060c18] border-blue-500 text-slate-200'
                    : 'bg-[#f0f6fc] border-blue-600 text-slate-900'
                }`}>
                  We founded <strong className="font-bold text-blue-600 dark:text-blue-400">Living Wonder</strong> on a single guiding conviction: <em>“Learning is a living wonder!”</em> Every child and adult who steps onto our mats brings unique gifts, doubts, and potential. Our role is not to mould everyone into identical fighters, but to give each individual the confidence to stand tall.
                </div>

                <p>
                  Angeles City and the surrounding Pampanga / Clark region are wonderfully vibrant and diverse. We welcome local families, families who have recently relocated from across the Philippines, and international expat families adapting to a new country. We know firsthand how intimidating a new city or new school can feel.
                </p>

                <p>
                  Inside these four walls, language barriers fade. Self-doubt turns into resolute focus. A quiet child who once hesitated at the door learns to shout their kihap with unshakeable courage. That sense of <strong>belonging and mutual respect</strong> is what makes our community feel like a family.
                </p>

                <p>
                  Whether your goal is building focus for your preschooler, instilling discipline in your pre-teen, or regaining your own strength and calm, you have a place here with us.
                </p>

                {/* Signature and the dojang seal */}
                <div className={`pt-6 border-t flex items-center justify-between ${
                  isDark ? 'border-blue-950/80' : 'border-blue-100'
                }`}>
                  <div>
                    <p className={`text-xs uppercase tracking-wider font-bold ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      With warmest respect,
                    </p>
                    <p className={`font-heading text-2xl font-bold mt-1 ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {founder.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-blue-300/80' : 'text-blue-700'}`}>
                      {founder.role}, Living Wonder Taekwondo Center
                    </p>
                  </div>

                  <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center text-[10px] font-extrabold uppercase tracking-tighter text-center ${
                    isDark
                      ? 'border-blue-400 bg-[#060c18] text-blue-300 shadow-xs'
                      : 'border-blue-700 bg-blue-50 text-blue-900 shadow-xs'
                  }`}>
                    <span className="text-[14px]">達彬</span>
                    <span className="text-[8px] tracking-widest">DAGPIN</span>
                    <span className="text-[8px] tracking-widest font-black">MASTER</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
