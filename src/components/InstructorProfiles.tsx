import { Award, ShieldCheck, UserCheck, Sparkles, Check, BookOpen, Clock, Users } from 'lucide-react';
import { INSTRUCTORS } from '../data/taekwondoData';
import { useTheme } from '../context/ThemeContext';

interface InstructorProfilesProps {
  onBookWithInstructor: (instructorName: string) => void;
}

// How many items to show on the cards, so long lists stay tidy
const MAX_FOUNDER_CREDENTIALS = 4;
const MAX_COACH_SPECIALTIES = 3;

/** Highlights the founder in a large spotlight card, then the other coaches in a grid. */
export const InstructorProfiles: React.FC<InstructorProfilesProps> = ({ onBookWithInstructor }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const founder = INSTRUCTORS.find((instructor) => instructor.isFounder) ?? INSTRUCTORS[0];
  const coaches = INSTRUCTORS.filter((instructor) => !instructor.isFounder);

  return (
    <section id="instructors" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#060c18] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      <div className="absolute inset-0 bg-wood-subtle opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-3 shadow-xs ${
            isDark
              ? 'bg-[#0b162c] border-blue-900/60 text-blue-300'
              : 'bg-white border-blue-200 text-blue-950'
          }`}>
            <Award className="w-3.5 h-3.5 text-blue-500" />
            <span>Kukkiwon-Certified Mentors</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Meet Our Masters &amp; Coaches
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Dedicated martial artists, certified educators, and mentors committed to your family’s growth on and off the mat.
          </p>
        </div>

        {/* Founder spotlight */}
        <div className={`mb-16 border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#0b162c] border-blue-900/60 text-slate-100 shadow-blue-950/40'
            : 'bg-white border-blue-100 text-slate-900 shadow-blue-100/60'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Portrait with belt rank and experience badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-full max-w-sm">
                <div className={`aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 relative group ${
                  isDark ? 'border-blue-900 bg-black' : 'border-blue-200 bg-slate-100'
                }`}>
                  <img
                    src={founder.imageUrl}
                    alt={founder.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#060c18] via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#0b1b36]/90 via-transparent to-transparent'
                  }`} />

                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-1.5 text-left">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-black text-white border border-blue-900 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      {founder.beltRank}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                      <Clock className="w-3.5 h-3.5" />
                      {founder.experienceYears}
                    </span>
                  </div>
                </div>

                {/* "Founder" seal in the corner */}
                <div className={`absolute -top-3 -right-3 w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center text-[9px] font-extrabold tracking-tighter uppercase shadow-xl ${
                  isDark
                    ? 'bg-blue-600 text-white border-[#0b162c]'
                    : 'bg-[#0b1b36] text-white border-white'
                }`}>
                  <span>FOUNDER</span>
                  <span className="text-[11px] font-bold">1999</span>
                </div>
              </div>
            </div>

            {/* Biography, credentials and booking buttons */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'bg-[#060c18] text-blue-300 border border-blue-950' : 'bg-blue-50 text-blue-900 border border-blue-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Head Instructor &amp; Dojang Founder</span>
                </div>
                <h3 className={`font-heading text-3xl sm:text-4xl font-extrabold ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  {founder.name}
                </h3>
                <p className={`text-sm font-semibold mt-1 ${
                  isDark ? 'text-blue-300/80' : 'text-blue-700'
                }`}>
                  {founder.beltRank} • Licensed Master Instructor
                </p>
              </div>

              <blockquote className={`p-4 rounded-xl border-l-4 text-sm sm:text-base italic leading-relaxed ${
                isDark
                  ? 'bg-[#060c18] border-blue-500 text-slate-200'
                  : 'bg-[#f0f6fc] border-blue-600 text-slate-800'
              }`}>
                {founder.tagline}
              </blockquote>

              <div className={`space-y-3 text-sm sm:text-[15px] leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className={`pt-2 border-t space-y-3 ${
                isDark ? 'border-blue-950/80' : 'border-blue-100'
              }`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>Accreditations &amp; Specializations:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {founder.credentials.slice(0, MAX_FOUNDER_CREDENTIALS).map((credential) => (
                    <div
                      key={credential}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                        isDark
                          ? 'bg-[#060c18] border-blue-950/80 text-slate-200'
                          : 'bg-[#f4f8fc] border-blue-100 text-slate-800'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                      <span>{credential}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onBookWithInstructor(`${founder.name} (Head Master)`)}
                  className="px-6 py-3 font-extrabold uppercase tracking-wider rounded-lg text-xs shadow-md shadow-blue-600/25 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-all inline-flex items-center gap-2 cursor-pointer ring-1 ring-blue-400/40"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Book Trial Class with Master Edmond</span>
                </button>
                <a
                  href="#about"
                  className={`px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors inline-flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-[#060c18] hover:bg-[#10203f] text-slate-200 border-blue-900/60'
                      : 'bg-white hover:bg-blue-50 text-slate-800 border-blue-200 shadow-xs'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Read Dojang Philosophy</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Coaching staff grid */}
        <div>
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b pb-4 ${
            isDark ? 'border-blue-950/80' : 'border-blue-100'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-1 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <Users className="w-4 h-4" />
                <span>Specialist Instructors</span>
              </div>
              <h3 className={`font-heading text-2xl sm:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                Our Dedicated Coaching Staff
              </h3>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Every instructor at Living Wonder is officially certified, background-checked, and trained in positive youth mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className={`rounded-2xl border p-6 shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0b162c] border-blue-900/60 hover:border-blue-500 text-slate-100 shadow-blue-950/30'
                    : 'bg-white border-blue-100 hover:border-blue-400 text-slate-900 shadow-blue-100/40'
                }`}
              >
                <div>
                  <div className="relative mb-5">
                    <div className={`aspect-[4/3] rounded-xl overflow-hidden border ${
                      isDark ? 'bg-[#060c18] border-blue-950' : 'bg-slate-100 border-blue-200'
                    }`}>
                      <img
                        src={coach.imageUrl}
                        alt={coach.name}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-black/90 text-white border border-blue-900 backdrop-blur-xs">
                        {coach.beltRank}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs backdrop-blur-xs">
                        {coach.experienceYears}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-heading text-xl font-bold">{coach.name}</h4>
                  <p className={`text-xs font-semibold mt-0.5 mb-3 ${
                    isDark ? 'text-blue-300/80' : 'text-blue-700'
                  }`}>
                    {coach.role}
                  </p>

                  {/* Only the opening paragraph fits on a card */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {coach.bio[0]}
                  </p>

                  <div className={`space-y-1.5 pt-3 border-t ${
                    isDark ? 'border-blue-950/80' : 'border-blue-100'
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Focus Areas:
                    </span>
                    {coach.specialties.slice(0, MAX_COACH_SPECIALTIES).map((specialty) => (
                      <div
                        key={specialty}
                        className={`flex items-start gap-1.5 text-xs ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                        <span>{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${
                  isDark ? 'border-blue-950/80 text-blue-300/70' : 'border-blue-100 text-slate-500'
                }`}>
                  <p className="text-xs italic">{coach.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
